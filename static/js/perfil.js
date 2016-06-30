/**
 * Created by Luis on 29/06/2016.
 */

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

