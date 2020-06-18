$(document).ready(function () {
  // MODAL
  var modalText = {
    discover: {
      title: "RencontreEtPartage",
      tag: "PLATEFORME DE RENCONTRE AMICALE.",
      detail: "Rencontre.nc et une plateforme de rencontre amicale mais attention ne vous laisser pas avoir car il y a que la page inscription de disponible",
      link: "fabricedujardinportfolio.github.io/site/sitederencontreetdepartage/index.html",
    },
    ordering: {
      title: "STREAMINGNC",
      tag: "PLATEFORME DE STREAMING.",
      detail: "'Attention se site est en construction': StreamingNc est une plate-forme vidéo en temps réel qui permet aux clients locaux de bénéficié des meilleur vidéo.",
      link: "fabricedujardinportfolio.github.io/site/Streaming/index.html"

    },
    newrelic: {
      title: "Khan||fitnessClub",
      tag: "PLATEFORME DE FITNESS.",
      detail: "Attention se site est en construction : Khan||fitnessClub est une plateforme de sport individuel qui offre des multitude de choie pour tout type de persone ",
      link: "fabricedujardinportfolio.github.io/site/Sport/index.html",
    },
    // roambi: {
    //   title: "Roambi.com",
    //   tag: "BUSINESS ANALYTICS.",
    //   detail:
    //     "Roambi provides analytics, reporting, and business intelligence for companies to use on the go. A Wordpress hosted site written in PHP and Javascript with Hubspot Integration.",
    //   link: "http://www.roambi.com",
    // },
    walker: {
      title: "CITY EXPRESS",
      tag: "Site vitrine de déménagement.",
      detail: "Attention se site est en construction : City express est un site spécialisé dans le déménagement en nouvelle calédonie",
      link: "https://www.cityexpress.nc/",
    },
    powur: {
      title: "Samui Consulting",
      tag: "Site vitrine d'agence immobiliére.",
      detail: " Attention se site est en construction : Samui consulting est un site qui référence les appartement ou terrain quel que soie son type pour les resident de thailand ",
      link: "http://samuiconsulting.test.nc/",
    },
    // mystand: {
    //   title: "MyStand",
    //   tag: "CROWD-FUNDED CHARITY.",
    //   detail:
    //     "MyStand is a crowd-funding, media sharing website, that has you donating actions instead of money out of your pocket. Single page App built with Node.js on Sails and Angular 2.0. Features social media sharing and large scale crowd-funding.",
    // },
    // never: {
    //   title: "NeverSurrender",
    //   tag: "ALS AWARENESS.",
    //   detail:
    //     "NeverSurrender is a platform for the new ALS foundation mobile app in hopes to raise awareness and research funding to fight ALS. Pure JavaScript marketing site to promote the new ALS NeverSurrender app.",
    // },
    // themall: {
    //   title: "The Mall",
    //   tag: "PEER GUIDED SHOPPING.",
    //   detail:
    //     "The Mall is a place to follow the latest fashion purchases of your friends and favorite celebrities. Built with Node.js and Handlebars. Features the ability to import thousands of top brands products into one shopping site.",
    // },
  };

  $("#gallery .button").on("click", function () {
    fillModal(this.id);
    $(".modal-wrap").addClass("visible");
  });

  $(".close").on("click", function () {
    $(".modal-wrap, #modal .button").removeClass("visible");
  });

  $(".mask").on("click", function () {
    $(".modal-wrap, #modal .button").removeClass("visible");
  });

  var carousel = $("#carousel"),
    slideWidth = 700,
    threshold = slideWidth / 3,
    dragStart,
    dragEnd;

  setDimensions();

  $("#next").click(function () {
    shiftSlide(-1);
  });
  $("#prev").click(function () {
    shiftSlide(1);
  });

  carousel.on("mousedown", function () {
    if (carousel.hasClass("transition")) return;
    dragStart = event.pageX;
    $(this).on("mousemove", function () {
      dragEnd = event.pageX;
      $(this).css("transform", "translateX(" + dragPos() + "px)");
    });
    $(document).on("mouseup", function () {
      if (dragPos() > threshold) {
        return shiftSlide(1);
      }
      if (dragPos() < -threshold) {
        return shiftSlide(-1);
      }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      slideWidth = $(window).innerWidth();
    }
    $(".carousel-wrap, .slide").css("width", slideWidth);
    $(".modal").css("max-width", slideWidth);
    $("#carousel").css("left", slideWidth * -1);
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass("transition")) return;
    dragEnd = dragStart;
    $(document).off("mouseup");
    carousel
      .off("mousemove")
      .addClass("transition")
      .css("transform", "translateX(" + direction * slideWidth + "px)");
    setTimeout(function () {
      if (direction === 1) {
        $(".slide:first").before($(".slide:last"));
      } else if (direction === -1) {
        $(".slide:last").after($(".slide:first"));
      }
      carousel.removeClass("transition");
      carousel.css("transform", "translateX(0px)");
    }, 700);
  }

  function fillModal(id) {
    $("#modal .title").text(modalText[id].title);
    $("#modal .detail").text(modalText[id].detail);
    $("#modal .tag").text(modalText[id].tag);
    if (modalText[id].link)
      $("#modal .button")
      .addClass("visible")
      .parent()
      .attr("href", modalText[id].link);

    $.each($("#modal li"), function (index, value) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($("#modal .slide"), function (index, value) {
      $(this).css({
        background: "url('img/slides/" + id + "-" + index + ".jpg') center center/cover",
        backgroundSize: "cover",
      });
    });
  }
});