import { checkForAuthorization, URL, userAuth } from './const.js'


function loadPage () {
    checkForAuthorization()
    const userToken = sessionStorage.getItem(userAuth)
    if(userToken===null)
        window.location = './'
    $("input").attr('disabled', true)
    $("#save_button").hide()
    $("#delete_button").hide()
    const userId = null //TODO userId

    $("#edit_button").on('click', function (){
        $("input").attr('disabled', false)
        $("#save_button").show()
        $("#delete_button").show()
    })
    $("#save_button").on('click', function (){
        $("input").attr('disabled', 'true')
        //TODO server request for edit
        $("#save_button").hide()
        $("#delete_button").hide()
    })
    $("#delete_button").on('click', function (){
        var r = confirm("Якщо ви видалите ваш профіль, його неможливо буде відновити. Натисніть 'скасувати', щоб відмінити видалення вашого профілю");
        if (r === true) {
            // TODO delete via server
            window.location = './'
        }
    })

    // $.ajax({
    //     type: "POST",
    //     url: URL + "/user/"+userId,
    //     headers: {
    //         'Authorization': userToken
    //     },
    //     success: (data) => {
    //         const obj = JSON.parse(data)
    //         $("#user_name").val(obj.name)
    //         $("#user_email").val(obj.email)
    //         $("#user_birth").val(obj.birth)
    //         $("#user_height").val(obj.height)
    //         $("#user_weight").val(obj.weight)
    //         $("#user_chest").val(obj.chestCircumference)
    //         $("#user_waist").val(obj.waistCircumference)
    //         $("#user_hips").val(obj.hipsCircumference)
    //         $("#loader").hide()
    //     },
    //     contentType: "application/json"
    // });
    $("#loader").hide()
}

loadPage();