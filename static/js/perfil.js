var reference = null;

$(document).ready(function () {

    $("#perfil").click(function (e) {
        e.preventDefault();
        $("#menuPrincipal").load("Perfil.html");
        $("#appk").hide();
        $("#back_dash").hide();
    });

    $("#closePerfil").click(function (e) {
        e.preventDefault();
        $("#menuPrincipal").empty();
        $("#appk").show();
        $("#back_dash").show();
    });
});


$(".updateBtn").click(function () {
    reference = this.id;
});

$(".saveBtn").click(function () {
    var newValue;
    var user = $(".username_h1").attr('id');
    if (this.id == 'passInput') {
        var actualPassword = $('#actualPassInput').val();
        if (validate_password(user, actualPassword)) {
            var newPassword = $('#newPassInput').val();
            updateProfile(reference, user, newPassword);
        } else {
            alert("Password inválida, tente outra vez");
        }


    } else {
        newValue = $("#newInput").val();
        updateProfile(reference, user, newValue);
    }
});

function updateProfile(reference, user, newValue) {
    $.ajax({
        url: "update_profile",
        type: "POST",
        async: false,
        data: {
            "user": user,
            "key": reference,
            "value": newValue
        },
        success: function () {
            alert("Perfil atualizado com sucesso");
            location.reload();
        },
        error: function () {
            alert("Error updating profile");
        }
    })
}

function validate_password(user, password) {
    var valid;
    $.ajax({
        url: "validate_password",
        type: "POST",
        async: false,
        data: {
            "user": user,
            "password": password
        },
        success: function () {
            valid = true;
        },
        error: function () {
            valid = false;
        }
    });
    return valid;
}



