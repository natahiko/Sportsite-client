import { URL,userAuth, validateEmail } from './const.js'


function validateAndSend () {
    const name = $("#user_name").val()
    if (name === "") {
        alert("Поле імені не може бути пустим")
        return
    }
    const email = $("#user_email").val()
    if (email === "") {
        alert("Поле електронної пошти не може бути пустим")
        return
    } else if (!validateEmail(email)) {
        alert("Введена електронна пошта введена некоректно")
        return
    }
    const weight = $("#user_weight").val()
    if (weight === "") {
        alert("Поле ваги не може бути пустим")
        return
    } else if (weight < 30 || weight > 200) {
        alert("Введене значення ваги некоректне. Коректні значення: 30 - 200")
        return
    }
    const height = $("#user_height").val()
    if (height === "") {
        alert("Поле росту не може бути пустим")
        return
    } else if (height < 50 || height > 220) {
        alert("Введене значення росту некоректне. Коректні значення: 50 - 220")
        return
    }
    const hips = $("#user_hips").val()
    if (hips === "") {
        alert("Поле обхвату бедер не може бути пустим")
        return
    } else if (hips < 30 || hips > 200) {
        alert("Введене значення обхвату бедер некоректне. Коректні значення: 30 - 200")
        return
    }
    const waist = $("#user_waist").val()
    if (waist === "") {
        alert("Поле обхвату талії не може бути пустим")
        return
    } else if (waist < 30 || waist > 200) {
        alert("Введене значенн обхвату талії некоректне. Коректні значення: 30 - 200")
        return
    }
    const chest = $("#user_chest").val()
    if (chest === "") {
        alert("Поле обхвату грудей не може бути пустим")
        return
    } else if (chest < 20 || chest > 200) {
        alert("Введене значення обхвату грудей некоректне. Коректні значення: 30 - 200")
        return
    }
    const password = $("#user_pass").val()
    if (password === "") {
        alert("Введіть пароль")
        return
    }
    const consf_password = $("#user_pass_conf").val()
    if (consf_password === "") {
        alert("Підтвердіть ваш пароль")
        return
    } else if (consf_password !== password) {
        alert("Введені паролі не збігаються")
        return
    }
    const birthdate = $("#user_birth").val()

    $("#loader").show()
    $.ajax({
        type: "POST",
        url: URL + "/user/sign_up",
        data: JSON.stringify({
            "name": name,
            "email": email,
            "password": password,
            "height": height,
            "weight": weight,
            "chestCircumference": chest,
            "waistCircumference": waist,
            "hipsCircumference": hips,
            "birthday": birthdate
        }),
        success: (data) => {
            $("#loader").hide()
            alert("Ви успішно зареєстровані")
            window.location = './auth.html'
        },
        contentType: "application/json"
    });
}

function loadPage () {
    $("#submit_registration").on('click', function () {
        validateAndSend()
    })
    $("#loader").hide()
    sessionStorage.removeItem(userAuth)
}

loadPage();