/**
 * Really Simple Color Picker in jQuery
 * 
 * Copyright (c) 2008 Lakshan Perera (www.laktek.com)
 * Licensed under the MIT (MIT-LICENSE.txt)  licenses.
 * 
 */

(function($){
    $.fn.colorPicker = function(){    
        if(this.length > 0) buildSelector();
        return this.each(function(i) { 
            buildPicker(this)}); 
    };
  
    var selectorOwner;
    var selectorShowing = false;
    
    var $baseUrl = document.getElementsByTagName("head")[0].baseURI;
	var $noColorUrl = $baseUrl + 'style/assets/images/noColor.png';
  
    buildPicker = function(element){
        //build color picker
        control = $("<div class='color_picker'>&nbsp;</div>")
        if($(element).val()==""){
        	
            control.css("background-image", "url("+ $noColorUrl +")");
        }
        else {
            control.css('background-color', $(element).val());
        }
    
        //bind click event to color picker
        control.bind("click", toggleSelector);
        
        //add the color picker section
        $(element).after(control);

        //add even listener to input box
        $(element).bind("change", function() {
          selectedValue = toHex($(element).val());
          $(element).next(".color_picker").css("background-color", selectedValue);
        });
        
        //hide the input box
        $(element).hide();

    };
  
    buildSelector = function(){
        $('#color_selector').remove();
        selector = $("<div id='color_selector'></div>");

        var $items = $("<div class='color_items'></div>");
        $items.appendTo(selector);

        //add color pallete
        $.each($.fn.colorPicker.defaultColors, function(i){
            swatch = $("<div class='color_swatch'>&nbsp;</div>")
            if(this[0] == 'n' && this[1] == '/' && this[2] == 'a' || this == "n/a"){//need both for all browser support
                swatch.css("background-image", "url("+ $noColorUrl +")");
                swatch.css("background-position", "center")
                swatch.css("background-repeat", "repeat-x");//i use this instead of comparing the URL, as it changes based on location
            }
            else{
                swatch.css("background-color", "#" + this);
            }
            swatch.bind("click", function(e){ changeColor($(this).css("background-color")) });
            swatch.bind("mouseover", function(e){ 
                if($(this).css("background-repeat") == "repeat-x"){
                    $("input#color_value").val("n/a");
                }
                else {
                    $("input#color_value").val(toHex($(this).css("background-color")));
                }
            });
            swatch.bind("mouseout", function(e){ 
                //$(this).css("border-color", "#000");
            });
          
            swatch.appendTo($items);
        });
  
        //add HEX value field
        hex_field = $("<label for='color_value'>Hex</label><input type='text' size='8' id='color_value'/>");
        hex_field.bind("keydown", function(event){
            if(event.keyCode == 13) {changeColor($(this).val());}
            if(event.keyCode == 27) {toggleSelector()}
        });
     
        $("<div id='color_custom'></div>").append(hex_field).appendTo(selector);

        $("body").append(selector); 
        selector.hide();
    };
  
    checkMouse = function(event){
        //check the click was on selector itself or on selectorOwner
        var selector = "div#color_selector";
        var selectorParent = $(event.target).parents(selector).length;
        if(event.target == $(selector)[0] || event.target == selectorOwner || selectorParent > 0) return
        
        hideSelector();   
    }
  
    hideSelector = function(){
        var selector = $("div#color_selector");
        
        $(document).unbind("mousedown", checkMouse);
        selector.hide();
        selectorShowing = false
    }
  
    showSelector = function(){
        var selector = $("div#color_selector");
        
        //alert($(selectorOwner).offset().top);

        var width = selector.css("width");
        width = parseInt(width.replace("px",""));
        if($(selectorOwner).offset().left + width>document.body.scrollWidth){
            selector.css({
                top: $(selectorOwner).offset().top + ($(selectorOwner).outerHeight()) + 4,
                left: $(selectorOwner).offset().left + ($(selectorOwner).outerWidth()) - width - 14
            });
        }
        else{
            selector.css({
                top: $(selectorOwner).offset().top + ($(selectorOwner).outerHeight()),
                left: $(selectorOwner).offset().left
            });
        }
        hexColor = $(selectorOwner).prev("input").val();
        $("input#color_value").val(hexColor);
        selector.show();
        
        //bind close event handler
        $(document).bind("mousedown", checkMouse);
        selectorShowing = true 
    }
  
    toggleSelector = function(event){
        selectorOwner = this; 
        selectorShowing ? hideSelector() : showSelector();
    }
  
    changeColor = function(value){
        if(selectedValue = toHex(value)){
            $(selectorOwner).css("background-color", selectedValue);
            $(selectorOwner).prev("input").val(selectedValue).change();
            $(selectorOwner).css("background-image", "none");
          
        }
        else{
            $(selectorOwner).css("background-image", "url("+ $noColorUrl +")");
            $(selectorOwner).prev("input").val("").change();
        }
        //close the selector
        hideSelector();
    };
  
    //converts RGB string to HEX - inspired by http://code.google.com/p/jquery-color-utils
    toHex = function(color){
        //valid HEX code is entered
        if(color.match(/[0-9a-fA-F]{3}$/) || color.match(/[0-9a-fA-F]{6}$/)){
          color = (color.charAt(0) == "#") ? color : ("#" + color);
        }
        //rgb color value is entered (by selecting a swatch)
        else if(color.match(/^rgb\(([0-9]|[1-9][0-9]|[1][0-9]{2}|[2][0-4][0-9]|[2][5][0-5]),[ ]{0,1}([0-9]|[1-9][0-9]|[1][0-9]{2}|[2][0-4][0-9]|[2][5][0-5]),[ ]{0,1}([0-9]|[1-9][0-9]|[1][0-9]{2}|[2][0-4][0-9]|[2][5][0-5])\)$/)){
            var c = ([parseInt(RegExp.$1),parseInt(RegExp.$2),parseInt(RegExp.$3)]);
          
            var pad = function(str){
                if(str.length < 2){
                  for(var i = 0,len = 2 - str.length ; i<len ; i++){
                    str = '0'+str;
                  }
                }
                return str;
            }

            if(c.length == 3){
                var r = pad(c[0].toString(16)),g = pad(c[1].toString(16)),b= pad(c[2].toString(16));
                color = '#' + r + g + b;
            }
        }
        else color = false;
    
        return color
    }

  
    //public methods
    $.fn.colorPicker.addColors = function(colorArray){
        $.fn.colorPicker.defaultColors = $.fn.colorPicker.defaultColors.concat(colorArray);
    };
  
    $.fn.colorPicker.defaultColors = 
	[ 'ffffff', 'e5e5e5', 'cfcfcf', 'b8b8b8', 'a1a1a1', '8a8a8a', '737373', '5c5c5c', '454545', '323232', '171717', '000000',
      'ffcccc', 'ffe6cc', 'ffffcc', 'e6ffcc', 'ccffcc', 'ccffe6', 'ccffff', 'cce5ff', 'ccccff', 'e5ccff', 'ffccff', 'ffcce6',
      'f99', 'fc9', 'ff9', 'cf9', '9f9', '9fc', '9ff', '9cf', '99f', 'c9f', 'f9f', 'f9c',
      'f66', 'ffb366', 'ffff66', 'b3ff66', '66ff66', '66ffb3', '66ffff', '66b2ff', '6666ff', 'b266ff', 'ff66ff', 'ff66b3',
      'ff3333', 'ff9933', 'ff0', '80ff00', '00ff00', '00ff80', '00ffff', '007fff', '0000ff', '7f00ff', 'ff00ff', 'ff0080',
      'cc0000', 'cc6600', 'cccc00', '66cc00', '00cc00', '00cc66', '00cccc', '0066cc', '0000cc', '6600cc', 'cc00cc', 'cc0066',
      '900', '994c00', '999900', '4d9900', '009900', '00994d', '009999', '004c99', '000099', '4c0099', '990099', '99004d',
      '660000', '663300', '666600', '336600', '006600', '006633', '006666', '003366', '000066', '330066', '660066', '660033',
      '330000', '331a00', '333300', '1a3300', '003300', '00331a', '003333', '001933', '000033', '190033', '330033', 'n/a'];
})(jQuery);