// ----------------------------------------------------------------------------
// Assets Helper, a Javascript Assets Helper library
// Licensed under the MIT license.
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
    // instance of assets.css object
    //
    /////////////////////////////////////////////////////////
    Assets.css = {
        desktop: {},
        tablet: {},
        phone: {}
    };
    


    /////////////////////////////////////////////////////////
    //
    // storing responsive css rules
    //
    /////////////////////////////////////////////////////////
    Assets._responsiveCssRules = function (cssFor, selector, rules) {
        if (!Assets.css[cssFor][selector]) {
            Assets.css[cssFor][selector] = '';
        }

        Assets.css[cssFor][selector] += rules;
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



    /////////////////////////////////////////////////////////
    //
    // css rules for margin
    //
    /////////////////////////////////////////////////////////
    Assets._cssRulesForMargin = function (rules) {
        var margin = '';

        if(_.isObject(rules)) {
            margin += rules.top ? 'margin-top:' + rules.top + 'px;' : '';
            margin += rules.bottom ? 'margin-bottom:' + rules.bottom + 'px;' : '';
            margin += rules.right ? 'margin-right:' + rules.right + 'px;' : '';
            margin += rules.left ? 'margin-left:' + rules.left + 'px;' : '';
        }

        return margin;
    }



    /////////////////////////////////////////////////////////
    //
    // responsive css rules for margin
    //
    /////////////////////////////////////////////////////////
    Assets.margin = function (selector, rules) {
        var margin = Assets.desktop(selector, Assets._cssRulesForMargin(rules));

        if(rules.responsive) {
            margin += Assets.tablet(selector, Assets._cssRulesForMargin(rules.tablet));
            margin += Assets.phone(selector, Assets._cssRulesForMargin(rules.phone));
        }

        return margin;
    }



    /////////////////////////////////////////////////////////
    //
    // css rules for padding
    //
    /////////////////////////////////////////////////////////
    Assets._cssRulesForPadding = function (rules) {
        var padding = '';

        if(_.isObject(rules)) {
            padding += rules.top ? 'padding-top:' + rules.top + 'px;' : '';
            padding += rules.bottom ? 'padding-bottom:' + rules.bottom + 'px;' : '';
            padding += rules.right ? 'padding-right:' + rules.right + 'px;' : '';
            padding += rules.left ? 'padding-left:' + rules.left + 'px;' : '';
        }

        return padding;
    }



    /////////////////////////////////////////////////////////
    //
    // responsive css rules for padding
    //
    /////////////////////////////////////////////////////////
    Assets.padding = function (selector, rules) {
        var padding = Assets.desktop(selector, Assets._cssRulesForPadding(rules));

        if (rules.responsive) {
            padding += Assets.tablet(selector, Assets._cssRulesForPadding(rules.tablet));
            padding += Assets.phone(selector, Assets._cssRulesForPadding(rules.phone));
        }

        return padding;
    }



    /////////////////////////////////////////////////////////
    //
    // making css prop dynamically
    //
    /////////////////////////////////////////////////////////
    Assets._prop = function (prop, value, $boolean) {
        $boolean = $boolean || null;

        if( !value || '0px' == value || '0em' == value || '0rem' == value) {
            return "";
        }

        if( _.isBoolean(value) ) {
            if(!$boolean) {
                return "";
            } 

            value = $boolean;
        }

        return prop + " : " + value + "; ";
    }



    /////////////////////////////////////////////////////////
    //
    // checking legacy
    //
    /////////////////////////////////////////////////////////
    Assets._legacyCheck = function (field) {
        if(!field.responsive && !field.desktop) {
            updatedField = {}
            updatedField.desktop = field;
            field = updatedField
        }

        return field;
    }



    /////////////////////////////////////////////////////////
    //
    // set responsive css rules
    //
    /////////////////////////////////////////////////////////
    Assets._setResponsiveCss = function (selector, field, prop, units) {
        var value = "";
        
        field = Assets._legacyCheck(field);
        units = units || "";

        if(field.desktop) {
            value = Assets.desktop(selector, Assets._prop(prop, field.desktop + units));
        }

        if(field.responsive) {
            value += Assets.tablet(selector, Assets._prop(prop, field.tablet + units));
            value += Assets.phone(selector, Assets._prop(prop, field.phone + units))
        }

        return value;
    }



    /////////////////////////////////////////////////////////
    //
    // set width prop
    //
    /////////////////////////////////////////////////////////
    Assets.width = function (selector, field) {
        return Assets._setResponsiveCss(selector, field, 'width', 'px');
    }



    /////////////////////////////////////////////////////////
    //
    // set height prop
    //
    /////////////////////////////////////////////////////////
    Assets.height = function (selector, field) {
        return Assets._setResponsiveCss(selector, field, 'height', 'px');
    }



    /////////////////////////////////////////////////////////
    //
    // font weight
    //
    /////////////////////////////////////////////////////////
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

        if(fontStyle) {
            Assets.desktop(selector, Assets._prop('font-style', 'italic'));
        }
    }



    /////////////////////////////////////////////////////////
    //
    // set responsive prop
    //
    /////////////////////////////////////////////////////////
    Assets._setResponsiveProp = function (prop, selector, field) {
        var regx = /px|em|rem/i,
            css = null;

        field = Assets._legacyCheck(field);

        if (regx.test(field.desktop)) {
            css = Assets._prop(prop, field.desktop);
        } else {
            css = Assets._prop(prop, field.desktop + "px");
        }

        Assets.desktop(selector, css);

        if (field.responsive) {
            if (regx.test(field.tablet)) {
                css = Assets._prop(prop, field.tablet);
            } else {
                css = Assets._prop(prop, field.tablet + "px");
            }

            Assets.tablet(selector, css);

            if (regx.test(field.phone)) {
                css = Assets._prop(prop, field.phone);
            } else {
                css = Assets._prop(prop, field.phone + "px");
            }

            Assets.phone(selector, css);
        }
    }



    /////////////////////////////////////////////////////////
    //
    // set font size
    //
    /////////////////////////////////////////////////////////
    Assets.fontSize = function (selector, field) {
        Assets._setResponsiveProp('font-size', selector, field)
    }



    /////////////////////////////////////////////////////////
    //
    // set letter spacing 
    //
    /////////////////////////////////////////////////////////
    Assets.letterSpacing = function (selector, field) {
        Assets._setResponsiveProp('letter-spacing', selector, field)
    }



    /////////////////////////////////////////////////////////
    //
    // set alignment
    //
    /////////////////////////////////////////////////////////
    Assets.alignment = function (selector, field) {
        Assets._setResponsiveCss(selector, field, 'text-align')
    }



    /////////////////////////////////////////////////////////
    //
    // set line height
    //
    /////////////////////////////////////////////////////////
    Assets.lineHeight = function (selector, field, units) {
        units = units || '';

        Assets._setResponsiveCss(selector, field, 'line-height', units)
    }



    /////////////////////////////////////////////////////////
    //
    // set float
    //
    /////////////////////////////////////////////////////////
    Assets.float = function (selector, field) {
        field = Assets._legacyCheck(field);

        if( (field.desktop == 'left') || (field.desktop == 'right') ) {
            Assets.desktop(selector, Assets._prop('float', field.desktop))
        }

        if(field.responsive) {
            if ((field.tablet == 'left') || (field.tablet == 'right')) {
                Assets.tablet(selector, Assets._prop('float', field.tablet))
            }

            if ((field.phone == 'left') || (field.phone == 'right')) {
                Assets.phone(selector, Assets._prop('float', field.phone))
            }
        }
    }



    /////////////////////////////////////////////////////////
    //
    // get hover box shadow
    //
    /////////////////////////////////////////////////////////
    Assets.getHoverBoxShadow = function (field) {
        var cssRules = '';

        cssRules += 'box-shadow: ' + field.hover_shadow_horizontal + "px " + field.hover_shadow_vertical + "px " + field.hover_shadow_blur + "px " + field.hover_shadow_spread + "px " + field.hover_shadow_color + ";";

        if (field.hover_scale_enabled) {
            cssRules += "transform: scale( " + field.hover_shadow_scale + " );";
        }

        return cssRules;
    }



    /////////////////////////////////////////////////////////
    //
    // set hover box shadow
    //
    /////////////////////////////////////////////////////////
    Assets.hoverBoxShadow = function (selector, field) {
        Assets.desktop(selector, Assets.getHoverBoxShadow(field));
    }



    /////////////////////////////////////////////////////////
    //
    // set typography
    //
    /////////////////////////////////////////////////////////
    Assets.typography = function (selector, field) {

        // set font family
        if(field.family) Assets.desktop(selector, Assets._prop('font-family', field.family));

        // set font size
        if(field.size) {
            Assets.fontSize(selector, field.size);
        } else {
            Assets.fontSize(selector, "14");
        }

        // set font weight
        if(field.weight) Assets.fontWeight(selector, field.weight);

        // set letter spacing
        if (field.letterSpacing) Assets.letterSpacing(selector, field.spacing);

        // set line height
        if (field.height) Assets.lineHeight(selector, field.height);

        // set case
        if(field.case) {
            Assets.desktop(selector, Assets._prop('text-transform', field.case));
        }

        // if font weight is bold
        if(field.bold) Assets.desktop(selector, Assets._prop('font-weight', 'bold'));

        // if font style is italic
        if (field.italic) Assets.desktop(selector, Assets._prop('font-style', 'italic'));

        // if text decoration is underline
        if (field.underline) Assets.desktop(selector, Assets._prop('text-decoration', 'underline'));
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
  
        // if style already exists
        // then remove it
        if(mountID) {
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
        for (var key in Assets.css.desktop) {
            desktop += key + " { " + Assets.css.desktop[key] + " } ";
        }

        // appending all tablet rules
        for (var key in Assets.css.tablet) {
            tablet += key + " { " + Assets.css.tablet[key] + " } ";
        }

        tablet += " } ";

        // appending all phone rules
        for (var key in Assets.css.phone) {
            phone += key + " { " + Assets.css.phone[key] + " } ";
        }

        phone += " } ";

        // appending responsive rules ( desktop, tablet, and phone ) to the style tag
        Assets._appendStyleSheet(desktop + tablet + phone, id, mountID);

        Assets.css = {
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
    window.$ ?


        /////////////////////////////////////////////////////////
        //
        // if jQuery loaded,
        // return instance of the loaded jQuery
        //
        /////////////////////////////////////////////////////////
        window.$ : window.jQuery ? window.jQuery : undefined,

    /////////////////////////////////////////////////////////
    //
    // determine lodash existence
    //
    /////////////////////////////////////////////////////////
    window._ ? 


    /////////////////////////////////////////////////////////
    //
    // if lodash loaded,
    // return instance of the loaded lodash 
    //
    /////////////////////////////////////////////////////////
    window._ : undefined
))
