#!/usr/bin/env python

import os.path as path
import sublime

userSettings = None
packageName = "JavaScript Ultimate"

def plugin_loaded():
    global userSettings
    global packageName
    from package_control import events
    if events.install(packageName):
        if userSettings == None:
            userSettings = sublime.load_settings("Preferences.sublime-settings")
        disable_js_package()

def plugin_unloaded():
    global userSettings
    global packageName
    from package_control import events
    if events.remove(packageName):
        if userSettings == None:
            userSettings = sublime.load_settings("Preferences.sublime-settings")
        enable_js_package()

def disable_js_package():
    global userSettings
    global packageName
    disabled = userSettings.get("ignored_packages", [])
    pathJSON = path.join("Packages", packageName, "json.sublime-syntax")
    pathJS = path.join("Packages", packageName, "javascript.sublime-syntax")
    for window in sublime.windows():
        for view in window.views():
            syntax = path.basename(view.settings().get('syntax'))
            if (syntax == "JSON.tmLanguage") or (syntax == "JSON.sublime-syntax"):
                view.set_syntax_file(pathJSON)
            elif (syntax == "JavaScript.tmLanguage") or (syntax == "JavaScript.sublime-syntax"):
                view.set_syntax_file(pathJS)
    if not "JavaScript" in disabled:
        disabled.append("JavaScript")
        userSettings.set("ignored_packages", disabled)
        sublime.save_settings("Preferences.sublime-settings")

def enable_js_package():
    global userSettings
    global packageName
    disabled = userSettings.get("ignored_packages", [])
    pathJSON = path.join("Packages", "JavaScript", "JSON.sublime-syntax")
    pathJS = path.join("Packages", "JavaScript", "JavaScript.sublime-syntax")
    if "JavaScript" in disabled:
        while "JavaScript" in disabled:
            disabled.remove("JavaScript")
        userSettings.set("ignored_packages", disabled)
        sublime.save_settings("Preferences.sublime-settings")
    for window in sublime.windows():
        for view in window.views():
            syntaxPath = view.settings().get('syntax')
            syntaxPackage = path.split(path.dirname(syntaxPath))[-1]
            if syntaxPackage == packageName:
                syntax = path.basename(syntaxPath)
                if "json" in syntax:
                    view.set_syntax_file(pathJSON)
                elif "javascript" in syntax:
                    view.set_syntax_file(pathJS)

