<?php
/**
 * @file
 * westminster_schedule.features.menu_links.inc
 */

/**
 * Implements hook_menu_default_menu_links().
 */
function westminster_schedule_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: management_administration:admin
  $menu_links['management_administration:admin'] = array(
    'menu_name' => 'management',
    'link_path' => 'admin',
    'router_path' => 'admin',
    'link_title' => 'Administration',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'management_administration:admin',
      'alter' => TRUE,
    ),
    'module' => 'system',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 1,
    'expanded' => 0,
    'weight' => -46,
    'customized' => 1,
  );
  // Exported menu link: management_lobby-schedule:admin/schedule/1
  $menu_links['management_lobby-schedule:admin/schedule/1'] = array(
    'menu_name' => 'management',
    'link_path' => 'admin/schedule/1',
    'router_path' => 'admin/schedule/%',
    'link_title' => 'Lobby Schedule',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'management_lobby-schedule:admin/schedule/1',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => 0,
    'customized' => 1,
    'parent_identifier' => 'management_schedule:admin/schedule',
  );
  // Exported menu link: management_preview:admin/display
  $menu_links['management_preview:admin/display'] = array(
    'menu_name' => 'management',
    'link_path' => 'admin/display',
    'router_path' => 'admin',
    'link_title' => 'Preview',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'management_preview:admin/display',
      'alter' => TRUE,
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -48,
    'customized' => 1,
  );
  // Exported menu link: management_schedule:admin/schedule
  $menu_links['management_schedule:admin/schedule'] = array(
    'menu_name' => 'management',
    'link_path' => 'admin/schedule',
    'router_path' => 'admin',
    'link_title' => 'Schedule',
    'options' => array(
      'attributes' => array(
        'title' => 'Schedule',
      ),
      'identifier' => 'management_schedule:admin/schedule',
    ),
    'module' => 'system',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 1,
    'expanded' => 1,
    'weight' => -47,
    'customized' => 1,
  );
  // Exported menu link: management_tradeshow-schedule:admin/schedule/2
  $menu_links['management_tradeshow-schedule:admin/schedule/2'] = array(
    'menu_name' => 'management',
    'link_path' => 'admin/schedule/2',
    'router_path' => 'admin/schedule/%',
    'link_title' => 'Tradeshow Schedule',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'management_tradeshow-schedule:admin/schedule/2',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => 0,
    'customized' => 1,
    'parent_identifier' => 'management_schedule:admin/schedule',
  );
  // Translatables
  // Included for use with string extractors like potx.
  t('Administration');
  t('Lobby Schedule');
  t('Preview');
  t('Schedule');
  t('Tradeshow Schedule');

  return $menu_links;
}
