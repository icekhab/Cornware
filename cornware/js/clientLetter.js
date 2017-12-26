$("document").ready(function () {
  //form validation
  $("#btn-candidate-letter").click(function (event) {
    debugger
    let inputs = $(this).parents("form").find("input, textarea");

    if (validateForm(inputs)) {
      var fd = new FormData();
      //fd.append("candidateLatter", {
       // name: inputs.filter(".name")[0].value,
       // email: inputs.filter(".email")[0].value,
       // phone: inputs.filter(".phone")[0].value,
       // message: inputs.filter(".message")[0].value
      //});

      const file = inputs.filter(".cv")[0].files[0];

      fd.append("cv", file, file.name);

      $.ajax({
        type: "POST",
        crossDomain: true,        
        url: "http://localhost:52515/api/file",
        data: fd,
        processData: false,  // tell jQuery not to process the data
        contentType: false,   // tell jQuery not to set contentType
        success: () => {debugger; alert("Спасибо, Ваше сообщение отправлено");}
      });

      
    }
  });
});