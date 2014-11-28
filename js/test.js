var TastyModel = (function() {
	var tastyBase = [];
	return {
		getData:   function(cover) {
                                if (!tastyBase) {
                                    when($.getJSON('../json/info_box.json')).then(
                                    function(json){
			    		tastyBase = json;
                                        return tastyBase;
			    	    },function() {
                                        //TODO
                                    });
                                } else {
                                    return tastyBase;
                                }
			    }
	};
}());

var TastyController = (function(){
    var model = pModel || TastyModel;
    var i=0;
    var h = parseInt($("#main_text").css("height"));
    var tasty_box = $("#tasty_box");
    return {
           init: function(cover) {
                for (var backUrl in cover) {
		    cover[backUrl] && $('#' + backUrl.toString().substr(backUrl.toString().length - 3, 3)).css({'background' : "url(" + cover[backUrl] + ") no-repeat"});
                }
                tasty_box.on("click", "#prev", function(e) {e.preventDefault(); _this.navigation(0);});
	        tasty_box.on("click", "#next", function(e) {e.preventDefault(); _this.navigation(1);});
	        tasty_box.on("click", "#show", function(e) {e.preventDefault(); _this.showDetails(h);});
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
		var text = $("#main_text");
                var text_height = $("#main_text").css("height");
                if (text_height==h+'px' || text_height==h+200+'px') {
			$("#img_cont").stop().animate({ opacity: "toggle", height: 'toggle'}, 500);
		}
		if (text_height==h+'px') {
			text.stop().animate({ height: '+=200px'}, 500);
		}
		if (text_height==h+200+'px') {
			text.stop().animate({ height: h}, 500);
		}
	   }
    };
}());
