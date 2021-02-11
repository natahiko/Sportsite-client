const categories = [
    {
        image: "https://img.pngio.com/calculator-icon-transparent-png-svg-vector-calculator-icon-png-512_512.png",
        name: "Калькулятор",
        id: 1
    },
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

function loadRecipesCategory () {
//    TODO get real data from server
    categories.forEach(category => {
        $("#recipes-category").append("\n" +
            "<div class='col-6'>\n" +
            "<div class='recipe-category-card' onclick='openAllRecipiesCategory(" + category.id + ")'>" +
            "    <img class='recipe-category-image' alt='' src='" + category.image + "'>\n" +
            "        <h4 class='recipe-category-name'>" + category.name + "</h4>\n" +
            "</div></div>")
    })
}

function openAllRecipiesCategory (id) {
    $("#recipes-category-block").hide(500)
    $("#recipes-list-block").show(500)
    $("#category-id").text(id)
//    TODO load all information
}


loadRecipesCategory();