<?php
/**
 * @file
 * westminster_schedule.default_field_validation_rules.inc
 */

/**
 * Implements hook_default_field_validation_rule().
 */
function westminster_schedule_default_field_validation_rule() {
  $export = array();

  $rule = new stdClass();
  $rule->disabled = FALSE; /* Edit this to true to make a default rule disabled initially */
  $rule->api_version = 2;
  $rule->rulename = 'Unique Timeline Year';
  $rule->name = 'unique_timeline_year';
  $rule->field_name = 'field_timeline_year';
  $rule->col = 'value';
  $rule->entity_type = 'node';
  $rule->bundle = 'photo_text';
  $rule->validator = 'field_validation_unique_validator';
  $rule->settings = array(
    'data' => 'global',
    'bypass' => 0,
    'roles' => array(
      2 => 0,
      3 => 0,
    ),
    'errors' => 0,
  );
  $rule->error_message = 'Timeline year already in use. ';
  $export['unique_timeline_year'] = $rule;

  $rule = new stdClass();
  $rule->disabled = FALSE; /* Edit this to true to make a default rule disabled initially */
  $rule->api_version = 2;
  $rule->rulename = 'Unique Year';
  $rule->name = 'unique_year';
  $rule->field_name = 'field_year';
  $rule->col = 'value';
  $rule->entity_type = 'field_collection_item';
  $rule->bundle = 'field_years';
  $rule->validator = 'field_validation_unique_validator';
  $rule->settings = array(
    'data' => 'global',
    'bypass' => 0,
    'roles' => array(
      2 => 0,
      3 => 0,
    ),
    'errors' => 0,
  );
  $rule->error_message = 'Content for the year already selected. ';
  $export['unique_year'] = $rule;

  $rule = new stdClass();
  $rule->disabled = FALSE; /* Edit this to true to make a default rule disabled initially */
  $rule->api_version = 2;
  $rule->rulename = 'Year';
  $rule->name = 'year';
  $rule->field_name = 'field_year';
  $rule->col = 'value';
  $rule->entity_type = 'node';
  $rule->bundle = 'year';
  $rule->validator = 'field_validation_unique_validator';
  $rule->settings = array(
    'data' => 'global',
    'bypass' => 0,
    'roles' => array(
      2 => 0,
      3 => 0,
    ),
    'errors' => 0,
  );
  $rule->error_message = 'Year has already been created. ';
  $export['year'] = $rule;

  $rule = new stdClass();
  $rule->disabled = FALSE; /* Edit this to true to make a default rule disabled initially */
  $rule->api_version = 2;
  $rule->rulename = 'Year Unique';
  $rule->name = 'year_unique';
  $rule->field_name = 'field_year';
  $rule->col = 'value';
  $rule->entity_type = 'node';
  $rule->bundle = 'timeline_year';
  $rule->validator = 'field_validation_unique_validator';
  $rule->settings = array(
    'data' => 'global',
    'bypass' => 0,
    'roles' => array(
      2 => 0,
      3 => 0,
    ),
    'errors' => 0,
  );
  $rule->error_message = 'Year currently in use by another content item. ';
  $export['year_unique'] = $rule;

  return $export;
}
