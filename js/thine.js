/*global jQuery:false */

/*
 * Thine - Responsive Modern WordPress Theme
 * By UXbarn
 * Themeforest Profile: http://themeforest.net/user/UXbarn?ref=UXbarn
 * Demo URL: http://themes.uxbarn.com/redirect.php?theme=thine_wp
 * Created: September 29, 2014
 */

jQuery(document).ready(function($) {
	"use strict";
	
	// ---------------------------------------------- //
	// Global Read-Only Variables (DO NOT CHANGE!)
	// ---------------------------------------------- //
	var ua = navigator.userAgent.toLowerCase();
	var isAndroid = ua.indexOf("android") > -1;
	var androidversion = parseFloat(ua.slice(ua.indexOf('android') + 8));
	var isSafari = !!navigator.userAgent.match(/safari/i) && !navigator.userAgent.match(/chrome/i) && typeof document.body.style.webkitFilter !== "undefined" && !window.chrome;
	var siteWidth = $(window).width();
	// ---------------------------------------------- //
	
	
	
	
	
	// ---------------------------------------------- //
	// Core Scripts
	// ---------------------------------------------- //

	// Initialize custom functions
	renderGoogleMaps();
	initMobileMenu();
	
	// Initialize Foundation framework
	$(document).foundation();
	
	// Set the position of the side line
	calculateDynamicSideLine();
	
	// Move blog thumbnail into the info container in lower res
	adjustBlogList();
	
	// Force displaying Tabs element after JS has been loaded
	$('#content-container .section-container').addClass('display-block');
	
	// Add CSS class to submit button of comment form
	$('input#submit, input[type="submit"], input[type="button"]').addClass('button');

	// To remove some empty tags
	$('p:empty').remove(); // This is mostly added by WP automatically
	
	// To unwrap "p" tag out of "x" button of the message box
	if ($('.box .close').length > 0) {
		if ($('.box .close').parent().prop('tagName').toLowerCase() === 'p') {
			$('.box .close').unwrap();
		}
	}

	// To remove margin-bottom out of the last "p" element inside the message box
	$('.box').find('p:last-child').addClass('no-margin-bottom');
	
	
	// If the option to use header slider's nav styles from the them is enabled
	if( ThemeOptions.use_themes_bullet_nav_styles ) {
		
		// Use another style if there are too many bullets
		if( $('#header-slider .tp-bullets .bullet').length > 4 ) {
			$('#header-slider .tp-bullets').addClass('uxb-long-bullets');
		}
		
	}
	
	
	
	/***** Menu *****/
	$('.sf-menu').superfish({
		animation : {
			opacity : 'show',
			height : 'show',
		},
		speed : 'fast',
		speedOut : 'normal',
		delay : 600	// 0.4 second delay on mouseout
	});
	
	
	
	// Set the position of tagline.
	setTaglinePosition();
	
	
	
	
	
	/***** Portfolio *****/
	
	// Run Isotope for portfolio list
	var container = $('.uxb-port-element-wrapper');

	$(container).each(function() {
		var container = $(this);
		var rootContainer = $(this).closest('.uxb-port-root-element-wrapper');

		//$(container).imagesLoaded(function() {
			
			$(container).isotope({
				itemSelector : '.uxb-port-element-item',
			}).imagesLoaded(function() {
				
				$(container).isotope('reLayout');
				
				// Hide loading icon
				$(rootContainer).find('.uxb-port-loading-text').css('display', 'none');
	
				// Display loaded wrapper
				$(container).closest('.uxb-port-loaded-element-wrapper').css({
					opacity : 1,
					height : 'auto',
					visibility : 'visible',
				});
				
				// Display the items one after another
				$(container).find('.uxb-port-element-item').each(function(index) {
					
					var finalMultiplier = index;
					var displayMode = $(container).closest('.uxb-port-root-element-wrapper').attr('data-item-display');
					
					if (displayMode == 'random') {
						finalMultiplier = randomizeNumberFromRange(0, $(container).find('.uxb-port-element-item').length-1);
					}
					
					$(this).css('visibility', 'visible').delay(110 * finalMultiplier).animate({
						opacity : 1,
					}, 1);
					
				});
				
				recalculatePortfolioHoverInfo();
				
			});
			
		//});
		
		var filters = $(container).closest('.uxb-port-loaded-element-wrapper').find('.uxb-port-element-filters a');
		$(filters).click(function() {
			
			var selector = $(this).attr('data-filter');
			$(container).isotope({
				filter : selector
			}, onAnimationFinished);

			$(filters).removeClass('active');
			$(this).addClass('active');

			return false;

		});
		
		$(window).smartresize(function() {
			
			//$(container).isotope();
			//recalculateLayouts();
			
		});

	});
	
	// Code to be executed after the isotope animation finishes
	var onAnimationFinished = function(){
		//alert('555');
	};
	
	// If it is portfolio single page on responsive mode
	//var siteWidth = $(window).width();
	if (siteWidth <= 1024) {
			
		if ( $('#uxb-port-content').length > 0 ) {
			$('#uxb-port-content').prepend($('#sidebar-wrapper.uxb-port-meta'));
		}
		
	}
	
	
	
	
	
	// Set the main site's layouts
	recalculateLayouts();
	
	
	
	
	
	/***** Image Slider *****/
	if (jQuery().flexslider) {

		var imageSlider = $('.image-slider-wrapper');
		imageSlider.each(function() {

			var autoRotate = $(this).attr('data-auto-rotation'), 
				imageSliderAutoAnimated = true, 
				imageSliderAutoAnimatedDelay = 10000;
				
			if (autoRotate !== '0') {
				// Convert to milliseconds
				imageSliderAutoAnimatedDelay = parseInt(autoRotate, 10) * 1000;
			} else {
				imageSliderAutoAnimated = false;
			}
			
			var imageSliderAnimation = $(this).attr('data-effect');
			var imageSliderAnimationSpeed = 700;
			
			$(this).imagesLoaded(function() {

				$(this).flexslider({
					animation : imageSliderAnimation,
					directionNav : false,
					contolNav : false,
					pauseOnAction : true,
					pauseOnHover : true,
					slideshow : imageSliderAutoAnimated,
					slideshowSpeed : imageSliderAutoAnimatedDelay,
					animationSpeed : imageSliderAnimationSpeed,
					selector : '.image-slider > li',
					initDelay : 2000,
					smoothHeight : true,
					start : function(slider) {
						
						var initFadingSpeed = 800;
						var initDelay = 0;
						//var 
						
						// "slide" effect has some different transition to re-define
						if (imageSliderAnimation == 'slide') {
							initFadingSpeed = 1;
							initDelay = 800;
						}

						$(slider).find('.image-slider, .flex-viewport').css('visibility', 'visible').stop().animate({
							opacity : 1,
						}, initFadingSpeed);
						
						// Whether the border is enabled or not
						var borderEnabled = $(slider).closest('.image-slider-wrapper').find('.image-slider li.flex-active-slide img').hasClass('border');
						var extraInitHeight = 16; // border top + bottom heights
						if( ! borderEnabled) { // if not, then there is no extra initial height
							extraInitHeight = 0;
						}
						
						
						var initHeight = $(slider).closest('.image-slider-wrapper').find('.image-slider li.flex-active-slide img').height() + extraInitHeight;
						
						// If it's on retina devices + "slide" animation, get the correct initial height from the correct image
						if (typeof Retina != 'undefined') {
							if (Retina.isRetina() && imageSliderAnimation == 'slide') {
								initHeight = $(slider).closest('.image-slider-wrapper').find('.image-slider li.clone').last().find('img').height() + extraInitHeight;
							}
						}
						
						// Hide loading gif
						$(slider).closest('.image-slider-wrapper').css({
							background : 'none',
							// reset init height fix for Safari (also working on other browsers). this will also set the inline height based on the first slide's image
							height : initHeight,
						}).addClass('auto-height');
						
						$(slider).find('.flex-viewport').css('height', initHeight);

						$(slider).closest('.image-slider-root-container').attr('data-loaded', 'true');
						
						// If there is only one slide on portfolio single page, reduce some bottom margin
						if( $(slider).find('.flex-control-nav.flex-control-paging > li').length <= 0 ) {
							$('#uxb-port-slider').addClass('no-margin-bottom');
						}
						
					},
					before : function() {
					},
					after : function(slider) {
						
						if (imageSliderAnimation == 'slide') {
							// set a new height based on the next slide
							$(slider).closest('.image-slider-wrapper').css('height', 'inherit');
						}
						
					},
				});
				// END: flexslider

			});
			//END: imageLoaded

		});
		// END: each

		$('.image-slider-root-container .slider-prev').on('click', function() {
			$(this).closest('.image-slider-root-container').find('.slider-set').flexslider('prev');
			return false;
		});
		$('.image-slider-root-container .slider-next').on('click', function() {
			$(this).closest('.image-slider-root-container').find('.slider-set').flexslider('next');
			return false;
		});

		// Display slider controller on hovered
		$('.image-slider, .slider-controller').hover(function() {
			var root = $(this).closest('.image-slider-root-container');
			if ($(root).find('.image-slider-item:not(.clone)').length > 1) {
				if ($(root).attr('data-loaded') == 'true') {// works only when the slider is loaded
					$(root).attr('data-first-hover', 'true');
					// this is used to prevent the "mousemove" event below continuously firing the handler
					$(root).find('.slider-controller').css('display', 'block').stop().animate({
						opacity : 1
					});
				}
			}
		}, function() {
			var root = $(this).closest('.image-slider-root-container');
			$(root).find('.slider-controller').stop().animate({
				opacity : 0
			});
		});
		// If the mouse cursor is moving on the slider when it is just loaded, display the controller
		$('.image-slider, .slider-controller').mousemove(function() {
			var root = $(this).closest('.image-slider-root-container');
			if ($(root).find('.image-slider-item:not(.clone)').length > 1) {
				if ($(root).attr('data-first-hover') != 'true' && $(root).attr('data-loaded') == 'true') {
					$(root).find('.slider-controller').css('display', 'block').stop().animate({
						opacity : 1
					});
				}
			}
		});
		
		// Some sliders that are in "large-6" column (only left column) might display some 1px glitch.
		// To fix that, using the JS code below to reduce the width by 1px to hide it.
		var slidersToBeFixed = $('.row .large-6.columns:first-child .image-slider-root-container');
		$(slidersToBeFixed).each(function() {
			$(this).css('width', $(this).width() - 1 );
		});

	}
	
	
	
	
	
	// ---------------------------------------------- //
	// Elements
	// ---------------------------------------------- //
	
	/***** BlackAndWhite jQuery Plugin *****/
	if (jQuery().BlackAndWhite) {
			
		$('.black-white').BlackAndWhite({
	        hoverEffect : true, // default true
	        // set the path to BnWWorker.js for a superfast implementation
	        webworkerPath : false,
	        // for the images with a fluid width and height 
	        responsive:true,
	        // to invert the hover effect
	        invertHoverEffect: true,
	        // this option works only on the modern browsers ( on IE lower than 9 it remains always 1)
	        intensity:1,
	        speed: { //this property could also be just speed: value for both fadeIn and fadeOut
	            fadeIn: 200, // for fadeIn animations
	            fadeOut: 200 // for fadeOut animations
	        },
	        onImageReady:function(img) {
	            // this callback gets executed anytime an image is converted
	        }
	    });
	    
 	}
    
    
    
    /***** Testimonial Slider *****/
	if (jQuery().carouFredSel) {

		if ($('.uxb-tmnl-testimonial-list').length > 0) {

			var testimonialAnimation = 'crossfade';
			var testimonialAnimationDuration = 500;
			if ($('html').hasClass('touch')) {
				testimonialAnimation = 'fade';
				testimonialAnimationDuration = 300;
			}

			var testimonialList = $('.uxb-tmnl-testimonial-list');
			testimonialList.each(function() {

				var parent = $(this).closest('.uxb-tmnl-testimonial-wrapper');
				
				var autoRotate = $(this).attr('data-auto-rotation'),
					testimonialSliderAutoAnimated = true,
					testimonialSliderAutoAnimatedDelay = 10000;
				if(autoRotate !== '0') {
					testimonialSliderAutoAnimatedDelay = parseInt(autoRotate, 10) * 1000; // Convert to milliseconds
				} else {
					testimonialSliderAutoAnimated = false;
				}
				
				$(this).carouFredSel({
					responsive : true,
					swipe : true,
					onCreate : function() {
						// Display the element
						$(parent).css({
							overflow : 'inherit',
							height : 'auto',
						}).stop().animate({
							opacity : 1
						});
						
						//var siteWidth = $(window).width();
						
						if (siteWidth > 1161) {
								
							// Apply custom z-index to make the first item's image on top
							var zIndex = 50;
							$(this).find('.uxb-tmnl-testimonial-item .uxb-tmnl-testimonial-thumbnail').each(function() {
								$(this).css('z-index', zIndex);
								zIndex -= 1;
							});
							
						}
						
						recalculateLayouts();

					},
					pagination : {
						container : $(parent).find('.uxb-tmnl-testimonial-bullets'),
						anchorBuilder : function(nr) {
							return '<a href="javascript:;' + nr + '"></a>';
						}
					},
					scroll : {
						fx : testimonialAnimation,
						duration : testimonialAnimationDuration,
						onBefore : function(data) {
							
							//var siteWidth = $(window).width();
							
							if (siteWidth > 1161) {
								
								// Reset custom z-index
								$(this).find('.uxb-tmnl-testimonial-item .uxb-tmnl-testimonial-thumbnail').each(function() {
	
									if ($('html').hasClass('touch')) {
										$(this).stop().animate({
											opacity : 0
										});
									} else {
										$(this).css({
											zIndex : '',
											display : 'none',
										});
									}
	
								});
	
								// Apply a new custom z-index to the next item's image that will be displayed
								var nextItem = data.items.visible;
	
								if ($('html').hasClass('touch')) {
									$(nextItem).find('.uxb-tmnl-testimonial-thumbnail').stop().animate({
										opacity : 1
									});
								} else {
									$(nextItem).find('.uxb-tmnl-testimonial-thumbnail').css({
										zIndex : 50,
										display : 'block',
									});
								}
							
							}

							//console.debug($(data.items.visible).find('p').html());
						},
						onAfter : function() {
							recalculateLayouts();
						},
					},
					auto : {
						play : testimonialSliderAutoAnimated,
						pauseOnHover : 'resume',
						timeoutDuration : testimonialSliderAutoAnimatedDelay,
					},
				}, {
					transition : !(isAndroid), // if running on Android, set it to "false" for this CSS3 transition, otherwise "true"
				});

			});
		}

	}
    
    
    
	/***** Google Maps *****/
	function renderGoogleMaps() {
		
		if ( typeof google !== 'undefined' && typeof google.maps.MapTypeId !== 'undefined') {

			var elements = $('.google-map');

			elements.each(function() {

				var rawlatlng = $(this).attr('data-latlng').split(',');
				var lat = jQuery.trim(rawlatlng[0]);
				var lng = jQuery.trim(rawlatlng[1]);
				var address = $(this).attr('data-address');
				var displayType = $(this).attr('data-display-type');
				var zoomLevel = parseInt($(this).attr('data-zoom-level'), 10);
				$(this).css('height', $(this).attr('data-height'));

				switch(displayType.toUpperCase()) {
					case 'ROADMAP' :
						displayType = google.maps.MapTypeId.ROADMAP;
						break;
					case 'SATELLITE' :
						displayType = google.maps.MapTypeId.SATELLITE;
						break;
					case 'HYBRID' :
						displayType = google.maps.MapTypeId.HYBRID;
						break;
					case 'TERRAIN' :
						displayType = google.maps.MapTypeId.TERRAIN;
						break;
					default :
						displayType = google.maps.MapTypeId.ROADMAP;
						break;
				}

				var geocoder = new google.maps.Geocoder();
				var latlng = new google.maps.LatLng(lat, lng);
				var myOptions = {
					scrollwheel : false,
					zoom : zoomLevel,
					center : latlng,
					mapTypeId : displayType
				};

				var map = new google.maps.Map($(this)[0], myOptions);

				geocoder.geocode({
					'address' : address,
					'latLng' : latlng,
				}, function(results, status) {
					if (status === google.maps.GeocoderStatus.OK) {
						var marker;
						if (jQuery.trim(address).length > 0) {
							marker = new google.maps.Marker({
								map : map,
								position : results[0].geometry.location
							});

							map.setCenter(results[0].geometry.location);

						} else {
							marker = new google.maps.Marker({
								map : map,
								position : latlng
							});

							marker.setPosition(latlng);
							map.setCenter(latlng);

						}

					} else {
						window.alert("Geocode was not successful for the following reason: " + status);
					}
				});

			});
		}

	}
	
	
	
	/***** Fancybox *****/
	var enableLightbox = Boolean(ThemeOptions.enable_lightbox_wp_gallery);
	
	// Add FancyBox feature to WP gallery shortcode
	if (enableLightbox) {
		registerFancyBoxToWPGallery();
	}
	function registerFancyBoxToWPGallery() {
		// WP Gallery shortcode
		var $wpGallery = $('.gallery');

		$wpGallery.each(function() {
			var mainId = $(this).attr('id');

			var items = $(this).find('.gallery-item').find('a');

			items.each(function() {

				var href = $(this).attr('href');

				if (href.toLowerCase().indexOf('.jpg') >= 0 || href.toLowerCase().indexOf('.jpeg') >= 0 || href.toLowerCase().indexOf('.png') >= 0 || href.toLowerCase().indexOf('.gif') >= 0) {

					$(this).addClass('image-box');
					$(this).attr('rel', mainId);

				}

			});

		});
	}
	
	/***** Fancybox For Image *****/
	if (jQuery().fancybox) {
		if (isAndroid && androidversion <= 4.0) {
			// Fancybox's thumbnail helper is not working on older Android, so disable it.
			$('.image-box').not('.clone .image-box').fancybox({
				padding: 3,
			});
		} else {
			$('.image-box').not('.clone .image-box').fancybox({
				padding: 3,
				helpers : {
					thumbs : {
						width : 50,
						height : 50
					},
					overlay: {
						locked: false, // to prevent page jumping to the top when clicking on the object
						css: { 'background': 'rgba(0, 0, 0, 0.6)' },
				   	},
				   	title: {
				   		//type : 'over',
				   	}
				}
			});
		}
	}
	
	
	
	/***** Accordion/Toggle *****/
	var animateObj = {
		animate : 'easeOutQuint',
		duration : 600,
	};

	if ($('.accordion').length > 0) {

		$('.accordion').each(function() {
			
			var isCollapsible = $(this).attr('data-collapsible');
			if (isCollapsible == 'true') {
				isCollapsible = true;
			}
			
			var activeVar = parseInt($(this).attr('data-active-index'), 10);
			if ($(this).attr('data-active-index') == '-1') {
				activeVar = false;
			}
			
			$(this).accordion({
				autoHeight : false,
				heightStyle : 'content', // jQuery UI 1.10.x
				collapsible : isCollapsible,
				animate : animateObj,
				active : activeVar,
				create : function() {
					$(this).css({
						height : 'auto',
						visibility : 'visible',
					}).animate({
						opacity : 1
					});
				},
				activate: function( event, ui ) {
				},
			});
		});

	}

	if ($('.toggle').length > 0) {

		$('.toggle').accordion({
			autoHeight : false,
			heightStyle : 'content', // jQuery UI 1.10.x
			collapsible : true,
			animate : animateObj,
			active : false,
			create : function() {
				$(this).css({
					height : 'auto',
					visibility : 'visible',
				}).animate({
					opacity : 1
				});
			},
			activate: function( event, ui ) {
			},
		});

		if ($('.toggle').hasClass('active')) {
			$('.toggle.active').accordion({
				heightStyle : 'content',
				autoHeight : false,
				collapsible : true,
				animate : animateObj,
				active : 0,
				create : function() {
					$(this).css({
						height : 'auto',
						visibility : 'visible',
					}).animate({
						opacity : 1
					});
				},
			});

			$('body').scrollTop(0);
		}

	}
			


	/***** Tabs *****/
	if ($('html').hasClass('lt-ie9')) {
		$('.auto').addClass('tabs').removeClass('auto').attr('data-section', 'tabs');
	}
	var tabs = $('.vertical-tabs p.title > a, .tabs p.title > a, .auto p.title > a');
	tabs.click(function() {

		// Force hiding any content that contains Google Map
		$(this).parents('.section-container').find('.content').each(function() {
			if ($(this).find('.google-map').length > 0) {
				$(this).css('display', 'none');
			}
		});

		var map = $(this).parents('section').find('.content').find('.google-map');
		if (map.length > 0) {
			// Re-render Google Map for tab content and display the content
			$(this).parents('section').find('.content').css({
				'display' : 'block',
				'width' : '100%'
			});
			renderGoogleMaps();
		}
		
		//setTimeout( function() {  recalculateContentArea(); }, 500);
		
		// Fix the display of contained images when using with RetinaJS
		$(this).parents('section').find('.content').find('img').css('width', 'auto');
		
	});



	/***** Progress Bar *****/
	if (isAndroid) {
		if (androidversion >= 4.0) {
			animateProgressBar();
		} else {

			$('.progress-bar .bar-meter').each(function() {
				$(this).css('width', $(this).attr('data-meter') + '%');
			});

		}
	} else {
		animateProgressBar();
	}
	function animateProgressBar() {

		if (jQuery().waypoint) {
			
			$('.progress-bar').waypoint(function() {

				var meter = $(this).find('.bar-meter');
				$(meter).css('width', 0);
				$(meter).delay(250).animate({
					width : $(meter).attr('data-meter') + '%',
				}, 1400, 'easeOutQuint');

			}, {
				offset : '85%',
				triggerOnce : true,
				//context : '#inner-content-container',
			});

		}

	}
	
	
	
	// ---------------------------------------------- //
	// Other Functions / Misc.
	// ---------------------------------------------- //
	
	function setTaglinePosition() {
		
		if( $('#tagline').length > 0 ) {
			
			$('#logo-wrapper').imagesLoaded(function() {
			
				$('#tagline').css({
					bottom : $('#logo-wrapper').height(),
					opacity : 1,
					width : $('#header-container').height() - $('#logo-wrapper').height() + 1,
				}).css({ left : $('#tagline').outerHeight() - 1 }); // set this "left" property after the "width" is set to use the actual height of the element.
				//alert($('#tagline').outerHeight());
				
				// Also set header slider position (left) that is relative to the height of tagline
				// while preserving other styles set by Rev Slider as well
				var siteWidth = $(window).width();
				if (siteWidth >= 1024) {
					$('#header-slider .tparrows.tp-leftarrow').attr('style', function(i,s) { return s + 'left: ' + ($('#tagline').outerHeight() + 20) + 'px !important;'; });
				} else {
					$('#header-slider .tparrows.tp-leftarrow').attr('style', function(i,s) { return s + 'left: 20px !important;'; });
				}
			
			});
			
		}
		
	}
	
	
	// Calculate slider/header height 
	function calculateInitHeaderSliderHeight() {
		
		/*var siteWidth = $(window).width();
		if (siteWidth < 1024) {
			// 1420 and 435 = original width and height on desktop mode
			$('#header-slider-container').css('height', Math.ceil( 435/1420*$('#header-slider-container').width() )); 
		} else {
			$('#header-slider-container').css('height', 'auto');
		}*/
	
	} 
	
	function calculateDynamicSideLine() {
		
		var siteWidth = $(window).width();
		
		if ($('#intro-wrapper').length > 0) {
			
			$('#content-wrapper, #inner-sidebar-wrapper, #sidebar-wrapper').removeClass('no-intro');
			$('#dynamic-side-line').css('display', '');
			
			if (siteWidth > 1024) {
				
				$('#content-container').prepend($('#dynamic-side-line'));
				
				var extraValue = 0;
				
				if (siteWidth < 1470) {
					extraValue = -20;
				}
				
				var lineWidth = $('#intro-wrapper').offset().left + $('#intro-wrapper').width() + extraValue;
				
				$('#dynamic-side-line').css({
					top : $('#intro-wrapper').outerHeight() + 62, // 62 = padding of the "inner-content-container"
					width : lineWidth,
				});
				
			} else {
				$('#intro-wrapper').after($('#dynamic-side-line').css('width', '100%'));
			}
			
		} else {
			
			$('#content-wrapper, #inner-sidebar-wrapper, #sidebar-wrapper').addClass('no-intro');
			$('#dynamic-side-line').css('display', 'none');
			
		}
		
	}
	
	function recalculatePortfolioHoverInfo() {
		
		// There is 2px missing on Safari somehow...so below code will fix that
		var safariExtraHeight = 0;
		if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
			//safariExtraHeight = 2;
		}
		
		// Define the height of the hover element
		$('.uxb-port-element-item-hover').each(function() {
			var infoHeight = $(this).closest('.uxb-port-element-item').height();
			$(this).css({
				height : infoHeight + safariExtraHeight,
			});
		});
		
	}
	
	var timeoutID; // used in recalculateLayouts()
	
	function recalculateLayouts() {
		
		// Set the position and display the sidebar
		$('#sidebar-wrapper').css({
			top : $('#intro-wrapper').outerHeight() + 60,
		}).stop().animate({ 'opacity' : 1 });
		
		var siteWidth = $(window).width();
		var extraHeight = 23; // original value: 0;
		
		if (siteWidth >= 768 && siteWidth < 1024) {
			extraHeight = 63; // original value: 40;
		}
		
		// Set the min-height of the container
		var introSidebarHeight = $('#intro-wrapper').outerHeight() + $('#sidebar-wrapper').outerHeight();
		$('#inner-content-container').css('min-height', introSidebarHeight + extraHeight);
		
		clearTimeout(timeoutID);
		timeoutID = setTimeout( function() {  recalculateLayouts(); }, 3000);
		
		//console.log(id + ' ');
		
	}
	
	function adjustBlogList() {
		
		var siteWidth = $(window).width();
		if (siteWidth < 1024) {
			$('.blog-item').each(function() {
				$(this).find('.blog-info').prepend($(this).find('.blog-thumbnail'));
			});
		} else {
			$('.blog-item').each(function() {
				$(this).prepend($(this).find('.blog-thumbnail'));
			});
		}
		
	}
	
	function randomizeNumberFromRange(min, max) {
		return Math.floor(Math.random()*(max-min+1)+min);
	}
	
	
	
	
	
	/***** Responsive Related *****/
	$(window).resize(function() {
		
		setTaglinePosition();
		$(container).isotope();
		recalculateLayouts();
		calculateDynamicSideLine();
		adjustBlogList();
		recalculatePortfolioHoverInfo();
		
	});
	
	
	
	/***** Mobile Menu *****/
    function initMobileMenu() {
        //var defaultMenuList = $('#root-menu');
        var mobileMenuList = $('<ul />').appendTo($('#mobile-menu .top-bar-section'));
        
        var clonedList = $('#menu-wrapper > ul > li').clone();
        clonedList = getGeneratedSubmenu(clonedList);
        clonedList.appendTo(mobileMenuList);
        
    }
    
    // Recursive function for generating submenus
    function getGeneratedSubmenu(list) {
    	//console.debug($('#menu-wrapper .main-menu > li'));
        $(list).each(function() {
            //$(this).append('<li class="divider"></li>');
            
            if($(this).find('ul').length > 0) {
                var submenu = $(this).find('ul');
                
                $(this).addClass('has-dropdown');
                submenu.addClass('dropdown'); 
                
                getGeneratedSubmenu(submenu.find('li'));
            }
        });
        
        return list;
    }
	
});