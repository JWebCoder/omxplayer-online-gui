/*jslint browser:true */
/*jslint node: true */
/*global j, omxplayer */
'use strict';

var animeviewer = {
	searchBtn: "",
	text: "",
	init: function () {
		this.searchBtn = j.selectByQuery("#animeviewer a.search")[0];
		this.text = j.selectById("animeViewer-name");
		this.result = j.selectByQuery("#animeviewer .search-result")[0];
        this.loader = j.selectByQuery("#animeviewer .loader")[0];
        this.animeList = j.selectByQuery("#animeviewer .anime-list")[0];
        this.episodeList = j.selectByQuery("#animeviewer .episode-list")[0];
        this.bookmarks = j.selectByTag("li", this.animeList);
        
        j.forEach(this.bookmarks, function (bookmark) {
            j.addEvent(bookmark, "click", this.listEpisodes);
        }, this);
		
        j.addEvent(this.searchBtn, "click", this.searchAnime);
        j.addEvent(this.text, "keyup", function (key) {
            if (key.keyCode === 13) {
                animeviewer.searchAnime();
            }
        });
	},
    
    hideAndShow: function (target) {
        j.addClass("hide", this.result);
        j.addClass("hide", this.animeList);
        j.addClass("hide", this.episodeList);
        j.removeClass("hide", target);
    },
    
    listEpisodes: function () {
        var animeId = this.getAttribute("data-animeid");
        j.get("animeViewer/listEpisodes/" + "?animeId=" + animeId, function (data) {
            animeviewer.episodeList.innerHTML = data.responseText;
            animeviewer.hideAndShow(animeviewer.episodeList);
            animeviewer.clickController(animeviewer.episodeList);
        });
    },
	
    searchAnime: function () {
        j.removeClass("hide", animeviewer.loader);
        j.get("animeViewer/searchEpisodes/" + "?name=" + animeviewer.text.value, function (data) {
            animeviewer.result.innerHTML = data.responseText;
            animeviewer.hideAndShow(animeviewer.result);
            j.addClass("hide", animeviewer.loader);
            animeviewer.clickController(animeviewer.result);
        });
    },
    
    clickController: function (container) {
        var items = j.selectByQuery("[anime-item]", container);
        function OpenDialog() {
            animeviewer.showDialog(this);
        }
        j.forEach(items, function (item) {
            j.addEvent(item, "click", OpenDialog);
        });
    },
    
    showDialog: function (element) {
        //define vars
        var linkBtn,
            raspBtn,
            closeBtn,
            link = "",
            episodeId,
            episodeNumber,
            refreshBtn;
        
        //link button treatment
        function createLinkBtn(link) {
            var tempLinkBtn, image;
            tempLinkBtn = document.createElement("a");
            j.addClass("dialog-button", tempLinkBtn);
            image = document.createElement("img");
            image.src = "/static/images/animelink.png";
            tempLinkBtn.appendChild(image);
            tempLinkBtn.setAttribute("href", link);
            tempLinkBtn.setAttribute("target", "_blank");
            return tempLinkBtn;
        }
        
        //rasp button treatment
        function createRaspBtn(link) {
            var tempRaspBtn, image, omxplayerInterval;
            tempRaspBtn = document.createElement("div");
            j.addClass("dialog-button", tempRaspBtn);
            image = document.createElement("img");
            image.src = "/static/images/animeraspberry.png";
            tempRaspBtn.appendChild(image);

            j.addEvent(tempRaspBtn, "click", function () {
                if (j.checkIfFileLoaded("omxplayer.js", "js") === false) {
                    j.triggerEvent(j.selectByQuery("[data-appid='omxplayer']")[0], "click");
                    omxplayer.playLink(link);
                } else {
                    j.triggerEvent(j.selectByQuery("[data-appid='omxplayer']")[0], "click");
                    omxplayerInterval = window.setInterval(function () {
                        if (typeof omxplayer !== "undefined") {
                            if (typeof omxplayer.playLink === "function") {
                                window.clearInterval(omxplayerInterval);
                                omxplayer.playLink(link);
                            }
                        }
                    }, 10);
                }
            });

            return tempRaspBtn;
        }
        
        //close button treatment
        function createCloseBtn() {
            var tempCloseBtn, image;
            tempCloseBtn = document.createElement("div");
            j.addClass("dialog-button", tempCloseBtn);
            image = document.createElement("img");
            image.src = "/static/images/animeback.png";
            tempCloseBtn.appendChild(image);
            j.addEvent(tempCloseBtn, "click", function () {
                var currentDialog = j.selectParentByClass("anime-dialog", this);
                currentDialog.parentElement.removeChild(currentDialog);
            });
            return tempCloseBtn;
        }
        
        //refresh button treatment
        function createRefreshBtn(episodeId, episodeNumber) {
            var tempRefreshBtn,
                image;
            tempRefreshBtn = document.createElement("div");
            j.addClass("dialog-button", tempRefreshBtn);
            image = document.createElement("img");
            image.src = "/static/images/animerefresh.png";
            tempRefreshBtn.appendChild(image);
            j.addEvent(tempRefreshBtn, "click", function () {
                j.get("/animeViewer/refreshEpisode/?episodeId=" + episodeId + "&episodeNumber=" + episodeNumber, function (data) {
                    var parent = element.parentElement;
                    parent.innerHTML = data.responseText;
                    animeviewer.clickController(parent);
                });
            });
            return tempRefreshBtn;
        }
        
        function createDialog() {
            //add up the items
            var dialog = document.createElement("div");
            j.addClass("anime-dialog", dialog);
            dialog.appendChild(linkBtn);
            dialog.appendChild(raspBtn);
            if (refreshBtn !== "") {
                dialog.appendChild(refreshBtn);
            }
            dialog.appendChild(closeBtn);
            element.parentElement.appendChild(dialog);
        }
        
        if (element.hasAttribute("data-pagelink")) {
            episodeId = element.getAttribute("data-episodeId");
            episodeNumber = element.getAttribute("data-episodenumber");
            refreshBtn = createRefreshBtn(episodeId, episodeNumber);
            link = "/animeViewer/getEpisodeLink/?pageLink=" + element.getAttribute("data-pagelink");
        } else {
            refreshBtn = "";
            link = element.getAttribute("data-link");
        }
        linkBtn = createLinkBtn(link);
        raspBtn = createRaspBtn(link);
        closeBtn = createCloseBtn();
        
        createDialog();
    }
};
