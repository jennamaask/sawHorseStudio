//variables

const $modal = $(".modal");
const $overlay = $(".overlay");
const $images = $(".galleryImage");
const $modalImage = $(".currentImage");
const $arrowRight = $(".arrowRight");
const $arrowLeft = $(".arrowLeft");
const $modalTitle = $(".modalTitle");
const $modalPrice = $(".modalPrice");
const $modalDimensions = $(".modalDimensions");
const $purchase = $("a.purchase");
const $sold = $("a.sold");
const $all = $("a.all");
const $menu = $(".menu");
const $figurePurchase = $("figure.purchase");
const $figureSold = $("figure.sold");
const $dropDown = $("nav.dropDown");
const $exit = $(".exit");
const $about = $(".about");
const $headerTop = $(".headerTop");
const $anchor = $("a");
const $header = $("header");
const $process = $(".process");
const $contact = $(".contact");

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
    dimensions: `h 16" w 18" l 65"`
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
};

app.slideLeft = current => {
  //change source and alt of the modal image
  let $source = $($images[current - 1]).attr("src");
  $modalImage.attr("src", `${$source}`);
  let $description = $($images[current - 1]).attr("alt");
  $modalImage.attr("alt", `${$description}`);
  const $keyword = $($images[current - 1]).attr("title");
  const $title = app.modalContent[$keyword].title;
  const $price = app.modalContent[$keyword].price;
  const $dimensions = app.modalContent[$keyword].dimensions;
  $modalTitle.html($title);
  $modalPrice.html($price);
  $modalDimensions.html($dimensions);
};

app.slideRight = current => {
  // change source of the modal image
  let $source = $($images[current + 1]).attr("src");
  $modalImage.attr("src", `${$source}`);
  let $description = $($images[current + 1]).attr("alt");
  $modalImage.attr("alt", `${$description}`);
  const $keyword = $($images[current + 1]).attr("title");
  const $title = app.modalContent[$keyword].title;
  const $price = app.modalContent[$keyword].price;
  const $dimensions = app.modalContent[$keyword].dimensions;
  $modalTitle.html($title);
  $modalPrice.html($price);
  $modalDimensions.html($dimensions);
};

app.exit = () => {
  //When exit button is clicked, close modal, and remove "thisImage" class
  $(".exitModal").on("click", function() {
    $modal.removeClass("modalVisible");
    $images.removeClass("thisImage");
  });
};

app.arrowLeft = () => {
  $arrowLeft.on("click", function() {
    //get the index of the photo currently displayed
    let current = $($images).index($(".thisImage"));
    // check to see if the index is 0
    if (current === 0) {
      current = $images.length;
    }
    // change image
    app.slideLeft(current);
    // remove "thisImage" class from previous image
    $images.removeClass("thisImage");
    // Add "thisImage" class to current image
    $($images[current - 1]).addClass("thisImage");
  });
};

app.arrowRight = () => {
  $arrowRight.on("click", function() {
    //get the index of the photo currently displayed
    let current = $($images).index($(".thisImage"));
    //Check to see if you are on the last image
    if (current === $images.length - 1) {
      current = -1;
    }
    // change image
    app.slideRight(current);
    //remove "thisImage" class from previous image
    $images.removeClass("thisImage");
    // Add "thisImage" class to current image
    $($images[current + 1]).addClass("thisImage");
  });
  // tigger arrowRight and arrowLeft functions when the right or left arrow on the keyboard is pressed
  $("body").keydown(function(e) {
    if (e.which === 37) {
      $arrowLeft.trigger("click");
    } else if (e.which === 39) {
      $arrowRight.trigger("click");
    }
  });
};

app.init = () => {
  $overlay.on("click", function() {
    //display modal
    $modal.addClass("modalVisible");
    //add "thisImage" class to clicked image
    $(this)
      .prev()
      .addClass("thisImage");
    //add source and alt tag to image tag in the modal
    const $keyword = $(this)
      .prev()
      .attr("title");
    const $title = app.modalContent[$keyword].title;
    const $price = app.modalContent[$keyword].price;
    const $dimensions = app.modalContent[$keyword].dimensions;
    $modalTitle.html($title);
    $modalPrice.html($price);
    $modalDimensions.html($dimensions);
    let $source = $(this)
      .prev()
      .attr("src");
    let $description = $(this)
      .prev()
      .attr("alt");
    $modalImage.attr("src", `${$source}`);
    $modalImage.attr("alt", `${$description}`);
    app.exit();
    app.arrowLeft();
    app.arrowRight();
    app.keyboard();
  });

  // Script to show or hide elements in the gallery section

  $purchase.on("click", function() {
    $purchase.addClass("underline");
    $figurePurchase.removeClass("hide");
    $figureSold.addClass("hide");
    $all.add($sold).removeClass("underline");
  });

  $sold.on("click", function() {
    $sold.addClass("underline");
    $figureSold.removeClass("hide");
    $figurePurchase.addClass("hide");
    $purchase.add($all).removeClass("underline");
  });

  $all.on("click", function() {
    $(".gallery figure").removeClass("hide");
    $all.addClass("underline");
    $purchase.add($sold).removeClass("underline");
  });

  // Script to hide and show hamburger icon or drop down menu

  $menu.on("click", function() {
    $dropDown.addClass("displayMenu");
    $exit.addClass("visible");
    $about.addClass("shift");
    $menu.addClass("disappear");
  });

  $(".dropdown a").on("click", function() {
    $dropDown.removeClass("displayMenu");
    $exit.removeClass("visible");
    $about.removeClass("shift");
    $menu.removeClass("disappear");
  });

  $exit.on("click", function() {
    $dropDown.removeClass("displayMenu");
    $exit.removeClass("visible");
    $about.removeClass("shift");
    $menu.removeClass("disappear");
  });

  // Script to change color of Menu/hamburger icon and background depending on where it is on the screen

  $(document).scroll(function() {
    const position1 = $header.offset().top;
    const position2 = $about.offset().top;
    const position3 = $process.offset().top;
    const position4 = $contact.offset().top;
    const scrollPos = $(document).scrollTop();

    if (scrollPos === 0 || scrollPos < position2) {
      $headerTop.addClass("transparent").removeClass("white");
      $menu.addClass("transparent").removeClass("white");
    } else if (scrollPos >= position2 && scrollPos < position3) {
      $headerTop.addClass("white").removeClass("transparent black");
      $menu.addClass("white").removeClass("transparent black");
    } else if (scrollPos >= position3 && scrollPos < position4) {
      $headerTop.removeClass("white").addClass("black");
      $menu.removeClass("white").addClass("black");
    } else if (scrollPos >= position4) {
      $menu.removeClass("black").addClass("white");
      $headerTop.removeClass("black").addClass("white");
    }
  });
};

$(function() {
  app.init();
  $anchor.smoothScroll();
});
