<?php
/**
 * @file
 * westminster_schedule.features.user_role.inc
 */

/**
 * Implements hook_user_default_roles().
 */
function westminster_schedule_user_default_roles() {
  $roles = array();

  // Exported role: content editor.
  $roles['content editor'] = array(
    'name' => 'content editor',
    'weight' => 2,
  );

  return $roles;
}
