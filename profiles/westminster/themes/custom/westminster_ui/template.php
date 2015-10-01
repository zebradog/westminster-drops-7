<?php

/**
 * @file
 * template.php
 */

// Auto-rebuild the theme registry during theme development.
if (theme_get_setting('bootstrap_rebuild_registry') && !defined('MAINTENANCE_MODE')) {
  // Rebuild .info data.
  system_rebuild_theme_data();
  // Rebuild theme registry.
  drupal_theme_rebuild();
}

/**
 * Hide the display.
 */
function westminster_ui_form_scheduled_content_node_form_alter(&$form, &$form_state, $form_id) {
  // $form['field_display']['#access'] = FALSE;
  // drupal_get_messages('status',true);
  // Remove status messages that should not to appear on the form.
}

/**
 * Confirm intended deletion of scheduled content.
 */
function westminster_ui_form_node_delete_confirm_alter(&$form, &$form_state, $form_id) {
  if ($form['#node']->type == "scheduled_content") {
    $form['description']['#markup'] = 'Are you sure want to delete this Scheduled Event? ' . $form['description']['#markup'];
  }
}

/**
 * Redirect after login.
 */
function westminster_ui_user_login(&$edit, $account) {
  if (!isset($_POST['form_id']) || $_POST['form_id'] != 'user_pass_reset') {
    if (in_array('content editor', $account->roles)) {
      $_GET['destination'] = 'admin/manage-content';
    }
  }
}

/**
 * Prepare UI vars.
 */
function westminster_ui_preprocess_html(&$vars) {
  $params = drupal_get_query_parameters();
  // Add 'embed' body class when appropriate.
  if (array_key_exists('embed', $params)) {
    $vars['classes_array'][] = 'embed';
  }
}
