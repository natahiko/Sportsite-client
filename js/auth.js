import { URL, userAuth, validateEmail, userIdLoc } from "./const.js";

function loadPage () {
    $("#confirm_auth").on('click', function () {
        validateAndSend()
    })
    localStorage.removeItem(userAuth)
    $("#loader").hide()
}

function validateAndSend () {
    const email = $("#user_email").val()
    if (email === "") {
        alert("Поле електронної пошти не може бути пустим")
        return
    } else if (!validateEmail(email)) {
        alert("Введена електронна пошта введена некоректно")
        return
    }
    const password = $("#user_pass").val()
    if (password === "") {
        alert("Введіть пароль")
        return
    }

    $("#loader").show()
    $.ajax({
        type: "POST",
        url: URL + "/user/login",
        data: JSON.stringify({
            "email": email,
            "password": password,
        }),
        success: (data) => {
            data = JSON.parse(data)
            localStorage.setItem(userAuth, data['token'])
            localStorage.setItem(userIdLoc, data['userId'])
            // console.log(localStorage.getItem(userAuth))
            // console.log(localStorage.getItem(userIdLoc))
            window.location = './index.html'
        },
        error: (data) => {
            $("#loader").hide()
            alert("Перевірте правильність електронної пошти та паролю")
        },
        contentType: "application/json"
    });
}

loadPage();