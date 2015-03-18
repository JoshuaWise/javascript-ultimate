#!/usr/bin/env python
# Copyright (c) 2013 Matthew E. Torok and 2015 Joshua Wise
# MIT License: http://opensource.org/licenses/MIT

import sys
import os.path as path
import sublime

userSettings = None
packageName = "JavaScript Ultimate"
lessThanV3 = sys.version_info < (3,)

def getPackageName():
    global packageName
    if lessThanV3:
        packageDir = path.dirname(path.abspath( __file__ ))
        packageName = path.split(packageDir)[1]
    else:
        packageName = __package__
getPackageName()

def disable_js_package():
    disabled = userSettings.get("ignored_packages", [])
    pathJSON = path.join("Packages", packageName, "JSON.tmLanguage")
    pathJS = path.join("Packages", packageName, "JavaScript (DOM).tmLanguage")
    
    # Hotfix, because Package Control events aren't working.
    if not "JavaScript" in disabled:
        disabled.append("JavaScript")
        userSettings.set("ignored_packages", disabled)
        sublime.save_settings("Preferences.sublime-settings")
        for window in sublime.windows():
            for view in window.views():
                syntax = path.basename(view.settings().get('syntax'))
                if syntax == "JSON.tmLanguage":
                    view.set_syntax_file(pathJSON)
                if syntax == "JavaScript.tmLanguage":
                    view.set_syntax_file(pathJS)
    
    # # Find any views currently using the built-in JS syntaxes and set them to use ours
    # for window in sublime.windows():
    #     for view in window.views():
    #         syntax = path.basename(view.settings().get('syntax'))
    #         if syntax == "JSON.tmLanguage":
    #             view.set_syntax_file(pathJSON)
    #         if syntax == "JavaScript.tmLanguage":
    #             view.set_syntax_file(pathJS)

    # if not "JavaScript" in disabled:
    #     disabled.append("JavaScript")
    #     userSettings.set("ignored_packages", disabled)
    #     sublime.save_settings("Preferences.sublime-settings")

def enable_js_package():
    disabled = userSettings.get("ignored_packages", [])
    pathJSON = path.join("Packages", "JavaScript", "JSON.tmLanguage")
    pathJS = path.join("Packages", "JavaScript", "JavaScript.tmLanguage")
    if "JavaScript" in disabled:
        while "JavaScript" in disabled:
            disabled.remove("JavaScript")
        userSettings.set("ignored_packages", disabled)
        sublime.save_settings("Preferences.sublime-settings")
        
    # Find any views currently using our JS syntax, and set them to the default JS syntax
    for window in sublime.windows():
        for view in window.views():
            syntaxPath = view.settings().get('syntax')
            syntaxPackage = path.split(path.dirname(syntaxPath))[1]
            if syntaxPackage == packageName:
                syntax = path.basename(syntaxPath)
                if "JSON" in syntax:
                    view.set_syntax_file(pathJSON)
                if "JavaScript" in syntax:
                    view.set_syntax_file(pathJS)

def plugin_loaded():
    global userSettings
    #from package_control import events

    if True: #if events.install(packageName):
        if userSettings == None:
            userSettings = sublime.load_settings("Preferences.sublime-settings")
        disable_js_package()

# def plugin_unloaded():
#     from package_control import events

#     if events.remove(packageName):
#         enable_js_package()

# Since ST < 3 does not provide the plugin_loaded() hook, we need to run manually. However, if we
# run too soon, then the settings loaded will be empty, which can cause problems like all the user
# settings getting erased. This will wait until we believe the user settings have loaded before
# executing the disable_js_package method.
def ensureLoaded():
    global userSettings
    userSettings = sublime.load_settings("Preferences.sublime-settings")
    if userSettings.has('ignored_packages'):
        plugin_loaded()
    else:
        sublime.set_timeout(ensureLoaded, 1000)

if lessThanV3:
    #unload_handler = plugin_unloaded
    ensureLoaded()
