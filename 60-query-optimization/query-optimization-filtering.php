<?php

// basic and common filters
// default, when logged in, the post_status list might include 'private'
$query->set( 'post_status', 'publish' );

// not typically needed when serving archive pages
$query->set( 'update_meta_cache', false );

// when not paginating (e.g., a widget displaying just 5 posts)
$query->set( 'no_found_rows', true );

// example of implementing a main query filter

// modify 'main' query to set a date range
// this reduces the number of posts that need to be sorted to produce the page
add_action( 'pre_get_posts', 'my_main_query_filter' );

function my_main_query_filter( $query ) {
	// Bail if we are in the admin or if it's not the main query
	if ( is_admin() || ! $query->is_main_query() ) {
		return;
	}
	// Only perform this action on the News category
	if ( is_category( 6 ) ) {
		// limit to posts since 1 month ago
		$last_month = strtotime( 'last month' );
		$date_filter = [
			'after' => [
				'year' => date( 'Y', $last_month ),
				'month' => date( 'n', $last_month ),
				'day' => date( 'j', $last_month ),
			]
		];
		$query->set( 'date_query', $date_filter );
	}
}