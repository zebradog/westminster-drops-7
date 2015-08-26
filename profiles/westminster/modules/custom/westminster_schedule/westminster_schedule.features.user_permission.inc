<?php
/**
 * @file
 * westminster_schedule.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function westminster_schedule_user_default_permissions() {
  $permissions = array();

  // Exported permission: 'administer own schedule'.
  $permissions['administer own schedule'] = array(
    'name' => 'administer own schedule',
    'roles' => array(
      'authenticated user' => 'authenticated user',
      'content editor' => 'content editor',
    ),
    'module' => 'westminster_schedule',
  );

  // Exported permission: 'see schedule'.
  $permissions['see schedule'] = array(
    'name' => 'see schedule',
    'roles' => array(
      'content editor' => 'content editor',
    ),
    'module' => 'westminster_schedule',
  );

  return $permissions;
}
