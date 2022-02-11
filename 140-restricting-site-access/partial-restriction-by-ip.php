<?php

define(
	'VIP__ALLOWED_IPS',
	array(
		'172.18.0.1',
	)
);

/**
 * Before trying to authenticate a user or displaying the login form, check if the request is coming from a valid IP
 */
add_action( 'wp_authenticate', 'vip__check_ips' );

function vip__check_ips() {
	if ( ! ( defined( 'WP_CLI' ) && WP_CLI ) && ! ( defined( 'A8C_PROXIED_REQUEST' ) && A8C_PROXIED_REQUEST ) ) {
     // phpcs:ignore WordPressVIPMinimum.Variables.ServerVariables.UserControlledHeaders, WordPress.Security.ValidatedSanitizedInput.InputNotValidated, WordPressVIPMinimum.Variables.RestrictedVariables.cache_constraints___SERVER__REMOTE_ADDR__
		if ( defined( 'VIP__ALLOWED_IPS' ) && is_array( VIP__ALLOWED_IPS ) && ! in_array( $_SERVER['REMOTE_ADDR'], VIP__ALLOWED_IPS, true ) ) {
			header( 'HTTP/1.0 403 Forbidden' );
			exit;
		}
	}
	return $user;
}
