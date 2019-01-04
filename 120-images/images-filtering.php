<?php

// enable the photon module
if ( ! defined( 'WPCOM_VIP_USE_JETPACK_PHOTON' ) ) {
	define( 'WPCOM_VIP_USE_JETPACK_PHOTON', true );
}
    
    
function my_custom_photon( $args ) {
	$args['quality'] = 75;
	$args['strip']   = 'all';
	return $args;
}
add_filter( 'jetpack_photon_pre_args', 'my_custom_photon', 999 );
    
function my_image_quality_filter( $args ) {
	$args['quality'] = 75;
	return $args;
}
add_filter( 'vip_go_image_resize_pre_args', 'my_image_quality_filter', 999 );