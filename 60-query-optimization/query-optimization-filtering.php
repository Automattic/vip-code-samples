<?php

// example of implementing a main query filter to optimize the query

// modify 'main' query to set a date range and ignore child categories
// this reduces the number of posts that need to be sorted to produce the page

function my_main_query_filter( $query ) {
	// Bail if we are in the admin or if it's not the main query
	if ( is_admin() || ! $query->is_main_query() ) {
		return;
	}
	if ( is_category() ) {
		$query->set( 'include_children', false );
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
add_action( 'pre_get_posts', 'my_main_query_filter' );
