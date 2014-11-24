var Tasty = (function() {
	var i=0;
	var tastyBase = [];
	return {
		init:   function(cover) {
			    	var _this = this;
			    	for (var backUrl in cover) {
			    		cover[backUrl] && $('#' + backUrl.toString().substr(backUrl.toString().length - 3, 3)).css({'background' : "url(" + cover[backUrl] + ") no-repeat"});
			    	}
			    	$.getJSON('../json/info_box.json', function(json){
			    		tastyBase = json;
			    		_this.load();
			    		var h = parseInt($("#main_text").css("height"));
			    		var tasty_box = $("#tasty_box");
			    		tasty_box.on("click", "#prev", function(e) {e.preventDefault(); _this.navigation(0);});
			    		tasty_box.on("click", "#next", function(e) {e.preventDefault(); _this.navigation(1);});
			    		tasty_box.on("click", "#show", function(e) {e.preventDefault(); _this.showDetails(h);});
			    	});
			    },

		load:   function(first) {
			    	$('#main_img').fadeOut(250, function() {
			    		$(this).attr('src', 'img/' + tastyBase[i].img).fadeIn(500);
			    	});
			    	$('#title').html(tastyBase[i].title);
			    	$('#text').html(tastyBase[i].description);
			    	$('#details').html(tastyBase[i].note);
			    	$('#find').attr('href', tastyBase[i].productUrl);
			    },

		navigation: function(nav) {
						if (nav) {
							i++;
							if (i>=tastyBase.length) i=0;
						} else {
							i--;
							if (i<0) i=tastyBase.length-1;
						};
						this.load();
					},

		showDetails: function(h) {
						if ($("#main_text").css("height")==h+'px' || $("#main_text").css("height")==h+200+'px') {
							$("#img_cont").stop().animate({ opacity: "toggle", height: 'toggle'}, 500);
						}
						if ($("#main_text").css("height")==h+'px') {
							$("#main_text").stop().animate({ height: '+=200px'}, 500);
						}
						if ($("#main_text").css("height")==h+200+'px') {
							$("#main_text").stop().animate({ height: h}, 500);
						}
					 }
	}
}());
