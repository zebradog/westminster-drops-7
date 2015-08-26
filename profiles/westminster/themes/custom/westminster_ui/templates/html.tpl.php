<!DOCTYPE html>
<html lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>"<?php print $rdf_namespaces;?>>
<head profile="<?php print $grddl_profile; ?>">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php print $head; ?>
  <link href="<?php echo base_path(); echo path_to_theme(); ?>/css/layout.css" rel="stylesheet" type="text/css">
  <link href="<?php echo base_path(); echo path_to_theme(); ?>/css/lib/clockpicker.css" rel="stylesheet" type="text/css">
  <link href="<?php echo base_path(); echo path_to_theme(); ?>/css/lib/jquery-ui.min.css" rel="stylesheet" type="text/css">
  <link href="<?php echo base_path(); echo path_to_theme(); ?>/css/lib/jquery-ui.structure.min.css" rel="stylesheet" type="text/css">
  <link href="<?php echo base_path(); echo path_to_theme(); ?>/css/lib/jquery-ui.theme.min.css" rel="stylesheet" type="text/css">
  <link href="<?php echo base_path(); echo path_to_theme(); ?>/css/lib/ladda-themeless.min.css" rel="stylesheet" type="text/css">
  <title><?php print $head_title; ?></title>
  <?php print $styles; ?>
  <!-- HTML5 element support for IE6-8 -->
  <!--[if lt IE 9]>
    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
  <?php print $scripts; ?>
  <script src="<?php echo base_path(); echo path_to_theme(); ?>/js/lib/clockpicker.js"></script>
  <script src="<?php echo base_path(); echo path_to_theme(); ?>/js/lib/jquery-ui.min.js"></script>
  <script src="<?php echo base_path(); echo path_to_theme(); ?>/js/lib/spin.min.js"></script>
  <script src="<?php echo base_path(); echo path_to_theme(); ?>/js/lib/ladda.min.js"></script>
  <script src="<?php echo base_path(); echo path_to_theme(); ?>/js/lib/rrule.js"></script>
  <script src="<?php echo base_path(); echo path_to_theme(); ?>/js/lib/nlp.js"></script>
</head>
<body class="<?php print $classes; ?>" <?php print $attributes;?>>
  <div id="skip-link">
    <a href="#main-content" class="element-invisible element-focusable"><?php print t('Skip to main content'); ?></a>
  </div>
  <?php print $page_top; ?>
  <?php print $page; ?>
  <?php print $page_bottom; ?>
</body>
</html>
