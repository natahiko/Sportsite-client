import { URL, checkForAuthorization, userIdLoc, userAuth } from './const.js'

function loadPage () {
    checkForAuthorization()

    $("#search-button").on('click', () => searchWorkout());
    $("#workout-sort_by-selector").on('change', () => searchWorkout());
    $("#workout-filter_by-selector").on('change', () => searchWorkout());
    $("#workout").hide()

    $("#workout-back-button").on('click', function () {
        $("#workout-list").show()
        $("#workout").hide()
    })
    searchWorkout();
}

function searchWorkout () {
    $("#workout-list").show()
    $("#workout").hide()
    const searchValue = $("#workout-search").val();
    const sort_option = $("#workout-sort_by-selector").val();
    const complexity = $("#workout-filter_by-selector").val();

    const [sort, descending] = sort_option.split("_")
    const sort_by = sort_option === 'null' ? "" : `sort_by=${ sort }&descending=${ descending }`
    const search_by = searchValue ? "&query=" + searchValue : ""
    const filter_by = complexity === 'null' ? "" : "&filterby=complexity&filtervalue=" + complexity

    $("#workout-list").html("");
    $.get(URL + encodeURI(`/exercise/set/query?${ sort_by }${ search_by }${ filter_by }`), function (data) {

        $("#total-workout-amount").html(data.length);
        if (data.length < 1)
            $("#workout-list").append("<h1>Не знайдено тренувань, що відповідають запиту</h1>");
        data.forEach(workout => {
            let stars = ""
            for (let i = 0; i < workout.complexity; i++) {
                stars += "<span class='star-icon'></span>"
            }

            $("#workout-list").append("<div class='col-12 col-md-6'>" +
                "<div class='workout-card row' id='workout-" + workout.id + "'>" +
                "<div class='col-5 p-0'><img class='workout-card-image' alt='' src='" + workout.image + "'></div>" +
                "<div class='col-7'><h5 class='workout-card-title'>" + workout.name + "</h5>" +
                "<div class='workout-complexity text-center'>" + stars + "</div>" +
                "<p class='desc'>" + workout.description + "</p>" +
                "</div></div></div>")

            $("#workout-" + workout.id).on("click", function () {
                openWorkout(workout.id)
            })
        })
    })
}

function openWorkout (workoutSetId) {
    const userId = localStorage.getItem(userIdLoc)
    const userToken = localStorage.getItem(userAuth)
    $.ajax({
        type: "GET",
        url: URL + "/user/liked/exercises/set/" + userId,
        headers: {
            'Authorization': userToken
        },
        success: (liked) => {
            const likedIds = liked.map(like => like.id)

            $.get(URL + encodeURI(`/exercise/set/${ workoutSetId }`), function (workout) {
                let stars = ""
                for (let i = 0; i < workout.complexity; i++) {
                    stars += "<span class='star-icon'></span>"
                }
                $("#workout-title").html(workout.name)
                $("#workout-description").html(workout.description)
                $("#workout-complexity").html(stars)
                $("#liked-amount").html(workout.likesAmount)
                $("#workout-image").attr('src', workout.image);
                if (likedIds.includes(workout.id)) {
                    $("#add-to-liked").hide()
                } else {
                    $("#add-to-liked").show()
                    $("#add-to-liked").on('click', function () {
                        addToLiked(userId, workout.id)
                    })
                }

                $("#workout-exercises").html('')
                workout.exercises.forEach(exercise => {
                    let stars = ""
                    for (let i = 0; i < workout.complexity; i++) {
                        stars += "<span class='star-icon-small'></span>"
                    }
                    $("#workout-exercises").append(
                        "<div class='row detail-workout-set'>" +
                        "<img style='max-height: 150px' class='col-6' src='" + exercise.image + "'/>" +
                        "<div class=col-6><h5>" + exercise.name + "</h5><p class='desc'>" + exercise.description + "</p>" +
                        "<div><b>" + exercise.amount + " " + exercise.exerciseMeasureType + "</b></div>" +
                        "</div></div>" +
                        "<div class='rest'>Відпочиньте " + exercise.restTime + " секунд</div>"
                    )
                })

                $("#workout-list").hide()
                $("#workout").show()
            })
        },
        error: (data) => {
            console.log(data)
        }
    });
}

function addToLiked (userId, exerciseSetId) {

    const userToken = localStorage.getItem(userAuth)
    $.ajax({
        type: "POST",
        url: URL + "/exercise/set/like",
        headers: {
            'Authorization': userToken
        },
        data: JSON.stringify({
            "exerciseSetId": exerciseSetId,
            "userId": userId,
        }),
        contentType: 'application/json',
        success: (data) => {
            openWorkout(exerciseSetId)
        },
        error: (data) => {
            console.log(data)
        }
    });
}


loadPage();