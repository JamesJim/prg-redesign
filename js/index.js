
$('.wrapper').hide();
$('.footer').hide();



$(function(){




  function runAnimation(){
    console.log("running animation");
    $('.introAnimationLogo').animate({"left": "0"}, 2000)
      .delay(2000)
      .animate({"top": "0", "maxWidth": "300px"}, 700);

    $('.introAnimationText').animate({"right": "0"}, 2000)
      .delay(2000)
      .animate({"top": "1000px"}, 700);

    $('#introAnimationPage').delay(4000).animate({"opacity": "0"},
      {duration: 1000,
      complete: function(){
        $('#introAnimationPage').hide(),
        $('.wrapper').show();
        $('.footer').show();
        }
      });
  } //end runAnimation function

  runAnimation();

  var main = {};

  //function to compile object data into templates
  main.handlebars = function(data, templatePath, outputDiv){
    console.log('Running handlebars');
    console.log('Handlebars data', data);
    console.log('Handlebars templatePath', templatePath);
    console.log('Handlebars outputDiv', outputDiv);

    $.get(templatePath, function(template){
      var compiler = Handlebars.compile(template);
      console.log('Compiler: ', compiler);
      console.log('"data" inside .get template: ', data);


      var compiledHtml = compiler({data});

      $(outputDiv).html(compiledHtml);
      console.log('Handlebars compiled template: ', compiledHtml);

    });
  }; //end handlebars function

  //function to get JSON agents data, compile, and send to div
  main.fetchData = function(dataPath, handlebarsData, templatePath, outputDiv){
    console.log('Running fetchData');

    $.getJSON(dataPath, function(data){
      console.log('Running getJSON', data);
      handlebarsData = data ;

    }).done( function(){
      main.handlebars(handlebarsData, templatePath, outputDiv);
      console.log('div should be output');

    });
  }; //end fetchData function

  //call functions to get agents data, compile, send to page
  var agentsData;
  main.fetchData('js/agents.json', agentsData, 'agentstemplate.html', '#agentsTemplateOutput');

  //get offices data, compile, send to page
  var officesData;
  main.fetchData('js/offices.json', officesData, 'officestemplate.html', '#officesTemplateOutput');




// *****************SHOW/HIDE PAGES*************


  $('#aboutPage').hide();
  $('#agentsPage').hide();
  $('#searchPage').hide();
  $('#toolsPage').hide();

  $('.navAbout').on('click', function(){
    $('#homePage').hide();
    $('#agentsPage').hide();
    $('#searchPage').hide();
    $('#toolsPage').hide();
    $('#aboutPage').show();
  });

  $('.navAgents').on('click', function(){
    $('#homePage').hide();
    $('#aboutPage').hide();
    $('#searchPage').hide();
    $('#agentsPage').show();
    $('#toolsPage').hide();
    $('.agentProfiles').show();
  });

  $('.navHome').on('click', function(){
    $('#aboutPage').hide();
    $('#agentsPage').hide();
    $('#searchPage').hide();
    $('#toolsPage').hide();
    $('#homePage').show();
  });

  $('.navSearch').on('click', function(){
    $('#aboutPage').hide();
    $('#agentsPage').hide();
    $('#homePage').hide();
    $('#toolsPage').hide();
    $('#searchPage').show();
  });

  $('.navTools').on('click', function(){
    $('#aboutPage').hide();
    $('#agentsPage').hide();
    $('#homePage').hide();
    $('#searchPage').hide();
    $('#toolsPage').show();
  });


  // *****************HOVER/SHOW/HIDE EXTENDED AGENT PROFILES*************

  //hover for agent profile items
  $('section').on('mouseenter','.agentProfiles',function(){
    $(this).children().css('color','#ff9900');
  });

  //mouseleave only triggers when leaving the parent (mouseout triggers on the parent and any children)
  $('section').on('mouseleave','.agentProfiles',function(){
    $(this).children().css('color','white');
  });

  //hover for hidden profile items
  $('section').on('mouseenter','.agentHiddenProfileItem',function(){
    $(this).children('a').css('color','#ff9900');
  });

  $('section').on('mouseleave','.agentHiddenProfileItem',function(){
    $(this).children('a').css('color','white');
  });

  //reveal or hide hidden profile items
  $('section').on('click','.agentProfiles',function(){
    $(this).children('.agentHiddenProfile').slideToggle('fast');
  });

  // *****************FILTER AGENT PROFILES*************

  $('.agentsFilterListItem').on('click', function(){
    var $selection = $(this).attr("id");
    console.log($selection);
    $('.agentProfiles').hide();
    $("section[class*='"+$selection+"']").show();
  });

  // *****************ALTERNATE SHOW/HIDE OF FEATURE DIV*************



  main.fadeFeature = function(){

    var $elem = $('.featureText');
    var i = 0;
    var l = $elem.length;

    function startFade(){
      $elem.eq(i % l).fadeIn(700, function(){
        $elem.eq(i % l).delay(6000).fadeOut(700, startFade);
        i++;
      });
    }
    startFade();
  }

  main.fadeFeature();



  // *****************CAROUSEL SETTINGS*************


  $('.imgCarouselDiv').slick({
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 9000,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      // {
      //   breakpoint: 1024,
      //   settings: {
      //     slidesToShow: 1,
      //     slidesToScroll: 1,
      //     infinite: true,
      //     dots: true
      //   }
      // },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]

  });




































}); //end document.ready
