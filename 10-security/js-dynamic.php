<?php
// Add our script to the footer of the site.
add_action( 'wp_footer', function() {
	$name  = $title = $url = 'some value';
	$array = [
		'name'  => $name,
		'title' => $title
	];
	?>

	<script type="text/javascript">
		var name  = decodeURIComponent( '<?php echo rawurlencode( (string) $name ); ?>' );
		var title = decodeURIComponent( '<?php echo rawurlencode( (string) $title ); ?>' );
		var url   = <?php echo wp_json_encode( esc_url( $url ) ) ?>;
		var html  = document.createElement('h1');
		html.innerText = title;
		var obj   = JSON.parse( decodeURIComponent( '<?php
			echo rawurlencode( wp_json_encode( $array ) );
		?>' ) );
	</script>

<?php } );