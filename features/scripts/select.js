document.addEventListener("DOMContentLoaded", () => {
    const wrappers = document.getElementsByClassName("custom-select-wrapper");

    for (const wrapper of wrappers) {
        const selectBox = wrapper.getElementsByClassName("custom-select")[0];
        const optionsBox = wrapper.getElementsByClassName("custom-options")[0];

        // Manejar clic en el select
        selectBox.addEventListener("click", () => {
            const isOpen = optionsBox.style.display === "flex";

            // Cierra todos los select antes de abrir el actual
            const allOptions = document.getElementsByClassName("custom-options");
            for (const option of allOptions) {
                option.style.display = "none";
            }

            optionsBox.style.display = isOpen ? "none" : "flex";
        });

        // Manejar clic en las opciones
        optionsBox.addEventListener("click", (event) => {
            if (event.target.dataset.value) {
                selectBox.textContent = event.target.textContent;
                optionsBox.style.display = "none";
            }
        });

        // Manejar clic fuera del select para cerrar el menú
        document.addEventListener("click", (event) => {
            if (!wrapper.contains(event.target)) {
                optionsBox.style.display = "none";
            }
        });
    }
});
