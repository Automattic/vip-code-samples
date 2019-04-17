<?php
// Create a menu page for our AJAX script.
add_action( 'admin_menu', function() {
	add_menu_page(
		'AJAX Nonce Example',
		'AJAX Nonce Example',
		'publish_posts',
		'vip__ajax_form',
		'vip__ajax_form_callback'
	);
} );

// Contents for the Ajax Form menu page.
function vip__ajax_form_callback() {
	/**
	 * Create the nonce for our admin page.
	 *
	 * Include the action name for context.
	 *
	 * @see https://codex.wordpress.org/Function_Reference/wp_create_nonce
	 */
	$ajax_nonce = wp_create_nonce( "vip__ajax_form_nonce" );
	?>
	<h2>AJAX Nonce</h2>
	<input type='submit' class='button button-primary' id='click_me' value='Send AJAX Post Request »'>
	<pre id='vip__ajax_form_output'></pre>

	<script type="text/javascript">
	jQuery(document).ready( function($) {
		var data = {
			action: 'vip__ajax_form_action',
			_vip__nonce: <?php echo wp_json_encode( $ajax_nonce ); ?>,
			my_string: 'Freedom to Publish!'
		};
		$('#click_me').click(function() {
			// Post our request to WordPress' AJAX URL.
			$.post( ajaxurl, data, function( response ) {
				$('#vip__ajax_form_output').text("Response: " + response.data);
			});
		});
	});
	</script>
	<?php
}

// Our AJAX hook for the POST request.
add_action( 'wp_ajax_vip__ajax_form_action', function() {
	/**
	 * Verify the nonce exists & verify it's correct.
	 *
	 * Include the action name for context.
	 *
	 * @see https://codex.wordpress.org/Function_Reference/wp_verify_nonce
	 */
	if ( ! isset( $_POST['_vip__nonce'] ) || ! wp_verify_nonce( $_POST['_vip__nonce'], 'vip__ajax_form_nonce' ) ) {
		wp_send_json_error( '❌ invalid nonce' );
	}
	if ( ! current_user_can( 'publish_posts' ) ) {
		wp_send_json_error( '❌ invalid permissions' );
	}

	$data   = sanitize_text_field( $_POST['my_string'] );
	$return = '✅ Nonce is valid! Data is: ' . $data;

	wp_send_json_success( [ $return ] );
});
