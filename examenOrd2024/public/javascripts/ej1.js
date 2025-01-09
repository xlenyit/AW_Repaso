$(document).ready(function() {

    $("#openModal").click()
    $("#fontSize").change(function(){
        $("p").css("font-size", $(this).val() +"px");
    })
    $("#sectionBgColor").change(function(){
        console.log()
        $(".section").css("color", $(this).val() +"px");
    })
    $("#underlineLinks").change(function(){
        console.log($(this).prop("checked"))
        $("a").css("text-decoration", $(this).prop("checked") ? "underline":"none"); //añade el underlined solo si esta checked
    })
   
})