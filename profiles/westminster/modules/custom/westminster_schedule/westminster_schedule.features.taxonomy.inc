<?php
/**
 * @file
 * westminster_schedule.features.taxonomy.inc
 */

/**
 * Implements hook_taxonomy_default_vocabularies().
 */
function westminster_schedule_taxonomy_default_vocabularies() {
  return array(
    'categories' => array(
      'name' => 'Categories',
      'machine_name' => 'categories',
      'description' => '',
      'hierarchy' => 1,
      'module' => 'taxonomy',
      'weight' => 0,
    ),
    'displays' => array(
      'name' => 'Displays',
      'machine_name' => 'displays',
      'description' => 'Displays',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => 0,
    ),
    'scenario_type' => array(
      'name' => 'Scenario Types',
      'machine_name' => 'scenario_type',
      'description' => '',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => 0,
    ),
  );
}
