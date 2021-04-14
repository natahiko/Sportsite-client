import { checkForAuthorization, URL } from "./const.js";

const ingredients = [
    { id: 1, name: "Шоколад" },
    { id: 2, name: "Риба" },
    { id: 3, name: "М'ясо" },
    { id: 4, name: "Салат" },
    { id: 5, name: "Яблуко" },
]

let totalCalories = 0
let totalProteins = 0
let totalFats = 0
let totalAmount = 0
let totalCarbohydrates = 0

function loadPage () {
    checkForAuthorization()
    $("#total-block").hide()

    $.get(URL + "/ingredient/all", function (ingredients, err) {
        ingredients.forEach(ingredient => {
            $("#ingridient-selector").append("<option value='" + ingredient.id + "'>" + ingredient.name + "</option>")
        })
        $("#add-ingredient-button").on('click', () => addIngredientToList())
        $("#calculator-clear-button").on('click', () => clearIngradientList())
        $("#loader").hide()
    })
}

function addIngredientToList () {
    let selected_id = $("#ingridient-selector").val()
    if (selected_id === null) {
        alert("Оберіть інградієнт")
        return false;
    }
    const amount = $("#added-amount").val()
    if (amount === '') {
        alert("Введіть кількість")
        return false;
    }
    $("#loader").show()

    $.get(URL + `/ingredient/${ selected_id }?amount=${ amount }`, function (result, err) {
        $("#ingredients").append(
            "<hr style='width: 100%; border-color: white; margin: 0;'/>" +
            "<div class='col-6'>" + result.name + "</div>" +
            "<div class='col-2'>" + result.amount + "</div>" +
            "<div class='col-1'>" + result.calories + "</div>" +
            "<div class='col-1'>" + result.proteins + "</div>" +
            "<div class='col-1'>" + result.fats + "</div>" +
            "<div class='col-1'>" + result.carbohydrates + "</div>"
        )

        totalCalories += result.calories
        totalAmount = +totalAmount + +result.amount
        totalProteins += result.proteins
        totalFats += result.fats
        totalCarbohydrates += result.carbohydrates
        $("#total-amount").html(totalAmount)
        $("#total-calories").html(totalCalories)
        $("#total-proteins").html(totalProteins)
        $("#total-fats").html(totalFats)
        $("#total-carbohydrates").html(totalCarbohydrates)
        $("#total-block").show()

        $("#ingridient-selector").val('')
        $("#added-amount").val('')
        $("#loader").hide()
    })
}

function clearIngradientList () {
    $("#loader").show()

    $("#total-block").hide()
    $("#ingridient-selector").val('')
    $("#added-amount").val('')
    $("#ingredients").html('')

    totalCalories = 0
    totalProteins = 0
    totalFats = 0
    totalAmount = 0
    totalCarbohydrates = 0

    $("#total-amount").html(totalAmount)
    $("#total-calories").html(totalCalories)
    $("#total-proteins").html(totalProteins)
    $("#total-fats").html(totalFats)
    $("#total-carbohydrates").html(totalCarbohydrates)

    $("#loader").hide()
}

loadPage();