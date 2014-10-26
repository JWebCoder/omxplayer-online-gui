var animeviewer = {
	searchBtn: "",
	text: "",
	init: function () {
		this.searchBtn = j.selectByQuery("#animeviewer a.search")[0];
		this.text = j.selectById("animeViewer-name");
		this.result = j.selectByQuery("#animeviewer .search-result")[0];
        this.loader = j.selectByQuery("#animeviewer .loader")[0];
		j.addEvent(this.searchBtn, "click", animeviewer.searchAnime);
        j.addEvent(this.text, "keyup", function (key) {
            if (key.keyCode === 13) {
                animeviewer.searchAnime();
            }
        });
	},
	
    searchAnime: function () {
        j.removeClass("hide", animeviewer.loader);
        j.get("animeViewer/listAnimes/" + "?name=" + animeviewer.text.value, function(data){
            animeviewer.result.innerHTML = data.responseText;
            j.addClass("hide", animeviewer.loader);
            var results = j.selectByQuery(".anime-results li a");
            j.forEach(results, function (result){
                j.addEvent(result, "click", function () {
                    //animeviewer.openManga(chapter.getAttribute("data-link"));
                });
            });
        });
    }
}
