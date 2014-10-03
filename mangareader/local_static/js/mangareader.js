var mangareader = {
	searchBtn: "",
	text: "",
	init: function () {
		this.searchBtn = j.selectByQuery("#mangareader a.search")[0];
		this.text = j.selectById("mangaReader-name");
		this.result = j.selectByQuery("#mangareader .search-result")[0];
		this.chapter = j.selectByClass("manga-chapter")[0];
		j.addEvent(this.searchBtn, "click", function () {
			j.get("mangaReader/listMangas/" + "?name=" + mangareader.text.value, function(data){
				mangareader.result.innerHTML = data.responseText;
				var chapters = j.selectByQuery(".manga-chapters li a");
				j.forEach(chapters, function (chapter){
					j.addEvent(chapter, "click", function () {
						mangareader.openManga(chapter.getAttribute("data-link"));
					});
				});
			})
		});
	},
	
	openManga: function (link) {
		j.get(link, function(data){
			mangareader.chapter.innerHTML = data.responseText;
			j.removeClass("hidden", mangareader.chapter);
		});
	}
}
