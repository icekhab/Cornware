$("document").ready(function () {
  console.log(`transition - ${document.referrer}`);
  if (document.referrer.indexOf(window.location.hostname) === -1) {
    $.ajax({
      type: "POST",
      crossDomain: true,
      url: "http://localhost:52515/api/transition",
      data: { transitionUrl: document.referrer },
      dataType: 'json'
    });
  }
});