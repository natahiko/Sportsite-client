import { URL, userAuth, validateEmail } from "./const.js";

function loadPage () {
    $("#confirm_auth").on('click', function () {
        validateAndSend()
    })
    sessionStorage.removeItem(userAuth)
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
            console.log(data)
            sessionStorage.setItem(userAuth, data)
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