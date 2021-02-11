const data = [{
    img_url: "https://www.verywellfit.com/thmb/LeBe7RNtzbJwyKRmH8ditmJ1NKg=/1500x1020/filters:no_upscale():max_bytes(150000):strip_icc()/Snapwire-Running-27-66babd0b2be44d9595f99d03fd5827fd.jpg",
    name: "Заголовок 1",
    date: "Пт, 1 лютого",
    description: "Lorem ipsum dolor sit hhndkd amet, consectetur bnhjjjk adipiscing",
    id: 1
},{
    img_url: "https://www.verywellfit.com/thmb/LeBe7RNtzbJwyKRmH8ditmJ1NKg=/1500x1020/filters:no_upscale():max_bytes(150000):strip_icc()/Snapwire-Running-27-66babd0b2be44d9595f99d03fd5827fd.jpg",
    name: "Заголовок 2",
    date: "Пт, 2 лютого",
    description: "Lorem ipsum dolor sit hhndkd amet, consectetur bnhjjjk adipiscing",
    id: 2
},{
    img_url: "https://www.verywellfit.com/thmb/LeBe7RNtzbJwyKRmH8ditmJ1NKg=/1500x1020/filters:no_upscale():max_bytes(150000):strip_icc()/Snapwire-Running-27-66babd0b2be44d9595f99d03fd5827fd.jpg",
    name: "Заголовок 3",
    date: "Пт, 3 лютого",
    description: "Lorem ipsum dolor sit hhndkd amet, consectetur bnhjjjk adipiscing",
    id: 3
}]

function loadBlogs(){
    $("#article").hide();
//    TODO get data fron server
    data.forEach(article => {
        $("#articles").append("<div class='col-sm-12 col-md-6'>\n" +
            "            <div class='blog-article'>\n" +
            "                <div class='row'>\n" +
            "                    <div class='col-sm-5 p-0'>\n" +
            "                        <img class='preview-article-img' alt=''\n" +
            "                             src='"+article.img_url+"' />\n" +
            "                    </div>\n" +
            "                    <div class='col-md-7 p-3'>\n" +
            "                        <div class='preview-article-date'>"+ article.date +"</div>\n" +
            "                        <h3 class='preview-article-name'>"+ article.name +"</h3>\n" +
            "                        <p class='preview-article-description'>"+ article.description +"</p>\n" +
            "                        <a href='#article/"+article.id+"' onclick='openArticle("+article.id+")' class='preview-article-read-more'>Прочитати більше</a>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "            </div>\n" +
            "        </div>")
    })
}

function openArticle(id){
    const article = data[id-1];
//    TODO get article fron server
    $("#article-title").text(article.name);
    $("#article-date").text(article.date);
    $("#article-text").text(article.description);
    $("#article-image").attr('src',article.img_url);
    $("#article").show(1000);
}

function closeArticle(){
    $("#article").hide(1000);
}

loadBlogs();