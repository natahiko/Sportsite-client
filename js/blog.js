import { URL, ImageUploadURL, checkForAuthorization, userAuth } from './const.js'

function loadBlogs () {
    $("#add-article").hide();
    $("#articles").html("");

    const page = localStorage.getItem('blog-page');
    const size = localStorage.getItem('blog-size');
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
    $("#add-article").hide();
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
        loca.setItem('blog-page', +curPage + 1);
        loadBlogs();
    });
    $("#pagination-prev").on('click', function () {
        localStorage.setItem('blog-page', curPage - 1);
        loadBlogs();
    });
}

let newBlogImage = null

function loadPage () {
    checkForAuthorization()

    if (localStorage.getItem(userAuth) === null)
        $("#add-blog").hide();

    $("#add-article").hide();

    let page = localStorage.getItem('blog-page');
    let size = localStorage.getItem('blog-size');

    if (page === null) {
        localStorage.setItem('blog-page', 0);
        page = 0;
    }
    if (size === null) {
        localStorage.setItem('blog-size', 5);
        size = 5;
    }
    $("#blog-size-selector").val(size)
    $("#blog-size-selector").on('change', function (value) {
        localStorage.setItem('blog-size', this.value);
        loadBlogs();
    })
    $("#add-blog").on('click', function () {
        $("#add-article").show(200);
        $("#article").hide();
        $("#articles").hide();
    })
    $("#submit-add-article").on('click', uploadBlog)
    $("#blog-image-input").on('change', function () {
        var selectedFile = this.files[0];
        selectedFile.convertToBase64(function (base64) {
            newBlogImage = base64;
        })
    });
    loadBlogs();
}

File.prototype.convertToBase64 = function (callback) {
    var reader = new FileReader();
    reader.onloadend = function (e) {
        callback(e.target.result, e.target.error);
    };
    reader.readAsDataURL(this);
};

function uploadBlog () {
    const title = $("#blog-title-input").val()
    if (title === "") {
        alert("Назва блогу не може бути пустим полем!")
        return
    }
    const text = $("#blog-text-input").val()
    if (text === "") {
        alert("Текст блогу не може бути пустим полем!")
        return
    }
    const date = new Date().toISOString().substring(0, 10)
    if (!newBlogImage) {
        $.ajax({
            type: "POST",
            url: URL + "/article",
            data: JSON.stringify({
                "title": title,
                "text": text,
                "creationDate": date
            }),
            success: (data) => {
                clearCloseAddBlog()
            },
            contentType: "application/json"
        });
    } else {
        const index = newBlogImage.indexOf(',')
        var data = new FormData();
        data.append('image', newBlogImage.substring(+index + +1));

        $.ajax({
            type: "POST",
            url: ImageUploadURL,
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            success: (data) => {
                $.ajax({
                    type: "POST",
                    url: URL + "/article",
                    data: JSON.stringify({
                        "title": title,
                        "text": text,
                        "image": data.data.display_url,
                        "creationDate": date
                    }),
                    success: (data) => {
                        clearCloseAddBlog()
                    },
                    contentType: "application/json"
                });
            },
        });
    }
}

function clearCloseAddBlog () {
    $("#blog-title-input").val("")
    $("#blog-text-input").val("")

    $("#add-article").hide(200);
    $("#articles").show();
}

loadPage();
