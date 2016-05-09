$( document ).ready(function() {

	// First create blank card
	$(".createCard").click(function(){
		if (!$("body").find(".card").length > 0) {
        	$("body").append("<div class=\"card\"></div>");
    	}
    });

    // Select number
    var saveName
    $(".numberBut").click(function(){
        // Save name
        saveName = $(this).attr("name");
        // Check if number already exists, if not create it
    	if (!$(".card").find(".number").length > 0) {
    		$(".card").append("<div class=\"number top-number\"></div>");
    		$(".card").append("<div class=\"number bottom-number\"></div>");
    	} else {
            // Adds center symbol
            centerSymbol(this);
        }
    	// Changes the number to the button selected
        $(".number").text($(this).attr("name"));
		// Positions the number properly on card
        numberPosition(this);
        // Checks if symbol was already selected if symbol is selected before number
        if ($(".symbol").css("color") == "rgb(255, 0, 0)") {
        	$(".number").css("color", "red");
        }
    });

    // Select symbol
    var saveSymbol
	$(".symbolBut").click(function(){
        // Save symbol
        saveSymbol = $(this).attr("name");
		// Check if symbol already exists, if not create it
		if (!$(".card").find(".top-symbol").length > 0) {
			$(".card").append("<div class=\"symbol top-symbol\"></div>");
    		$(".card").append("<div class=\"symbol bottom-symbol\"></div>");
    	}
    	// Changes the symbol to the button selected
    	if ($(".card").find("img").length > 0) {
        	$(".top-symbol").text($(this).attr("name"));
        	$(".bottom-symbol").text($(this).attr("name"));
        	changeSuitImage(saveName);
        } else {
        	$(".symbol").text($(this).attr("name"));
        }
        // Changes the color according to the symbol
        symbolColor(this);
        // Sizes the symbol properly on card
        symbolSizeSmall(this);
        
    });

	// Positions the number properly on card
	var numberPosition = function(element) {
    	var classes = [".top-number", ".bottom-number"];
    	var position = ["left", "right"];

    	for (var i=0; i<=1; i++) {
    		if ( $(element).attr("name") > 1 && $(element).attr("name") < 10 ) {
	        	$(classes[i]).css(position[i], "10px");
	        } else if ( $(element).attr("name") == "J") {
	        	$(classes[i]).css(position[i], "13px");
	        } else if ( $(element).attr("name") == 10) {
	        	$(classes[i]).css(position[i], "2px");
	        } else {
	        	$(classes[i]).css(position[i], "5px");
	        }
    	}
    }

    // Changes the color according to the symbol
    var symbolColor = function(element) {
		if ( $(element).attr("name") == "\u2665" || $(element).attr("name") == "\u2666") { // unicode for hearts and diamonds
        	$(".number").css("color", "red");
        	$(".symbol").css("color", "red");
        } else {
        	$(".number").css("color", "black");
        	$(".symbol").css("color", "black");
        }
    }

    // Sizes the symbol properly on card
    /*var symbolSize = function(element,size) {
    	var pixels = [], symbol = [];
    	switch (size) {
    		case "small": pixels = ["45px","40px","50px"]; symbol = [".top-symbol",".bottom-symbol"]; break;
    		case "large": pixels = ["55px","50px","80px"]; symbol = [".center-symbol"]; break;
    	}
        console.log( $(".symbolBut").attr("name") );
    	for (var i = 0; i<symbol.length; i++) {
			if ( $(".symbolBut").attr("name") == "\u2665" ) { // unicode for hearts
	        	$(symbol[i]).css("font-size", pixels[0]);
	        } else if ( $(".symbolBut").attr("name") == "\u2663" ) { // unicode for clubs
	        	$(symbol[i]).css("font-size", pixels[1]);
	        } else { // spades and hearts
	        	$(symbol[i]).css("font-size", pixels[2]);
	        }
	    }
    }*/

    // Sizes the top and bottom symbols properly on card
    var symbolSizeSmall = function(element) {
        var pixels = ["45px","40px","50px"], symbol = [".top-symbol",".bottom-symbol"];
        for (var i = 0; i<symbol.length; i++) {
            if ( $(element).attr("name") == "\u2665" ) { // unicode for hearts
                $(symbol[i]).css("font-size", pixels[0]);
            } else if ( $(element).attr("name") == "\u2663" ) { // unicode for clubs
                $(symbol[i]).css("font-size", pixels[1]);
            } else { // spades and hearts
                $(symbol[i]).css("font-size", pixels[2]);
            }
        }
    }

    // Sizes the center symbols properly on card
    var symbolSizeLarge = function() {
        var pixels = ["65px","60px","70px"], symbol = [".center-symbol"]; 
        for (var i = 0; i<symbol.length; i++) {
            if ( $(".top-symbol").text() == "\u2665" ) { // unicode for hearts
                $(symbol[i]).css("font-size", pixels[0]);
            } else if ( $(".top-symbol").text() == "\u2663" ) { // unicode for clubs
                $(symbol[i]).css("font-size", pixels[1]);
            } else { // spades and hearts
                $(symbol[i]).css("font-size", pixels[2]);
            }
        }
    }

    // Makes center-symbol
    var makeCenterSymbol = function() {
    	// Add div
    	$(".card").append("<div class=\"symbol center-symbol\"></div>");
    	// Add symbol text
    	$(".center-symbol").text($(".top-symbol").text());
    	// Position the symbol and make font larger
    	$(".center-symbol").css("position", "absolute");
    	symbolSizeLarge();
    	// Makes sure color of symbol is correct
    	if ($(".symbol").css("color") == "rgb(255, 0, 0)") {
        	$(".center-symbol").css("color", "red");
        }
    }

    // Corrects the amount of center symbols
    var correctCenterSymbol = function(num) {
        // Remove css
        $(".center-symbol:eq(1)").css("-ms-transform", "");
        $(".center-symbol:eq(1)").css("-webkit-transform", "");
        $(".center-symbol:eq(1)").css("transform", "");
        // Remove images
    	while ($(".card").find("img").length > 0) {
        	$(".center-symbol:last-child").remove();
        }
        // Remove divs
    	while ($(".card").find(".center-symbol").length > num) {
			$(".center-symbol:last-child").remove();
		}
        // Make divs
		while ($(".card").find(".center-symbol").length < num) {
			makeCenterSymbol();
		}
    }

    // Position functions
    var pos2 = function() {
    	$(".center-symbol:eq(0)").css("top", "40px");
		$(".center-symbol:eq(0)").css("left", "105px");
		$(".center-symbol:eq(1)").css("top", "240px");
		$(".center-symbol:eq(1)").css("left", "105px");
    }
    var pos4 = function() {
    	$(".center-symbol:eq(0)").css("top", "40px");
		$(".center-symbol:eq(0)").css("left", "55px");
		$(".center-symbol:eq(1)").css("top", "40px");
		$(".center-symbol:eq(1)").css("left", "155px");
		$(".center-symbol:eq(2)").css("top", "240px");
		$(".center-symbol:eq(2)").css("left", "55px");
		$(".center-symbol:eq(3)").css("top", "240px");
		$(".center-symbol:eq(3)").css("left", "155px");
    }
    var pos5 = function() {
		pos4();
		$(".center-symbol:eq(4)").css("top", "140px");
		$(".center-symbol:eq(4)").css("left", "105px");
	}
	var pos6 = function() {
    	pos4();
    	$(".center-symbol:eq(4)").css("top", "140px");
		$(".center-symbol:eq(4)").css("left", "55px");
		$(".center-symbol:eq(5)").css("top", "140px");
		$(".center-symbol:eq(5)").css("left", "155px");
    }
    var pos7 = function() {
		pos6();
		$(".center-symbol:eq(6)").css("top", "90px");
		$(".center-symbol:eq(6)").css("left", "105px");
	}
	var pos9 = function() {
		pos5();
		$(".center-symbol:eq(5)").css("top", "100px");
		$(".center-symbol:eq(5)").css("left", "55px");
		$(".center-symbol:eq(6)").css("top", "100px");
		$(".center-symbol:eq(6)").css("left", "155px");
		$(".center-symbol:eq(7)").css("top", "180px");
		$(".center-symbol:eq(7)").css("left", "55px");
		$(".center-symbol:eq(8)").css("top", "180px");
		$(".center-symbol:eq(8)").css("left", "155px");
	}

	var changeSuitImage = function(name) {
		correctCenterSymbol(0);
		var suit;
		if (saveSymbol == "\u2663") {// clubs
			suit = "club";
		} else if (saveSymbol == "\u2660") { // spades
			suit = "spade";
		} else if (saveSymbol == "\u2665") { // hearts
			suit = "heart";
		} else { // diamonds
			suit = "diamond";
		}
        // Create symbol divs
        makeCenterSymbol();
        makeCenterSymbol();
        // Create picture div
		$(".card").append("<div class=\"symbol center-symbol\"><img src=\"images/" + suit + name + ".png\"/></div>");
		// Position the symbols
        $(".center-symbol:eq(0)").css("top", "50px");
        $(".center-symbol:eq(0)").css("left", "55px");
        $(".center-symbol:eq(1)").css("top", "230px");
        $(".center-symbol:eq(1)").css("left", "155px");
        if (suit == "club") {
            $(".center-symbol:eq(1)").css("top", "240px");
        }
        // Rotate second symbol
        $(".center-symbol:eq(1)").css("-ms-transform", "rotate(180deg)");
        $(".center-symbol:eq(1)").css("-webkit-transform", "rotate(180deg)");
        $(".center-symbol:eq(1)").css("transform", "rotate(180deg)");
        // Position the picture
		$(".center-symbol:eq(2)").css("position", "absolute");
        $(".center-symbol:eq(2)").css("z-index", "-1");
		$(".center-symbol:eq(2)").css("top", "57px");
		$(".center-symbol:eq(2)").css("left", "50px");
    }

    // Adds the center element
    var centerSymbol = function(element) {
    	switch ($(element).attr("name")) {
    		case "A": {
    			correctCenterSymbol(1);
    			// Position the symbol
    			$(".center-symbol").css("top", "140px");
    			$(".center-symbol").css("left", "105px");
    		}
    		break;
    		case "2": {
    			correctCenterSymbol(2);
				// Position the symbol
				pos2();
    		}
    		break;
    		case "3": {
    			correctCenterSymbol(3);
				// Position the symbol
				pos2();
				$(".center-symbol:eq(2)").css("top", "140px");
				$(".center-symbol:eq(2)").css("left", "105px");
    		}
    		break;
    		case "4": {
    			correctCenterSymbol(4);
				// Position the symbol
				pos4();
    		}
    		break;
    		case "5": {
    			correctCenterSymbol(5);
				// Position the symbol
				pos5();
    		}
    		break;
    		case "6": {
    			correctCenterSymbol(6);
				// Position the symbol
				pos6();
    		}
    		break;
    		case "7": {
    			correctCenterSymbol(7);
				// Position the symbol
				pos7();
    		}
    		break;
    		case "8": {
    			correctCenterSymbol(8);
				// Position the symbol
				pos7();
    			$(".center-symbol:eq(7)").css("top", "190px");
    			$(".center-symbol:eq(7)").css("left", "110px");
    		}
    		break;
    		case "9": {
    			correctCenterSymbol(9);
				// Position the symbol
				pos9();
    		}
    		break;
    		case "10": {
    			correctCenterSymbol(10);
				// Position the symbol
				pos9();
				$(".center-symbol:eq(4)").css("top", "70px");
				$(".center-symbol:eq(4)").css("left", "105px");
				$(".center-symbol:eq(9)").css("top", "210px");
				$(".center-symbol:eq(9)").css("left", "105px");
    		}
    		break;
    		case "J": {
    			changeSuitImage("J");
    		}
    		break;
    		case "Q": {
    			changeSuitImage("Q");
    		}
    		break;
    		case "K": {
    			changeSuitImage("K");
    		}
    		break;
    	}
    }
});