function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
  results = regex.exec(location.search);
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function date2string(date){
  var date = new Date(date);
  var months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
                "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

  var month = months[ date.getMonth() ],
      day   = date.getDate(),
      year  = date.getFullYear();

  return month + " " + day + ", " + year;
}

function svc_search_v2_articlesearch(data){
  var docs = data.response.docs;
  var doc = docs[Math.floor(Math.random()*docs.length)];

  $("[data-role=subsection_name]").text(doc.subsection_name || doc.section_name)
  $("[data-role=headline]").text(doc.headline.main)
  $("[data-role=byline]").text(doc.byline.original)
  $("[data-role=date]").text(date2string(doc.pub_date))
  $("[data-role=abstract]").html(doc.abstract || doc.snippet)

  for(var i = 0; i < doc.multimedia.length; i++){
    var multimedia = doc.multimedia[i];
    if(multimedia.subtype == "xlarge")
      break;
  }
  if(multimedia){
    $("[data-role=image-container]").show()
    var url = "http://static01.nyt.com/" + multimedia.url;
    var image = $('<img/>', { src: url, height: multimedia.height, width: multimedia.width })
    $("[data-role=image]").html(image)
  }
}

function article_content(data){
  var content = $(data.content);
  content.find('img').remove()
  content.find('h1, h2, h3, h4').remove()
  content.find('p:empty').remove()
  content.find('strong').replaceWith(function(){
    return $('<span/>', { html: this.innerHTML })
  })
  $("[data-role=fake-news]").html(content)
}

var url = getParameterByName("url");
if(url){
  $.ajax({
    url: "http://api.nytimes.com/svc/search/v2/articlesearch.jsonp",
    data: {
      "sort": "newest",
      "api-key": "7fcada8d2ec5b00ecb81f0cec14db29a:7:69489929",
      "callback": "svc_search_v2_articlesearch",
      //"fl": "snippet,lead_paragraph,abstract,multimedia,headline,byline,web_url,section_name,news_desk",
      "fq": 'source:("The New York Times") AND section_name:("Business" "New York" "U.S." "World") AND type_of_material:("News")'
    },
    type: "GET",
    dataType: "script"
  });

  $.ajax({
    url: "http://api.embed.ly/1/extract",
    data: {
      key: "dfdc0e05b3a240b48dc082e50573bfe2",
      url: url,
      format: "json"
    },
    type: "GET",
    dataType: "jsonp",
    jsonpCallback: "article_content"
  });
}

$('html').addClass('has-big-ad')
