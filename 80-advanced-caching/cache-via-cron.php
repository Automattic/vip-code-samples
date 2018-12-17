/**
 * Sample code illustrating techniques to regenerate cached data using wp-cron
 *
 */

// on init, hook the function to the action
add_action( 'my_regenerate_posts_cron', 'my_regenerate_posts' );

// and schedule the first (optional, particularly if you are using categories)
if ( ! wp_next_scheduled( 'my_regenerate_posts_cron' ) ) {
    wp_schedule_event( time(), 'hourly', 'my_regenerate_posts_cron' );
}

// action to regenerate on publish (you can also hook on transition instead)
add_action( 'publish_post', 'my_reschedule_cron_for_now' );

// scheduling function, if you are using category, then you'd need to extract that from the $post argument
function my_reschedule_cron_for_now() {
    // Clear any existing hourly cron, note this needs the same args (if any) as the scheduled event if you're passing a category
    wp_clear_scheduled_hook( 'my_regenerate_posts_cron' );
    // Reschedule the hourly updates, initiating an immediate regeneration.
    wp_schedule_event( time(), 'hourly', 'my_regenerate_posts_cron' );
}

// cron task to generate posts, it could have an optional set of params eg category
// this runs under wp_cron asynchronously
function my_regenerate_posts() {
    // do the query here
...
    // save it in a transient for a long time
    set_transient( $cache_key, $posts, YEAR_IN_SECONDS );

    // optional for VIP Go if you have known endpoints
    wpcom_vip_purge_edge_cache_for_url( $some_url );

}

// code that gets the posts - it does not attempt to query if there are no posts
// this would be called from your widget, or theme, or plugin code
function my_get_posts() {
        // get the cached data. Return an error if there's no data
        $posts = get_transient( $cache_key );
        if ( false === $posts ) {
                metro_reschedule_cron_for_now();
                return [];
        }
        return $posts;
}