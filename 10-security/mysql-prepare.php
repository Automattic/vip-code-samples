<?php

// Title starts with
/**
 * Add 'search' query argument to where clause securely.
 *
 * @see https://codex.wordpress.org/Class_Reference/wpdb#Protect_Queries_Against_SQL_Injection_Attacks
 */
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
