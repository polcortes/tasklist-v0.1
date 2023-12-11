document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    // document.getElementById('deviceready').classList.add('ready');

    $(".add-page").on("click", function() {
        $(".page-list").append("<li><a href='#'>Nou item</a></li>");
    });
}
