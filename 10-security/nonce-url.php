<?php
// Create a menu page for the demo nonce URL link.
add_action( 'admin_menu', function() {
	add_menu_page(
		'URL Nonce Example',
		'URL Nonce Example',
		'publish_posts',
		'vip__nonce_url_link',
		'vip__nonce_url_link_callback'
	);
} );

// Contents for the demo nonce URL page.
function vip__nonce_url_link_callback () {
	/**
	 * Verify the nonce URL exists & is legitimate.
	 *
	 * @see https://codex.wordpress.org/Function_Reference/wp_verify_nonce
	 */
	if ( isset( $_GET['_vip__nonce'] ) && wp_verify_nonce( $_GET['_vip__nonce'], 'vip__nonce_action' ) ) {
		?>
		<p>✅ Valid nonce.</p>
		<?php
		return;
	}

	$url = admin_url('options.php?page=vip__nonce_url_link');

	/**
	 * Create a nonce URL.
	 *
	 * @see https://codex.wordpress.org/Function_Reference/wp_nonce_url
	 */
	$nonce_url = wp_nonce_url( $url, 'vip__nonce_action', '_vip__nonce' );
	?>
	<a href="<?php echo esc_url( $nonce_url ); ?>" class="button button-primary">Nonce URL »</a>
	<?php
}