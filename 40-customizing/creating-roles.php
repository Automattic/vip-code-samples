<?php

function vip_sc__add_custom_roles() {
	$version = 42; // bump this up when this function is changed
        $version_option = 'vip_sc__custom_roles';

	// FIRST - check whether roles need to change
	$db_version = get_option( $version_option );
	if ( $db_version && $db_version >= $version ) {
                // roles are up to date
		return;
        }
        
        // actually add/update the roles
        // this can be re-run without issues, provided it's not run frequently

        wpcom_vip_add_role( 'reviewer', 'Reviewer', array(
                'read' => true,
                'edit_posts' => true,
                'edit_others_posts' => true,
                'edit_private_posts' => true,
                'edit_published_posts' => true,
                'read_private_posts' => true,
                'edit_pages' => true,
                'edit_others_pages' => true,
                'edit_private_pages' => true,
                'edit_published_pages' => true,
                'read_private_pages' => true,
            ) );

        // Add new role
        wpcom_vip_add_role( 'super-editor', 'Super Editor',
                array( 'level_0' => true ) );

        // Remove publish_posts cap from authors
        wpcom_vip_merge_role_caps( 'author',
                array( 'publish_posts' => false ) );
 
        // Remove all caps from contributors
        wpcom_vip_override_role_caps( 'contributor',
                array( 'level_0' => false ) );

        // Duplicate an existing role and modify some caps
        wpcom_vip_duplicate_role( 'administrator', 'station-administrator', 'Station Administrator',
                array( 'manage_categories' => false ) );

        // Add custom cap to a role
        wpcom_vip_add_role_caps( 'administrator', array( 'my-custom-cap' ) );

        // Remove cap from a role
        wpcom_vip_remove_role_caps( 'author', array( 'publish_posts' ) );

	// FINALLY - update the DB version so this doesn't run again
	update_option( $version_option, $version );
}
add_action( 'init', 'vip_sc__add_custom_roles' );
