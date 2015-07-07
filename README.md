# JavaScript Ultimate
*(Language Package for Sublime Text 2/3)*

The default JavaScript language in Sublime Text is... well... not very good.

Here are some ways in which it **lacks**:
* dollar signs (`$`) are not treated as word-characters. This means that in patterns like `$true`, the `true` part is treated as a constant, instead of part of the identifier
* unicode identifiers are not supported
* it detects obsolete reserved words, and doesn't detect current reserved words
* its DOM library is out-dated
* it doesn't detect features of ECMAScript 5
* in patterns like `myObject.true`, it thinks that `true` is a constant, as oppossed to an identifier
* no JavaDoc support
* regular expression literals aren't detected in some valid contexts
* no distunguishing between decimal points and property accessors (`.`)
* many other imperfections

![](http://i.imgur.com/aNTxA8t.png)

**So I decided to build a completely new JavaScript language definition, from the ground up.**

Here are some of the **improvements**:
* all valid JavaScript identifiers are detected, with **full Unicode support** (and the dollar sign is treated as a word-character)
* updated DOM library; obsolete items removed, added support for Canvas, SVG functions, and more
* Includes all features of ECMAScript 5, and some of ES6 (will make an ES6 version when the spec if finalized)
* added JavaDoc support
* Decimal points and property accesors (`.`) are always distunguished properly
* Many, many, many more

![](http://i.imgur.com/8B1vXFT.png)

In short, it's as perfect as a JavaScript language definition can get for Sublime Text.

## Other Improvements
If you use JavaScript Ultimate with any of your existing themes, it will work just fine, and you can you enjoy a perfect JavaScript language definition.

But, if you use any of the themes that come with this bundle, you can get two additional benefits while writing JavaScript:
* Regular Expression comprehension
* Distinguishing between normal operators and bitwise operators

As seen below:
![](http://i.imgur.com/XIb7b8P.png)

## Library Highlighting
Currently, the package comes with two flavors of highlighting - `JavaScript`, and `JavaScript (DOM)`.

You can use `JavaScript` when writing Node.js or other JavaScript applications. It includes only native JavaScript - it doesn't highlight things that are in the DOM.
The `JavaScript (DOM)` language is available for when you're writing front-end scripts.
You can switch between these whenever you want.

I plan on creating a Node.js flavor too, at some point.

## Compatibility
JavaScript Ultimate is for Sublime Text 2 and 3, but should also work in Textmate.

JavaScript Ultimate will work perfectly fine with the [Nodejs](https://packagecontrol.io/packages/Nodejs) package, [Node Completions](https://packagecontrol.io/packages/Node%20Completions) package, and any other code completions package you can find.

If you'd like to use the [jQuery](https://packagecontrol.io/packages/jQuery) package, you can do that too! Thanks to [Zander Martineau](https://github.com/MrMartineau) for making the [jQuery](https://packagecontrol.io/packages/jQuery) package properly detect and work with JavaScript Ultimate!

**WARNING SublimeLinter:**  
If you are using [SublimeLinter](https://github.com/SublimeLinter/SublimeLinter3) to lint your js files, installing Javascript Ultimate will make SublimeLinter silently fail. You need to add the following line to your user settings to make it work again. In Preferences > Package Settings > SublimeLinter > Settings - User

    "syntax_map: { 
      "javascript (dom)": "javascript" 
    }

**WARNING Better Javascript:**  
If you have [Better JavaScript](https://github.com/int3h/sublime-better-javascript) installed, you need to first remove it before installing JavaScript Ultimate. JavaScript Ultimate is considered a complete upgrade from `Better JavaScript`, so you won't need it anymore.

## Themes
* Monokai JU (just like defualt Monokai, but with regexp comprehension and bitwise operator detection)
* Twilight JU
* Solarized JU (light)
* Solarized JU (dark)
* Indiana Jones (best with gray_antialias in user settings)
* Wes Anderson (best with subpixel_antialias in user settings)
* Tron (best with gray_antialias in user settings)

# Installation
You can install this package, and any other package mentioned here, using [Package Control](https://packagecontrol.io/).  
When JavaScript Ultimate is installed, the default JavaScript package should automatically me disabled.

## Uninstalling
Before uninstalling JavaScript Ultimate, be sure close all open JavaScript/JSON
files. Then, look into your User Settings, and remove "JavaScript" from the "ignored_packages" list.  
You can then safely uninstall JavaScript Ultimate.

It's normal to see a few errors from Sublime about not being able to find syntax files. Just exit Sublime and re-open it, and everything should be fixed.

## Authors
* Joshua Wise - [@JoshuaWise](https://github.com/JoshuaWise)

## License

This bundle is licensed under the [MIT license](http://www.opensource.org/licenses/mit-license.php).
Use it, change it, fork it, sell it. Do what you will, but please leave the author attribution.
