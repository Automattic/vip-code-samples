<?php
// add custom mediabox to Posts.
add_action( 'add_meta_boxes', function () {
	add_meta_box(
		'vip__metabox_nonce_example',
		'Example Field',
		'vip__custom_post_metabox',
		'post'
	);
} );

function vip__custom_post_metabox( $post ) {
	/**
	 * Create a hidden nonce field, along side a custom form field.
	 *
	 * @see https://codex.wordpress.org/Function_Reference/wp_nonce_field
	 */
	wp_nonce_field( 'vip__metabox_checkbox', '_vip__nonce' );
	?>
	<label>
		<input type='checkbox' name='vip__checkbox' />
	</label>
	<?php
}

add_action( 'save_post', function ( $post_id, $post ) {

	if ( 'post' !== $post->post_type ) {
		return;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}
	/**
	 * Verify the nonce exists & verify it's correct.
	 *
	 * @see https://codex.wordpress.org/Function_Reference/wp_verify_nonce
	 */
	if ( ! isset( $_POST['_vip__nonce'] ) || ! wp_verify_nonce( $_POST['_vip__nonce'], 'vip__metabox_checkbox' ) ) {
		wp_die( 'Invalid nonce. Page may have expired, please try again.' );
	}

	// valid request, do somthing with `$_POST['vip__checkbox']`.

} );
