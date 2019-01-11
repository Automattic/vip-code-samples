<?php

// check for is_wp_error() after certain calls that may return it

// Get a list of categories and extract their names
$post_categories = get_the_terms( $post->ID, 'category' );
if ( ! empty( $post_categories ) && ! is_wp_error( $post_categories ) ) {
    $categories = wp_list_pluck( $post_categories, 'name' );
}

// check for an object before accessing it

// declare an empty array to avoid accidental errors
$stuff = [];
if ( $foo ) {
	// add $foo to thing array
	$stuff[] = $foo;
}

// without the empty array, if $foo was false, this would throw 'Warning: Invalid argument supplied for foreach()'
foreach ( $stuff as $thing ) {
	// do something with thing
}

