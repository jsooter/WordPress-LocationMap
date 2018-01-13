<?php
/**
 * Template Name: recycleLocations
 * Recycle Locations Map Template
 *
 * This is the template that displays recycler locations on a map.
 * Please note that this is the WordPress construct of pages and that
 * other "pages" on your WordPress site will use a different template.
 */
?>
<?php get_header(); ?>
<link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/third-party/recycleMap/ol.css">

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
<?php include('third-party/recycleMap/_templates/_map.php'); ?>
<script src="<?php echo get_template_directory_uri(); ?>/third-party/recycleMap/underscore-min.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/third-party/recycleMap/backbone-min.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/third-party/recycleMap/ol.js"></script>

<script src="<?php echo get_template_directory_uri(); ?>/third-party/recycleMap/js/routers.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/third-party/recycleMap/js/models.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/third-party/recycleMap/js/collections.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/third-party/recycleMap/js/views/map.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/third-party/recycleMap/js/views/county.js"></script>

<script type="text/javascript">
	jQuery(function($) {
	var locationRouter = new RecycleMap.Routers.Location();
	Backbone.history.start();
	});
</script>

