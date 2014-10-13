var animeviewer = {
	searchBtn: "",
	text: "",
	init: function () {
		this.searchBtn = j.selectByQuery("#animeviewer a.search")[0];
		this.text = j.selectById("animeViewer-name");
		this.result = j.selectByQuery("#animeviewer .search-result")[0];
		j.addEvent(this.searchBtn, "click", animeviewer.searchAnime);
        j.addEvent(this.text, "keyup", function (key) {
            if (key.keyCode === 13) {
                animeviewer.searchAnime();
            }
        });
	},
	
    searchAnime: function () {
        j.get("animeViewer/listAnimes/" + "?name=" + animeviewer.text.value, function(data){
            animeviewer.result.innerHTML = data.responseText;
            var results = j.selectByQuery(".anime-results li a");
            j.forEach(results, function (result){
                j.addEvent(result, "click", function () {
                    //animeviewer.openManga(chapter.getAttribute("data-link"));
                });
            });
        });
    },
    
	/*openManga: function (link) {
		j.get(link, function(data){
			mangareader.chapter.innerHTML = data.responseText;
            j.addEvent(j.selectByClass("close", mangareader.chapter)[0], "click", function () {
                j.addClass("hidden", mangareader.chapter);
            });
			j.removeClass("hidden", mangareader.chapter);
		});
	}*/
}
