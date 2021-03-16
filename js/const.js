export const URL = 'https://sportsite-api.herokuapp.com'
export const ImageUploadURL = 'https://api.imgbb.com/1/upload?key=924792422e35ddd4350fd83095a1ec68'
export const userAuth = ''

export function validateEmail (email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function checkForAuthorization(){
    const userToken = sessionStorage.getItem(userAuth)
    $("#logout_button").on('click', function (){
        sessionStorage.removeItem(userAuth)
        window.location = './'
    })
    if(userToken===null){
        $('.show-authorised').hide()
        $('#logout_button').hide()
    } else {
        $('#login_button').hide()
    }
    console.log(userToken)
}