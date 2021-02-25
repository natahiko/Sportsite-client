import { URL } from './const.js'

function loadWorkouts () {

    const page = sessionStorage.getItem('workout-page');
    const size = sessionStorage.getItem('workout-size');

    $("#workout-list").html("");

    $.get(URL + "/exercise?page=" + page + "&size=" + size, function (data, err) {

        $("#total-workout-amount").html(data.totalElements);
        data.content.forEach(workout => {
            $("#workout-list").append("<div class='col-6 col-md-4'>" +
                "<div class='workout-card'>" +
                "<h5 class='workout-card-title'>" + workout.name + "</h5>" +
                "<p>" + workout.description + "</p>" +
                "<img class='workout-card-image' alt=''" +
                "src='" + workout.image + "'>" +
                "</div></div>")
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
    let page = sessionStorage.getItem('workout-page');
    let size = sessionStorage.getItem('workout-size');

    if (page === null) {
        sessionStorage.setItem('workout-page', 0);
        page = 0;
    }
    if (size === null) {
        sessionStorage.setItem('workout-size', 2);
        size = 2;
    }
    $("#search-button").on('click', () => searchWorkout());
    // $("#workout-list").hide()
    // $("#workout").hide()

    $("#workout-size-selector").val(size)
    $("#workout-size-selector").on('change', function (value) {
        sessionStorage.setItem('recipe-size', this.value);
        loadWorkouts();
    })
    loadWorkouts();
}

function searchWorkout () {
    const searchValue = $("#workout-search").val();
    // TODO get data from server
    $("#workout-list").html("<h1>Результати пошуку....." + searchValue + "</h1>")

    $("#total-workout-amount").html(10); //data.totalElements
    // data.content.forEach(workout => {
    //     $("#workout-list").append("<div class='col-6 col-md-4'>" +
    //         "<div class='workout-card'>" +
    //         "<h5 class='workout-card-title'>" + workout.name + "</h5>" +
    //         "<p>" + workout.description + "</p>" +
    //         "<img class='workout-card-image' alt=''" +
    //         "src='" + workout.image + "'>" +
    //         "</div></div>")
    // })
    addPaginationPart(page, data.totalPages, data.first, data.last)
}

loadPage();