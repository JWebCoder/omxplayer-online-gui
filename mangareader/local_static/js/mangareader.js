var mangareader = {
	searchBtn: "",
	text: "",
	init: function () {
		this.searchBtn = j.selectByQuery("#mangareader a.search")[0];
		this.text = j.selectById("mangaReader-name");
		this.result = j.selectByQuery("#mangareader .search-result")[0];
		this.chapter = j.selectByClass("manga-chapter")[0];
        this.loader = j.selectByQuery("#mangareader .loader")[0];
		j.addEvent(this.searchBtn, "click", mangareader.searchManga);
        console.log("teste");
        j.addEvent(this.text, "keyup", function (key) {
            if (key.keyCode === 13) {
                mangareader.searchManga();
            }
        });
	},
	
    searchManga: function () {
        j.removeClass("hide", mangareader.loader);
        j.get("mangaReader/listMangas/" + "?name=" + mangareader.text.value, function(data){
            mangareader.result.innerHTML = data.responseText;
            var chapters = j.selectByQuery(".manga-chapters li a");
            j.forEach(chapters, function (chapter){
                j.addEvent(chapter, "click", function () {
                    mangareader.openManga(chapter.getAttribute("data-link"));
                });
            });
            j.addClass("hide", mangareader.loader);
        });
    },
    
	openManga: function (link) {
		j.get(link, function(data){
			mangareader.chapter.innerHTML = data.responseText;
            j.addEvent(j.selectByClass("close", mangareader.chapter)[0], "click", function () {
                j.addClass("hidden", mangareader.chapter);
            });
			j.removeClass("hidden", mangareader.chapter);
		});
	}
}
