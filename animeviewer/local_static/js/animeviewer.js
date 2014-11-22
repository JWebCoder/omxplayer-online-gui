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
            j.removeClass("hide", animeviewer.result);
            j.addClass("hide", animeviewer.loader);
            animeviewer.clickController();
        });
    },
    
    clickController: function () {
        var items = j.selectByQuery("[anime-item]");
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
            closeBtn;
        
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
            j.addClass("dialog-button dialog-back", tempCloseBtn);
            image = document.createElement("img");
            image.src = "/static/images/animeback.png";
            tempCloseBtn.appendChild(image);
            j.addEvent(tempCloseBtn, "click", function () {
                var currentDialog = j.selectParentByClass("anime-dialog", this);
                currentDialog.parentElement.removeChild(currentDialog);
            });
            return tempCloseBtn;
        }
        
        function createDialog() {
            //add up the items
            var dialog = document.createElement("div");
            j.addClass("anime-dialog", dialog);
            dialog.appendChild(linkBtn);
            dialog.appendChild(raspBtn);
            dialog.appendChild(closeBtn);
            element.parentElement.appendChild(dialog);
        }
        
        
        linkBtn = createLinkBtn(element.getAttribute("data-link"));
        raspBtn = createRaspBtn(element.getAttribute("data-link"));
        closeBtn = createCloseBtn();
        
        createDialog(linkBtn, raspBtn, closeBtn);
    }
};
