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
    // Loading Alert element css rules
    //
    /////////////////////////////////////////////////////////
    var AlertAssets = Object.assign({}, Assets);

    // desktop rules
    AlertAssets.desktop("#alert", "{ background: red; color: white; padding: 100px }");

    // tablet rules
    AlertAssets.tablet("#alert", "{ background: green; color: white; padding: 50px }");

    // phone rules
    AlertAssets.phone("#alert", "{ background: black; color: white; padding: 20px }");

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

    // loading alert css assets
    AlertAssets.load();

```


## License
This library is licensed under the [MIT License](https://github.com/iftekhersunny/assets-helper/blob/master/LICENSE)
