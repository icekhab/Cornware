$("document").ready(function () {
    var cvFilePath;
    //form validation
    $("#btn-candidate-letter").click(function (event) {
        event.preventDefault();
        let form = $(this).parents("form");
        let inputs = form.find("input, textarea");

        if (validateForm(inputs)) {
            $.ajax({
                type: "POST",
                crossDomain: true,
                url: "http://localhost:52515/api/candidateLetter",
                data: {
                    name: inputs.filter(".name")[0].value,
                    email: inputs.filter(".email")[0].value,
                    phone: inputs.filter(".phone")[0].value,
                    message: inputs.filter(".message")[0].value,
                    cvPath: cvFilePath,
                    cvFileName: inputs.filter(".cv")[0].files[0].name
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

    $('#cvFile').on('change', function () {
        const file = this.files[0];

        var fd = new FormData();
        fd.append("file", file, file.name);

        $.ajax({
            type: "POST",
            crossDomain: true,
            url: "http://localhost:52515/api/file",
            data: fd,
            processData: false,  // tell jQuery not to process the data
            contentType: false,   // tell jQuery not to set contentType
            success: filePath => { cvFilePath = filePath; }
        });
    });

});