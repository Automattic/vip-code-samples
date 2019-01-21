<?php

// basic and common filters

// Common filters on WP_Query
// Making sure a post_status is set helps ensure logged in and out users use the same (cached) queries and increase the hit rates.
// Adding no_found_rows is good when knowing the total of the query isn't needed, or there's no pagination

function my_main_query_filter( $query ) {

        // always check these in a pre_get_posts filter or you could cause unwanted changes to other queries
	if ( is_admin() || ! $query->is_main_query() ) {
		return;
        }
        
        // limit category queries to the main category, do not include children
	if ( is_category() ) {
		$query->set( 'include_children', false );
        }

        // default, when logged in, the post_status list might include 'private'
        $query->set( 'post_status', 'publish' );

        // when not paginating (e.g., a widget displaying just 5 posts)
        $query->set( 'no_found_rows', true );

        // "sticky posts" add complexity
        $query->set( 'ignore_sticky_posts', true );

        // not typically needed when serving archive pages
        $query->set( 'update_meta_cache', false );
}
add_action( 'pre_get_posts', 'my_main_query_filter' );
