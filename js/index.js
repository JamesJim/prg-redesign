
$(function(){



  var main = {};

  //function to compile object data into agents template
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

  //get agents data, compile, send to page
  var agentsData;
  main.fetchData('js/agents.json', agentsData, 'agentstemplate.html', '#agentsTemplateOutput');

  //get offices data, compile, send to page
  var officesData;
  main.fetchData('js/offices.json', officesData, 'officestemplate.html', '#officesTemplateOutput');




// *****************SHOW/HIDE PAGES*************


  $('#aboutPage').hide();
  $('#agentsPage').hide();

  $('.navAbout').on('click', function(){
    $('#homePage').hide();
    $('#agentsPage').hide();
    $('#aboutPage').show();
  });

  $('.navAgents').on('click', function(){
    $('#homePage').hide();
    $('#aboutPage').hide();
    $('#agentsPage').show();
  });

  $('.navHome').on('click', function(){
    $('#aboutPage').hide();
    $('#agentsPage').hide();
    $('#homePage').show();
  });


  // *****************HOVER/SHOW/HIDE EXTENDED AGENT PROFILES*************

  $('section').on('mouseenter','.agentProfiles',function(){
    $(this).children().css('color','orange');
  });

  //mouseleave only triggers when leaving the parent (mouseout triggers on the parent and any children)
  $('section').on('mouseleave','.agentProfiles',function(){
    $(this).children().css('color','white');
  });



  $('section').on('click','.agentProfiles',function(){
    $(this).children('.agentHiddenProfile').slideToggle('fast');
  });




main.fadeFeature = function(){
  $('.featureText').toggle(1000).delay(10000);    main.fadeFeature();
}



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


  main.fadeFeature();


































}); //end document.ready
