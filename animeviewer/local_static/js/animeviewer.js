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
        j.get("animeViewer/listAnimes/" + "?name=" + animeviewer.text.value, function (data) {
            animeviewer.result.innerHTML = data.responseText;
            j.addClass("hide", animeviewer.loader);
            animeviewer.clickController();
        });
    },
    
    clickController: function () {
        var items = j.selectByQuery("[anime-item]");
        function openDialog() {
            animeviewer.showDialog(this);
        }
        j.forEach(items, function (item) {
            j.addEvent(item, "click", openDialog);
        });
    },
    
    showDialog: function (element) {
        //define vars
        var dialog,
            linkBtn,
            raspBtn,
            closeBtn,
            closeImg;
        
        //create elements
        dialog = document.createElement("div");
        linkBtn = document.createElement("a");
        raspBtn = document.createElement("a");
        closeBtn = document.createElement("a");
        
        //add the classes
        j.addClass("anime-dialog", dialog);
        j.addClass("dialog-button", linkBtn);
        j.addClass("dialog-button", raspBtn);
        j.addClass("dialog-button dialog-back", closeBtn);
        
        //link button treatment
        closeImg = document.createElement("img");
        closeImg.src = "/static/images/animelink.png";
        linkBtn.appendChild(closeImg);
        linkBtn.setAttribute("href", element.getAttribute("data-link"));
        linkBtn.setAttribute("target", "_blank");
        
        //rasp button treatment
        closeImg = document.createElement("img");
        closeImg.src = "/static/images/animeraspberry.png";
        raspBtn.appendChild(closeImg);
        raspBtn.setAttribute("href", "javascript:void(0)");
        
        //close button treatment
        closeImg = document.createElement("img");
        closeImg.src = "/static/images/animeback.png";
        closeBtn.appendChild(closeImg);
        closeBtn.setAttribute("href", "javascript:void(0)");
        j.addEvent(closeBtn, "click", function () {
            var currentDialog = j.selectByClass("anime-dialog", element.parentElement)[0];
            currentDialog.parentElement.removeChild(currentDialog);
        });
        
        //add up the items
        dialog.appendChild(linkBtn);
        dialog.appendChild(raspBtn);
        dialog.appendChild(closeBtn);
        element.parentElement.appendChild(dialog);
    }
};
