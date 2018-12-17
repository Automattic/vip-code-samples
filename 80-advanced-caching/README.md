Advanced Caching Techniques
---------------------------

These examples demonstrate advanced cache techniques that avoid *cache stampedes*.

A *cache stampede* will occur on a particularly busy site if you regenerate expensive cached data immediately
upon expiration of a direct cache TTL (time-to-live).

For example, this code, in latest.php, which is included on every page and displays the most recent 3 posts,
will probably result in a cache stampede every time it expires, since many different pages include the same code.

```
function my_stampeding_cache() {
    $posts = wp_cache_get( 'latest_posts' );

	// $posts will be false when the cache has expired
    if ( false === $posts ) {
        // get the latest 3 posts
		// See Section 70 - Querying - for tips on a more efficient query
        $args = array(
		'post_type'              => array( 'post' ),
		'nopaging'               => true,
		'posts_per_page'         => '3',
		'no_found_rows'          => true,
		'ignore_sticky_posts'    => true,
		'order'                  => 'DESC',
		'orderby'                => 'date',
	);

	// The Query
	$query = new WP_Query( $args );

		// save the query result for exactly 15 minutes
        wp_cache_set( 'latest_posts', $query->posts, 15 * MINUTES_IN_SECONDS );
    }

    // very simple list of post IDs
    foreach ( $posts as $post ) {
        echo '<li>' . intval( $post->ID ) . '</li>';
    }

}
```

As various front-end pages are being rebuilt in PHP processes initiated by a URL request, when the cache TTL expires,
ech of the processes independently sees the cache is *gone*, and then they start identical and sometimes
parallel SQL queries that can be wasteful, or block resources for a period of time, in an attempt to obtain the underlying
data.

This can actually put a site into a cyclical
mode where it periodically slows down as other queries have to wait, or it starts scaling to handle all the PHP processes that
have still not completed, while users and editors alike experience slow page loads or worse.


### [Caching via wp-cron](cache-via-cron.php)
Cache regeneration via wp-cron ensures only one PHP process or MySQL query is regenerating the content.
The strategy used for regenerating the content will vary depending on the nature and frequency of updates.

Possible strategies for regeneration:
* on a schedule, e.g., hourly - mimics the TTL mode
* in reaction to an event, e.g. when any post changes status from published to not, or draft to published; when a new comment is added to a post
* during an event, e.g. when a post is updated (note that this may slow down the edit process and should be avoided when the editor's experience is negatively affected)

The benefit of using this type of reactive strategy is that cache stampeded are avoided. An added benefit is that
the time between "invalidation" and regeneration is short. Any process requesting the cached content
during the interval receives "stale" content, which is usually sufficient.

This example also illustrates the use of a VIP function to clear the edge cache for a URL, for example the home page, when the cache is invalidated.
This is only necessary when awaiting the normal Varnish cache expiration might be unsuitable and the endpoint URLs are known and finite.