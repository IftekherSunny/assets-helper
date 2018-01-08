// ----------------------------------------------------------------------------
// Assets Helper, a Javascript Assets Helper library
// Licensed under the MIT license.
// ----------------------------------------------------------------------------
// Copyright (C) Iftekher Sunny < iftekhersunny@hotmail.com >
// ----------------------------------------------------------------------------

(function (_) {

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
    var Assets = {};



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
    Assets.responsiveCssRules = function (cssFor, selector, rules) {
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
        Assets.responsiveCssRules("desktop", selector, rules);
    }



    /////////////////////////////////////////////////////////
    //
    // storing tablet css rules
    //
    /////////////////////////////////////////////////////////
    Assets.tablet = function (selector, rules) {
        Assets.responsiveCssRules("tablet", selector, rules);
    }



    /////////////////////////////////////////////////////////
    //
    // storing phone css rules
    //
    /////////////////////////////////////////////////////////
    Assets.phone = function (selector, rules) {
        Assets.responsiveCssRules("phone", selector, rules);
    }



    /////////////////////////////////////////////////////////
    //
    // css rules for margin
    //
    /////////////////////////////////////////////////////////
    Assets.cssRulesForMargin = function (rules) {
        var margin = '';

        margin += rules.top ? 'margin-top:' + rules.top + ';' : '';
        margin += rules.bottom ? 'margin-bottom:' + rules.bottom + ';' : '';
        margin += rules.right ? 'margin-right:' + rules.right + ';' : '';
        margin += rules.left ? 'margin-left:' + rules.left + ';' : '';

        return margin;
    }



    /////////////////////////////////////////////////////////
    //
    // responsive css rules for margin
    //
    /////////////////////////////////////////////////////////
    Assets.margin = function (selector, rules) {
        var margin = Assets.desktop(selector, Assets.cssRulesForMargin(rules));

        if(rules.responsive) {
            margin += Assets.tablet(selector, Assets.cssRulesForMargin(rules.tablet));
            margin += Assets.phone(selector, Assets.cssRulesForMargin(rules.phone));
        }

        return margin;
    }



    /////////////////////////////////////////////////////////
    //
    // css rules for padding
    //
    /////////////////////////////////////////////////////////
    Assets.cssRulesForPadding = function (rules) {
        var padding = '';

        padding += rules.top ? 'padding-top:' + rules.top + ';' : '';
        padding += rules.bottom ? 'padding-bottom:' + rules.bottom + ';' : '';
        padding += rules.right ? 'padding-right:' + rules.right + ';' : '';
        padding += rules.left ? 'padding-left:' + rules.left + ';' : '';

        return padding;
    }



    /////////////////////////////////////////////////////////
    //
    // responsive css rules for padding
    //
    /////////////////////////////////////////////////////////
    Assets.padding = function (selector, rules) {
        var padding = Assets.desktop(selector, Assets.cssRulesForPadding(rules));

        if (rules.responsive) {
            padding += Assets.tablet(selector, Assets.cssRulesForPadding(rules.tablet));
            padding += Assets.phone(selector, Assets.cssRulesForPadding(rules.phone));
        }

        return padding;
    }



    /////////////////////////////////////////////////////////
    //
    // making css prop dynamically
    //
    /////////////////////////////////////////////////////////
    Assets.prop = function (prop, value, $boolean) {
        $boolean = $boolean || null;

        if( !value || '0px' == value || '0em' == value || '0rem' == value) {
            return null;
        }

        if( _.isBoolean(value) ) {
            if(!$boolean) {
                return null;
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
    Assets.legacyCheck = function (field) {
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
    Assets.setResponsiveCss = function (selector, field, prop, units) {
        field = Assets.legacyCheck(field);
        var value = '';

        if(field.desktop) {
            value = Assets.desktop(selector, Assets.prop(prop, field.desktop + units));
        }

        if(field.responsive) {
            value += Assets.tablet(selector, Assets.prop(prop, field.tablet + units));
            value += Assets.phone(selector, Assets.prop(prop, field.phone + units))
        }

        return value;
    }



    /////////////////////////////////////////////////////////
    //
    // set width prop
    //
    /////////////////////////////////////////////////////////
    Assets.width = function (selector, field) {
        return Assets.setResponsiveCss(selector, field, 'width', 'px');
    }



    /////////////////////////////////////////////////////////
    //
    // set height prop
    //
    /////////////////////////////////////////////////////////
    Assets.height = function (selector, field) {
        return Assets.setResponsiveCss(selector, field, 'height', 'px');
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

        Assets.desktop(selector, Assets.prop('font-weight', variant));

        if(fontStyle) {
            Assets.desktop(selector, Assets.prop('font-style', 'italic'));
        }
    }



    /////////////////////////////////////////////////////////
    //
    // set font size
    //
    /////////////////////////////////////////////////////////
    Assets.fontSize = function (selector, field) {
        var regx = /px|em|rem/i,
            css = null;
        
        field = Assets.legacyCheck(field);

        if(regx.test(field.desktop)) {
            css = Assets.prop('font-size', field.desktop);
        } else {
            css = Assets.prop('font-size', field.desktop + "px");
        }

        Assets.desktop(selector, css);

        if(field.responsive) {
            if (regx.test(field.tablet)) {
                css = Assets.prop('font-size', field.tablet);
            } else {
                css = Assets.prop('font-size', field.tablet + "px");
            }

            Assets.tablet(selector, css);

            if (regx.test(field.phone)) {
                css = Assets.prop('font-size', field.phone);
            } else {
                css = Assets.prop('font-size', field.phone + "px");
            }

            Assets.phone(selector, css);
        }
    }
    


    /////////////////////////////////////////////////////////
    //
    // appending stylesheet to the head tag
    //
    /////////////////////////////////////////////////////////
    Assets.appendStyleSheet = function (css) {
        var head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');

        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        head.appendChild(style);
    }



    /////////////////////////////////////////////////////////
    //
    // loading css rules
    //
    /////////////////////////////////////////////////////////
    Assets.load = function () {
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
        Assets.appendStyleSheet(desktop + tablet + phone);
    }



    /////////////////////////////////////////////////////////
    //
    // Assigning Assets object to the Global object
    //
    /////////////////////////////////////////////////////////
    window.Assets = Assets;

}(_))
