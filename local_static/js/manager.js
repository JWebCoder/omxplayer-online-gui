var manager = {
	notification: "",
	shortcuts: "",
	applications: "",
	menu: "",
	apps: "",
	body: "",
	openApps: [],
	init: function () {
		var self = this;
		this.notification = j.selectById("notification");
		this.shortcuts = j.selectById("shortcuts");
		this.applications = j.selectById("applications");
		this.menu = j.selectById("menu");
		this.apps = j.selectByClass("app");
		this.body = j.selectByTag("body")[0];
		this.notification.style.bottom = (parseInt(window.innerHeight, 10) - 20) + "px";
		this.eventHandlers.appButtons();
		j.forEach(j.selectByClass("swipe-layer"), function (layer) {
			var callback = function () {};
			if (j.hasClass("shortcuts-layer", layer)) {
				callback = function () {
					manager.showSection(manager.shortcuts);
					
				};
			}
			this.eventHandlers.swipeEvents(layer, layer.getAttribute("data-direction"), callback);
		}, this);
    },
    
    eventHandlers: {
		appButtons: function () {
			j.forEach(manager.apps, function (app) {
				j.addEvent(app, "click", function () {
					var index = 0,
						len = manager.openApps.length,
						isOpen = false;
					for (;index < len; index += 1) {
						if (app.getAttribute("data-appid") === manager.openApps[index]) {
							isOpen = true;
						}
					}
					if (!isOpen) {
						manager.openApp(app);
					} else {
						manager.showSection(j.selectById(app.getAttribute("data-appid")));
					}
				});
				
			}, this);
		},
		
			
		
		swipeEvents: function (el, direction, callback) {
			var threshold = 50,
				restraint = 100,
				allowedTime = 300,
				startTime = 0,
				startX,
				startY,
				distX,
				distY,
				dist,
				time;
			
			handleSwipe = callback || function(swipeDir) {
				alert(swipeDir);
			}
			
			j.addEvent(el, "touchstart", function(event) {
				var touchObj = event.changedTouches[0];
				dist = 0;
				startX = touchObj.pageX;
				startY = touchObj.pageY;
				startTime = new Date().getTime();
				
			});
			j.addEvent(el, "touchend", function(event) {
				var touchObj = "",
					swipeDir;
				time = new Date().getTime() - startTime;
				if (time < allowedTime) {
					touchObj = event.changedTouches[0];
					distX = touchObj.pageX - startX;
					distY = touchObj.pageY - startY;
					if ((Math.abs(distX) > threshold) && (Math.abs(distY) < restraint)) {
						if ((startX < 50) && (distX > 0) && (direction === "right")){
							swipeDir = "right";
						} else if ((startX > window.innerWidth - 50) && (distX < 0) && (direction === "left")){
							swipeDir = "left";
						}
					} else if ((Math.abs(distY) > threshold) && (Math.abs(distX) < restraint)) {
						if ((startY < 50) && (distY > 0) && (direction === "down")){
							swipeDir = "down";
						} else if ((startY > window.innerHeight - 50) && (distY < 0) && (direction === "up")){
							swipeDir = "up";
						}
					}
					handleSwipe(swipeDir);
				}
				
			});
		}
	},
	
	showSection: function (section) {
		var visible = j.selectByClass("visible")[0];
		if (section !== visible) {
			j.removeClass("visible", visible);
			j.addClass("visible", section);
			j.removeClass("hidden", section);
			window.setTimeout(function () {
				j.addClass("hidden", visible);
			}, 500);
		}
	},
	
	showApp: function (app) {
		j.removeClass("hide", j.selectById(app));
		window.setTimeout(function () {
			j.addClass("hide", this.shortcuts);
		}, 500);
	},
    
    openApp: function (app) {
		var appId = app.getAttribute("data-appid"),
			appLink = app.getAttribute("data-link"),
			appManager = app.getAttribute("data-manager"),
			application,
			caller = 0,
			interval,
			visible;
		manager.openApps.push(appId);
		application = document.createElement("section");
		application.id = appId;
		j.addClass("application opened", application);
		j.loadFile([{fileName: "static/js/" + appManager + ".js", fileType: 'js'},
                    {fileName: "static/css/" + appManager + ".css", fileType: 'css'}], function () {
			caller += 1;
		});
		j.get(appLink, function (data) {
			application.innerHTML = data.responseText;
			caller += 1;
		});
		interval = window.setInterval(function () {
			if (caller === 2) {
				window[appManager].init();
			 window.clearInterval(interval);
            }
		}, 100);
		this.body.appendChild(application);
		
		this.showSection(application);
	}
}

j.onDomReady(function () {
    manager.init();
});
