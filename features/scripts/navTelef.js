document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector("nav"); 
    const menuToggle = document.getElementById("menu-toggle"); 

    let elem;

    function showMenu() {
        if (window.innerWidth <= 1450) {
            nav.classList.add("active"); // Expande el nav
        }
        
        const elementos = document.getElementsByTagName('ul'); 
        elem =elementos[0];
        elem.classList.remove('fade-out');
        elem.classList.add('fade-in');
      
    }

    function hideMenu() {
        if (window.innerWidth <= 1450) {
            nav.classList.remove("active"); // Reduce el nav
        }

        const elementos = document.getElementsByName("MENU");
        elem = elementos[0]; // Primer elemento de la colección
        elem.classList.remove('fade-in');
        elem.classList.add('fade-out');
    }

    // Mostrar menú al pasar el mouse por el nav
    nav.addEventListener("mouseenter", showMenu);
    nav.addEventListener("mouseleave", hideMenu);

    // También permitir expandir tocando el icono en móviles
    menuToggle.addEventListener("click", function () {
        nav.classList.add("active");
    });

    // Si se cambia el tamaño de la pantalla, aseguramos que el menú vuelva a la normalidad
    window.addEventListener("resize", function () {
        if (elem) { // Verifica si elem no es null o undefined
            elem.classList.remove('fade-in'); 
            elem.classList.remove('fade-out'); 
        }
        if (window.innerWidth > 1450) {
            nav.classList.remove("active");
        }
    });
});





