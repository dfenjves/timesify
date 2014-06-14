
function svc_search_v2_articlesearch(data){
  var docs = data.response.docs;
  console.log(docs)
}

function article_content(data){
  console.log(data)
}


$(document).ready(function(){
  $.ajax({
    url: "http://api.nytimes.com/svc/search/v2/articlesearch.jsonp",
    data: {
      "q": "new york times",
      "sort": "newest",
      "api-key": "7fcada8d2ec5b00ecb81f0cec14db29a:7:69489929",
      "callback": "svc_search_v2_articlesearch",
      //"fl": "snippet,lead_paragraph,abstract,multimedia,headline,byline,web_url,section_name,news_desk",
      "fq": 'source:("The New York Times") AND section_name:("Business" "New York" "U.S." "World") AND type_of_material:("News")'
    },
    type: "GET",
    dataType: "script"
  });

  var url = "http://www.tmz.com/2014/06/14/casey-kasem-body-death-family-feud/";
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
