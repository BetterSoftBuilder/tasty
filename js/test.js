var TastyModel = (function() {
	return {
		getData:   function() {
                                var _this = this;
                                if (!this.tastyBase) {
                                    $.when($.getJSON('../json/info_box.json')).then(
                                    function(json){
			    		_this.tastyBase = json;
			    	    },function() {
                                        //TODO
                                    });
                                } else {
                                    return _this.tastyBase;
                                }
			    },
                getHeight: function() {
                        this.h = parseInt($("#main_text").css("height"));
                        this.tasty_box = $("#tasty_box");
                }
	};
}());

var TastyController = (function(){
    var model = TastyModel;
    var i=0;
    function _navigation(nav) {
	    	if (nav) {
	    		i++;
	    		if (i>=model.tastyBase.length) i=0;
	    	} else {
	    		i--;
	    		if (i<0) i=model.tastyBase.length-1;
	    	};
	    	this._load();
	    }

    function _load() {
		$('#main_img').fadeOut(250, function() {
			$(this).attr('src', 'img/' + model.tastyBase[i].img).fadeIn(500);
		});
		$('#title').html(model.tastyBase[i].title);
		$('#text').html(model.tastyBase[i].description);
		$('#details').html(model.tastyBase[i].note);
		$('#find').attr('href', model.tastyBase[i].productUrl);
            }

    function _showDetails(h) {
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

    return {
           init: function(cover) {
                    for (var backUrl in cover) {
                        cover[backUrl] && $('#' + backUrl.toString().substr(backUrl.toString().length - 3, 3)).css({'background' : "url(" + cover[backUrl] + ") no-repeat"});
                    }
                    model.getData();
                    //_load();
                    model.getHeight();
                    tasty_box.on("click", "#prev", function(e) {e.preventDefault(); _navigation(0);});
                    tasty_box.on("click", "#next", function(e) {e.preventDefault(); _navigation(1);});
                    tasty_box.on("click", "#show", function(e) {e.preventDefault(); _showDetails(h);});
                }
    };
}());
