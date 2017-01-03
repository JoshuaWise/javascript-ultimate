# JavaScript Ultimate
*(Language Package for Sublime Text 3)*

Although Sublime Text's built-in JavaScript language definition have made *significant* improvements recently, it's still not perfect. JavaScript Ultimate aims to be a perfectly accurate (to-the-spec) language definition for JavaScript.

Here are some of the improvements that it makes:
* Complete and accurate ES2016 support
* JavaDoc support
* Context-awareness, capable of highlighting errors or mistakes in your code

## Regular Expression comprehension
If you use JavaScript Ultimate with any of your existing themes, it will work just fine, and you can you enjoy a perfect JavaScript language definition.

But, if you use any of the themes that come with this bundle, you can the additional benefit of Regular Expression comprehension, as seen below:

![](http://i.imgur.com/XIb7b8P.png)

## Library Highlighting
Currently, the package comes with two flavors of highlighting - `JavaScript`, and `JavaScript (DOM)`.

You can use `JavaScript` when writing Node.js or other JavaScript applications. It includes only native JavaScript - it doesn't highlight things that are in the DOM.
The `JavaScript (DOM)` language is available for when you're writing front-end scripts.
You can switch between these whenever you want.

## Compatibility
JavaScript Ultimate is only compatible with Sublime Text 3, and specifically only with version 3103 or higher.

JavaScript Ultimate will work perfectly fine with the [Nodejs](https://packagecontrol.io/packages/Nodejs) package, [Node Completions](https://packagecontrol.io/packages/Node%20Completions) package, and any other code completions package you can find.

If you'd like to use the [jQuery](https://packagecontrol.io/packages/jQuery) package, you can do that too! Thanks to [Zander Martineau](https://github.com/MrMartineau) for making the [jQuery](https://packagecontrol.io/packages/jQuery) package properly work with JavaScript Ultimate!

**WARNING SublimeLinter:**
If you are using [SublimeLinter](https://github.com/SublimeLinter/SublimeLinter3) to lint your js files, installing Javascript Ultimate will make SublimeLinter silently fail. You need to add the following line to your user settings to make it work again. In Preferences > Package Settings > SublimeLinter > Settings - User

    "syntax_map": { 
      "javascript (dom)": "javascript" 
    }

**WARNING JavaScriptNext or Better Javascript:**  
If you have [JavaScriptNext](https://github.com/Benvie/JavaScriptNext.tmLanguage) or [Better JavaScript](https://github.com/int3h/sublime-better-javascript) installed, you need to first remove them before installing JavaScript Ultimate. JavaScript Ultimate is considered a complete upgrade from `JavaScriptNext` and `Better JavaScript`, so you won't need them anymore.

## Themes
* Monokai JU (just like defualt Monokai, but with regexp comprehension)
* Twilight JU
* Solarized JU (light)
* Solarized JU (dark)
* Indiana Jones (best with gray_antialias in user settings)
* Wes Anderson (best with subpixel_antialias in user settings)
* Tron (best with gray_antialias in user settings)

# Installation
You can install this package, and any other package mentioned here, using [Package Control](https://packagecontrol.io/).  
When JavaScript Ultimate is installed, the default JavaScript package should automatically be disabled.

## Authors
* Joshua Wise - [@JoshuaWise](https://github.com/JoshuaWise)

## License

This bundle is licensed under the [MIT license](http://www.opensource.org/licenses/mit-license.php).
