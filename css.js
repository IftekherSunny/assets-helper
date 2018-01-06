// ----------------------------------------------------------------------------
// Assets Helper, a Javascript Assets Helper library
// Licensed under the MIT license.
// ----------------------------------------------------------------------------
// Copyright (C) Iftekher Sunny < iftekhersunny@hotmail.com >
// ----------------------------------------------------------------------------

(function () {

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
        var margin = '{';

        margin += rules.top ? 'margin-top:' + rules.top + ';' : '';
        margin += rules.bottom ? 'margin-bottom:' + rules.bottom + ';' : '';
        margin += rules.right ? 'margin-right:' + rules.right + ';' : '';
        margin += rules.left ? 'margin-left:' + rules.left + ';' : '';
        margin += "}";

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
        var padding = '{';

        padding += rules.top ? 'padding-top:' + rules.top + ';' : '';
        padding += rules.bottom ? 'padding-bottom:' + rules.bottom + ';' : '';
        padding += rules.right ? 'padding-right:' + rules.right + ';' : '';
        padding += rules.left ? 'padding-left:' + rules.left + ';' : '';
        padding += "}";

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
            tablet = "@media (min-width: 768px) and (max-width: 1024px) {",
            phone = "@media (max-width: 767px) {";

        // appending all desktop rules    
        for (var key in Assets.css.desktop) {
            desktop += key + Assets.css.desktop[key];
        }

        // appending all tablet rules
        for (var key in Assets.css.tablet) {
            tablet += key + Assets.css.tablet[key];
        }

        tablet += "}";

        // appending all phone rules
        for (var key in Assets.css.phone) {
            phone += key + Assets.css.phone[key];
        }

        phone += "}";

        // appending responsive rules ( desktop, tablet, and phone ) to the style tag
        Assets.appendStyleSheet(desktop + tablet + phone);
    }



    /////////////////////////////////////////////////////////
    //
    // Assigning Assets object to the Global object
    //
    /////////////////////////////////////////////////////////
    window.Assets = Assets;

}())
