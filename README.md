## Assets Helper

#### HTML Markup

```html
    <div id="alert">
        <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro debitis odio nisi. Odit eligendi necessitatibus maxime ab deleniti in voluptatem, obcaecati exercitationem ducimus adipisci soluta hic laboriosam dolorem animi. Facere.
        </p>
    </div>
```


#### Creating CSS Rules

```js

    /////////////////////////////////////////////////////////
    //
    // Loading Alert element assets
    //
    /////////////////////////////////////////////////////////
    var AlertAssets = Object.assign({}, Assets);

    // desktop rules
    AlertAssets.desktop("#alert", "background: red; color: white; padding: 100px;");

    // tablet rules
    AlertAssets.tablet("#alert", "background: green; color: white; padding: 50px;");

    // phone rules
    AlertAssets.phone("#alert", "background: black; color: white; padding: 20px;");

    // responsive margin rules
    AlertAssets.margin("#alert", {
        top: 10, bottom: 20, right: 10, left: 15, // desktop
        responsive: true, // want responsive
        tablet: {
            top: 10, bottom: 20, right: 10, left: 15 // tablet
        },
        phone: {
            top: 10, bottom: 20, right: 10, left: 15 // phone
        }
    })

    // responsive padding rules
    AlertAssets.padding("#alert", {
        top: 10, bottom: 20, right: 10, left: 15, // desktop
        responsive: true, // want responsive
        tablet: {
            top: 10, bottom: 20, right: 10, left: 15 // tablet
        },
        phone: {
            top: 10, bottom: 20, right: 10, left: 15 // phone
        }
    })

    // width prop
    AlertAssets.width('#alert', {
        desktop: 20,
        responsive: true,
        tablet: 10,
        phone: 18
    })

    // height prop
    AlertAssets.height('#alert', {
        desktop: 20,
        responsive: true,
        tablet: 10,
        phone: 18
    })

    // alternative height prop
    Assets.height("#alert", 20)

    // font weight
    AlertAssets.fontWeight('#alert', 'regular')

    // font size
    AlertAssets.fontSize("#alert", {
        desktop: 20,
        responsive: true,
        tablet: 90,
        phone: 80
    })

    // line height
    AlertAssets.lineHeight("#alert", {
        desktop: 10,
        responsive: true,
        tablet: 8,
        phone: 5
    })

    // text alignment
    AlertAssets.alignment("#alert", {
        desktop: "left",
        responsive: true,
        tablet: "right",
        phone: "center"
    })

    // setting float value ( with responsive )
    AlertAssets.float("#alert", {
        desktop: "left",
        responsive: true,
        tablet: "right",
        phone: "right"
    })

    // setting float value ( without responsive )
    AlertAssets.float("#alert", "left")

    // setting hover box shadow
    AlertAssets.hoverBoxShadow("#alert", {
        hover_shadow_horizontal: 10,
        hover_shadow_vertical: 20,
        hover_shadow_vertical: 30,
        hover_shadow_blur: 40,
        hover_shadow_spread: 50,
        hover_shadow_color: "blue",
        hover_scale_enabled: true,
        hover_shadow_scale: "1.5, 1.5"
    })

    // getting hover box shadow css rules
    AlertAssets.getHoverBoxShadow({
        hover_shadow_horizontal: 10,
        hover_shadow_vertical: 20,
        hover_shadow_vertical: 30,
        hover_shadow_blur: 40,
        hover_shadow_spread: 50,
        hover_shadow_color: "blue",
        hover_scale_enabled: true,
        hover_shadow_scale: "1.5, 1.5"
    })

    // typography
    AlertAssets.typography("#alert", {
        family: "arial", // required
        size: 20,
        weight: '100italic',
        height: 2,
        case:  'uppercase'
    })

    // getting image url
    AlertAssets.image("images/info.png")

    // loading alert assets
    AlertAssets.load();

```

#### Template

```html
    <!-- alert preivew ( showing alert template rendering ) -->
    <div id="alert-preview"></div>

    <!-- alert template -->
    <QuixTemplate id="alert-template">
        
        <style>
            body {
                background: white
            }
        </style>

        <QuixStyle>
             // loading css ( JS WAY )
            var alert = Object.assign({}, Assets); 
            alert.desktop("#alert-2", "background: {{ color }}");
        </QuixStyle>

        <QuixHtml>
            <div id="alerts">
                <!-- you can use twig sytax -->
                {% for alert in alerts %}
                    <div id="{{ alert }}">
                        <p>{{ alert }}</p>
                    </div>
                {% endfor %}
            </div>
        </QuixHtml>

        <QuixScript dependencies="
            http://example.com/js/foo.js,
            http://example.com/js/bar.js
        ">
            // you have access jQuery and lodash :) 
            // $("#alert-1").html("updated element")
        </QuixScript>

    </QuixTemplate>
```  

```js
    // rendering template
    AlertAssets.render("#alert-template", {
        alerts: ["alert-1", "alert-2"]
    }, "#alert-preview");
```

## License
This library is licensed under the [MIT License](https://github.com/iftekhersunny/assets-helper/blob/master/LICENSE)
