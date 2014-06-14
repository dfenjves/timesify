function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
  results = regex.exec(location.search);
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function svc_search_v2_articlesearch(data){
  var docs = data.response.docs;
  var doc = docs[Math.floor(Math.random()*docs.length)];

  $("#headline").text(doc.headline.main)
  $("#news-content").text(doc.abstract || doc.snippet)
}

function article_content(data){
  $("#content").html(data.content)
}


$(document).ready(function(){
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

  var url = getParameterByName("url");
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
});
