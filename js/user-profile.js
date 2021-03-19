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

    $("#edit_button").on('click', function () {
        if(!isEditing){
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
    })
    $("#save_button").on('click', function () {
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
            contentType:'application/json',
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
    })
    $("#delete_button").on('click', function () {
        var r = confirm("Якщо ви видалите ваш профіль, його неможливо буде відновити. Натисніть 'скасувати', щоб відмінити видалення вашого профілю");
        if (r === true) {
            $("#loader").show()
            $.ajax({
                type: "DELETE",
                url: URL + "/user/" + userId,
                headers: {
                    'Authorization': userToken
                },
                contentType:'application/json',
                dataType: 'text',
                success: (data) => {
                    window.location = './'
                },
                error: (data) => {
                    console.log(data)
                }
            });
        }
    })

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
        },
        contentType: "application/json"
    });
}

loadPage();