<?php
// Create a menu page for our nonce URL example.
add_action( 'admin_menu', function() {
	add_menu_page(
		'URL Nonce Example',
		'URL Nonce Example',
		'publish_posts',
		'vip__url_link',
		'vip__url_link_callback'
	);
} );

// Contents for the example menu page.
function vip__url_link_callback () {
	$url       = admin_url('options.php?page=my_plugin_settings');
	$nonce_url = wp_nonce_url( $url, 'vip__nonce_action', 'vip__nonce_name' );

	if ( ! isset( $_GET['vip__nonce_name'] ) || ! wp_verify_nonce( $_GET['vip__nonce_name'], 'vip__nonce_action' ) ) {
		?>
		<a href="<?php $nonce_url ?>" class="button button-primary">Nonce URL »</a>
		<?php
	} else {
		?>
		<p>✅ Valid nonce, the link was clicked.</p>
		<?php
	}
}