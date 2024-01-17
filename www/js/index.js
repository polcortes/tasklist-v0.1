document.addEventListener('deviceready', onDeviceReady, false);
// QUEDA PONER EL REMOVE localStorage
function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    showData();
    setEvents();
}

function setEvents() {
    $(".add-page").off().on("click", function() {
        let newTask = prompt("Introdueix la nova tasca a afegir:");

        if (newTask != null) {
            addData(newTask);
            // $(".page-list").append($("<li><a href='#' class='ui-btn ui-btn-icon-right ui-icon-carat-r'>" + newTask + "</a><button class='edit-task ui-btn ui-shadow ui-corner-all'>Edit!</button></li>"));
            setEvents()
        }
    });

    $(".remove-page").off().on("click", function() {
        $(".remove-page").toggleClass("remove-active");
        if ($(".remove-page").hasClass("remove-active")) {
            $(".page-list li").append('<button class="remove-page-button"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg></button>');
            $(".remove-page-button").off().on('click', function() {
                if (confirm("Vols esborrar aquesta tasca?")) { removeData($(this).parent().attr("id")) }
            })
        } else if (!$(".remove-page").hasClass("remove-active")) {
            $(".remove-page-button").each(function(i,e) {
                $(e).remove();
            });
        }
    });

    // Con prompt
    /*$(".edit-task").off().on("click", function() {
        $(this).siblings().text(prompt("Quin vols que sigui el text?", $(this).siblings().text()));
    });*/

    // Sin prompt
    $(".edit-task").off().on("click", function() {
        const editTaskButt = $(this);
        const task = $(this).parent();
        let tasktext = $(this).siblings().text();

        $(this).css("display", "none");
        $(this).siblings().css("display", "none");

        task.append($('<input type="text" class="new-task-name"><button class="cancel-edit">Cancel</button><button class="accept-edit">Edit</button>'));

        $(".cancel-edit").click(function() {
            $(this).siblings(".new-task-name, .cancel-edit, .accept-edit").remove();
            $(this).remove();
            
            editTaskButt.css("display", "flex");
            editTaskButt.siblings().css("display", "flex");
        });

        $(".accept-edit").click(function() {
            let newText = $(this).siblings(".new-task-name").val();
            
            $(this).siblings(".new-task-name, .cancel-edit, .accept-edit").remove();
            $(this).remove();
            
            editTaskButt.css("display", "flex");
            editTaskButt.siblings().css("display", "flex");
            
            // editTaskButt.siblings("a").text(newText);
            editData(task.attr("id"), newText);
        });
    });
}

function showData() {
    let data = JSON.parse(localStorage.getItem("data"));
    
    const hasData = data ?? false

    if (hasData) {
        $('.page-list').empty(); // Vaciamos la <ul></ul>

        // 0 = indice || 1 = texto.
        // Interpreta data como [[0,"tasca 1"], [1, "tasca 2"], [2, "tasca 3"]]
        for (const d of data.entries()) $('.page-list').append(`<li id="${d[0]}"><a href="">${d[1]}</a><button class="edit-task">Edit!</button></li>`);

        $('.page-list').listview("refresh");
    
        setEvents()
    }
}

function addData(newtask) {
    let data = JSON.parse(localStorage.getItem("data")) ?? [];

    data.push(newtask);
    localStorage.removeItem("data");
    localStorage.setItem("data", JSON.stringify(data));

    showData();
}

function removeData(taskid) {
    let data = JSON.parse(localStorage.getItem("data")) ?? [];

    data.splice(taskid, 1);
    
    localStorage.removeItem("data");
    localStorage.setItem("data", JSON.stringify(data));

    showData();
}

function editData(taskid, newText) {
    let data = JSON.parse(localStorage.getItem("data")) ?? [];

    if (data[taskid] != null || data[taskid] != "") data[taskid] = newText;

    localStorage.removeItem("data");
    localStorage.setItem("data", JSON.stringify(data));

    showData();
}