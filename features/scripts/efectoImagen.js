$(document).ready(function () {
    function applyHoverEffect() {
        if (window.matchMedia("(min-width: 900px)").matches) {
            $("figure").hover(
                function () {
                    $(this).addClass("hover-effect"); // Agrega clase solo en pantallas grandes
                },
                function () {
                    $(this).removeClass("hover-effect"); // Quita clase al salir
                }
            );
        } else {
            $("figure").off("mouseenter mouseleave"); // Desactiva hover en pantallas pequeñas
        }
    }
    applyHoverEffect(); // Aplica efecto al cargar la página

    $(window).resize(applyHoverEffect); // Vuelve a comprobar en caso de cambio de tamaño
});
