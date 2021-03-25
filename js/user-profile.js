import { checkForAuthorization, URL, userAuth, userIdLoc } from './const.js'

let isEditing = false
let currentValue = {}

function loadPage () {
    checkForAuthorization()
    const userToken = localStorage.getItem(userAuth)
    if (userToken === null)
        window.location = './'
    $("input").attr('disabled', true)
    $("#save_button").hide()
    $("#delete_button").hide()
    const userId = localStorage.getItem(userIdLoc)

    if (!userId) window.location = './auth.html'

    $("#edit_button").on('click', () => onEditButton())
    $("#save_button").on('click', () => onSaveChanges())
    $("#delete_button").on('click', () => onDeleteProfile())

    $.ajax({
        type: "GET",
        url: URL + "/user/" + userId,
        headers: {
            'Authorization': userToken
        },
        success: (data) => {
            currentValue = {
                name: data.name,
                email: data.email,
                birth: data.birth,
                height: data.height,
                weight: data.weight,
                chest: data.chestCircumference,
                waist: data.waistCircumference,
                hips: data.hipsCircumference
            }
            $("#user_name").val(data.name)
            $("#user_email").val(data.email)
            $("#user_birth").val(data.birth)
            $("#user_height").val(data.height)
            $("#user_weight").val(data.weight)
            $("#user_chest").val(data.chestCircumference)
            $("#user_waist").val(data.waistCircumference)
            $("#user_hips").val(data.hipsCircumference)
            $("#loader").hide()
            loadLikedWorkoutsSet()
        },
        contentType: "application/json"
    });
}

function onEditButton () {
    if (!isEditing) {
        $("input").attr('disabled', false)
        $("#save_button").show()
        $("#delete_button").show()
        $("#edit_button").text('Скасувати')
        isEditing = true
    } else {
        $("input").attr('disabled', true)
        $("#user_name").val(currentValue.name)
        $("#user_email").val(currentValue.email)
        $("#user_birth").val(currentValue.birth)
        $("#user_height").val(currentValue.height)
        $("#user_weight").val(currentValue.weight)
        $("#user_chest").val(currentValue.chestCircumference)
        $("#user_waist").val(currentValue.waistCircumference)
        $("#user_hips").val(currentValue.hipsCircumference)
        $("#save_button").hide()
        $("#delete_button").hide()
        $("#loader").hide()
        $("#edit_button").text('Редагувати')
        isEditing = false
    }
}

function onSaveChanges () {
    $("#loader").show()
    $.ajax({
        type: "PUT",
        url: URL + "/user/" + userId,
        headers: {
            'Authorization': userToken
        },
        data: JSON.stringify({
            "name": $("#user_name").val(),
            "email": $("#user_email").val(),
            "birth": $("#user_birth").val(),
            "height": $("#user_height").val(),
            "weight": $("#user_weight").val(),
            "chestCircumference": $("#user_chest").val(),
            "waistCircumference": $("#user_waist").val(),
            "hipsCircumference": $("#user_hips").val(),
        }),
        contentType: 'application/json',
        success: (data) => {
            $("input").attr('disabled', true)
            $("#save_button").hide()
            $("#delete_button").hide()
            $("#edit_button").text('Редагувати')
            $("#loader").hide()
        },
        error: (data) => {
            console.log(data)
        }
    });
}

function onDeleteProfile () {
    var r = confirm("Якщо ви видалите ваш профіль, його неможливо буде відновити. Натисніть 'скасувати', щоб відмінити видалення вашого профілю");
    if (r === true) {
        $("#loader").show()
        $.ajax({
            type: "DELETE",
            url: URL + "/user/" + userId,
            headers: {
                'Authorization': userToken
            },
            contentType: 'application/json',
            dataType: 'text',
            success: (data) => {
                window.location = './'
            },
            error: (data) => {
                console.log(data)
            }
        });
    }
}

function loadLikedWorkoutsSet () {
    const userId = localStorage.getItem(userIdLoc)
    const userToken = localStorage.getItem(userAuth)

    $("#liked-workout-set").html("")

    $.ajax({
        type: "GET",
        url: URL + "/user/liked/exercises/set/" + userId,
        headers: {
            'Authorization': userToken
        },
        success: (data) => {
            data.forEach(workout => {
                let stars = ""
                for (let i = 0; i < workout.complexity; i++) {
                    stars += "<span class='star-icon'></span>"
                }

                $("#liked-workout-set").append("<div class='col-12'>" +
                    "<div class='workout-card row' id='workout-" + workout.id + "'>" +
                    "<div class='col-5 p-0'><img class='workout-card-image' alt='' src='" + workout.image + "'></div>" +
                    "<div class='col-7'><h5 class='workout-card-title'>" + workout.name + "</h5>" +
                    "<div class='workout-complexity text-center'>" + stars + "</div>" +
                    "<p class='desc'>" + workout.description + "</p>" +
                    "</div></div></div>")

            })
        },
        contentType: "application/json"
    });
}

loadPage();