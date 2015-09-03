<?php
/**
 * @file
 * westminster_schedule.features.menu_custom.inc
 */

/**
 * Implements hook_menu_default_menu_custom().
 */
function westminster_schedule_menu_default_menu_custom() {
  $menus = array();

  // Exported menu: management.
  $menus['management'] = array(
    'menu_name' => 'management',
    'title' => 'Management',
    'description' => 'The <em>Management</em> menu contains links used by Content Editors.',
  );
  // Translatables
  // Included for use with string extractors like potx.
  t('Management');
  t('The <em>Management</em> menu contains links used by Content Editors.');

  return $menus;
}
