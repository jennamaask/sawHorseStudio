//variables

const $modal = $('.modal');
const $overlay = $(".overlay");
const $images = $('.galleryImage');
const $modalImage = $('.currentImage');
const $arrowRight = $('.arrowRight');
const $arrowLeft = $('.arrowLeft');
const app = {};

app.modalContent = {
	betty: {
		title: "The Betty",
		price: "$2200",
		dimensions: `h 16.5" w 14-27" l 55"` 
	},
	simone: {
		title: "The Simone",
		price: "Sold",
		dimensions:`h 16" w 18" l 65"`
	},
	moira: {
		title: "The Moira",
		price: "Sold",
		dimensions: `h 14" w 24" l 54"` 
	},
	charcuterie: {
		title: "Charcuterie Board",
		price: "$160",
		dimensions: `t .75" d 18"`
	}
}

app.slideLeft = (current) => {
	//change source and alt of the modal image 
	let $source = $($images[current - 1]).attr('src');
	$modalImage.attr('src', `${$source}`);
	let $description = $($images[current - 1]).attr('alt');
	$modalImage.attr('alt', `${$description}`);	
	const $keyword = $($images[current - 1]).attr("title");
	const $title = app.modalContent[$keyword].title;
	const $price = app.modalContent[$keyword].price;
	const $dimensions = app.modalContent[$keyword].dimensions;
	$(".modalTitle").html($title);
	$(".modalPrice").html($price);
	$(".modalDimensions").html($dimensions);
}

app.slideRight = (current) => {
	// change source of the modal image
	let $source = $($images[current + 1]).attr('src');
	$modalImage.attr('src', `${$source}`);
	let $description = $($images[current + 1]).attr('alt');
	$modalImage.attr('alt', `${$description}`);
	const $keyword = $($images[current + 1]).attr("title");
	const $title = app.modalContent[$keyword].title;
	const $price = app.modalContent[$keyword].price;
	const $dimensions = app.modalContent[$keyword].dimensions;
	$(".modalTitle").html($title);
	$(".modalPrice").html($price);
	$(".modalDimensions").html($dimensions);
};

app.init = () => {
	$overlay.on('click', function () {
		//display modal
		$modal.addClass('modalVisible');
		//add "thisImage" class to clicked image
		$(this).prev().addClass("thisImage");
		//add source and alt tag to image tag in the modal
		const $keyword = $(this).prev().attr("title");
		const $title = app.modalContent[$keyword].title;
		const $price = app.modalContent[$keyword].price;
		const $dimensions = app.modalContent[$keyword].dimensions;
		$(".modalTitle").html($title);
		$(".modalPrice").html($price);
		$(".modalDimensions").html($dimensions)
		let $source = $(this).prev().attr('src');
		let $description = $(this).prev().attr('alt')
		$modalImage.attr('src', `${$source}`);
		$modalImage.attr('alt', `${$description}`);
	});

	//When exit button is clicked, close modal, and remove "thisImage" class
	$('.exitModal').on('click', function () {
		$modal.removeClass('modalVisible');
		$images.removeClass('thisImage');
	});

	$arrowLeft.on('click', function(){
		//get the index of the photo currently displayed
		let current =$($images).index($('.thisImage'));
		// check to see if the index is 0
		if(current === 0) {
			current = $images.length;
		}
		// change image
		app.slideLeft(current);
		// remove "thisImage" class from previous image
		$images.removeClass('thisImage');
		// Add "thisImage" class to current image
		$($images[current-1]).addClass('thisImage');
	});

	$arrowRight.on('click', function () {
		//get the index of the photo currently displayed
		let current = $($images).index($('.thisImage'));
		//Check to see if you are on the last image
		if (current === $images.length - 1) {
			current = -1;
		}
		// change image
		app.slideRight(current);
		//remove "thisImage" class from previous image
		$images.removeClass('thisImage');
		// Add "thisImage" class to current image
		$($images[current + 1]).addClass('thisImage');
	})

	// tigger arrowRight and arrowLeft functions when the right or left arrow on the keyboard is pressed
	$('body').keydown(function (e) {
		if (e.which === 37) {
			$arrowLeft.trigger('click');
		} else if (e.which === 39) {
			$arrowRight.trigger('click');
		}
	});	
}

$(function(){
	app.init();		
})