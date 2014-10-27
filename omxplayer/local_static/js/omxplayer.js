var omxplayer = {
    init: function () {
        var self = this;
        j.addEvent(j.selectById("listFiles"), "click", this.showListFiles);
        j.forEach(j.selectByClass("command"), function (entry) {
            j.addEvent(entry, "click", self.commandButtonClick);
        });
    },
    
    showListFiles: function () {
        var fileBrowser,
            url;
        fileBrowser = j.selectById("window");
        url = "/omxplayer/listFiles";
        
        if(this.getAttribute("data-dir") !== null) {
            url = url + "?dir=" + this.getAttribute("data-dir");
        }
        j.get(url, function (data) {
            fileBrowser.innerHTML = data.responseText;
            j.forEach(j.selectByClass("listFiles", fileBrowser), function (dir) {
                j.addEvent(dir, "click", omxplayer.showListFiles);
            });
            
            j.addEvent(j.selectByClass("back", fileBrowser)[0], "click", function () {
                fileBrowser.style.display = "none";
            });
            
            j.addEvent(j.selectById("upFolder"), "click", omxplayer.showListFiles);
            j.forEach(j.selectByClass("file", fileBrowser), function (dir) {
                j.addEvent(dir, "click", omxplayer.playFile);
            });
            
            fileBrowser.style.display = "block";
        });
    },
    
    commandButtonClick: function () {
        if(this.getAttribute("data-command") !== null) {
            omxplayer.sendCommand(this.getAttribute("data-command"));
        } else if (this.getAttribute("data-commandText") !== null) {
            omxplayer.sendCommandText(this.getAttribute("data-commandText"));
        }
    },
    
    playFile: function () {
        var url;
        fileBrowser = j.selectById("window");
        url = "/omxplayer/playFile";
        
        if(this.getAttribute("data-file") !== null) {
            url = url + "?file=" + this.getAttribute("data-file");
        }
        j.get(url, function (data) {
            fileBrowser.style.display = "none";
        });
    },
    
    playLink: function (link) {
        var url;
        fileBrowser = j.selectById("window");
        url = "/omxplayer/playFile?file=" + link;
        
        j.get(url, function (data) {
            fileBrowser.style.display = "none";
        });
    },
    
    sendCommand: function (command) {
        var url;
        url = "/omxplayer/command/?cmd=" + command;
        j.get(url);
    },
    
    sendCommandText: function (command) {
        var url;
        url = "/omxplayer/command?cmdText=" + command;
        j.get(url);
    },
}

