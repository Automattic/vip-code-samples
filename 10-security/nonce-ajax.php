<?php
/**
 * Create a menu page for our AJAX script.
 *
 * @see https://developer.wordpress.org/reference/functions/add_menu_page/
 */
add_action( 'admin_menu', function() {
	$page_hook_suffix = add_menu_page(
		'Ajax Form',
		'Ajax Form',
		'publish_posts',
		'_my_ajax_form',
		'_my_ajax_form_callback'
	);
} );

/**
 * Contents for the Ajax Form menu page.
 */
function _my_ajax_form_callback() {
	/**
	 * Create the nonce.
	 *
	 * @see https://codex.wordpress.org/Function_Reference/wp_create_nonce
	 */
	$ajax_nonce = wp_create_nonce( "_my_ajax_form_nonce" );
	?>
	<h1>AJAX Nonce</h1>
	<input type='submit' class='button button-primary' id='click_me' value='Send AJAX Post Request »'>
	<pre id='_my_ajax_form_output'></pre>

	<script type="text/javascript">
	jQuery(document).ready( function($) {
		var data = {
			action: '_my_ajax_form_action',
			security: <?php echo wp_json_encode( $ajax_nonce ); ?>,
			my_string: 'Freedom to Publish!'
		};
		$('#click_me').click(function() {
			/**
			 * Post our request to WordPress' AJAX URL
			 *
			 * @see https://codex.wordpress.org/AJAX_in_Plugins
			 * @see https://api.jquery.com/jquery.post/
			 */
			$.post( ajaxurl, data, function( response ) {
				$('#_my_ajax_form_output').text("Response: " + response.data);
			});
		});
	});
	</script>
	<?php
}

/**
 * Our AJAX hook for the POST request.
 *
 * @see https://codex.wordpress.org/Plugin_API/Action_Reference/wp_ajax_(action)
 */
add_action( 'wp_ajax__my_ajax_form_action', function() {
	/**
	 * Verify the nonce exists & verify it's correct.
	 *
	 * @see https://codex.wordpress.org/Function_Reference/wp_verify_nonce
	 */
	if ( ! isset( $_POST['security'] ) || ! wp_verify_nonce( $_POST['security'], '_my_ajax_form_nonce' ) ) {
		wp_send_json_error( '❌ invalid nonce' );
	}
	if ( ! current_user_can( 'publish_posts' ) ) {
		wp_send_json_error( '❌ invalid permissions' );
	}

	$data   = sanitize_text_field( $_POST['my_string'] );
	$return = '✅ Nonce is valid! Data is: ' . $data;

	wp_send_json_success( [ $return ] );
});
