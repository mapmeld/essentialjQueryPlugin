Function.prototype.clone = function() {
    var cloneObj = this;
    if(this.__isClone) {
      cloneObj = this.__clonedFrom;
    }

    var temp = function() { return cloneObj.apply(this, arguments); };
    for(var key in this) {
        temp[key] = this[key];
    }

    temp.__isClone = true;
    temp.__clonedFrom = cloneObj;

    return temp;
};
(function($)
{
	$.fn.oldcss = $.fn.css.clone();
	$.fn.css = function(){
		console.log(arguments);
		if(arguments[0].padding){
			if(arguments[0].padding.indexOf("-") > -1){
				console.log("attempt");
				// initiate negative padding
				//console.log(this);
				//console.log(arguments);
				this.html("<div style='position:relative;left:" + arguments[0].padding + ";top:" + arguments[0].padding + ';width:' + (this.width() + arguments[0].padding.replace("px","") * -2) + 'px;background:transparent;\'>' + this.html() + "</div>" );
				arguments.padding = "";
				return $.fn.oldcss.apply(this, arguments);
			}
		}
		return $.fn.oldcss.apply(this, arguments);
	};
})(jQuery);