<div class="wrap">
<h1>Tckan Plugin Settings</h1>
<hr>
<?php settings_errors(); ?>

<form method="post" action="options.php">
    <?php 
        settings_fields( 'tckan_options_group' );
        do_settings_sections( 'tckan_plugin' );
        submit_button();
    ?>
</form>
</div>
