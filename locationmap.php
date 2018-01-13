<?php
/**
 * Template Name: locationMap
 * Location Locations Map Template
 *
 * This is the template that displays locationr locations on a map.
 * Please note that this is the WordPress construct of pages and that
 * other "pages" on your WordPress site will use a different template.
 */
?>
<?php get_header(); ?>
<link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/third-party/WordPress-LocationMap/DataTables-1.10.13/media/css/jquery.dataTables.min.css">
<link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/third-party/WordPress-LocationMap/Semantic-UI-CSS/semantic.min.css">
<link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/third-party/WordPress-LocationMap/ol.css">

<style>
	#primary {
		width: 100%;
		padding-left: 0;
		padding-right: 0;
		float: none;
	}
	.small.text {
		font-size: .75rem;
	}
	table.dataTable.table.nowrap th.wrap-cell,
	table.dataTable.table.nowrap td.wrap-cell {
		white-space: normal;
		min-width: 12rem;
	}
	#map {
		/*height: auto;*/
		/*width: 80%;
		margin-left: auto;
		margin-right: auto;*/
	}
	#toggles {
		left: 25%;
	}
	.map:-moz-full-screen {
		height: 100%;
        width: 100%;
    }
    .map:-webkit-full-screen {
        height: 100%;
		width: 100%;
    }
    .map:-ms-fullscreen {
        height: 100%;
		width: 100%;
    }
    .map:fullscreen {
        height: 100%;
		width: 100%;
    }
    .ol-rotate {
        top: 3em;
    }
	.ol-popup {
            position: absolute;
            background-color: white;
            color: white;
            font-size: 10px;
            -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
            filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
            padding: 5px;
            border: 1px solid #000;
            bottom: 12px;
            left: -50px;
            min-width: 300px;
    }
    .ol-popup:after, .ol-popup:before {
            top: 100%;
            border: solid transparent;
            content: " ";
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
    }
    .ol-popup:after {
            /*border-top-color: rgba(255,255,255,0.3);
            border-width: 10px;
            left: 48px;
            margin-left: -10px;*/
    }
    .ol-popup:before {
            border-top-color: white;
            border-width: 11px;
            left: 48px;
            margin-left: -11px;
    }
    .ol-popup-closer {
            text-decoration: none;
            position: absolute;
            top: 2px;
            right: 8px;
    }
    .ol-popup-closer:after {
            content: "✖";
            color: white;
    }
	@media only screen and (max-width: 767px){
		#tophead, #masthead, #main-nav, #colophon {
			display: none;
		}
		#map {
			position: fixed;
			height: 100%;
			width: 100%;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
		}
		#locations {
			margin-top: 95%;
		}
		.ui.table:not(.unstackable) tfoot, .ui.table:not(.unstackable) thead {
			display: none;
		}
		.site-content {
			padding-top: 0px;
		}
		.map {
			width:100% !important;
			/*height: 15rem !important;*/
		}
		.ol-zoom.ol-control {
			display: none;
		}
		#toggles {
			left: 25%;
		}
		.ol-scale-line .ol-unselectable {
			display: none;
		}
	}
</style>
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

<?php //get_sidebar(); ?>
<?php get_footer(); ?>
<?php include('third-party/WordPress-LocationMap/_templates/_map.php'); ?>
<?php include('third-party/WordPress-LocationMap/_templates/_location.php'); ?>
<script src="<?php echo get_template_directory_uri(); ?>/third-party/WordPress-LocationMap/underscore-min.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/third-party/WordPress-LocationMap/backbone-min.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/third-party/WordPress-LocationMap/ol.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/third-party/WordPress-LocationMap/csv2geojson.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/third-party/WordPress-LocationMap/DataTables-1.10.13/media/js/jquery.dataTables.min.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/third-party/WordPress-LocationMap/Semantic-UI-CSS/semantic.min.js"></script>

<script src="<?php echo get_template_directory_uri(); ?>/third-party/WordPress-LocationMap/js/routers.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/third-party/WordPress-LocationMap/js/models.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/third-party/WordPress-LocationMap/js/collections.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/third-party/WordPress-LocationMap/js/views/map.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/third-party/WordPress-LocationMap/js/views/county.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/third-party/WordPress-LocationMap/js/views/location.js"></script>

<script type="text/javascript">
	jQuery(function($) {
	var mapRouter = new LocationMap.Routers.Map();
	Backbone.history.start();
	});
</script>
