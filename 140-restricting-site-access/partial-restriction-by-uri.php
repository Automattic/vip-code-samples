<?php

define(
	'VIP__RESTRICTED_PATHS',
	array(
		'/sample-page/',
	)
);

/**
 * For every request, check if the request is made against a restricted path then check if the user is logged in
 */
add_action( 'init', 'vip__check_restricted_pages' );

function vip__check_restricted_pages() {

	if ( ! ( defined( 'WP_CLI' ) && WP_CLI ) && ! ( defined( 'A8C_PROXIED_REQUEST' ) && A8C_PROXIED_REQUEST ) ) {

		// phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotValidated, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
		$current_path = $_SERVER['REQUEST_URI'];

		$path_match = false;

		if ( defined( 'VIP__RESTRICTED_PATHS' ) && is_array( VIP__RESTRICTED_PATHS ) ) {
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
