import { URL } from './const.js'

// const data = [{
//     img_url: "https://www.verywellfit.com/thmb/LeBe7RNtzbJwyKRmH8ditmJ1NKg=/1500x1020/filters:no_upscale():max_bytes(150000):strip_icc()/Snapwire-Running-27-66babd0b2be44d9595f99d03fd5827fd.jpg",
//     name: "Заголовок 1",
//     date: "Пт, 1 лютого",
//     description: "Lorem ipsum dolor sit hhndkd amet, consectetur bnhjjjk adipiscing",
//     id: 1
// }, {
//     img_url: "https://www.verywellfit.com/thmb/LeBe7RNtzbJwyKRmH8ditmJ1NKg=/1500x1020/filters:no_upscale():max_bytes(150000):strip_icc()/Snapwire-Running-27-66babd0b2be44d9595f99d03fd5827fd.jpg",
//     name: "Заголовок 2",
//     date: "Пт, 2 лютого",
//     description: "Lorem ipsum dolor sit hhndkd amet, consectetur bnhjjjk adipiscing",
//     id: 2
// }, {
//     img_url: "https://www.verywellfit.com/thmb/LeBe7RNtzbJwyKRmH8ditmJ1NKg=/1500x1020/filters:no_upscale():max_bytes(150000):strip_icc()/Snapwire-Running-27-66babd0b2be44d9595f99d03fd5827fd.jpg",
//     name: "Заголовок 3",
//     date: "Пт, 3 лютого",
//     description: "Lorem ipsum dolor sit hhndkd amet, consectetur bnhjjjk adipiscing",
//     id: 3
// }]

function loadBlogs () {
    $("#articles").html("");

    const page = sessionStorage.getItem('blog-page');
    const size = sessionStorage.getItem('blog-size');
    $("#article").hide();

    $.get(URL + "/article?page=" + page + "&size=" + size, function (data, err) {
        $("#total-blogs-amount").text(data.totalElements)


        data.content.forEach(article => {
            $("#articles").append("<div class='col-sm-12 col-md-6'>\n" +
                "            <div class='blog-article'>\n" +
                "                <div class='row h-100'>\n" +
                "                    <div class='col-md-5 p-md-0'>\n" +
                "                        <img class='preview-article-img' alt=''\n" +
                "                             src='" + article.image + "' />\n" +
                "                    </div>\n" +
                "                    <div class='col-md-7 p-3 pr-5'>\n" +
                "                        <div class='preview-article-date'>" + article.creationDate + "</div>\n" +
                "                        <h3 class='preview-article-name text-truncate'>" + article.title + "</h3>\n" +
                "                        <p class='preview-article-description'>" + article.text.substring(0, 50) + "...</p>\n" +
                "                        <a href='#article/" + article.id + "' id='article-id" + article.id + "' class='preview-article-read-more'>Прочитати більше</a>\n" +
                "                    </div>\n" +
                "                </div>\n" +
                "            </div>\n" +
                "        </div>")
            $("#article-id" + article.id).on('click', () => openArticle(article.id))
        })
        addPaginationPart(page, data.totalPages, data.first, data.last)

    })
}


function openArticle (id) {
    $.get(URL + "/article/" + id, function (data, err) {
        $("#article-title").text(data.title);
        $("#article-date").text(data.creationDate);
        $("#article-text").text(data.text);
        $("#article-image").attr('src', data.image);
        $("#article-back-button").on('click', () => $("#article").hide(500));
        $("#article").show(500);
    })
}

function addPaginationPart (curPage, totalPages, isFirst, isLast) {
    $("#articles").append("<div class='col-12'><div class='row pagination'>" +
        "<div class='col-4 text-left'>" +
        (isFirst ? "" : "<a id='pagination-prev'><< " + curPage + "</a>") +
        "</div><div class='col-4 text-center'>" +
        "<a>" + (+curPage + 1) + " / " + +totalPages + "</a>" +
        "</div><div class='col-4 text-right'>" +
        (isLast ? "" : "<a id='pagination-next'> " + (+curPage + 2) + " >></a>") +
        "</div></div></div>")

    $("#pagination-next").on('click', function () {
        sessionStorage.setItem('blog-page', +curPage + 1);
        loadBlogs();
    });
    $("#pagination-prev").on('click', function () {
        sessionStorage.setItem('blog-page', curPage - 1);
        loadBlogs();
    });
}

function loadPage () {

    let page = sessionStorage.getItem('blog-page');
    let size = sessionStorage.getItem('blog-size');
    console.log(page + " - " + size)
    if (page === null) {
        sessionStorage.setItem('blog-page', 0);
        page = 0;
    }
    if (size === null) {
        sessionStorage.setItem('blog-size', 5);
        size = 5;
    }
    $("#blog-size-selector").val(size)
    $("#blog-size-selector").on('change', function (value) {
        sessionStorage.setItem('blog-size', this.value);
        loadBlogs();
    })
    loadBlogs();
}

loadPage();
