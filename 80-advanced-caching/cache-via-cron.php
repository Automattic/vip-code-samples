<?php
/**
 * Sample code illustrating techniques to regenerate cached data using wp-cron
 *
 * Schedules a task to generate a list of the most recent 25 post IDs every hour
 * Saves the result for a year in a transient
 * When a post is published, schedules an update of the list immediately
 * When the data is accessed from a template, fetches the underlying post data (usually from cache)
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
	$cache_key = 'my_cache_key';    // cache key
	$some_url = 'http://example.com/url-with-posts/'; // URL to invalidate, optional

	// Your query code here
	$args = [
		'posts_per_page' => 25,
		'fields'         => 'ids',
		'post_type'      => [ 'post' ],
		'no_found_rows'  => true,
		'order'          => 'DESC',
		'orderby'        => 'date',
	];
	$query = new WP_Query( $args );

	// save it in a transient for a long time
	set_transient( $cache_key, $query->posts, YEAR_IN_SECONDS );

	// optional for VIP Go if you have known endpoints
	wpcom_vip_purge_edge_cache_for_url( $some_url );

}

// code that gets the posts - it does not attempt to query if there are no posts
// this would be called from your widget, or theme, or plugin code
function my_get_posts() {
	$cache_key = 'my_cache_key';    // cache key
	$posts = [];   // posts array

	// get the cached data. Return an error if there's no data
	$ids = get_transient( $cache_key );
	if ( false === $posts ) {
		my_reschedule_cron_for_now();
		return $posts;
	}

	// get the underlying post data (from cache usually)
	foreach ( $ids as $post_id ) {
		$posts[] = get_post( $post_id );
	}
	return $posts;
}