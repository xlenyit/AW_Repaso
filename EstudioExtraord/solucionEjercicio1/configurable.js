$(document).ready(function() {
    // Abrir la ventana emergente al hacer clic en el botón
    $("#configButton").click(function() {
        $("#configModal").css("display", "block");
    });

    // Cerrar la ventana emergente al hacer clic en la 'x'
    $(".close").click(function() {
        $("#configModal").css("display", "none");
    });

    // Actualizar el tamaño de la fuente en tiempo real
    $("#fontSize").change(function() {
        var fontSize = $(this).val() + "px";
        $(".content, h1, h2, p, nav").css("font-size", fontSize);
    });

    // Actualizar el color de los títulos en tiempo real
    $("#titleColor").change(function() {
        var titleColor = $(this).val();
        $("h1, h2").css("color", titleColor);
    });
    
    // Actualizar el color de los textos en tiempo real
    $("#textColor").change(function() {
        var textColor = $(this).val();
        $("p, nav a").css("color", textColor);
    });

    // Actualizar el color de fondo de las secciones en tiempo real
    $("#sectionColor").change(function() {
        var sectionColor = $(this).val();
        $(".section").css("background-color", sectionColor);
    });

    // Actualizar el color de fondo de Sección 1 en tiempo real
    $("#section1Background").change(function() {
        var section1Background = $(this).val();
        $("#section1").css("background-color", section1Background);
    });

    // Actualizar el color de fondo de Sección 2 en tiempo real
    $("#section2Background").change(function() {
        var section2Background = $(this).val();
        $("#section2").css("background-color", section2Background);
    });

    // Actualizar el color de los enlaces no visitados en tiempo real
    $("#linkColor").change(function() {
        var linkColor = $(this).val();
        $("nav a").css("color", linkColor);
    });

    // Actualizar el color de los enlaces visitados en tiempo real
    $("#visitedLinkColor").change(function() {
        var visitedLinkColor = $(this).val();
        $("nav a:visited").css("color", visitedLinkColor);
    });

    // Actualizar la propiedad de subrayado de los enlaces en tiempo real
    $("#underlineLinks").change(function() {
        var underlineLinks = $(this).prop("checked");
        $("nav a").css("text-decoration", underlineLinks ? "underline" : "none");
    });

    // Actualizar el color de fondo de la barra de navegación en tiempo real
    $("#navBackgroundColor").change(function() {
        var navBackgroundColor = $(this).val();
        $("nav").css("background-color", navBackgroundColor);
    });

    // Aplicar todos los cambios al hacer clic en el botón
    $("#applyChanges").click(function() {
        $("#configModal").css("display", "none");
    });
});
