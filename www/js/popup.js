/*
 *  Popup plugin
 *     Created by - Ofer Sarid
 *	 Usage - $('any selector').bindPopup({options})
 */

(function($){
	$.fn.bindPopup = function(options){
		// Defaults
		var defaults = {
			triggerEvent: 'touchend',
			blockerAnimationSpeed: 0,
			contentSlideSpeed: 0,
			blockerZedIndex: 14000,
			popupContent: 'you need to pass in the markup for the popup\'s content with the "popupContent" option',
			blockerCenterColor: 'rgba(0,0,0,0.2)',
			blockerEdgeColor: 'rgba(0,0,0,0.85)',
			contentBgColor: 'rgba(255,255,255,1)',
			afterRenderFunction: null,
			consoleLogs: true,
			triggerCloseWith: '.cancel'
		};

		// Override defaults with passed in options
		var options = $.extend(defaults, options);

		// Add style for popup on page load
		if ($('#style_popup').length == 0) {
			$('body').prepend("<style id='style_popup'>" +
					"#popup_page_blocker {display: none; position: fixed; top: 0; left: 0; width: 100%; background-color: rgba(0,0,0,0.6); z-index: "+options.blockerZedIndex+"; background: -moz-radial-gradient(center, ellipse cover, "+options.blockerCenterColor+" 0%, "+options.blockerEdgeColor+" 100%); background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%,"+options.blockerCenterColor+"), color-stop(100%,"+options.blockerEdgeColor+")); background: -webkit-radial-gradient(center, ellipse cover, "+options.blockerCenterColor+" 0%,"+options.blockerEdgeColor+" 100%); background: -o-radial-gradient(center, ellipse cover, "+options.blockerCenterColor+" 0%,"+options.blockerEdgeColor+" 100%); background: -ms-radial-gradient(center, ellipse cover, "+options.blockerCenterColor+" 0%,"+options.blockerEdgeColor+" 100%); background: radial-gradient(ellipse at center, "+options.blockerCenterColor+" 0%,"+options.blockerEdgeColor+" 100%); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#a6000000',GradientType=1 );}" +
					"#popup_content_wrap {display: none; transition: top "+options.contentSlideSpeed+"ms ease-in-out; position: absolute; left: 50%; top: 100%; padding: 18px 30px; background-color: "+options.contentBgColor+"; box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.15); border-radius: 10px;}" +
				"</style>");
		}


		return this.each(function(){
			$(this).bind(options.triggerEvent, function(){
				consoleLog('popup triggered');
				blockPage();
				renderPopup();
			});


			var blockPage = function(){
				consoleLog('blocking page..');
				if ($('#popup_page_blocker').length == 0) {
					$('body').append('<div id="popup_page_blocker"></div>');
				}

				$('#popup_page_blocker')
						.bind('touchend', function(e){
							e.stopPropagation();
							e.preventDefault();
							closePopup();
						})
						.height($(window).height())
						.width($(window).width())
						.fadeIn(options.blockerAnimationSpeed);
			};

			var renderPopup = function(){
				consoleLog('rendering popup..');
				$('#popup_page_blocker')
						.append('<div id="popup_content_wrap"></div>')
						.children('#popup_content_wrap').html(options.popupContent);
				$('#popup_content_wrap')
						.bind('touchend', function(e){
							e.stopPropagation();
							e.preventDefault();
						})
						.fadeIn(options.blockerAnimationSpeed + 600)
						.css({
							top: function(){
								return 	$('#popup_page_blocker').height()/3 - $('#popup_content_wrap').outerHeight()/2;
							},
							'margin-left': 0-$('#popup_content_wrap').outerWidth()/2
						})
						.delegate(options.triggerCloseWith,"touchend",closePopup);
				options.afterRenderFunction ? options.afterRenderFunction() : null;
			};

			var closePopup = function(){
				consoleLog('closing popup...');
				$('#popup_page_blocker').fadeOut(options.blockerAnimationSpeed, function(){
					$('#style_popup').remove();
					rem($('#popup_page_blocker'));
					$('#popup_page_blocker').remove();
				});
			};

			var rem = function (root) {
			    var $root = $(root);
			    $root.contents().each(function() {
			        if (this.nodeType === 1) {
			            rem(this);
			        }
			    });

		        $root.remove();
			}

			var consoleLog = function(log){
				options.consoleLogs ? console.log(log): null;
			};
		});
	}
	$.fn.closePopup = function(options){
		// Defaults
		var defaults = {
			blockerAnimationSpeed: 300
		};
		// Override defaults with passed in options
		var options = $.extend(defaults, options);
		$('#popup_page_blocker').fadeOut(options.blockerAnimationSpeed, function(){
			$('#style_popup').remove();
			$('#popup_page_blocker').remove();
		});
	};
})(jQuery);