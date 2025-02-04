var xaraSwidgets_cyclemefTemplates = {


entry:			'<div style="width:100%;"class="slideshow_item"><div class="image" style=""><a href="{link}"><img class="{com_id}_image" src="{image}" border="none"  /></a></div>' 
		+		'<div class="data"  ><img class="heading" src="{heading}"   border="none"  /><br /><br />'
//		+		'<p>{desc}</p>'
		+		'<img src="{desc}" style="width:100%;" border="none"  />'
		+		'</div></div>',

//myTheme:			'{theme}',
//timeout:			'{pause}',
//speed:				'{speed}',

		
		
		main:	'<div id="{component_id}OuterDiv" ><!--<a href="#" class="slideshow_prev"><span>Previous</span></a>'
			+	'<a href="#" class="slideshow_next"><span>Next</span></a>--><div class="{component_id}_paging slideshow_paging"></div>'
			+ 	'<div class="slideshow_box {component_id}_box"><div class="data"></div></div>'
			+   '<div id="{component_id}_slideshow_1" class="slideshow">'
			+ 	'{entryhtml}'
			+	'</div>'
};

	
function xsw_cs_htmlbr(str) {
	if (str == undefined)
		return '';
    var lines = str.split("\n");
    for (var t = 0; t < lines.length; t++) {
        lines[t] = $("<p>").text(lines[t]).html();
    }
    return lines.join("<br/>");
}

function xaraSwidgets_cyclemefGetConfig(value, d)
{
	var ret = parseInt(value);
	
	if(!isNaN(ret))
	{
		return ret;
	}
	else
	{
		return d;
	}
}


// this is the constructor for a component
// it loops through each 'entry' in the array of data and compiles the entry template for it
// it then applies the resulting HTML to the main template before writing the whole lot to the div on the page
// it then initialises the actual jquery plugin for the div (that now contains the required HTML as a result of writing the template to it)
function xaraSwidgets_cyclemefConstructor(divID, data)
{
	var entryHTML = '';
//	var entryHTML2 = '';


	myTheme = (data[0].theme);
	timeout = (data[0].pause);
	speed = (data[0].speed);
	bgimage = (data[1].bgimage);

	var config = data[0];

	var useTransition = xaraSwidgets_cyclemefGetConfig(config.effect, 0);
	
	var effects = [
		
    'scrollHorz',
    'scrollVert',
	'blindX',
    'blindY',
    'blindZ',
    'cover',
    'curtainX',
    'curtainY',
    'fade',
    'fadeZoom',
    'growX',
    'growY',
    'shuffle',
    'slideX',
    'slideY',
    'wipe',
    'zoom',
	'all'

	];

	var effectName = effects[useTransition];
	
	// loop through each entry in the array and compile the entry template for it
	for(var i=1; i<data.length; i++)
	{
	data[i].desc = xsw_cs_htmlbr(data[i].desc);
	entryHTML += xaraSwidgets_compileTemplate(xaraSwidgets_cyclemefTemplates.entry, data[i]);
	}
	


	var com1_id=divID;
//	entryHTML = xsw_ea_htmlbr(entryHTML);
	// now lets compile the 'main' template which acts as a wrapper for each entry

    // get the timeout value
    var enteredTimeout = parseFloat(timeout)*1000;
    var defaultTimeout = '5000';
    var timeout = isNaN(enteredTimeout) ? defaultTimeout : enteredTimeout;

    // get the speed value
    var enteredSpeed = parseFloat(speed)*1000;
    var defaultSpeed = '700';
    var speed = isNaN(enteredSpeed) ? defaultSpeed : enteredSpeed;


	
	var mainData = {
		component_id:divID,
		entryhtml:entryHTML,
		com_id:com1_id
	};
	
	


	var mainTemplate = xaraSwidgets_compileTemplate(xaraSwidgets_cyclemefTemplates.main, mainData);
	
	
			// find the theme value to determine whether theme colors should be matched.
		
		var defaultTheme = 0;
		var enteredTheme = parseInt(myTheme);
		var theme = isNaN(enteredTheme) ? defaultTheme : enteredTheme
//		var theme = parseInt(myTheme);
		if(!isNaN(theme))
			{
			useTheme = theme;
			}	
		if (theme ==1){
			var $p = $("<p class='xr_c_Theme_Color_1'></p>").hide().appendTo("body");
			
			}
		else if (theme ==0){
			var $p = $("<p class='xr_c_Cycled_Color_1'></p>").hide().appendTo("body");
			
			}

	
		var enteredovercolor = $p.css("color");
		var defaultovercolor = '#fefefe';
	//	var overcolor = isNaN(enteredovercolor) ? defaultovercolor : enteredovercolor
		
		if (enteredovercolor !== 'rgb(0, 0, 0)')
		{
		var overcolor= enteredovercolor
		}
		else 
		{
		var overcolor= defaultovercolor;
		}
		if (document.all && !document.addEventListener)
		//if($.browser.msie && document.documentMode && document.documentMode <= 8) 
		{
    		// ie less than version 9
    		if (enteredovercolor !== '#000000' )
			{
			var overcolor= enteredovercolor
			}
			else 
			{
			var overcolor= defaultovercolor;
			}

		}
		
		
	
	// get the theme color value 
//	var $p = $("<p class='xr_c_Theme_Color_1'></p>").hide().appendTo("body");
//    var overcolor = $p.css("color");
//	console.log(overcolor);
//		var overcolor = $p.css("color");
//		var defaultovercolor = '#000';
//		var enteredovercolor = overcolor;
		
//		if (enteredovercolor !== '' )
//		{
//		var overcolor= enteredovercolor
//		}
//		else 
//		{
//		var overcolor= defaultovercolor;
//		}
		
    $p.remove();

	
	// now lets apply the resulting HTML for the whole component to the main DIV that was exported by XARA
	
	$('#' + divID).html(mainTemplate);
	
	
	// get the dimensions of the parent div  
	
	var width = $('#' + divID).parent('div').width();
	var height = $('#' + divID).parent('div').height();
	var iwidth = width*0.7;
	$('#' + divID).css('width',width);
	$('#' + divID).css('height',height);
	$('#' + divID).addClass("ss6_wrapper");
	$('.' + divID +'_image').css('width',iwidth);
	$('.' + divID +'_image').css('height',height);
	$('#' + divID + '_slideshow_1').css('height',height);
	$('.' + divID + '_box').css('background-image', 'url(' + bgimage + ')', 'background-repeat', 'no-repeat');
	$('.' + divID + '_box').css('background-color', overcolor);
	$('#' + divID).parent('div').css('overflow', 'visible');

		




	// invoke the effect 
		$('#' + divID + '_slideshow_1').cycle({
						
						fx: effectName, // choose your transition type, ex: fade, scrollUp, shuffle, etc...
						speed:  speed, 
						timeout: timeout, 
				        slideExpr: '.' + divID +'_image',
						pager: '#' + divID +'OuterDiv .slideshow_paging', 
						prev: '#' + divID+'OuterDiv .slideshow_prev',
						next: '#' + divID+'OuterDiv .slideshow_next',
						before: function(currSlideElement, nextSlideElement) {
						//	var data = $('.data', $(nextSlideElement)).html();
				            var data = $(nextSlideElement).parents('.slideshow_item').find('.data').html();

							$('#' + divID + 'OuterDiv .slideshow_box .data').fadeOut(300, function(){
							
					//			$('#' + divID + 'OuterDiv .slideshow_box').remove();
					//			$('<div class="slideshow_box" style="background:url({entryhtml2});"></div>').hide().appendTo('#' + divID + 'OuterDiv').fadeIn(600);
						
								$('#' + divID + 'OuterDiv .slideshow_box .data').remove();
								$('<div class="data">'+data+'</div>').hide().appendTo('#' + divID + 'OuterDiv .slideshow_box').fadeIn(600);
	
							});
						}
					});	
					
					
				// not using the 'pause' option. instead make the slideshow pause when the mouse is over the whole wrapper
								$('#'+ divID).mouseenter(function(){
								$('#' + divID + '_slideshow_1').cycle('pause');
								}).mouseleave(function(){
									$('#' + divID + '_slideshow_1').cycle('resume');
								});
		
// write the css values to the doc  
                // support for swipe events for ipad and android
                $('#' + divID + '_slideshow_1').swipe({
                    swipe:function(event, direction, distance, duration, fingerCount) {
                        //      $(this).text("You swiped " + direction );
                        //If we are moving before swipe, and we are going Lor R in X mode, or U or D in Y mode then drag.
                        if( direction=="left" || direction=="right" )
                        {
                            var duration=0;

                            if (direction == "left")
                                $('#' + divID + '_slideshow_1').cycle('next')

                                

                            else if (direction == "right")
                                $('#' + divID + '_slideshow_1').cycle('prev')

                        }
                    }
                });
	

	$('head').append("<style> .ss6_wrapper .slideshow_item {width:"+ width +"px; height:"+ height +"px;}" 
	+"." + divID +"_box { background-repeat:no-repeat;  background-position:bottom;  }" 
	+"." + divID +"_paging { position:absolute; top:10px; left:10px; z-index:1; font-size:12px; padding:3px 2px; background:"+overcolor+"; -moz-border-radius: 4px; -webkit-border-radius: 4px; border-radius: 4px; -moz-box-shadow: 0 0 2px #222; -webkit-box-shadow: 0 0 2px #222; box-shadow: 0 0 2px #222; opacity: .8; /* For IE 5-7 */ filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=80);	/* For IE 8 */-MS-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=80)'; }"

	+"</style>" );	

					
}
