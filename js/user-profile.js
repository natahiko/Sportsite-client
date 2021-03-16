import { checkForAuthorization } from './const.js'

loadPage();

function loadPage () {
    checkForAuthorization()
}