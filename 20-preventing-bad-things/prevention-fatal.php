<?php

// use function_exists to avoid duplicate declarations or collisions
if ( ! function_exists( 'my_handy_filter' ) ) {
	function my_handy_filter( $args ) {
		return $args;
	}
	// don't declare the filter unless the function exists!
	add_filter( 'some_wp_filter_hook', 'my_handy_filter', 20, 1 );
}

// use function_exists to conditionally load a file
// typically used when invoking wp_admin code from a front end file or plugin
if ( ! function_exists( 'get_sample_permalink' ) ) {
	// post.php is normally only loaded on the backend (wp_admin)
	require_once ABSPATH . '/wp-admin/includes/post.php';
}
// now the function should exist
$sample_permalink = get_sample_permalink( $post->ID, $post->post_title, '' );

// check for is_wp_error() after certain calls that may return it

// Get a list of categories and extract their names
$post_categories = get_the_terms( $post->ID, 'category' );
if ( ! empty( $post_categories ) && ! is_wp_error( $post_categories ) ) {
    $categories = wp_list_pluck( $post_categories, 'name' );
}
