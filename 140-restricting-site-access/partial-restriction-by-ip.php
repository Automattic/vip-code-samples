<?php

define(
	'VIP__ALLOWED_IPS',
	array(
		'172.25.0.2',
		'192.168.32.1',
	)
);

define(
	'VIP__RESTRICTED_PATHS',
	array(
		'/sample-page/',
	)
);


/**
 * Before trying to authenticate a user or displaying the login form, check if the request is coming from a valid IP
 */
add_action( 'wp_authenticate', 'vip__check_ips' );

function vip__check_ips() {
	if ( ! ( defined( 'WP_CLI' ) && WP_CLI ) ) {
     // phpcs:ignore WordPressVIPMinimum.Variables.ServerVariables.UserControlledHeaders, WordPress.Security.ValidatedSanitizedInput.InputNotValidated, WordPressVIPMinimum.Variables.RestrictedVariables.cache_constraints___SERVER__REMOTE_ADDR__
		if ( ! in_array( $_SERVER['REMOTE_ADDR'], VIP__ALLOWED_IPS, true ) ) {
			header( 'HTTP/1.0 403 Forbidden' );
			exit;
		}
	}
	return $user;
}

add_action( 'init', 'vip__check_restricted_pages' );


/**
 * For every request, check if the request is made against a restricted path then check if the user is logged in
 */
function vip__check_restricted_pages() {

	if ( ! ( defined( 'WP_CLI' ) && WP_CLI ) ) {

	// phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotValidated, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
		$current_path = $_SERVER['REQUEST_URI'];

		$path_match = false;

		if ( defined( 'VIP__ALLOWED_IPS' ) && is_array( VIP__ALLOWED_IPS ) ) {
			foreach ( VIP__RESTRICTED_PATHS as $restricted_path ) {
				if ( $current_path === $restricted_path ) {
					$path_match = true;
					break;
				}
			}

			if ( $path_match && ! is_user_logged_in() ) {
				header( 'HTTP/1.0 403 Forbidden' );
				exit;
			}
		}
	}
}
