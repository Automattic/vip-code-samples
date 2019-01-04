<?php

// use function_exists to avoid duplicate declarations or collisions
if ( ! function_exists( 'my_handy_filter' ) ) {
	function my_handy_filter( $args ) {
		return $args;
	}
	add_filter( 'some_wp_filter_hook', 'my_handy_filter', 20, 1 );
}

// check for is_wp_error() after certain calls that may return it

// check for an object before accessing it

// declare an empty array to avoid accidental errors
$stuff = [];
if ( $foo ) {
	// add $foo to thing array
	$stuff[] = $foo;
}
// without the empty array, if $foo was false, this would error:
foreach ( $stuff as $thing ) {
	// do something with thing
}