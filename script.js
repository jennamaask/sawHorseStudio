$(function(){
	let $modal = $('.modal');
	let $images = $('.galleryImage');
	let $modalImage = $('.currentImage');
	let $arrowRight = $('.arrowRight');
	let $arrowLeft = $('.arrowLeft');

	$images.on('click', function() {
		//display modal
		$modal.addClass('modalVisible');
		//add "thisImage" class to clicked image
		$(this).addClass("thisImage");
		//add source and alt tag to image tag in the modal
		let $source = $(this).attr('src');
		let $description = $(this).attr('alt')
		$modalImage.attr('src', `${$source}`);
		$modalImage.attr('alt', `${$description}`);
		});

		//When exit button is clicked, close modal, and remove "thisImage" class
		$('.exitModal').on('click', function(){
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
		slideLeft(current);
		// remove "thisImage" class from previous image
		$images.removeClass('thisImage');
		// Add "thisImage" class to current image
		$($images[current-1]).addClass('thisImage');
	});

	$arrowRight.on('click', function(){
		//get the index of the photo currently displayed
		let current =$($images).index($('.thisImage'));
		//Check to see if you are on the last image
		if(current === $images.length - 1) {
				current = -1;
			}
		// change image
		slideRight(current);
		//remove "thisImage" class from previous image
		$images.removeClass('thisImage');
		// Add "thisImage" class to current image
		$($images[current + 1]).addClass('thisImage');

	})

	function slideLeft(current){
		//change source and alt of the modal image 
		let $source = $($images[current - 1]).attr('src');
		$modalImage.attr('src', `${$source}`);
		let $description = $($images[current - 1]).attr('alt');
		$modalImage.attr('alt', `${$description}`);	
	};

	function slideRight(current){
		// change source of the modal image
		let $source = $($images[current + 1]).attr('src');
		$modalImage.attr('src', `${$source}`);
		let $description = $($images[current + 1]).attr('alt');
		$modalImage.attr('alt', `${$description}`);	
	};

	// tigger arrowRight and arrowLeft functions when the right or left arrow on the keyboard is pressed
	$('body').keydown(function(e){
		if (e.which === 37) {
			$arrowLeft.trigger('click');
		} else if (e.which === 39) {
			$arrowRight.trigger('click');
		}
	});		
})