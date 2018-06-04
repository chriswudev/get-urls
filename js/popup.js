
var submit = document.getElementById("submit_button");
var input_regexp = document.getElementById("regexp");

submit.addEventListener("click", function (event) {
  var regexp_text = input_regexp.value;

  var text = input_regexp.value;

  var isValid = true;
  try {
    new RegExp("text");
  } catch (e) {
    isValid = false;
  }

  if (!isValid) {
    alert("Invalid regular expression!!! Please input valid expression.");
    input_regexp.focus();
  } else {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { regexp: text }, function (response) {

      });
    });
  }
})