var manager = {
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
        url = "/listFiles";
        
        if(this.getAttribute("data-dir") !== null) {
            url = url + "?dir=" + this.getAttribute("data-dir");
        }
        j.get(url, function (data) {
            fileBrowser.innerHTML = data.responseText;
            j.forEach(j.selectByClass("listFiles", fileBrowser), function (dir) {
                j.addEvent(dir, "click", manager.showListFiles);
            });
            
            j.addEvent(j.selectByClass("back", fileBrowser)[0], "click", function () {
                fileBrowser.style.display = "none";
            });
            
            j.addEvent(j.selectById("upFolder"), "click", manager.showListFiles);
            j.forEach(j.selectByClass("file", fileBrowser), function (dir) {
                j.addEvent(dir, "click", manager.playFile);
            });
            
            fileBrowser.style.display = "block";
        });
    },
    
    commandButtonClick: function () {
        if(this.getAttribute("data-command") !== null) {
            manager.sendCommand(this.getAttribute("data-command"));
        } else if (this.getAttribute("data-commandText") !== null) {
            manager.sendCommandText(this.getAttribute("data-commandText"));
        }
    },
    
    playFile: function () {
        var url;
        fileBrowser = j.selectById("window");
        url = "/playFile";
        
        if(this.getAttribute("data-file") !== null) {
            url = url + "?file=" + this.getAttribute("data-file");
        }
        j.get(url, function (data) {
            fileBrowser.style.display = "none";
        });
    },
    
    sendCommand: function (command) {
        var url;
        url = "/command?cmd=" + command;
        j.get(url);
    },
    
    sendCommandText: function (command) {
        var url;
        url = "/command?cmdText=" + command;
        j.get(url);
    },
}

j.onDomReady(function () {
    manager.init();
});