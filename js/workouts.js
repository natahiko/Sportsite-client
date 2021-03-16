import { URL, checkForAuthorization } from './const.js'

function loadWorkouts () {
    $("#workout-list").show()
    $("#workout").hide()

    const page = sessionStorage.getItem('workout-page');
    const size = sessionStorage.getItem('workout-size');

    $("#workout-list").html("");

    $.get(URL + "/exercise?page=" + page + "&size=" + size, function (data, err) {

        $("#total-workout-amount").html(data.totalElements);
        data.content.forEach(workout => {

            let stars = ""
            for (let i = 0; i < workout.complexity; i++) {
                stars += "<span class='star-icon'></span>"
            }
            $("#workout-list").append("<div class='col-6 col-md-4'>" +
                "<div class='workout-card' id='workout-" + workout.id + "'>" +
                "<h5 class='workout-card-title'>" + workout.name + "</h5>" +
                // "<p>" + workout.description + "</p>" +
                "<div class='workout-complexity'>" + stars + "</div>" +
                "<img class='workout-card-image' alt=''" +
                "src='" + workout.image + "'>" +
                "</div></div>")

            $("#workout-" + workout.id).on("click", function () {
                openWorkout(JSON.stringify(workout))
            })
        })
        addPaginationPart(page, data.totalPages, data.first, data.last)
    })
}

function addPaginationPart (curPage, totalPages, isFirst, isLast) {
    if (!isFirst)
        $("#pagination-prev").html("<a><< " + curPage + "</a>")
    else
        $("#pagination-prev").html("")
    $("#pagination-current").html("<a>" + (+curPage + 1) + " / " + +totalPages + "</a>")
    if (!isLast)
        $("#pagination-next").html("<a>" + (+curPage + 2) + " >></a>")
    else
        $("#pagination-next").html("")


    $("#pagination-next a").on('click', function () {
        sessionStorage.setItem('workout-page', +curPage + 1);
        loadWorkouts();
    });
    $("#pagination-prev a").on('click', function () {
        sessionStorage.setItem('workout-page', curPage - 1);
        loadWorkouts();
    });
}

function loadPage () {
    checkForAuthorization()
    let page = sessionStorage.getItem('workout-page');
    let size = sessionStorage.getItem('workout-size');

    if (page === null) {
        sessionStorage.setItem('workout-page', 0);
        page = 0;
    }
    if (size === null) {
        sessionStorage.setItem('workout-size', 5);
        size = 5;
    }
    $("#search-button").on('click', () => searchWorkout());
    $("#workout-sort_by-selector").on('change', () => searchWorkout());
    $("#workout-filter_by-selector").on('change', () => searchWorkout());
    $("#workout").hide()

    $("#workout-size-selector").val(size)
    $("#workout-size-selector").on('change', function (value) {
        sessionStorage.setItem('workout-size', this.value);
        loadWorkouts();
    })
    $("#workout-back-button").on('click', function (value) {
        $("#workout-list").show()
        $("#workout").hide()
    })
    loadWorkouts();
}

function searchWorkout () {
    $("#workout-list").show()
    $("#workout").hide()
    const searchValue = $("#workout-search").val();
    const sort_option = $("#workout-sort_by-selector").val();
    const complexity = $("#workout-filter_by-selector").val();

    if (searchValue === "" && sort_option === 'null' && complexity === 'null') {
        return loadWorkouts();
    }

    const [sort, descending] = sort_option.split("_")
    const sort_by = sort_option === 'null' ? "" : `sort_by=${ sort }&descending=${ descending }`
    const search_by = searchValue ? "&query=" + searchValue : ""
    const filter_by = complexity === 'null' ? "" : "&filterby=complexity&filtervalue=" + complexity

    $("#workout-list").html("");
    $.get(URL + encodeURI(`/exercise/query?${ sort_by }${ search_by }${ filter_by }`), function (data) {

        $("#total-workout-amount").html(data.length);
        if (data.length < 1)
            $("#workout-list").append("<h1>Не знайдено тренувань, що відповідають запиту</h1>");
        data.forEach(workout => {
            let stars = ""
            for (let i = 0; i < workout.complexity; i++) {
                stars += "<span class='star-icon'></span>"
            }

            $("#workout-list").append("<div class='col-6 col-md-4'>" +
                "<div class='workout-card'>" +
                "<h5 class='workout-card-title'>" + workout.name + "</h5>" +
                // "<p>" + workout.description + "</p>" +
                "<div class='workout-complexity'>" + stars + "</div>" +
                "<img class='workout-card-image' alt=''" +
                "src='" + workout.image + "'>" +
                "</div></div>")
        })
        addPaginationPart(0, 1, true, true)
    })
}

function openWorkout (data) {
    const workout = JSON.parse(data)
    let stars = ""
    for (let i = 0; i < workout.complexity; i++) {
        stars += "<span class='star-icon'></span>"
    }
    $("#workout-title").html(workout.name)
    $("#workout-description").html(workout.description)
    $("#workout-rest").html(workout.restTime)
    $("#workout-complexity").html(stars)
    $("#workout-amount").html(workout.amount)
    $("#workout-image").attr('src', workout.image);

    $("#workout-list").hide()
    $("#workout").show()
}


loadPage();