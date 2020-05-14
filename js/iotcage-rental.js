// Rental - Responsive HTML/HTML5 Bootstrap-4.3.1 template for ecommerce / Bussiness / Rental Business / Classified websites
// Version: 1.0
// Released 13/04/2020
// Author: M M Aktaruzzaman
// Copyright Reserved by IoTCage.com

$(document).ready(function () {
    var maxLength = 160;
    $(".show-read-more").each(function () {
        var myStr = $(this).text();
        if ($.trim(myStr).length > maxLength) {
            var newStr = myStr.substring(0, maxLength);
            var removedStr = myStr.substring(maxLength, $.trim(myStr).length);
            $(this).empty().html(newStr);
            $(this).append(' <a href="javascript:void(0);" class="read-more badge badge-light">More>></a>');
            $(this).append('<span class="more-text">' + removedStr + '</span>');
        }
    });
    $(".read-more").click(function () {
        $(this).siblings(".more-text").contents().unwrap();
        $(this).remove();
    });
});


$('#myCarousel').carousel({
    interval: false
});
$('#carousel-thumbs').carousel({
    interval: false
});

// handles the carousel thumbnails
// https://stackoverflow.com/questions/25752187/bootstrap-carousel-with-thumbnails-multiple-carousel
$('[id^=carousel-selector-]').click(function () {
    var id_selector = $(this).attr('id');
    var id = parseInt(id_selector.substr(id_selector.lastIndexOf('-') + 1));
    $('#myCarousel').carousel(id);
});
// Only display 3 items in nav on mobile.
if ($(window).width() < 575) {
    $('#carousel-thumbs .row div:nth-child(4)').each(function () {
        var rowBoundary = $(this);
        $('<div class="row mx-0">').insertAfter(rowBoundary.parent()).append(rowBoundary.nextAll().addBack());
    });
    $('#carousel-thumbs .carousel-item .row:nth-child(even)').each(function () {
        var boundary = $(this);
        $('<div class="carousel-item">').insertAfter(boundary.parent()).append(boundary.nextAll().addBack());
    });
}
// Hide slide arrows if too few items.
if ($('#carousel-thumbs .carousel-item').length < 2) {
    $('#carousel-thumbs [class^=carousel-control-]').remove();
    $('.machine-carousel-container #carousel-thumbs').css('padding', '0 5px');
}
// when the carousel slides, auto update
$('#myCarousel').on('slide.bs.carousel', function (e) {
    var id = parseInt($(e.relatedTarget).attr('data-slide-number'));
    $('[id^=carousel-selector-]').removeClass('selected');
    $('[id=carousel-selector-' + id + ']').addClass('selected');
});

$('#myCarousel .carousel-item img').on('click', function (e) {
    var src = $(e.target).attr('data-remote');
    if (src) $(this).ekkoLightbox();
});

// <!-- /JavaScripts for carousel - Product details Page Only -->

// <!-- JavaScript for pagination -->

(function($) {
var pagify = {
items: {},
container: null,
totalPages: 1,
perPage: 3,
currentPage: 0,
createNavigation: function() {
    this.totalPages = Math.ceil(this.items.length / this.perPage);

    $('.pagination', this.container.parent()).remove();
    var pagination = $('<div class="pagination d-flex justify-content-center"></div>').append('<a class="btn page disabled" data-page="1"><<</a>');
    prevpage = '<a class="btn nav prev disabled" data-next="false"><</a>'
    pagination.append(prevpage);`   `

    for (var i = 0; i < this.totalPages; i++) {
        var pageElClass = "page";
        if (!i)
            pageElClass = "page disabled";
        var pageEl = '<a class="btn ' + pageElClass + '" data-page="' + (
        i + 1) + '">' + (
        i + 1) + "</a>";
        pagination.append(pageEl);
    }
    pagination.append('<a class="btn nav next btn-outline-primary" data-next="true">></a>');
    var lastpage = '<a class="btn page" data-page="' + (
        this.totalPages) + '">>></a>';

    pagination.append(lastpage);

    this.container.after(pagination);

    var that = this;
    $("body").off("click", ".nav");
    this.navigator = $("body").on("click", ".nav", function() {
        var el = $(this);
        that.navigate(el.data("next"));
    });

    $("body").off("click", ".page");
    this.pageNavigator = $("body").on("click", ".page", function() {
        var el = $(this);
        that.goToPage(el.data("page"));
    });
},
navigate: function(next) {
    // default perPage to 5
    if (isNaN(next) || next === undefined) {
        next = true;
    }
    $(".pagination .nav").removeClass("disabled").addClass("btn-outline-primary");
    if (next) {
        this.currentPage++;
        if (this.currentPage > (this.totalPages - 1))
            this.currentPage = (this.totalPages - 1);
        if (this.currentPage == (this.totalPages - 1))
            $(".pagination .nav.next").addClass("disabled").removeClass("btn-outline-primary");
        }
    else {
        this.currentPage--;
        if (this.currentPage < 0)
            this.currentPage = 0;
        if (this.currentPage == 0)
            $(".pagination .nav.prev").addClass("disabled").removeClass("btn-outline-primary");
        }

    this.showItems();
},
updateNavigation: function() {

    var pages = $(".pagination .page");
    pages.removeClass("disabled").addClass("btn-outline-primary");
    $('.pagination .page[data-page="' + (
    this.currentPage + 1) + '"]').addClass("disabled").removeClass("btn-outline-primary");
},
goToPage: function(page) {

    this.currentPage = page - 1;

    $(".pagination .nav").removeClass("disabled").addClass("btn-outline-primary");
    if (this.currentPage == (this.totalPages - 1))
        $(".pagination .nav.next").addClass("disabled").removeClass("btn-outline-primary");

    if (this.currentPage == 0)
        $(".pagination .nav.prev").addClass("disabled").removeClass("btn-outline-primary");
    this.showItems();
},
showItems: function() {
    this.items.hide();
    var base = this.perPage * this.currentPage;
    this.items.slice(base, base + this.perPage).show();

    this.updateNavigation();
},
init: function(container, items, perPage) {
    this.container = container;
    this.currentPage = 0;
    this.totalPages = 1;
    this.perPage = perPage;
    this.items = items;
    this.createNavigation();
    this.showItems();
}
};

// stuff it all into a jQuery method!
$.fn.pagify = function(perPage, itemSelector) {
var el = $(this);
var items = $(itemSelector, el);
// console.log(el)

// default perPage to 3
if (isNaN(perPage) || perPage === undefined) {
    perPage = 3;
}

// don't fire if fewer items than perPage
if (items.length <= perPage) {
    return true;
}

pagify.init(el, items, perPage);
};
})(jQuery);

$(".paginatable1").pagify(12, ".cards1");
