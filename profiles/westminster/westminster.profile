<?php
/**
 * @file
 * Enables modules and site configuration for a westminster site installation.
 */

/**
 * Westminster install tasks.
 */
function westminster_install_tasks() {
  $tasks = array();
  $tasks['enable_themes'] = array(
    'display_name' => t('Enabling themes'),
    'display' => FALSE,
    'type' => 'normal',
    'run' => 'INSTALL_TASK_IF_REACHED',
    'function' => 'enable_bootstrap',
  );
  $tasks['enable_blocks'] = array(
    'display_name' => t('Enabling blocks'),
    'display' => FALSE,
    'type' => 'normal',
    'run' => 'INSTALL_TASK_IF_REACHED',
    'function' => 'enable_blocks',
  );
  $tasks['enable_terms'] = array(
    'display_name' => t('Enabling vocabulary terms'),
    'display' => FALSE,
    'type' => 'normal',
    'run' => 'INSTALL_TASK_IF_REACHED',
    'function' => 'enable_taxonomy_terms',
  );
  $tasks['add_sample_event'] = array(
    'display_name' => t('Adding sample event'),
    'display' => FALSE,
    'type' => 'normal',
    'run' => 'INSTALL_TASK_IF_REACHED',
    'function' => 'add_sample_event',
  );
  return $tasks;
}

/**
 * Function to enable bootstrap theme.
 */
function enable_bootstrap() {
  theme_enable(array('bootstrap', 'westminster_ui'));
  variable_set('theme_default', 'westminster_ui');
  variable_set('admin_theme', 'westminster_ui');
  variable_set('node_admin_theme', 'westminster_ui');
}

/**
 * Function to enable blocks.
 */
function enable_blocks() {
  $blocks = array(
    'management' => array(
      'module' => 'system',
      'delta' => 'management',
      'region' => 'navigation',
      'weight' => '-9',
      'theme' => 'westminster_ui',
      'css_class' => 'management-menu',
      'title' => '<none>',
    ),
    'user-menu' => array(
      'module' => 'system',
      'delta' => 'user-menu',
      'region' => 'navigation',
      'weight' => '0',
      'theme' => 'westminster_ui',
      'css_class' => 'user-menu',
      'title' => '<none>',
    ),
    'login' => array(
      'module' => 'user',
      'delta' => 'login',
      'region' => 'content',
      'weight' => '-6',
      'theme' => 'westminster_ui',
      'css_class' => 'user-menu',
      'title' => '<none>',
    ),
  );
  foreach ($blocks as $key => $block) {
    db_update('block')
      ->fields(array(
                 'status' => 1,
                 'weight' => $block['weight'],
                 'region' => $block['region'],
                 'css_class' => $block['css_class'],
                 'title' => $block['title'],
               ))
      ->condition('module', $block['module'])
      ->condition('delta', $block['delta'])
      ->condition('theme', $block['theme'])
      ->execute();
  }
}

/**
 * Implements hook_install().
 */
function enable_taxonomy_terms() {
  // Displays taxonomy terms.
  $displays = array(
    -32 => 'Lobby',
    -31 => 'Tradeshow',
  );
  _westminster_terms_load_terms($displays, 'displays');
  // Scenarios taxonomy terms.
  $scenarios = array(
    -32 => 'Interactive Content',
    -31 => 'Slideshow Scenario',
    -30 => 'Video Scenario',
  );
  _westminster_terms_load_terms($scenarios, 'scenario_type');

  // Category taxonomy terms.
  $categories = array(
    // 0.
    -32 => 'Eastern Province',
    -31 => 'Upstream',
    -30 => 'Support',
    -29 => 'Aramco History',
    -28 => 'Environment',
    -27 => 'Downstream',
    -26 => 'Joint Ventures',
    -25 => 'Lifestyle',
    -24 => 'Saudi Arabia',
    -23 => 'Recruiting',
    -22 => 'Operations Areas',
    -21 => 'Community Services',
  );
  _westminster_terms_load_terms($categories, 'categories');
  $upstream = array(
    // Upstream.
    -31 => 'Exploration',
    // Upstream.
    -30 => 'Drilling',
  );
  _westminster_terms_load_terms($upstream, 'categories', 'Upstream');
  $downstream = array(
    -31 => 'Refining',
    -30 => 'Distribution',
  );
  _westminster_terms_load_terms($downstream, 'categories', 'Downstream');
  $lifestyle = array(
    -31 => 'Education',
    -30 => 'Healthcare',
    -29 => 'Communities',
    -28 => 'Leisure',
    -27 => 'Travel',
    -26 => 'Shopping',
    -25 => 'Transportation',
  );
  $lifestyle_travel = array(
    -31 => 'Vacation/School Trips',
    -30 => 'Repat Trips',
  );
  _westminster_terms_load_terms($lifestyle, 'categories', 'Lifestyle');
  _westminster_terms_load_terms($lifestyle_travel, 'categories', 'Travel');

  $saudi_arabia = array(
    -31 => 'Regions',
    -30 => 'Saudi Arabian History',
    -29 => 'Geography',
    -28 => 'Biology',
    -27 => 'Climate',
    -26 => 'Culture',
  );
  $saudi_arabia_regions = array(
    -31 => 'Central Area',
  );
  _westminster_terms_load_terms($saudi_arabia, 'categories', 'Saudi Arabia');
  _westminster_terms_load_terms($saudi_arabia_regions, 'categories', 'Regions');
  $operations_areas = array(
    -31 => 'Maps',
    -30 => 'International Operations',
    -29 => 'Operations in Saudi Arabia',
  );
  $operations_areas_in_saudi_arabia = array(
    -31 => 'Udhaliyah',
    -30 => 'Abqaiq',
    -29 => 'Dhahran',
    -28 => 'Ras Tanura',
  );
  _westminster_terms_load_terms($operations_areas, 'categories', 'Operation Areas');
  _westminster_terms_load_terms($operations_areas_in_saudi_arabia, 'categories', 'Operations in Saudi Arabia');

  $community_services = array(
    -31 => 'ASC Community Services',
    -30 => 'SA Community Services',
  );
  _westminster_terms_load_terms($community_services, 'categories', 'Community Services');

}

/**
 * Function to add a sample event to the schedule.
 */
function add_sample_event() {
  $displays = array(
    'lobby' => 'Lobby',
    'tradeshow' => 'Tradeshow',
  );
  foreach ($displays as $machine_name => $title) {
    $display_term = @array_shift(taxonomy_get_term_by_name($machine_name, 'displays'));
    $node       = new stdClass();
    $node->uid  = 1;
    $node->name = 'admin';
    $node->type = 'scheduled_content';
    node_object_prepare($node);
    $node->uid  = 1;
    $node->name = 'admin';

    $node->title                                         = 'Sample Scheduled Event - ' . $title;
    $node->language                                      = LANGUAGE_NONE;
    $node->body[$node->language][0]['value']             = '';
    $node->body[$node->language][0]['summary']           = '';
    $node->body[$node->language][0]['format']            = 'filtered_html';
    $node->field_date[$node->language][0]['value']       = date('Y-m-d H:i:s', strtotime('today'));
    $node->field_date[$node->language][0]['value2']      = date('Y-m-d H:i:s', strtotime('tomorrow'));
    $node->field_display_term[$node->language][0]['tid'] = (isset($display_term) && is_object($display_term) && property_exists($display_term, 'tid')) ? $display_term->tid : 1;
    $node->status = 1;
    node_save($node);
  }
}

/**
 * Custom function to load an array of terms into a specified vocabulary.
 */
function _westminster_terms_load_terms($terms, $vocab_name, $parent = NULL) {
  $vocab = taxonomy_vocabulary_machine_name_load($vocab_name);
  $parent_tid = 0;
  if (!is_null($parent)) {
    $parent_term = @array_shift(taxonomy_get_term_by_name($parent, $vocab_name));
    $parent_tid  = (isset($parent_term) && is_object($parent_term) && property_exists($parent_term, 'tid')) ? $parent_term->tid : 0;
  }
  foreach ($terms as $weight => $term) {
    $data         = new stdClass();
    $data->name   = $term;
    $data->vid    = $vocab->vid;
    $data->weight = $weight;
    $data->parent = $parent_tid;
    taxonomy_term_save($data);
  }
}
