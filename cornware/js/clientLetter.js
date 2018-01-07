

$("document").ready(function () {
  //form validation
  $("#btn-client-letter").click(function (event) {
    event.preventDefault();
    let form = $(this).parents("form");
    let inputs = form.find("input, textarea");

    if (validateForm(inputs)) {
      $.ajax({
        type: "POST",
        crossDomain: true,
        url: "http://localhost:52515/api/clientLetter",
        data: {
          name: inputs.filter(".name")[0].value,
          email: inputs.filter(".email")[0].value,
          phone: inputs.filter(".phone")[0].value,
          message: inputs.filter(".message")[0].value
        },
        dataType: 'json',
        statusCode: {
          200: function () {
            form[0].reset();
            alert("Спасибо, Ваше сообщение отправлено");
          }
        }
      });
    }
  });
});