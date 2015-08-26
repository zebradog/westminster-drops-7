<?php
/**
 * @file
 * westminster_schedule.rules_defaults.inc
 */

/**
 * Implements hook_default_rules_configuration().
 */
function westminster_schedule_default_rules_configuration() {
  $items = array();
  $items['rules_content_created_redirect'] = entity_import('rules_config', '{ "rules_content_created_redirect" : {
      "LABEL" : "Content Created Redirect",
      "PLUGIN" : "reaction rule",
      "OWNER" : "rules",
      "REQUIRES" : [ "rules" ],
      "ON" : { "node_insert" : [] },
      "IF" : [
        { "node_is_of_type" : {
            "node" : [ "node" ],
            "type" : { "value" : { "scheduled_content" : "scheduled_content" } }
          }
        }
      ],
      "DO" : [
        { "redirect" : { "url" : "admin\\/schedule\\/[node:field-display-term:0:tid]" } }
      ]
    }
  }');
  return $items;
}
