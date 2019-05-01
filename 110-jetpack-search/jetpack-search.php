<?php

/**
 * Enable Jetpack search
 *
 * @param array $modules - list of enabled modules
 */
function vip_s__enable_jetpack_search_module( $modules ) {
    if ( ! in_array( 'search', $modules, true ) ) {
        $modules[] = 'search';
    }
    return $modules;
}
add_filter( 'jetpack_active_modules', 'vip_s__enable_jetpack_search_module', 9999 );


/**
* Enable Elastic search for category, tag and author pages.
*
* This is optional, and only necessary if you need Jetpack search
* for these queries
*
* @param $query
*/
function vip_s__maybe_enable_es_wp_query( $query ) {

        if ( is_admin() || ! $query->is_main_query() ) {
                return;
        }

        if ( $query->is_category() || $query->is_tag() || $query->is_author() ) {
                $query->set( 'es', 'true' );
        }
}

add_action( 'pre_get_posts', 'vip_s__maybe_enable_es_wp_query' );