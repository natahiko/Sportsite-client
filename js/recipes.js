import { URL, checkForAuthorization } from './const.js'


function loadRecipesCategory () {
    $("#recipes-category").html("");

    $("#recipes-category").append("\n" +
        "<div class='col-12 col-md-6'>\n" +
        "<div id='recipe-calculator' class='recipe-category-card'>" +
        "    <img class='recipe-category-image' alt='' src='img/calculator-512_512.png'>\n" +
        "        <h4 class='recipe-category-name'>Калькулятор</h4>\n" +
        "</div></div>")
    $("#recipe-calculator").on('click', () => location.href = './calculator.html')

    $.get(URL + "/recipe/category", function (data, err) {

        data.forEach(category => {
            $("#recipes-category").append("\n" +
                "<div class='col-12 col-md-6'>\n" +
                "<div id='recipe-category-card-" + category.id + "' class='recipe-category-card'>" +
                "    <img class='recipe-category-image' alt='' src='" + category.image + "'>\n" +
                "        <h4 class='recipe-category-name'>" + category.name + "</h4>\n" +
                "</div></div>")

            $("#recipe-category-card-" + category.id).on('click', () => openAllRecipiesCategory(category.id))
        })
    })
}

function addPaginationPart (curPage, totalPages, isFirst, isLast) {
    $(".pagination").show()
    if (!isFirst)
        $("#pagination-prev").html("<a><< " + curPage + "</a>")
    else
        $("#pagination-prev").html("")
    $("#pagination-current").html("<a>" + (+curPage + 1) + " / " + +totalPages + "</a>")
    if (!isLast)
        $("#pagination-next").html("<a>" + (+curPage + 2) + " >></a>")
    else
        $("#pagination-next").html("")


    $("#pagination-next a").on('click', function () {
        localStorage.setItem('recipe-page', +curPage + 1);
        openAllRecipiesCategory();
    });
    $("#pagination-prev a").on('click', function () {
        localStorage.setItem('recipe-page', curPage - 1);
        openAllRecipiesCategory();
    });
}

function openAllRecipiesCategory (id) {
    $("#recipes-category-block").hide()
    $("#recipes-list-block").show(500)

    $("#recipes-category-back-button").on('click', function () {
        $("#recipes-list-block").hide()
        $("#recipes-block").hide()
        $("#recipes-category-block").show(500)
    })

    if (id != undefined)
        localStorage.setItem('recipe-category-id', id);
    else
        id = localStorage.getItem('recipe-category-id');

    const page = localStorage.getItem('recipe-page');
    const size = localStorage.getItem('recipe-size');

    $("#recipes-list").html("");


    $.get(URL + "/recipe?category=" + id + "&page=" + page + "&size=" + size, function (data, err) {

        $("#total-recipe-amount").html(data.totalElements);

        data.content.forEach(recipe => {
            $("#recipes-list").append("<div class='row' id='recipe-id" + recipe.id + "'>" +
                "    <div class='col-4 p-0'>" +
                "    <img class='preview-recipe-img' alt='' src='" + recipe.image + "' />" +
                "    </div>" +
                "    <div class='col-8 p-3'>" +
                "       <h3 class='text-truncate'>" + recipe.name + "</h3>" +
                "       <p>" + recipe.description.substring(0, 50) + "...</p>" +
                "</div></div>")
            $("#recipe-id" + recipe.id).on('click', () => openRecipe(recipe))
        })
        addPaginationPart(page, data.totalPages, data.first, data.last);
    })


}

function openRecipe (recipe) {
    $("#recipes-list-block").hide()
    $("#recipes-block").show(500)
    $("#recipes-category-block").hide()

    $("#recipes-category-back-button2").on('click', function () {
        $("#recipes-list-block").show(500)
        $("#recipes-block").hide()
        $("#recipes-category-block").hide()
    })

    $("#recipe-name").text(recipe.name)
    $("#recipe-description").text(recipe.description)
    $("#recipe_image").attr('src', recipe.image);
    $("#recipe-colories").text(recipe.calories);
    $("#recipe-ingrigients").html("")
    recipe.ingredients.forEach(ingridient => {
        $("#recipe-ingrigients").append(
            "<div class=\"col-5\">" + ingridient.name + "</div>\n" +
            "<div class=\"col-3\">" + ingridient.amount + "</div>\n" +
            "<div class=\"col-1\">" + ingridient.carbohydrates + "</div>\n" +
            "<div class=\"col-1\">" + ingridient.proteins + "</div>\n" +
            "<div class=\"col-1\">" + ingridient.fats + "</div>\n" +
            "<div class=\"col-1\">" + ingridient.calories + "</div>")
    })
}

function loadPage () {
    checkForAuthorization()
    let page = localStorage.getItem('recipe-page');
    let size = localStorage.getItem('recipe-size');

    if (page === null) {
        localStorage.setItem('recipe-page', 0);
        page = 0;
    }
    if (size === null) {
        localStorage.setItem('recipe-size', 5);
        size = 5;
    }


    $("#recipes-category-block").show()
    $("#recipes-list-block").hide()
    $("#recipes-block").hide()

    $("#search-button").on('click', () => searchRecipes());

    $("#recipe-size-selector").val(size)
    $("#recipe-size-selector").on('change', function (value) {
        localStorage.setItem('recipe-size', this.value);
        openAllRecipiesCategory();
    })
    loadRecipesCategory();
}

function searchRecipes () {
    $(".pagination").hide()
    const searchValue = $("#recipes-search").val();

    $("#recipes-category-block").hide()
    $("#recipes-list-block").show(200)
    $("#recipes-block").hide()
    $("#recipes-category-back-button").on('click', function () {
        $("#recipes-list-block").hide()
        $("#recipes-block").hide()
        $("#recipes-category-block").show(500)
    })

    $.get(URL + "/recipe/query?query=" + searchValue, function (data, err) {

        $("#total-recipe-amount").data.length;
        if (data.length < 1) {
            $("#recipes-list").html("<h1>Результати пошуку .... " + searchValue + "</h1>");
            return;
        }
        $("#recipes-list").html("")
        data.forEach(recipe => {
            $("#recipes-list").append("<div class='row' id='recipe-id" + recipe.id + "'>" +
                "    <div class='col-4 p-0'>" +
                "    <img class='preview-recipe-img' alt='' src='" + recipe.image + "' />" +
                "    </div>" +
                "    <div class='col-8 p-3'>" +
                "       <h3 class='text-truncate'>" + recipe.name + "</h3>" +
                "       <p>" + recipe.description.substring(0, 50) + "...</p>" +
                "</div></div>")
            $("#recipe-id" + recipe.id).on('click', () => openRecipe(recipe))
        })
        addPaginationPart(page, data.totalPages, data.first, data.last);
    })
}

loadPage();