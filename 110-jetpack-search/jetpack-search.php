/**
* Enable Elastic search for category, tag and author pages.
*
* @param $query
*/
public function my_maybe_enable_es_wp_query( $query ) {

        if ( is_admin() || ! $query->is_main_query() ) {
                return;
        }

        if ( $query->is_category() || $query->is_tag() || $query->is_author() ) {
                $query->set( 'es', 'true' );
        }
}

add_action( 'pre_get_posts', 'my_maybe_enable_es_wp_query' );