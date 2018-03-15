// ----------------------------------------------------------------------------
// Assets Helper, a Javascript Assets Helper library Licensed under the MIT
// license.
// ----------------------------------------------------------------------------
// Copyright (C) Iftekher Sunny < iftekhersunny@hotmail.com >
// ----------------------------------------------------------------------------
(function ($, _) {

  /////////////////////////////////////////////////////////
  //
  // instance of global object
  //
  /////////////////////////////////////////////////////////
  var root = this;

  /////////////////////////////////////////////////////////
  //
  // instance of assets object
  //
  /////////////////////////////////////////////////////////
  var Assets = root.Assets || {
    name: "assets-helper",
    version: "0.0.0"
  };

  /////////////////////////////////////////////////////////
  //
  // instance of assets._css object
  //
  /////////////////////////////////////////////////////////
  Assets._css = {
    desktop: {},
    tablet: {},
    phone: {}
  };

  /////////////////////////////////////////////////////////
  //
  // storing responsive css rules
  //
  /////////////////////////////////////////////////////////
  Assets._responsiveCssRules = function (device, selector, rules) {
    if (!Assets._css[device][selector]) {
      Assets._css[device][selector] = '';
    }

    Assets._css[device][selector] += rules;
  }

  /////////////////////////////////////////////////////////
  //
  // storing desktop css rules
  //
  /////////////////////////////////////////////////////////
  Assets.desktop = function (selector, rules) {
    Assets._responsiveCssRules("desktop", selector, rules);
  }

  /////////////////////////////////////////////////////////
  //
  // storing tablet css rules
  //
  /////////////////////////////////////////////////////////
  Assets.tablet = function (selector, rules) {
    Assets._responsiveCssRules("tablet", selector, rules);
  }

  /////////////////////////////////////////////////////////
  //
  // storing phone css rules
  //
  /////////////////////////////////////////////////////////
  Assets.phone = function (selector, rules) {
    Assets._responsiveCssRules("phone", selector, rules);
  }


  //=============================================
  // CSS API's to use from element/node
  //=============================================

  /////////////////////////////////////////////////////////
  // Wrapper function for Assets.desktop
  // Provide clean and understanable API for dev
  /////////////////////////////////////////////////////////
  Assets.css = function (selector, prop, value) {
    Assets.desktop( selector, Assets._prop(prop, value) );
  }

  // Margin (Responsive)
  //=============================================
  Assets.margin = function (selector, field) {
    Assets.desktop( selector, Assets._cssForDimensions(field, 'margin') );

    if (field.responsive) {
      Assets.tablet( selector, Assets._cssForDimensions(field.tablet, 'margin') );
      Assets.phone( selector, Assets._cssForDimensions(field.phone, 'margin') );
    }
  }

  // Padding (responsive)
  //=============================================
  Assets.padding = function (selector, field) {
    Assets.desktop( selector, Assets._cssForDimensions(field, 'padding') );

    if (field.responsive) {
      Assets.tablet( selector, Assets._cssForDimensions(field.tablet, 'padding') );
      Assets.phone( selector, Assets._cssForDimensions(field.phone, 'padding') );
    }
  }


  // Width (responsive)
  //=============================================
  Assets.width = function (selector, field) {
    return Assets._setResponsiveCss(selector, field, 'width', 'px');
  }

  // Height (responsive)
  //=============================================
  Assets.height = function (selector, field) {
    return Assets._setResponsiveCss(selector, field, 'height', 'px');
  }


  // Font size (responsive)
  //=============================================
  Assets.fontSize = function (selector, field) {
    Assets._setResponsiveCss(selector, field, 'font-size', 'px')
  }

  // Letter spacing (responsive)
  //=============================================
  Assets.letterSpacing = function (selector, field) {
    Assets._setResponsiveCss(selector, field, 'letter-spacing', 'px')
  }

  // Text alignement (responsive)
  Assets.alignment = function (selector, field) {
    Assets._setResponsiveCss(selector, field, 'text-align')
  }

  // line-height (responsive)
  //=============================================
  Assets.lineHeight = function (selector, field, units) {
    units = units || '';
    Assets._setResponsiveCss(selector, field, 'line-height', units)
  }

  // float (responsive)
  //=============================================
  Assets.float = function (selector, field) {

    if ((field.desktop == 'left') || (field.desktop == 'right')) {
      Assets.desktop(selector, Assets._prop('float', field.desktop))
    }

    if (field.responsive) {
      if ((field.tablet == 'left') || (field.tablet == 'right')) {
        Assets.tablet(selector, Assets._prop('float', field.tablet))
      }

      if ((field.phone == 'left') || (field.phone == 'right')) {
        Assets.phone(selector, Assets._prop('float', field.phone))
      }
    }
  }

  // Background
  //=============================================
  Assets.background = function(selector, field){
    // Get state
    var state = field.state;

    // State : Normal
    // ---------------------------------------
    var normal = state.normal
    
    // Type = Color
    if( normal.type == "color" && !_.isEmpty(normal.properties.color) ) {
      Assets.css(selector, "background-color", normal.properties.color)
    }
    // Type = Gradient
    if( normal.type == 'gradient' ){
      var color_1 = normal.properties.color_1
      var color_2 = normal.properties.color_2
      // Gradient Type
      var gradient_type = normal.properties.type
      var direction = normal.properties.direction
      
      // Suffix position with %
      var start_position = normal.properties.start_position + '%'
      var end_position = normal.properties.end_position + '%'

      var css = color_1 + ' ' + start_position + ',' + color_2 + ' ' + end_position

      if( gradient_type == 'linear' ){
        direction = direction + 'deg'
        css = direction + ', ' + css 

        Assets.css( selector, 'background', 'linear-gradient('+ css +')' )
      }
      if( gradient_type == 'radial' ){
        direction = 'at ' + direction
        css = direction + ', ' + css 

        Assets.desktop( selector, 'background', 'radial-gradient('+ css +')' )
      }

    }
    // Type : Image
    if( normal.type == 'image' ){
      if( !_.isEmpty(normal.properties.src) ){
        Assets.css(selector, 'background-image', 'url(' + normal.properties.src + ')')
        Assets.css(selector, 'background-size', normal.properties.size)
        Assets.css(selector, 'background-position', normal.properties.position)
        Assets.css(selector, 'background-repeat', normal.properties.repeat)
      }
    }  

    // State : Hover
    // -----------------------------------
    var hover = state.hover 
    
    // Type = color
    if( hover.type == "color" && !_.isEmpty(hover.properties.color) ){
      Assets.css(selector + ':hover', "background-color", hover.properties.color)
    }
    // Type = Gradient
    if( hover.type == 'gradient' ){
      var color_1 = hover.properties.color_1
      var color_2 = hover.properties.color_2
      // Gradient type
      var gradient_type = hover.properties.type

      var direction = hover.properties.direction
      
      // Suffix position with %
      var start_position = hover.properties.start_position + '%'
      var end_position = hover.properties.end_position + '%'

      var css = color_1 + ' ' + start_position + ',' + color_2 + ' ' + end_position

      if( gradient_type == 'linear' ){
        direction = direction + 'deg'
        css = direction + ', ' + css 

        Assets.css( id + ':hover', 'background', 'linear-gradient('+ css +')' )
      }
      if( gradient_type == 'radial' ){
        direction = 'at ' + direction
        css = direction + ', ' + css 

        Assets.css( id + ':hover', 'background', 'radial-gradient('+ css +')' )
      }

    }
    // Type : Image
    if( hover.type == 'image' ){
      if( !_.isEmpty(hover.properties.src) ){
        Assets.css(selector, 'background-image', 'url(' + hover.properties.src + ')')
        Assets.css(selector, 'background-size', hover.properties.size)
        Assets.css(selector, 'background-position', hover.properties.position)
        Assets.css(selector, 'background-repeat', hover.properties.repeat)
      }
    }
  }

  //=============================================
  // Private functions
  //=============================================
  
  // Generate CSS for dimensions
  //=============================================
  Assets._cssForDimensions = function (field, type) {
    var css = '';

    css += field.top ? Assets._prop(type + '-top', field.top + 'px') : ''
    css += field.right ? Assets._prop(type + '-right', field.right + 'px') : ''
    css += field.bottom ? Assets._prop(type + '-bottom', field.bottom + 'px') : ''
    css += field.left ? Assets._prop(type + '-left', field.left + 'px') : ''
    
    return css;
  }

  // Create css prop : value rules
  //=============================================
  Assets._prop = function (prop, value, $boolean) {
    $boolean = $boolean || null;

    if (!value || '0px' == value || '0em' == value || '0rem' == value) {
      return "";
    }

    return prop + " : " + value + "; ";
  }

  // Create responsive CSS
  //=============================================
  Assets._setResponsiveCss = function (selector, field, prop, units) {
    units = units || "";

    if (field.desktop) {
      Assets.desktop( selector, Assets._prop(prop, field.desktop + units) )
    }

    if (field.responsive) {
      Assets.tablet( selector, Assets._prop(prop, field.tablet + units) )
      Assets.phone( selector, Assets._prop(prop, field.phone + units) )
    }
  }

  // Font-weight
  //=============================================
  Assets.fontWeight = function (selector, field) {
    var fieldValue = field.value ? field.value : field,
      fontStyle = false,
      variant = fieldValue;

    switch (fieldValue) {
      case 'regular':
        variant = 400;
        break;
      case '100italic':
        variant = 100;
        fontStyle = true;
        break;
      case '300italic':
        variant = 300;
        fontStyle = true;
        break;
      case '500italic':
        variant = 500;
        fontStyle = true;
        break;
      case '600italic':
        variant = 600;
        fontStyle = true;
        break;
      case '700italic':
        variant = 700;
        fontStyle = true;
        break;
      case '800italic':
        variant = 800;
        fontStyle = true;
        break;
      case '900italic':
        variant = 900;
        fontStyle = true;
        break;
    }

    Assets.desktop(selector, Assets._prop('font-weight', variant));

    if (fontStyle) {
      Assets.desktop(selector, Assets._prop('font-style', 'italic'));
    }
  }


  
  /////////////////////////////////////////////////////////
  //
  // appending stylesheet to the head tag
  //
  /////////////////////////////////////////////////////////
  Assets._appendStyleSheet = function (css, id, mountID) {
    var head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    // if style already exists then remove it
    if (mountID) {
      id = mountID.replace("#", "");
      style.id = id;
      $("style#" + id).remove();
    } else {
      id = id.replace("#", "");
      style.id = id;
      $("style#" + id).remove();
    }

    console.log(css)

    // append style
    head.appendChild(style);
  }

  /////////////////////////////////////////////////////////
  //
  // loading css rules
  //
  /////////////////////////////////////////////////////////
  Assets.load = function (id, mountID) {
    var desktop = '',
      tablet = "@media (min-width: 768px) and (max-width: 1024px) { ",
      phone = "@media (max-width: 767px) { ";

    // appending all desktop rules
    for (var key in Assets._css.desktop) {
      desktop += key + " { " + Assets._css.desktop[key] + " } ";
    }

    // appending all tablet rules
    for (var key in Assets._css.tablet) {
      tablet += key + " { " + Assets._css.tablet[key] + " } ";
    }

    tablet += " } ";

    // appending all phone rules
    for (var key in Assets._css.phone) {
      phone += key + " { " + Assets._css.phone[key] + " } ";
    }

    phone += " } ";

    // appending responsive rules ( desktop, tablet, and phone ) to the style tag
    Assets._appendStyleSheet(desktop + tablet + phone, id, mountID);

    Assets._css = {
      desktop: {},
      tablet: {},
      phone: {}
    };
  }

  /////////////////////////////////////////////////////////
  //
  // assigning Assets object to the Global object
  //
  /////////////////////////////////////////////////////////
  return root.Assets = Assets;

}(

/////////////////////////////////////////////////////////
//
// determine jQuery existence
//
/////////////////////////////////////////////////////////
window.$ ? window.$ : window.jQuery ? window.jQuery : undefined,

/////////////////////////////////////////////////////////
//
// determine lodash existence
//
/////////////////////////////////////////////////////////
window._ ? window._ : undefined)
)
