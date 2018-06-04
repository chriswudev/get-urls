var urls = [];
var receivedUrl = null;

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    receivedUrl = sender.tab.url;
    if (request.urls != null) {
      urls = request.urls;
    }
    console.log(receivedUrl);
    console.log("request", request);
    data = [[]];
    for (i = 0; i < request.urls.length; i++) {
      data[i] = [];
      data[i][0] = receivedUrl;
      data[i][1] = request.urls[i];
    }

    saveCsv(data);
  });


function saveCsv(data) {
  var filename = getFilename(receivedUrl);

  var csvContent = "data:text/csv;charset=utf-8,";
  data.forEach(function (infoArray, index) {

    dataString = infoArray.join(",");
    csvContent += index < data.length ? dataString + "\n" : dataString;

  });

  var encodedUri = encodeURI(csvContent);

  chrome.downloads.download({
    url: encodedUri,
    filename: "csv/" + filename,
  }, function (downloadId) { });
}

function getFilename(contentURL) {
  var name = contentURL.split('?')[0].split('#')[0];
  if (name) {
    name = name
        .replace(/^https?:\/\//, '')
        .replace(/[^A-z0-9]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^[_\-]+/, '')
        .replace(/[_\-]+$/, '');
    name = '-' + name;
  } else {
    name = '';
  }
  return 'URL' + name + '-' + Date.now() + '.csv';
}
