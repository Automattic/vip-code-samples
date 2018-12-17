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
    if ( false === $posts ) {
        // get the latest 3 posts

        wp_cache_set( 'latest_posts', $posts, 15 * MINUTES_IN_SECONDS );
    }

    // very simple list
    foreach ( $posts as $post ) {
        echo 
    }

}
```

### [Caching via wp-cron](cache-via-cron.php)
Caching via wp-cron ensures only one PHP process or MySQL query is regenerating the content