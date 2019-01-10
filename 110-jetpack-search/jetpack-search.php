/**
1726	    * Enable Elastic search for category, tag and author pages.
1727	    *
1728	    * @param $query
1729	    */
1730	    public function maybe_enable_es_wp_query( $query ) {
1731	
1732	        if ( is_admin() || ! $query->is_main_query() ) {
1733	            return;
1734	        }
1735	
1736	        if ( $query->is_category() || $query->is_tag() || $query->is_author() ) {
1737	            $query->set( 'es', 'true' );
1738	        }
1739	    }

add_action( 'pre_get_posts', [ $this, 'maybe_enable_es_wp_query' ] );