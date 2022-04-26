import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs'
declare var jQuery: any;

// declare var $: any;
// import 'jqueryui';
// import  $ from 'jquery';
import * as $ from 'jquery';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../../auth/login/login.component';
import { KycComponent } from 'src/app/profiledetails/kyc/kyc.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [NgbRatingConfig, ToastrService],
})

export class HeaderComponent implements OnInit {

  checkedColumns = {};
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  userid: any;
  accesstoken: any;
  tokentype: any; Proce: any;
  currentdetail: User;
  Wishlist: any;
  loadingIndicator: boolean | undefined;
  Wlength: any;
  Cart: any;
  owneriid: any;
  cartlength: any;
  loader: boolean = true;
  Summery: any;
  Grandtot: any;
  subtot: any;
  grandtotal: any;
  searchh: any;
  searchoverlay: boolean = true;
  search!: FormGroup;
  userlogin!: boolean;

  ClickEventSubscription!: Subscription;
  profiledetail: any;
  loaderimage: boolean = true;
  Allcat: any;
  Subcat: any;
  Subcat2: any = [];
  Subcat3: any = [];
  subItem: any = -1;
  subItem1: any;
  subItem2: any;
  subItem3: any;
  cat_id: any;
  subcat_id: any;
  subcategory1: any;
  catid1_id: any;

  constructor(private router: Router, private fb: FormBuilder, private toastr: ToastrService, private request: RequestService,
    private modalService: NgbModal, private sharedService: SharedService, private authService: AuthService) {

    if (this.userid !== 0) {
      this.ClickEventSubscription = this.sharedService.getClickEvent().subscribe(() => {
        this.viewwishlist();
        this.viewcartcount();
        this.viewcart();
        this.viewcart3();
        this.getprofile();
      })
    }
    else {
      this.currentUserSubject = new BehaviorSubject<User>(
        JSON.parse(localStorage.getItem('currentUser') || '{}')
      );
    }
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentdetail = this.currentUserSubject.value;
    this.userid = this.currentdetail.user?.id;
    this.accesstoken = this.currentdetail.access_token;
    this.tokentype = this.currentdetail.token_type;
    if (this.userid == undefined) {
      this.userid = 0;
    }
  }

  ngOnInit(): void {
    if (this.userid !== 0) {
      this.viewwishlist();
      this.viewcartcount();
      this.viewcart();
      this.viewcart3();
      this.getprofile();
      this.viewallcategory();
    }
    else {
      this.viewallcategory();
    }

    this.search = this.fb.group({
      key: [''],
    });


    
    // javascript
    $(window).ready(function () {

      var init = function () {
        popup();
        readProductData();
      };

      var isDone = true;

      var popup = function () {
        var $items = $('.mini-carousel ul');
        var $linkClick = $('.mini-carousel ul li a');
        $('.video-player').hide();
        $('.btn-view').on('click', function () {
          $('#quick-view-pop-up').fadeToggle();
          $('#quick-view-pop-up').css({ "top": "34px", "left": "314px" });
          $('.mask').fadeToggle();
        });
        $('.mask').on('click', function () {
          $('.mask').fadeOut();
          $('#quick-view-pop-up').fadeOut();
        });
        $('.quick-view-close').on('click', function () {
          $('.mask').fadeOut();
          $('#quick-view-pop-up').fadeOut();
        });

        $('.prev').on('click', function () {
          //animate on UL element of small image on the left
          if (!isDone) return;
          if ($items.position().top === 0) {
            $items.css({ 'top': '-125px' });
            $items.children('li').last().prependTo($items);
          }
          isDone = false;
          $('.mini-carousel ul').animate({
            top: "+=125px"
          }, 200, function () {
            isDone = true;
          });
          $('.image-large ul li').last().prependTo($('.image-large ul'));
        });

        $('.next').on('click', function () {
          //animate on UL element of class 'mini-carousel'
          if (!isDone) return;

          if ($items.position().top === 0) {
            $items.css({ 'top': '125px' });
            $items.children('li').first().appendTo($items);
          }
          isDone = false;
          $('.mini-carousel ul').animate({
            top: "-=125px"
          }, 300, function () {
            isDone = true;
          });
          $('.image-large ul li').first().appendTo($('.image-large ul'));
        });
        $('.quick-view-video').on('click', function () {
          $('.video-player').toggle();
          $('.image-large ul').toggle();
        });
      };
      var readProductData = function () {
        $.getJSON("winners.json", function (result) {
          $.each(result, function (val) {
            // console.log(val.key);
          });
        });
      };
      init();

    }
    );
    (($) => {
      ("use strict");

      /*----------  Menu sticky and scroll top  ----------*/

      var windows = $(window);
      var screenSize = windows.width();
      var sticky = $(".header-sticky");
      var sliderBottomHeader = $(".slider-bottom-header-sticky");
      var $html = $("html");
      var $body = $("body");

      windows.on("scroll", function () {
        var scroll = windows.scrollTop();

        var headerHeight = sticky.height();
        var sliderBottomHeaderHeight = sliderBottomHeader.height();
        var sliderHeight = $(".header-bottom-slider-area").height();

        var headerPosition = sliderBottomHeaderHeight + sliderHeight;

        if (screenSize >= 992) {
          if (scroll < headerHeight) {
            sticky.removeClass("is-sticky");
          } else {
            sticky.addClass("is-sticky");
          }
        }

        if (screenSize >= 300) {
          if (scroll < headerPosition) {
            sliderBottomHeader.removeClass("is-sticky");
          } else {
            sliderBottomHeader.addClass("is-sticky");
          }
        }

        //code for scroll top

        if (scroll >= 400) {
          $(".scroll-top").fadeIn();
        } else {
          $(".scroll-top").fadeOut();
        }
      });

      /*----------  Scroll to top  ----------*/

      $(".scroll-top").on("click", function () {
        $("html,body").animate(
          {
            scrollTop: 0
          },
          2000
        );
      });

      /* active and deactive about overlay */

      $("#offcanvas-about-icon").on("click", function () {
        $("#about-overlay").addClass("active-about-overlay");
        $(".overlay-close").addClass("active").removeClass("inactive");
        $("body").addClass("active-body-search-overlay");
      });

      $("#about-close-icon, .overlay-close, #closeabout").on("click", function () {
        $("#about-overlay").toggleClass("active-about-overlay");
        $(".overlay-close").addClass("inactive").removeClass("active");
        $("body").removeClass("active-body-search-overlay");
      });

      /* active and deactive wishlist overlay */

      $("#offcanvas-wishlist-icon, #offcanvas-wishlist-icon-2").on(
        "click",
        function () {
          $("#wishlist-overlay").addClass("active-wishlist-overlay");
          $(".wishlist-overlay-close").addClass("active").removeClass("inactive");
          $("body").addClass("active-body-search-overlay");
        }
      );

      $(".closewishlist ,  #wishlist-close-icon, .wishlist-overlay-close").on("click", function () {
        $("#wishlist-overlay").removeClass("active-wishlist-overlay");
        $(".wishlist-overlay-close").addClass("inactive").removeClass("active");
        $("body").removeClass("active-body-search-overlay");
      });

      // close on press 'esc' button

      $(document).keyup(function (e: { keyCode: number; }) {
        if (e.keyCode == 27) {
          //for search overlay
          if ($(".active-search-overlay").length) {
            $("#search-overlay").removeClass("active-search-overlay");
          }

          //for cart
          if ($(".active-cart-overlay").length) {
            $("#cart-overlay").removeClass("active-cart-overlay");
            $(".cart-overlay-close").addClass("inactive").removeClass("active");
          }

          //for wishlist
          if ($(".active-wishlist-overlay").length) {
            $("#wishlist-overlay").removeClass("active-wishlist-overlay");
            $(".wishlist-overlay-close").addClass("inactive").removeClass("active");
          }

          $("body").removeClass("active-body-search-overlay");

          //for quick view
          if ($(".cd-quick-view.is-visible").length) {
            var id = $("body").find(".cd-quick-view.add-content");
            closeQuickView(id, sliderFinalWidth, maxQuickWidth);
          }
        }
      });

      /* active and deactive cart overlay */

      $("#offcanvas-cart-icon, #offcanvas-cart-icon-2").on("click", function () {
        $("#cart-overlay").addClass("active-cart-overlay");
        $(".cart-overlay-close").addClass("active").removeClass("inactive");
        $("body").addClass("active-body-search-overlay");
      });

      $("#cart-close-icon, .cart-overlay-close, .closeoverlay").on("click", function () {
        $("#cart-overlay").removeClass("active-cart-overlay");
        $(".cart-overlay-close").addClass("inactive").removeClass("active");
        $("body").removeClass("active-body-search-overlay");
      });



      /* activate and deactivate search overlay*/

      $("#search-icon, #search-icon-2").on("click", function () {
        $("#search-overlay").addClass("active-search-overlay");
        $("body").addClass("active-body-search-overlay");
      });

      $("#search-close-icon , .closesearch").on("click", function () {
        $("#search-overlay").removeClass("active-search-overlay");
        $("body").removeClass("active-body-search-overlay");
      });

      /*----------  multilevel menu  ----------*/



      /*----------  overlay menu   ----------*/

      /*Variables*/
      var $verticalCollapsibleMenu = $("#vertical-collapsible-menu"),
        $verticalCollapsibleSubMenu = $verticalCollapsibleMenu.find(".sub-menu");

      /*Close Off Canvas Sub Menu*/
      $verticalCollapsibleSubMenu.slideUp();

      /*Category Sub Menu Toggle*/
      $verticalCollapsibleMenu.on("click", "li a", (e: { preventDefault: () => void; }) => {
        var $this = $(this);
        if ($this.siblings(".sub-menu").length) {
          e.preventDefault();
          if ($this.siblings("ul:visible").length) {
            $this.siblings("ul").slideUp();
          } else {
            $this.closest("li").siblings("li").find("ul:visible").slideUp();
            $this.siblings("ul").slideDown();
          }
        }
      });

      $("#overlay-menu-icon").on("click", function () {
        $("#overlay-navigation-menu")
          .removeClass("overlay-navigation-inactive")
          .addClass("overlay-navigation-active");
      });

      $("#overlay-menu-close-icon").on("click", function () {
        $("#overlay-navigation-menu")
          .removeClass("overlay-navigation-active")
          .addClass("overlay-navigation-inactive");
      });

      /*----------  vertical menu icon  ----------*/

      $("#vertical-menu-icon").on("click", () => {
        $(this).toggleClass("active");
        $("#vertical-menu-dark").toggleClass("active");
      });

      /*----------   Mailchimp  ----------*/
      // $("#mc-form").ajaxChimp({
      //   language: "en",
      //   callback: mailChimpResponse,
      //   // ADD YOUR MAILCHIMP URL BELOW HERE!
      //   url:
      //     "https://devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef"
      // });

      function mailChimpResponse(resp: { result: string; msg: string; }) {
        if (resp.result === "success") {
          $(".mailchimp-success")
            .html("" + resp.msg)
            .fadeIn(900);
          $(".mailchimp-error").fadeOut(400);
        } else if (resp.result === "error") {
          $(".mailchimp-error")
            .html("" + resp.msg)
            .fadeIn(900);
        }
      }

      // $("#mc-form-2").ajaxChimp({
      //   language: "en",
      //   callback: mailChimpResponse2,
      //   // ADD YOUR MAILCHIMP URL BELOW HERE!
      //   url:
      //     "https://devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef"
      // });

      function mailChimpResponse2(resp: { result: string; msg: string; }) {
        if (resp.result === "success") {
          $(".mailchimp-success-2")
            .html("" + resp.msg)
            .fadeIn(900);
          $(".mailchimp-error-2").fadeOut(400);
        } else if (resp.result === "error") {
          $(".mailchimp-error-2")
            .html("" + resp.msg)
            .fadeIn(900);
        }
      }

      /*----------  slick slider activation  ----------*/
      var $lezadaSlickSlider = $(".lezada-slick-slider");

      /*For RTL*/
      if ($html.attr("dir") == "rtl" || $body.attr("dir") == "rtl") {
        $lezadaSlickSlider.attr("dir", "rtl");
      }

      $lezadaSlickSlider.each(() => {
        /*Setting Variables*/
        var $this = $(this),
          $setting = $this.data("slick-setting"),
          $autoPlay = $setting.autoplay ? $setting.autoplay : false,
          $autoPlaySpeed = parseInt($setting.autoplaySpeed, 10) || 2000,
          $speed = parseInt($setting.speed, 10) || 2000,
          $asNavFor = $setting.asNavFor ? $setting.asNavFor : null,
          $appendArrows = $setting.appendArrows ? $setting.appendArrows : $this,
          $appendDots = $setting.appendDots ? $setting.appendDots : $this,
          $arrows = $setting.arrows ? $setting.arrows : false,
          $prevArrow = $setting.prevArrow
            ? '<button class="' +
            $setting.prevArrow.buttonClass +
            '"><i class="' +
            $setting.prevArrow.iconClass +
            '"></i></button>'
            : '<button class="slick-prev">previous</button>',
          $nextArrow = $setting.nextArrow
            ? '<button class="' +
            $setting.nextArrow.buttonClass +
            '"><i class="' +
            $setting.nextArrow.iconClass +
            '"></i></button>'
            : '<button class="slick-next">next</button>',
          $centerMode = $setting.centerMode ? $setting.centerMode : false,
          $centerPadding = $setting.centerPadding ? $setting.centerPadding : "50px",
          $dots = $setting.dots ? $setting.dots : false,
          $fade = $setting.fade ? $setting.fade : false,
          $focusOnSelect = $setting.focusOnSelect ? $setting.focusOnSelect : false,
          $infinite = $setting.infinite ? $setting.infinite : true,
          $pauseOnHover = $setting.pauseOnHover ? $setting.pauseOnHover : true,
          $rows = parseInt($setting.rows, 10) || 1,
          $slidesToShow = parseInt($setting.slidesToShow, 10) || 1,
          $slidesToScroll = parseInt($setting.slidesToScroll, 10) || 1,
          $swipe = $setting.swipe ? $setting.swipe : true,
          $swipeToSlide = $setting.swipeToSlide ? $setting.swipeToSlide : false,
          $variableWidth = $setting.variableWidth ? $setting.variableWidth : false,
          $vertical = $setting.vertical ? $setting.vertical : false,
          $verticalSwiping = $setting.verticalSwiping
            ? $setting.verticalSwiping
            : false,
          $rtl =
            $setting.rtl || $html.attr('dir="rtl"') || $body.attr('dir="rtl"')
              ? true
              : false;

        /*Responsive Variable, Array & Loops*/
        var $responsiveSetting =
          typeof $this.data("slick-responsive") !== "undefined"
            ? $this.data("slick-responsive")
            : "",
          $responsiveSettingLength = $responsiveSetting.length,
          $responsiveArray = [];
        for (var i = 0; i < $responsiveSettingLength; i++) {
          $responsiveArray[i] = $responsiveSetting[i];
        }

        /*Slider Start*/
        $this.slick({
          autoplay: $autoPlay,
          autoplaySpeed: $autoPlaySpeed,
          speed: $speed,
          asNavFor: $asNavFor,
          appendArrows: $appendArrows,
          appendDots: $appendDots,
          arrows: $arrows,
          dots: $dots,
          centerMode: $centerMode,
          centerPadding: $centerPadding,
          fade: $fade,
          focusOnSelect: $focusOnSelect,
          infinite: $infinite,
          pauseOnHover: $pauseOnHover,
          rows: $rows,
          slidesToShow: $slidesToShow,
          slidesToScroll: $slidesToScroll,
          swipe: $swipe,
          swipeToSlide: $swipeToSlide,
          variableWidth: $variableWidth,
          vertical: $vertical,
          verticalSwiping: $verticalSwiping,
          rtl: $rtl,
          prevArrow: $prevArrow,
          nextArrow: $nextArrow,
          responsive: $responsiveArray
        });
      });

      /*----------  Masonry Activation  ----------*/

      var $masonry = $(".masonry-category-layout");
      var $grid = $(".grid-item");
      $grid.hide();

      // $masonry.imagesLoaded(function () {
      //   $grid.fadeIn();
      //   $masonry.masonry({
      //     itemSelector: ".grid-item",
      //     columnWidth: ".grid-item--width2",
      //     percentPosition: true
      //     //gutter: 10
      //   });
      // });

      /*----------  creative home masonry  ----------*/

      var $masonryCreativeHome = $(".masonry-category-layout--creativehome");
      var $gridCreativeHome = $(".grid-item");
      $grid.hide();

      // var $masonryCreativeHome = $(".masonry-category-layout--creativehome");
      // $masonryCreativeHome.imagesLoaded(function () {
      //   $gridCreativeHome.fadeIn();
      //   $masonryCreativeHome.masonry({
      //     itemSelector: ".grid-item",
      //     columnWidth: ".grid-item--width2",
      //     percentPosition: true
      //     //gutter: 30
      //   });
      // });

      /*----------  blog post masonry  ----------*/

      var $masonryBlogPost = $(".blog-post-wrapper--masonry");
      var $gridBlogPost = $(".grid-item");
      $grid.hide();

      // var $masonryBlogPost = $(".blog-post-wrapper--masonry");
      // $masonryBlogPost.imagesLoaded(function () {
      //   $gridBlogPost.fadeIn();
      //   $masonryBlogPost.masonry({
      //     itemSelector: ".grid-item",
      //     columnWidth: ".grid-item",
      //     percentPosition: true
      //     //gutter: 30
      //   });
      // });

      /*----------  WOW JS activation  ----------*/

      //new WOW().init();

      /*----------  paraxify active  ----------*/

      // var parallaxActive = ".single-lookbook-section",
      //   myParaxify;
      // if (parallaxActive.length) {
      //   myParaxify = paraxify(parallaxActive, {
      //     speed: 1,
      //     boost: 1
      //   });
      // }

      /*----------  countdown activate  ----------*/

      $("[data-countdown]").each(() => {
        var $this = $(this),
          finalDate = $(this).data("countdown");
        $this.countdown(finalDate, function (event: { strftime: (arg0: string) => any; }) {
          $this.html(
            event.strftime(
              '<div class="single-countdown"><span class="single-countdown__time">%D</span><span class="single-countdown__text">Days</span></div><div class="single-countdown"><span class="single-countdown__time">%H</span><span class="single-countdown__text">Hours</span></div><div class="single-countdown"><span class="single-countdown__time">%M</span><span class="single-countdown__text">Minutes</span></div><div class="single-countdown"><span class="single-countdown__time">%S</span><span class="single-countdown__text">Seconds</span></div>'
            )
          );
        });
      });

      /*----------  instagram image slider  ----------*/

      jQuery(window).on("load", function () {
        // User Changeable Access
        // var instagramFeedGrid = function () {
        //   $.instagramFeed({
        //     username: "creative.devitems",
        //     container: "#instagramFeed",
        //     display_profile: false,
        //     display_biography: false,
        //     display_gallery: true,
        //     callback: null,
        //     styling: false,
        //     items: 8
        //   });
        // };

        // instagramFeedGrid();

        // var instagramFeedSlider = function () {
        //   $.instagramFeed({
        //     username: "portfolio.devitems",
        //     container: "#instagramFeedTwo",
        //     display_profile: false,
        //     display_biography: false,
        //     display_gallery: true,
        //     callback: null,
        //     styling: false,
        //     items: 8
        //   });
        // };

        // instagramFeedSlider();

        // var instagramFeedSliderTwo = function () {
        //   $.instagramFeed({
        //     username: "creative.devitems",
        //     container: "#instagramFeedThree",
        //     display_profile: false,
        //     display_biography: false,
        //     display_gallery: true,
        //     callback: null,
        //     styling: false,
        //     items: 8
        //   });
        // };

        // instagramFeedSliderTwo();

        $("#instagramFeedThree").on("DOMNodeInserted", function (e: { target: { className: string; }; }) {
          if (e.target.className === "instagram_gallery") {
            $(".instagram-carousel .instagram_gallery").slick({
              slidesToShow: 3,
              slidesToScroll: 1,
              autoplay: false,
              dots: false,
              arrows: true,
              prevArrow:
                '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
              nextArrow:
                '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
              responsive: [
                {
                  breakpoint: 1499,
                  settings: {
                    slidesToShow: 3
                  }
                },
                {
                  breakpoint: 1199,
                  settings: {
                    slidesToShow: 3
                  }
                },
                {
                  breakpoint: 991,
                  settings: {
                    slidesToShow: 2
                  }
                },
                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: 1
                  }
                },
                {
                  breakpoint: 575,
                  settings: {
                    slidesToShow: 1
                  }
                },
                {
                  breakpoint: 479,
                  settings: {
                    slidesToShow: 1
                  }
                }
              ]
            });
          }
        });

        $("#instagramFeedTwo").on("DOMNodeInserted", function (e: { target: { className: string; }; }) {
          if (e.target.className === "instagram_gallery") {
            $(".instagram-carousel-type2 .instagram_gallery").slick({
              slidesToShow: 4,
              slidesToScroll: 1,
              autoplay: false,
              dots: false,
              arrows: true,
              prevArrow:
                '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
              nextArrow:
                '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
              responsive: [
                {
                  breakpoint: 1499,
                  settings: {
                    slidesToShow: 4
                  }
                },
                {
                  breakpoint: 1199,
                  settings: {
                    slidesToShow: 4
                  }
                },
                {
                  breakpoint: 991,
                  settings: {
                    slidesToShow: 2
                  }
                },
                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: 1
                  }
                },
                {
                  breakpoint: 575,
                  settings: {
                    slidesToShow: 1
                  }
                },
                {
                  breakpoint: 479,
                  settings: {
                    slidesToShow: 1
                  }
                }
              ]
            });
          }
        });

        /*----------  newsletter popup  ----------*/

        if (screenSize >= 767) {
          $("#newsletter-popup-body").addClass("newsletter-overlay-active");

          setTimeout(function () {
            $("#newsletter-content").addClass("show-popup");
          }, 1000);
        }
      });

      /*----------  cloth tag positioning  ----------*/

      var clothTag = $(".cloth-tag");

      clothTag.each(() => {
        var $this = $(this),
          topValue = $this.data("top"),
          leftValue = $this.data("left");

        $this.css({ top: topValue, left: leftValue });
      });

      $(".cloth-tag__content").addClass("inactive");

      $(".cloth-tag__icon").on("click", () => {
        $(this).siblings(".cloth-tag__content").toggleClass("active inactive");
      });

      /*----------  magnific popup  ----------*/

      // $(".popup-video").magnificPopup({
      //   type: "iframe",
      //   mainClass: "mfp-fade",
      //   removalDelay: 160,
      //   preloader: false,
      //   fixedContentPos: false
      // });

      /*----------  smooth scroll on shoppable home  ----------*/

      $("#smooth-scroll-section").on("click", (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        $("html, body").animate(
          {
            scrollTop: $($.attr(this, "href")).offset().top - sticky.height() - 50
          },
          500
        );
      });

      /*----------   Quantity Counter  ----------*/

      $(".pro-qty").append('<a href="#" class="inc qty-btn">+</a>');
      $(".pro-qty").prepend('<a href="#" class= "dec qty-btn">-</a>');
      $(".qty-btn").on("click", (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        var $button = $(this);
        var oldValue = $button.parent().find("input").val();
        if ($button.hasClass("inc")) {
          var newVal = parseFloat(oldValue) + 1;
        } else {
          // Don't allow decrementing below zero
          if (oldValue > 0) {
            var newVal = parseFloat(oldValue) - 1;
          } else {
            newVal = 0;
          }
        }
        $button.parent().find("input").val(newVal);
      });

      /*---------- custom quick view  ----------*/

      //final width --> this is the quick view image slider width
      //maxQuickWidth --> this is the max-width of the quick-view panel
      var sliderFinalWidth = 400,
        maxQuickWidth = 900;

      //open the quick view panel
      $(".cd-trigger").on("click", (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        var selectedImage = $(this)
          .closest(".single-product__image")
          .find(".image-wrap")
          .children("img")
          .eq(0),
          id = $(this).attr("href"),
          slectedImageUrl = selectedImage.attr("src");

        $("body").addClass("overlay-layer");
        animateQuickView(
          id,
          selectedImage,
          sliderFinalWidth,
          maxQuickWidth,
          "open"
        );

        //update the visible slider image in the quick view panel
        //you don't need to implement/use the updateQuickView if retrieving the quick view data with ajax
        //updateQuickView(slectedImageUrl);
      });

      //close the quick view panel
      $("body").on("click", (event: { target: any; preventDefault: () => void; }) => {
        if (
          $(event.target).is(".cd-close") ||
          $(event.target).is("body.overlay-layer")
        ) {
          event.preventDefault();
          var id = $(this).find(".cd-quick-view.add-content");
          closeQuickView(id, sliderFinalWidth, maxQuickWidth);
        }
      });
      // $(document).keyup(function(event){
      // 	if(event.which=='27'){
      //         var id = $('body').find('.cd-quick-view.add-content');
      // 		closeQuickView(id, sliderFinalWidth, maxQuickWidth);
      // 	}
      // });

      //quick view slider Update On Navigation
      $(".cd-quick-view").on("click", ".cd-slider-navigation a", (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        var $this = $(this);
        updateSliderNav($this);
      });

      //quick view slider Update On Pagination
      $(".cd-quick-view").on("click", ".cd-slider-pagination a", (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        var $this = $(this),
          $li = $this.parents("li");

        $li.addClass("active").siblings().removeClass("active");

        updateSliderPage($this);
      });

      //center quick-view on window resize
      $(window).on("resize", function () {
        if ($(".cd-quick-view").hasClass("is-visible")) {
          window.requestAnimationFrame(resizeQuickView);
        }
      });

      /*Update Quick View Slider With Navigation*/
      function updateSliderNav(navigation: { parents: (arg0: string) => { (): any; new(): any; find: { (arg0: string): any; new(): any; }; children: { (arg0: string): any; new(): any; }; }; hasClass: (arg0: string) => any; }) {
        var sliderConatiner = navigation
          .parents(".cd-slider-wrapper")
          .find(".cd-slider"),
          activeSlider = sliderConatiner.children(".selected"),
          sliderPanilation = navigation
            .parents(".cd-slider-wrapper")
            .children(".cd-slider-pagination");

        sliderPanilation.children("li").removeClass("active");

        activeSlider.removeClass("selected");
        if (navigation.hasClass("cd-next")) {
          if (!activeSlider.is(":last-child")) {
            activeSlider.next().addClass("selected");
            sliderPanilation
              .children("li")
              .eq(activeSlider.next().index())
              .addClass("active");
          } else {
            sliderConatiner.children("li").eq(0).addClass("selected");
            sliderPanilation
              .children("li")
              .eq(sliderConatiner.children("li").eq(0).index())
              .addClass("active");
          }
        } else {
          if (!activeSlider.is(":first-child")) {
            activeSlider.prev().addClass("selected");
            sliderPanilation
              .children("li")
              .eq(activeSlider.prev().index())
              .addClass("active");
          } else {
            sliderConatiner.children("li").last().addClass("selected");
            sliderPanilation
              .children("li")
              .eq(sliderConatiner.children("li").last().index())
              .addClass("active");
          }
        }
      }

      /*Update Quick View Slider With Pagination*/
      function updateSliderPage(pagination: { parents: (arg0: string) => { (): any; new(): any; find: { (arg0: string): any; new(): any; }; }; parent: (arg0: string) => { (): any; new(): any; index: { (): any; new(): any; }; }; }) {
        var sliderConatiner = pagination
          .parents(".cd-slider-wrapper")
          .find(".cd-slider"),
          sliderItem = sliderConatiner.children("li"),
          paginationIndex = pagination.parent("li").index();

        sliderItem.removeClass("selected");
        sliderItem.eq(paginationIndex).addClass("selected");
      }

      /*Update Quick View Slider & Product Image On Close*/
      function updateSliderClose(close: { siblings: (arg0: string) => { (): any; new(): any; find: { (arg0: string): any; new(): any; }; }; }) {
        var sliderConatiner = close
          .siblings(".cd-slider-wrapper")
          .find(".cd-slider"),
          sliderItem = sliderConatiner.children("li");

        sliderItem.removeClass("selected");
        sliderItem.eq(0).addClass("selected");
      }

      /*UpdatePagination On Close*/
      function updatePaginationClose(close: { siblings: (arg0: string) => { (): any; new(): any; find: { (arg0: string): any; new(): any; }; }; }) {
        var paginationConatiner = close
          .siblings(".cd-slider-wrapper")
          .find(".cd-slider-pagination"),
          paginationItem = paginationConatiner.children("li");

        paginationItem.removeClass("active");
        paginationItem.eq(0).addClass("active");
      }

      //    /*Update Quick View Slide Item*/
      //	function updateQuickView(url) {
      //		$('.cd-quick-view .cd-slider li').removeClass('selected').find('img[src="'+ url +'"]').parent('li').addClass('selected');
      //	}

      /*Resize Quick View*/
      function resizeQuickView() {
        var quickViewLeft = ($(window).width() - $(".cd-quick-view").width()) / 2,
          quickViewTop = ($(window).height() - $(".cd-quick-view").height()) / 2;
        $(".cd-quick-view").css({
          top: quickViewTop,
          left: quickViewLeft
        });
      }

      function closeQuickView(id: any, finalWidth: number, maxQuickWidth: number) {
        var close = $(".cd-quick-view.is-visible .cd-close"),
          updateSliderImage = updateSliderClose(close),
          updateSliderPage = updatePaginationClose(close),
          activeSliderUrl = close
            .siblings(".cd-slider-wrapper")
            .find(".selected img")
            .attr("src"),
          selectedImage = $(".empty-box").find("img").eq(0);
        //update the image in the gallery
        if (
          !$(".cd-quick-view").hasClass("velocity-animating") &&
          $(".cd-quick-view").hasClass("add-content")
        ) {
          selectedImage.attr("src", activeSliderUrl);
          animateQuickView(id, selectedImage, finalWidth, maxQuickWidth, "close");
        } else {
          closeNoAnimation(id, selectedImage, finalWidth, maxQuickWidth);
        }
      }

      /*Open Quick View*/
      // function animateQuickView(
      //   id: any,
      //   image: { parent: (arg0: string) => any; offset: () => { (): any; new(): any; top: number; left: any; }; width: () => any; height: () => any; },
      //   finalWidth: string | number,
      //   maxQuickWidth: number,
      //   animationType: string
      // ) {
      //   //store some image data (width, top position, ...)
      //   //store window data to calculate quick view panel position
      //   var parentListItem = image.parent(".image-wrap"),
      //     topSelected = image.offset().top - $(window).scrollTop(),
      //     leftSelected = image.offset().left,
      //     widthSelected = image.width(),
      //     heightSelected = image.height(),
      //     windowWidth = $(window).width(),
      //     windowHeight = $(window).height(),
      //     finalLeft = (windowWidth - finalWidth) / 2,
      //     finalHeight = (finalWidth * heightSelected) / widthSelected,
      //     finalTop = (windowHeight - finalHeight) / 2,
      //     quickViewWidth =
      //       windowWidth * 0.8 < maxQuickWidth ? windowWidth * 0.8 : maxQuickWidth,
      //     quickViewLeft = (windowWidth - quickViewWidth) / 2;

      //   if (animationType == "open") {
      //     //hide the image in the gallery
      //     parentListItem.addClass("empty-box");
      //     //place the quick view over the image gallery and give it the dimension of the gallery image
      //     $(id)
      //       .css({
      //         top: topSelected,
      //         left: leftSelected,
      //         width: widthSelected
      //       })
      //       .velocity(
      //         {
      //           //animate the quick view: animate its width and center it in the viewport
      //           //during this animation, only the slider image is visible
      //           top: finalTop + "px",
      //           left: finalLeft + "px",
      //           width: finalWidth + "px"
      //         },
      //         1000,
      //         [400, 20],
      //         function () {
      //           //animate the quick view: animate its width to the final value
      //           $(id)
      //             .addClass("animate-width")
      //             .velocity(
      //               {
      //                 left: quickViewLeft + "px",
      //                 width: quickViewWidth + "px"
      //               },
      //               300,
      //               "ease",
      //               function () {
      //                 //show quick view content
      //                 $(id).addClass("add-content");
      //               }
      //             );
      //         }
      //       )
      //       .addClass("is-visible");
      //   } else {
      //     //close the quick view reverting the animation
      //     $(id)
      //       .removeClass("add-content")
      //       .velocity(
      //         {
      //           top: finalTop + "px",
      //           left: finalLeft + "px",
      //           width: finalWidth + "px"
      //         },
      //         300,
      //         "ease",
      //         function () {
      //           $("body").removeClass("overlay-layer");
      //           $(id)
      //             .removeClass("animate-width")
      //             .velocity(
      //               {
      //                 top: topSelected,
      //                 left: leftSelected,
      //                 width: widthSelected
      //               },
      //               500,
      //               "ease",
      //               function () {
      //                 $(id).removeClass("is-visible");
      //                 parentListItem.removeClass("empty-box");
      //               }
      //             );
      //         }
      //       );
      //   }
      // }
      /*Close Quick View*/
      function closeNoAnimation(id: { velocity: (arg0: string) => { (): any; new(): any; removeClass: { (arg0: string): { (): any; new(): any; css: { (arg0: { top: number; left: any; width: any; }): void; new(): any; }; }; new(): any; }; }; }, image: { parent: (arg0: string) => any; offset: () => { (): any; new(): any; top: number; left: any; }; width: () => any; }, finalWidth: any, maxQuickWidth: any) {
        var parentListItem = image.parent(".image-wrap"),
          topSelected = image.offset().top - $(window).scrollTop(),
          leftSelected = image.offset().left,
          widthSelected = image.width();

        $("body").removeClass("overlay-layer");
        parentListItem.removeClass("empty-box");

        id.velocity("stop")
          .removeClass("add-content animate-width is-visible")
          .css({
            top: topSelected,
            left: leftSelected,
            width: widthSelected
          });
      }

      /*----------  perfect scroll bar active  ----------*/

      // $(".ps-scroll").each( () => {
      //   if ($(".ps-scroll").length) {
      //     const ps = new PerfectScrollbar($(this)[0]);
      //   }
      // });

      /*----------  sticky sidebar   ----------*/

      // $(".sidebar-sticky").stickySidebar({
      //   topSpacing: 90,
      //   bottomSpacing: -90,
      //   minWidth: 768
      // });

      /*----------  isotope  ----------*/

      var activeId = $(".product-filter-menu li");

      activeId.on("click", () => {
        var $this = $(this),
          filterValue = $this.data("filter");

        $(".product-isotope").isotope({
          filter: filterValue,
          layoutMode: "fitRows"
        });

        activeId.removeClass("active");
        $this.addClass("active");
      });

      /*----------   Nice Select  ----------*/

      // $(".nice-select").niceSelect();

      /*----------  sidebar category dropdown  ----------*/

      var sidebarCategoryParent = $(
        ".single-filter-widget--list--category li.has-children, .single-sidebar-widget--list--category li.has-children"
      );
      sidebarCategoryParent.append('<a href="#" class="expand-icon">+</a>');

      var expandIcon = $(".expand-icon");
      expandIcon.on("click", (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        $(this).prev("ul").slideToggle();
        var htmlAfter = "-";
        var htmlBefore = "+";

        if ($(this).html() == htmlBefore) {
          $(this).html(htmlAfter);
        } else {
          $(this).html(htmlBefore);
        }
      });

      /*----------  shop advance filter area toggle  ----------*/

      $("#advance-filter-active-btn").on("click", () => {
        $(this).toggleClass("active");
        $("#shop-advance-filter-area").slideToggle();
      });

      /*----------  price filter  ----------*/

      // $("#price-range").slider({
      //   range: true,
      //   min: 25,
      //   max: 350,
      //   values: [25, 350],
      //   slide: function (event: any, ui: { values: string[]; }) {
      //     $("#price-amount").val(
      //       "Price: " + "$" + ui.values[0] + " - $" + ui.values[1]
      //     );
      //   }
      // });
      // $("#price-amount").val(
      //   "Price: " +
      //     "$" +
      //     $("#price-range").slider("values", 0) +
      //     " - $" +
      //     $("#price-range").slider("values", 1)
      // );

      /*----------  product view mode  ----------*/

      $(".grid-icons a").on("click", (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        var shopProductWrap = $(".shop-product-wrap");
        var viewMode = $(this).data("target");

        /*----------  reinitialize isotope  ----------*/

        shopProductWrap.isotope();
        shopProductWrap.isotope("destroy");

        $(".grid-icons a").removeClass("active");
        $(this).addClass("active");
        shopProductWrap
          .removeClass("three-column four-column five-column list")
          .addClass(viewMode);

        if (viewMode == "three-column") {
          shopProductWrap
            .children()
            .addClass("col-lg-4")
            .removeClass("col-lg-3 col-lg-is-5");
        }

        if (viewMode == "four-column") {
          shopProductWrap
            .children()
            .addClass("col-lg-3")
            .removeClass("col-lg-4 col-lg-is-5");
        }

        if (viewMode == "five-column") {
          shopProductWrap
            .children()
            .addClass("col-lg-is-5")
            .removeClass("col-lg-3 col-lg-4");
        }
      });

      /*----------  single product big image slider  ----------*/

      $(".shop-product__big-image-gallery-slider").each(() => {
        var $this = $(this);
        var $row = $this.attr("data-row")
          ? parseInt($this.attr("data-row"), 10)
          : 1;
        $this.slick({
          infinite: false,
          arrows: true,
          dots: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: $row,
          prevArrow:
            '<button class="slick-prev"><i class="ti-angle-left"></i></button>',
          nextArrow:
            '<button class="slick-next"><i class="ti-angle-right"></i></button>',

          responsive: [
            {
              breakpoint: 1499,
              settings: {
                slidesToShow: 1
              }
            },
            {
              breakpoint: 1199,
              settings: {
                slidesToShow: 1
              }
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 1
              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1
              }
            },
            {
              breakpoint: 575,
              settings: {
                slidesToShow: 1
              }
            },
            {
              breakpoint: 479,
              settings: {
                slidesToShow: 1
              }
            }
          ]
        });
      });

      /*----------  single product small image slider  ----------*/

      $(".shop-product__small-image-gallery-slider").each(() => {
        var $this = $(this);
        var $row = $this.attr("data-row")
          ? parseInt($this.attr("data-row"), 10)
          : 1;
        $this.slick({
          infinite: true,
          arrows: true,
          dots: false,
          slidesToShow: 5,
          centerMode: true,
          centerPadding: "15px",
          slidesToScroll: 1,
          rows: $row,
          prevArrow:
            '<button class="slick-prev"><i class="ti-angle-left"></i></button>',
          nextArrow:
            '<button class="slick-next"><i class="ti-angle-right"></i></button>',
          asNavFor: ".shop-product__big-image-gallery-slider",
          focusOnSelect: true,
          responsive: [
            {
              breakpoint: 1499,
              settings: {
                slidesToShow: 5
              }
            },
            {
              breakpoint: 1199,
              settings: {
                slidesToShow: 4
              }
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 6
              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 4
              }
            },
            {
              breakpoint: 575,
              settings: {
                slidesToShow: 4
              }
            },
            {
              breakpoint: 479,
              settings: {
                slidesToShow: 2
              }
            }
          ]
        });
      });

      /*----------  single product small image slider vertical  ----------*/

      $(".shop-product__small-image-gallery-slider--vertical").each(() => {
        var $this = $(this);
        var $row = $this.attr("data-row")
          ? parseInt($this.attr("data-row"), 10)
          : 1;
        $this.slick({
          infinite: true,
          arrows: true,
          dots: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          vertical: true,
          centerMode: true,
          rows: $row,
          prevArrow:
            '<button class="slick-prev"><i class="ti-angle-left"></i></button>',
          nextArrow:
            '<button class="slick-next"><i class="ti-angle-right"></i></button>',
          asNavFor: ".shop-product__big-image-gallery-slider",
          focusOnSelect: true,
          responsive: [
            {
              breakpoint: 1499,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 1199,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 3,
                vertical: false,
                arrows: false,
                centerMode: true,
                centerPadding: "15px"
              }
            },
            {
              breakpoint: 575,
              settings: {
                slidesToShow: 3,
                vertical: false,
                arrows: false,
                centerMode: true,
                centerPadding: "15px"
              }
            },
            {
              breakpoint: 479,
              settings: {
                slidesToShow: 2,
                vertical: false,
                arrows: false,
                centerMode: true,
                centerPadding: "15px"
              }
            }
          ]
        });
      });

      /*----------  lightgallery and zoom activation  ----------*/

      //zoom
      // $(".shop-product__big-image-gallery-slider .single-image").zoom();
      // $(".shop-product__big-image-gallery-sticky .single-image").zoom();

      //lightgallery
      var productThumb = $(
        ".shop-product__big-image-gallery-slider .single-image img, .shop-product__big-image-gallery-sticky .single-image img"
      ),
        imageSrcLength = productThumb.length,
        images: { src: any; }[] = [];
      for (var i = 0; i < imageSrcLength; i++) {
        images[i] = { src: productThumb[i].src };
      }

      $(".btn-zoom-popup").on("click", () => {
        $(this).lightGallery({
          thumbnail: false,
          dynamic: true,
          autoplayControls: false,
          download: false,
          actualSize: false,
          share: false,
          hash: false,
          index: 0,
          dynamicEl: images
        });
      });

      /*----------  video background	 ----------*/

      var videoBg = $(".video-bg");

      videoBg.each(function (index: any, elem: any) {
        var element = $(elem),
          videoUrl = element.data("url");

        videoBg.YTPlayer({
          videoURL: videoUrl,
          showControls: false,
          showYTLogo: false,
          mute: true,
          quality: "highres",
          containment: ".video-area",
          ratio: "auto"
        });
      });

      /*----------  newsletter overlay close  ----------*/

      if (screenSize >= 767) {
        $("#newsletter-popup-close-icon").on("click", function () {
          $("body")
            .removeClass("newsletter-overlay-active")
            .addClass("newsletter-overlay-inactive");
          $("#newsletter-content").removeClass("show-popup").addClass("hide-popup");
        });
      }

      /*----------   Payment method select  ----------*/

      $('[name="payment-method"]').on("click", () => {
        var $value = $(this).attr("value");

        $(".single-method p").slideUp();
        $('[data-method="' + $value + '"]').slideDown();
      });

      /*----------   Shipping form toggle  ----------*/

      $("[data-shipping]").on("click", function () {
        if ($("[data-shipping]:checked").length > 0) {
          $("#shipping-form").slideDown();
        } else {
          $("#shipping-form").slideUp();
        }
      });

      /*=============================================
        =            background image            =
        =============================================*/

      var bgSelector = $(".bg-img");
      bgSelector.each(function (index: any, elem: any) {
        var element = $(elem),
          bgSource = element.data("bg");
        element.css("background-image", "url(" + bgSource + ")");
      });

    })(jQuery);
  }

  getprofile() {
    this.request.fetchuserprofile(this.userid).subscribe((response: any) => {
      this.profiledetail = response;
      console.log("this.profiledetail", this.profiledetail);
      setTimeout(() => {
        this.loaderimage = false;
      }, 2000);

    });
  }
  viewwishlist() {
    this.request.fetchuserwishlist(this.userid).subscribe((response: any) => {
      this.Wishlist = response.data;
      console.log("this.Wishlist", this.Wishlist);
      this.Wlength = this.Wishlist.length;
      this.loader = false;
    });
  }
  viewcart() {
    this.request.fetchusercart(this.userid).subscribe((response: any) => {
      this.Cart = response;
      console.log("this.Cart", this.Cart);    
    });
  }
  viewcartcount() {
    this.request.cartcount(this.userid).subscribe((response: any) => {
      this.cartlength = response.cartcount;
    });
  }
  gotocart() {
    if (this.cartlength == 0) {
      this.toastr.info('Cart is empty', '');
    }
    else {
      $("#cart-overlay").removeClass("active-cart-overlay");
      $(".cart-overlay-close").addClass("inactive").removeClass("active");
      $("body").removeClass("active-body-search-overlay");
      this.router.navigate(['/cart']);
    }
  }
  gotowishlist() {
    if (this.Wlength == 0) {
      this.toastr.info('Wishlist is empty', '');
    }
    else {
      $("#wishlist-overlay").removeClass("active-wishlist-overlay");
      $(".wishlist-overlay-close").addClass("inactive").removeClass("active");
      $("body").removeClass("active-body-search-overlay");
      this.router.navigate(['/wishlist']);
    }
  }
  gotocheckout() {
    $("#cart-overlay").removeClass("active-cart-overlay");
    $(".cart-overlay-close").addClass("inactive").removeClass("active");
    $("body").removeClass("active-body-search-overlay");
    this.router.navigate(['/checkout']);
  }
  deleteRecord(id: any) {
    this.request.deletewishproud(id).subscribe((response: any) => {
      if (response.message == "Product is successfully removed from your wishlist") {
        this.viewwishlist();
        this.deleteRecordSuccess();
      }
      else {
        this.toastr.error(response.message);
      }
    }, (error: any) => {
      console.log(error);
    });
  }
  deleteRecord2(id: any) {
    this.request.deleteproud(id).subscribe((response: any) => {
      if (response.message == "Product is successfully removed from your cart") {
        this.viewcart();
        this.viewcart3();
        this.viewcartcount();
        this.deleteRecordSuccess();
      }
      else {
        this.toastr.error(response.message);
      }
    }, (error: any) => {
      console.log(error);
    });
  }
  viewcart3() {
    this.request.fetchsummery(this.userid).subscribe((response: any) => {
      this.Summery = response;
      this.Grandtot = this.Summery.grand_total
      this.subtot = this.Summery.sub_total
      this.grandtotal = this.Summery.grand_total
    });
  }
  addRecordSuccess() {
    this.toastr.success('Added Successfully', '');
  }
  editRecordSuccess() {
    this.toastr.success('Edit Record Successfully', '');
  }
  deleteRecordSuccess() {
    this.toastr.error(' Removed Successfully', '');
  }

  filterDatatable(event: any) {
    if (event.target.value == '') {
    }
    else {
      let key = event.target.value;
      window.scroll(0, 0);
      this.router.navigate(['shopbyproduct', key]);
    }
  }

  search1(form: FormGroup) {
    let key = form.value.key;
    if (key == '') {
    }
    else {
      window.scroll(0, 0);
      this.search.reset();
      this.router.navigate(['shopbyproduct', key]);
    }
  }

  logout1() {
    this.authService.logout().subscribe(res => {
      this.toastr.success('Logout Successfully', '');
      this.router.navigate(['/home'])
        .then(() => {
          window.location.reload();
        });
    })
  }

  logout() {
    this.sharedService.sendlogout()
  }

  viewallcategory() {
    this.request.getallcat().subscribe((response: any) => {
      this.Allcat = response.data;
      console.log("alllcat", this.Allcat);
      window.scroll(0, 0);
    },
      (error: any) => {
        console.log("error", error);
      });
  }
  viewsubcat(id: any, i: any) {
    this.cat_id = id
    this.subItem = i
    this.subItem1 = -1;
    this.subItem2 = -1;
    this.subItem3 = -1;
    this.Subcat = this.Allcat[i].children;
    this.Subcat2 = []
    this.Subcat3 = []
    this.request.getsubcategoryofcat(id).subscribe((res: any) => {
      this.Subcat = res.data;
      console.log("this.Subcat", this.Subcat);
    }, (error: any) => {
      console.log("error", error);
    });
  }

  viewsubcat2(id: any, i: any) {
    this.subcat_id = id
    this.subItem1 = i;
    this.subItem2 = -1;
    this.subItem3 = -1;
    this.Subcat2 = this.Subcat[i].children
    this.Subcat3 = []
    this.request.getsubcategoryofcat(id).subscribe((res: any) => {
      this.Subcat2 = res.data;
    }, (error: any) => {
      console.log("error", error);
    });
  }

  viewsubcat3(id: any, i: any) {
    this.catid1_id = id
    this.subItem2 = i;
    this.subItem3 = -1;
    this.Subcat3 = this.Subcat2[i].children
    this.request.getsubcategoryofcat(id).subscribe((res: any) => {
      this.Subcat3 = res.data;
    }, (error: any) => {
      console.log("error", error);
    });
  }

  viewsubcat4(id: any, i: any) {
    this.subItem3 = i;
    this.subcategory1 = id
  }

  gotocategory(id: any) {
    console.log("goto");
    this.router.navigate(['category', id]);
  }

  gotocategory2(id: any) {
    this.router.navigate(['category', this.cat_id], { queryParams: { subcategory: id } });
  }

  gotocategory3(id: any) {
    this.router.navigate(['category', this.cat_id], { queryParams: { subcategory: this.subcat_id, category1: id, } });
  }

  gotocategory4(id: any) {
    console.log("id", id);
    this.router.navigate(['category', this.cat_id], { queryParams: { subcategory: this.subcat_id, category1: this.catid1_id, subcategory1: id } });
  }

  openlogin(){
    this.modalService.open(LoginComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
    });
  }
  
  openkyc(){
    this.modalService.open(KycComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
    });
  }
}

function animateQuickView(id: any, selectedImage: any, finalWidth: number, maxQuickWidth: number, arg4: string) {
  throw new Error('Function not implemented.');
}

