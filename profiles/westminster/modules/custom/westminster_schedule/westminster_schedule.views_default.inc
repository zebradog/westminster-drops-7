<?php
/**
 * @file
 * westminster_schedule.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function westminster_schedule_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'events';
  $view->description = 'Provider of data for Schedule page in top menu';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Events';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Events';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'views_json';
  $handler->display->display_options['style_options']['root_object'] = 'events';
  $handler->display->display_options['style_options']['top_child_object'] = 'event';
  $handler->display->display_options['style_options']['plaintext_output'] = 1;
  $handler->display->display_options['style_options']['remove_newlines'] = 0;
  $handler->display->display_options['style_options']['jsonp_prefix'] = '';
  $handler->display->display_options['style_options']['using_views_api_mode'] = 0;
  $handler->display->display_options['style_options']['object_arrays'] = 0;
  $handler->display->display_options['style_options']['numeric_strings'] = 0;
  $handler->display->display_options['style_options']['bigint_string'] = 0;
  $handler->display->display_options['style_options']['pretty_print'] = 0;
  $handler->display->display_options['style_options']['unescaped_slashes'] = 0;
  $handler->display->display_options['style_options']['unescaped_unicode'] = 0;
  $handler->display->display_options['style_options']['char_encoding'] = array();
  /* Field: Content: Date */
  $handler->display->display_options['fields']['field_date']['id'] = 'field_date';
  $handler->display->display_options['fields']['field_date']['table'] = 'field_data_field_date';
  $handler->display->display_options['fields']['field_date']['field'] = 'field_date';
  $handler->display->display_options['fields']['field_date']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_date']['type'] = 'date_plain';
  $handler->display->display_options['fields']['field_date']['settings'] = array(
    'format_type' => 'short',
    'fromto' => 'both',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  $handler->display->display_options['fields']['field_date']['group_rows'] = FALSE;
  $handler->display->display_options['fields']['field_date']['delta_offset'] = '0';
  /* Field: Content: Date */
  $handler->display->display_options['fields']['field_date_1']['id'] = 'field_date_1';
  $handler->display->display_options['fields']['field_date_1']['table'] = 'field_data_field_date';
  $handler->display->display_options['fields']['field_date_1']['field'] = 'field_date';
  $handler->display->display_options['fields']['field_date_1']['label'] = 'Repeat';
  $handler->display->display_options['fields']['field_date_1']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_date_1']['alter']['text'] = '[field_date_1-rrule]';
  $handler->display->display_options['fields']['field_date_1']['type'] = 'date_plain';
  $handler->display->display_options['fields']['field_date_1']['settings'] = array(
    'format_type' => 'long',
    'fromto' => 'both',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  $handler->display->display_options['fields']['field_date_1']['group_rows'] = FALSE;
  $handler->display->display_options['fields']['field_date_1']['delta_offset'] = '0';
  /* Field: Field: Default Scenario */
  $handler->display->display_options['fields']['field_default_scenario']['id'] = 'field_default_scenario';
  $handler->display->display_options['fields']['field_default_scenario']['table'] = 'field_data_field_default_scenario';
  $handler->display->display_options['fields']['field_default_scenario']['field'] = 'field_default_scenario';
  $handler->display->display_options['fields']['field_default_scenario']['relationship'] = 'field_scenario_value';
  $handler->display->display_options['fields']['field_default_scenario']['label'] = 'Type';
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  /* Field: Field: Default Scenario */
  $handler->display->display_options['fields']['field_default_scenario_1']['id'] = 'field_default_scenario_1';
  $handler->display->display_options['fields']['field_default_scenario_1']['table'] = 'field_data_field_default_scenario';
  $handler->display->display_options['fields']['field_default_scenario_1']['field'] = 'field_default_scenario';
  $handler->display->display_options['fields']['field_default_scenario_1']['relationship'] = 'field_scenario_value';
  $handler->display->display_options['fields']['field_default_scenario_1']['label'] = 'Tid';
  $handler->display->display_options['fields']['field_default_scenario_1']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_default_scenario_1']['alter']['text'] = '[field_default_scenario_1-tid]';
  /* Field: Field: Slideshow */
  $handler->display->display_options['fields']['field_slideshow']['id'] = 'field_slideshow';
  $handler->display->display_options['fields']['field_slideshow']['table'] = 'field_data_field_slideshow';
  $handler->display->display_options['fields']['field_slideshow']['field'] = 'field_slideshow';
  $handler->display->display_options['fields']['field_slideshow']['relationship'] = 'field_scenario_value';
  $handler->display->display_options['fields']['field_slideshow']['settings'] = array(
    'link' => 0,
  );
  /* Field: Content: Display */
  $handler->display->display_options['fields']['field_display_term']['id'] = 'field_display_term';
  $handler->display->display_options['fields']['field_display_term']['table'] = 'field_data_field_display_term';
  $handler->display->display_options['fields']['field_display_term']['field'] = 'field_display_term';
  $handler->display->display_options['fields']['field_display_term']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_display_term']['alter']['text'] = '[field_display_term-tid]';
  $handler->display->display_options['fields']['field_display_term']['delta_offset'] = '0';
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Contextual filter: Date: Date (node) */
  $handler->display->display_options['arguments']['date_argument']['id'] = 'date_argument';
  $handler->display->display_options['arguments']['date_argument']['table'] = 'node';
  $handler->display->display_options['arguments']['date_argument']['field'] = 'date_argument';
  $handler->display->display_options['arguments']['date_argument']['default_argument_type'] = 'date';
  $handler->display->display_options['arguments']['date_argument']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['date_argument']['granularity'] = 'day';
  $handler->display->display_options['arguments']['date_argument']['date_fields'] = array(
    'field_data_field_date.field_date_value' => 'field_data_field_date.field_date_value',
    'field_data_field_date.field_date_value2' => 'field_data_field_date.field_date_value2',
  );
  $handler->display->display_options['arguments']['date_argument']['date_method'] = 'AND';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'scheduled_content' => 'scheduled_content',
  );

  /* Display: Events */
  $handler = $view->new_display('page', 'Events', 'page');
  $handler->display->display_options['display_description'] = 'Data-supplier for FullCalendar';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'views_json';
  $handler->display->display_options['style_options']['root_object'] = 'events';
  $handler->display->display_options['style_options']['top_child_object'] = 'event';
  $handler->display->display_options['style_options']['plaintext_output'] = 1;
  $handler->display->display_options['style_options']['remove_newlines'] = 0;
  $handler->display->display_options['style_options']['jsonp_prefix'] = 'callback';
  $handler->display->display_options['style_options']['using_views_api_mode'] = 0;
  $handler->display->display_options['style_options']['object_arrays'] = 0;
  $handler->display->display_options['style_options']['numeric_strings'] = 0;
  $handler->display->display_options['style_options']['bigint_string'] = 0;
  $handler->display->display_options['style_options']['pretty_print'] = 0;
  $handler->display->display_options['style_options']['unescaped_slashes'] = 0;
  $handler->display->display_options['style_options']['unescaped_unicode'] = 0;
  $handler->display->display_options['style_options']['char_encoding'] = array();
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Date */
  $handler->display->display_options['fields']['field_date']['id'] = 'field_date';
  $handler->display->display_options['fields']['field_date']['table'] = 'field_data_field_date';
  $handler->display->display_options['fields']['field_date']['field'] = 'field_date';
  $handler->display->display_options['fields']['field_date']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_date']['type'] = 'date_plain';
  $handler->display->display_options['fields']['field_date']['settings'] = array(
    'format_type' => 'short',
    'fromto' => 'both',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  $handler->display->display_options['fields']['field_date']['group_rows'] = FALSE;
  $handler->display->display_options['fields']['field_date']['delta_offset'] = '0';
  /* Field: Content: Date */
  $handler->display->display_options['fields']['field_date_1']['id'] = 'field_date_1';
  $handler->display->display_options['fields']['field_date_1']['table'] = 'field_data_field_date';
  $handler->display->display_options['fields']['field_date_1']['field'] = 'field_date';
  $handler->display->display_options['fields']['field_date_1']['label'] = 'Repeat';
  $handler->display->display_options['fields']['field_date_1']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_date_1']['alter']['text'] = '[field_date_1-rrule]';
  $handler->display->display_options['fields']['field_date_1']['type'] = 'date_plain';
  $handler->display->display_options['fields']['field_date_1']['settings'] = array(
    'format_type' => 'long',
    'fromto' => 'both',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  $handler->display->display_options['fields']['field_date_1']['group_rows'] = FALSE;
  $handler->display->display_options['fields']['field_date_1']['delta_offset'] = '0';
  /* Field: Field: Default Scenario */
  $handler->display->display_options['fields']['field_default_scenario']['id'] = 'field_default_scenario';
  $handler->display->display_options['fields']['field_default_scenario']['table'] = 'field_data_field_default_scenario';
  $handler->display->display_options['fields']['field_default_scenario']['field'] = 'field_default_scenario';
  $handler->display->display_options['fields']['field_default_scenario']['relationship'] = 'field_scenario_value';
  $handler->display->display_options['fields']['field_default_scenario']['label'] = 'Type';
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  /* Field: Field: Default Scenario */
  $handler->display->display_options['fields']['field_default_scenario_1']['id'] = 'field_default_scenario_1';
  $handler->display->display_options['fields']['field_default_scenario_1']['table'] = 'field_data_field_default_scenario';
  $handler->display->display_options['fields']['field_default_scenario_1']['field'] = 'field_default_scenario';
  $handler->display->display_options['fields']['field_default_scenario_1']['relationship'] = 'field_scenario_value';
  $handler->display->display_options['fields']['field_default_scenario_1']['label'] = 'Tid';
  $handler->display->display_options['fields']['field_default_scenario_1']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_default_scenario_1']['alter']['text'] = '[field_default_scenario_1-tid]';
  /* Field: Field: Slideshow */
  $handler->display->display_options['fields']['field_slideshow']['id'] = 'field_slideshow';
  $handler->display->display_options['fields']['field_slideshow']['table'] = 'field_data_field_slideshow';
  $handler->display->display_options['fields']['field_slideshow']['field'] = 'field_slideshow';
  $handler->display->display_options['fields']['field_slideshow']['relationship'] = 'field_scenario_value';
  $handler->display->display_options['fields']['field_slideshow']['settings'] = array(
    'link' => 0,
  );
  /* Field: Content: Display */
  $handler->display->display_options['fields']['field_display_term']['id'] = 'field_display_term';
  $handler->display->display_options['fields']['field_display_term']['table'] = 'field_data_field_display_term';
  $handler->display->display_options['fields']['field_display_term']['field'] = 'field_display_term';
  $handler->display->display_options['fields']['field_display_term']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_display_term']['alter']['text'] = '[field_display_term-tid]';
  $handler->display->display_options['fields']['field_display_term']['delta_offset'] = '0';
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  /* Contextual filter: Content: Display (field_display_term) */
  $handler->display->display_options['arguments']['field_display_term_tid']['id'] = 'field_display_term_tid';
  $handler->display->display_options['arguments']['field_display_term_tid']['table'] = 'field_data_field_display_term';
  $handler->display->display_options['arguments']['field_display_term_tid']['field'] = 'field_display_term_tid';
  $handler->display->display_options['arguments']['field_display_term_tid']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['field_display_term_tid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['field_display_term_tid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['field_display_term_tid']['summary_options']['items_per_page'] = '25';
  /* Contextual filter: Date: Date (node) */
  $handler->display->display_options['arguments']['date_argument']['id'] = 'date_argument';
  $handler->display->display_options['arguments']['date_argument']['table'] = 'node';
  $handler->display->display_options['arguments']['date_argument']['field'] = 'date_argument';
  $handler->display->display_options['arguments']['date_argument']['default_argument_type'] = 'date';
  $handler->display->display_options['arguments']['date_argument']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['date_argument']['granularity'] = 'day';
  $handler->display->display_options['arguments']['date_argument']['date_fields'] = array(
    'field_data_field_date.field_date_value' => 'field_data_field_date.field_date_value',
    'field_data_field_date.field_date_value2' => 'field_data_field_date.field_date_value2',
  );
  $handler->display->display_options['arguments']['date_argument']['date_method'] = 'AND';
  $handler->display->display_options['path'] = 'events';
  $export['events'] = $view;

  return $export;
}
