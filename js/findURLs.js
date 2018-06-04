var markup = document.documentElement.innerHTML;
var urlRegex;

(function () {

//  var urlRegex = /\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/gi;


  //  var urlRegex = /((https?|ftp):\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/ig;
  urlRegex = /((https?|ftp):\/\/(?:www\.|(?!www))[\w][\w-]+[\w]\.[\w\/\.]{2,}|www\.[\w][\w-]+[\w]\.[\w\/\.]{2,})/gi;

  //  var txt = "www.bing.com\/';function www.demo.com	http://foo.co.uk/ http://regexr.com/foo.html?q=bar https://mediatemple.net?bd=jhfad#com http://l www.google.com  http://www.youtube.com/watch?v=hVW9eH_PUi8 ftp://fgf.com"

  getURLs(urlRegex);


  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      if (request.regexp != null) {
        var isValid = true;
        try {
          urlRegex = new RegExp(request.regexp, "gi");
        } catch (e) {
          isValid = false;
        }
        if (!isValid) {
          chrome.runtime.sendMessage({ invalidURL: true }, function (response) {
          });
        } else {
          getURLs(urlRegex);
        }
      }
  });

}());

function getURLs(urlRegex) {
  var res = [];
  var match = null;

  if (urlRegex.global) {
    while (match = urlRegex.exec(markup)) {
      console.log(match);
      res.push(match);
    }
  }

  var urls = [];

  for (i = 0; i < res.length; i++) {
    urls[i] = res[i][0];
    console.log(res[i][0]);
  }

  if (res == null)
    console.log("no URLs");

  chrome.runtime.sendMessage({ urls: urls }, function (response) {
  });
}

