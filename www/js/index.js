document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    // document.getElementById('deviceready').classList.add('ready');

    $(".add-page").on("click", function() {
        // const lastPage = $(".page-list li:last-child a").attr("href");
        // let newElement = $("<li><a href='#'>Nou item</a></li>");
        // console.log(this, lastPage, newElement);

        let newTask = prompt("Introdueix la nova tasca a afegir:");

        if (newTask != null) {
            $(".page-list").append($("<li><a href='#' class='ui-btn ui-btn-icon-right ui-icon-carat-r'>" + newTask + "</a></li>"));
            // $(".page-list").tasklist("refresh");
        }
    });

    $(".remove-page").on("click", function() {
        $(this).toggleClass("remove-active");
        if ($(".remove-page").hasClass("remove-active")) {
            console.log("hola");
            $(".page-list li").append('<button class="remove-page-button"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg></button>');
        }
    });

    /* $(".page-list li").on("click", function() {
        if (confirm("Vols esborrar la tasca?") == true) $(".page-list").remove($(this));
    }); */
}
