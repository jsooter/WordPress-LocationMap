<?php
/**
 * Template Name: locationLocations
 * Location Locations Map Template
 *
 * This is the template that displays locationr locations on a map.
 * Please note that this is the WordPress construct of pages and that
 * other "pages" on your WordPress site will use a different template.
 */
?>
<?php get_header(); ?>
<link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/third-party/WordPress-LocationMap/ol.css">

<div id="primary" class="content-area">
	<main id="main" class="site-main" role="main">
		<?php
		// Start the loop.
		//while ( have_posts() ) : the_post();
		//
		//	// Include the page content template.
		//	get_template_part( 'template-parts/content', 'page' );
		//
		//	// If comments are open or we have at least one comment, load up the comment template.
		//	if ( comments_open() || get_comments_number() ) {
		//		comments_template();
		//	}
		//
		//	// End of the loop.
		//endwhile;
		?>
		
	</main><!-- .site-main -->
	
	<?php //get_sidebar( 'content-bottom' ); ?>

</div><!-- .content-area -->

<?php get_sidebar(); ?>
<?php get_footer(); ?>
<?php include('third-party/WordPress-LocationMap/_templates/_map.php'); ?>
<script src="<?php echo get_template_directory_uri(); ?>/third-party/WordPress-LocationMap/underscore-min.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/third-party/WordPress-LocationMap/backbone-min.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/third-party/WordPress-LocationMap/ol.js"></script>

<script src="<?php echo get_template_directory_uri(); ?>/third-party/WordPress-LocationMap/js/routers.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/third-party/WordPress-LocationMap/js/models.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/third-party/WordPress-LocationMap/js/collections.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/third-party/WordPress-LocationMap/js/views/map.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/third-party/WordPress-LocationMap/js/views/county.js"></script>

<script type="text/javascript">
	jQuery(function($) {
	var locationRouter = new LocationMap.Routers.Location();
	Backbone.history.start();
	});
</script>

