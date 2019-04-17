<?php

// Title starts with
// Adds 'search' query argument to where clause securely.
function sc_vip__posts_where( $where, $query ) {
	global $wpdb;
	$start = $query->get( 'search' );
	if ( $start ) {
                $escaped_start = $wpdb->esc_like( $start ) . '%';
                $where .= $wpdb->prepare( " AND {$wpdb->posts}.post_title LIKE %s", $escaped_start );
	}
	return $where;
}
add_filter( 'posts_where', 'sc_vip__posts_where', 10, 2 );
