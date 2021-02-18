import { URL } from './const.js'

const categories = [
    {
        image: "https://i.pinimg.com/originals/7f/cc/d4/7fccd4143a51812cfbcff26451e2a113.png",
        name: "Вегетаріанські страви",
        id: 2
    },
    {
        image: "http://pngimg.com/uploads/beef/beef_PNG14.png",
        name: "М’ясні страви",
        id: 3
    },
    {
        image: "https://pngimg.com/uploads/lemonade/lemonade_PNG16937.png",
        name: "Напої",
        id: 4
    },
    {
        image: "http://pngimg.com/uploads/soup/soup_PNG106.png",
        name: "Супи",
        id: 5
    },
    {
        image: "https://pngimg.com/uploads/ice_cream/ice_cream_PNG20979.png",
        name: "Десерти",
        id: 6
    }
]
const data = [{
    id: 3,
    name: "Recip 1",
    image: "https://cdn-aiapl.nitrocdn.com/KZJKWDkEwMJCwERIlnRsPNdqobwBIlEo/assets/static/optimized/rev-b316e4c/wp-content/uploads/2010/07/grilled-pork-loin-with-chimichurri-and-summer-vegetables-16-256x256.jpg",
    description: "Best #1 in the world",
    calories: 220,
    ingridients: [
        {
            name: "Vegetable 1",
            amount: 10.2,
            calories: 220,
            proteins: 20,
            fats: 10,
            carbohydrates: 30
        },
        {
            name: "Vegetable 2",
            amount: 3.5,
            calories: 220,
            proteins: 20,
            fats: 10,
            carbohydrates: 30
        }
    ]

}, {
    id: 4,
    name: "Recip 2",
    image: "https://cdn-aiapl.nitrocdn.com/KZJKWDkEwMJCwERIlnRsPNdqobwBIlEo/assets/static/optimized/rev-b316e4c/wp-content/uploads/2010/07/grilled-pork-loin-with-chimichurri-and-summer-vegetables-16-256x256.jpg",
    description: "Best #2 in the world2",
    calories: 260,
    ingridients: [
        {
            name: "Vegetable 3",
            amount: 20.2,
            calories: 420,
            proteins: 20,
            fats: 10,
            carbohydrates: 30
        },
        {
            name: "Vegetable 4",
            amount: 6.5,
            calories: 270,
            proteins: 20,
            fats: 10,
            carbohydrates: 30
        }
    ]

}, {
    id: 5,
    name: "Recip 2",
    image: "https://cdn-aiapl.nitrocdn.com/KZJKWDkEwMJCwERIlnRsPNdqobwBIlEo/assets/static/optimized/rev-b316e4c/wp-content/uploads/2010/07/grilled-pork-loin-with-chimichurri-and-summer-vegetables-16-256x256.jpg",
    description: "Best #2 in the world2",
    calories: 260,
    ingridients: [
        {
            name: "Vegetable 3",
            amount: 20.2,
            calories: 420,
            proteins: 20,
            fats: 10,
            carbohydrates: 30
        },
        {
            name: "Vegetable 4",
            amount: 6.5,
            calories: 270,
            proteins: 20,
            fats: 10,
            carbohydrates: 30
        }
    ]

}]

function loadRecipesCategory () {
    $("#recipes-category-block").show()
    $("#recipes-list-block").hide(500)
    $("#recipes-block").hide(500)
    $("#recipes-category").html("");

//    TODO get real data from server

    $("#recipes-category").append("\n" +
        "<div class='col-12 col-md-6'>\n" +
        "<div id='recipe-calculator' class='recipe-category-card'>" +
        "    <img class='recipe-category-image' alt='' src='img/calculator-512_512.png'>\n" +
        "        <h4 class='recipe-category-name'>Калькулятор</h4>\n" +
        "</div></div>")
    $("#recipe-calculator").on('click', () => window.open('./calculator.html'))

    categories.forEach(category => {
        $("#recipes-category").append("\n" +
            "<div class='col-12 col-md-6'>\n" +
            "<div id='recipe-category-card-" + category.id + "' class='recipe-category-card'>" +
            "    <img class='recipe-category-image' alt='' src='" + category.image + "'>\n" +
            "        <h4 class='recipe-category-name'>" + category.name + "</h4>\n" +
            "</div></div>")

        $("#recipe-category-card-" + category.id).on('click', () => openAllRecipiesCategory(category.id))
    })
}

function openAllRecipiesCategory (id) {
    $(".recipes-category-back-button").on('click', () => {
        $("#recipes-category-block").show(500)
        $("#recipes-list-block").hide(500)
    })

    $("#recipes-category-block").hide(500)
    $("#recipes-list-block").show(500)

//    TODO load all information

    $("#category-id").text(id)
    data.forEach(recipe => {
        $("#recipes-list").append("<div class='row' id='recipe-id" + recipe.id + "'>" +
            "    <div class='col-4 p-0'>" +
            "    <img class='preview-recipe-img' alt='' src='" + recipe.image + "' />" +
            "    </div>" +
            "    <div class='col-8 p-3'>" +
            "       <h3 class='text-truncate'>" + recipe.name + "</h3>" +
            "       <p>" + recipe.description.substring(0, 100) + "...</p>" +
            "</div></div>")
        $("#recipe-id" + recipe.id).on('click', () => openRecipe(recipe.id))
    })

}

function openRecipe (id) {
    $("#recipes-list-block").hide(500)
    $("#recipes-block").show(500)

    $(".recipes-category-back-button").on('click', () => {
        $("#recipes-list-block").show(500)
        $("#recipes-block").hide(500)
        $("#recipes-category-block").hide()

        $(".recipes-category-back-button").on('click', () => {
            $("#recipes-category-block").show(500)
            $("#recipes-list-block").hide(500)
        })
    })

    const recipe = data[id - 2];
//    TODO get data from server
    $("#recipe-name").text(recipe.name)
    $("#recipe-description").text(recipe.description)
    $("#recipe_image").attr('src', recipe.image);
    recipe.ingridients.forEach(ingridient => {
        $("#recipe-ingrigients").append(
            "<div class=\"col-5\">" + ingridient.name + "</div>\n" +
            "<div class=\"col-3\">" + ingridient.amount + "</div>\n" +
            "<div class=\"col-1\">" + ingridient.carbohydrates + "</div>\n" +
            "<div class=\"col-1\">" + ingridient.proteins + "</div>\n" +
            "<div class=\"col-1\">" + ingridient.fats + "</div>\n" +
            "<div class=\"col-1\">" + ingridient.calories + "</div>")
    })


}

loadRecipesCategory();