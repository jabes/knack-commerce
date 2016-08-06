/*jshint browser:true, devel:true, plusplus:false, bitwise:false, unused:false */
/*global jQuery */

var bxSlider,
	bxPagers = {};

jQuery(document).ready(function($) {
	
	function insertSlides() {
		var scope = $(this),
			slide_total = scope.data("slide-total"),
			slide_namespace = scope.data("slide-namespace"),
			bx_slider = scope.find(".bx-slider"),
			bx_slider_list = $("<ul>").appendTo(bx_slider),
			bx_pager = scope.find(".bx-pager");
		for (var i = 0; i < slide_total; i++) {
			var slide_link = $("<a>").attr("href", "#").attr('data-slide-index', i),
				slide_list_item = $("<li>")
				slide_image = $("<img>").attr("src", "assets/resources/" + slide_namespace + "/Image" + ("0" + (i + 1)).slice(-2) + ".jpg");
			slide_image.clone().appendTo(slide_link);
			slide_image.clone().appendTo(slide_list_item);
			slide_link.appendTo(bx_pager);
			slide_list_item.appendTo(bx_slider_list);
		}
	}

	$("#valvesAndFittings").each(insertSlides);
	$("#miscStainless").each(insertSlides);
	$("#tablesAndStands").each(insertSlides);

	$('a', '#galleryNav').click(function () {
		
		var index = '#' + $(this).data('gallery-index'),
			options = {
				pagerCustom: index + ' .bx-pager',
				auto: true,
				adaptiveHeight: true,
				onSlideAfter: function ($slideElement, oldIndex, newIndex) {
					$(index + ' .bx-pager a')
						.removeClass('active')
						.eq(newIndex)
						.addClass('active');
				}
			};

		$(this).addClass('active').siblings().removeClass('active');
		$(index).show().siblings('.gallery-tab').hide();
		
		// this will remove our custom pager so we need to restore it
		if (!bxPagers.hasOwnProperty(index) && $('.bx-pager', index).length > 0) {
			bxPagers[index] = $('.bx-pager', index).clone();
		}
		
		if (bxSlider) {
			bxSlider.destroySlider();
		}
		
		if (bxPagers.hasOwnProperty(index) && $('.bx-pager', index).length == 0) {
			$('.gallery-container', index).append(bxPagers[index]);
			$('.bx-pager a', index).removeClass('active');
		}
		
		bxSlider = $('.bx-slider > ul', index).bxSlider(options);

		return false;

	}).eq(0).trigger('click');

});

var geocoder,
	map;

function initialize() {
	geocoder = new google.maps.Geocoder();
	var address = "2337 Townline Rd, Abbotsford BC",
		mapOptions = {
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
	map = new google.maps.Map(document.getElementById('googMapCanvas'), mapOptions);
	geocoder.geocode( {'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker({
				map: map,
				position: results[0].geometry.location
			});
		}
	});
}

google.maps.event.addDomListener(window, 'load', initialize);
