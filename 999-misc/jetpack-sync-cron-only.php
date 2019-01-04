<?php

/*
Plugin Name: VIP Jetpack Sync Cron
Description: This drop-in plugin ensures that Jetpack only syncs on a dedicated cron task and schedules a single cron event upon a whitelist execution with a delay of 30s.
Version: 1.0
Author: Rebecca Hum, Automattic 
*/

class VIP_Jetpack_Cron_Sync {

	/**
	 * __construct()
	 */
	function __construct() {
		if ( class_exists( 'Jetpack' ) ) {
			add_filter( 'jetpack_sync_sender_should_load', array( $this, 'vip_jp_sync_cron_only' ), 99 );
			add_action( 'jetpack_sync_action_before_enqueue', array( $this, 'vip_jp_schedule_sync_cron' ) );

			register_deactivation_hook( __FILE__, array( $this, 'vip_jp_cron_sync_deactivate' ) );
		}
	}

	/**
	 * Filter for JP to short circuit loading of sender unless on a cron job.
	 */
	function vip_jp_sync_cron_only( $bool ) {
		return $bool = defined( 'DOING_CRON' ) && DOING_CRON ? true : false;
	}

	/**
	 * Schedule a single event for JP sync on cron job.
	 */
	function vip_jp_schedule_sync_cron() {
		   wp_schedule_single_event( time() + 30, 'vip_jp_sync_event' );
	}

	/**
	 * Do the actual JP syncing.
	 */
	function vip_jp_sync_event() {
		global $jetpack_sync_sender;

		$jetpack_sync_sender->do_sync();
	}

	/**
	 * Register de-activation hook to remove filters.
	 */
	function vip_jp_cron_sync_deactivate() {
	    remove_filter( 'jetpack_sync_sender_should_load', array( $this, 'vip_jp_sync_cron_only' ) );
	}

}	

$vip_jetpack_cron_sync = new VIP_Jetpack_Cron_Sync();