#!/usr/bin/env python

import sublime

userSettings = None
packageName = "JavaScript Ultimate"

def plugin_loaded():
    global userSettings
    from package_control import events
    if events.install(packageName):
        if userSettings == None:
            userSettings = sublime.load_settings("Preferences.sublime-settings")
        disable_js_package()

def plugin_unloaded():
    global userSettings
    from package_control import events
    if events.remove(packageName):
        if userSettings == None:
            userSettings = sublime.load_settings("Preferences.sublime-settings")
        enable_js_package()

def disable_js_package():
    global userSettings
    disabled = userSettings.get("ignored_packages", [])
    if not "JavaScript" in disabled:
        disabled.append("JavaScript")
        userSettings.set("ignored_packages", disabled)
        sublime.save_settings("Preferences.sublime-settings")

def enable_js_package():
    global userSettings
    disabled = userSettings.get("ignored_packages", [])
    if "JavaScript" in disabled:
        while "JavaScript" in disabled:
            disabled.remove("JavaScript")
        userSettings.set("ignored_packages", disabled)
        sublime.save_settings("Preferences.sublime-settings")
