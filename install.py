#!/usr/bin/env python
# Copyright (c) 2013 Matthew E. Torok and 2015 Joshua Wise
# MIT License: http://opensource.org/licenses/MIT

import os.path as path
import sublime

userSettings = None
packageName = "JavaScript Ultimate"


def getPackageName():
	global packageName
	packageDir = path.dirname(path.abspath( __file__ ))
	if packageDir[0] != "/":
		return
	packageName = path.split(packageDir)[1]
# This needs to be run as soon as possible, because if the cwd changes after loading, the results
# may be wrong
getPackageName()


def disable_js_package():
	disabled = userSettings.get("ignored_packages", [])
	# Find any views currently using the built-in JS syntaxes and set them to use ours
	for window in sublime.windows():
		for view in window.views():
			syntax = path.basename(view.settings().get('syntax'))
			if syntax == "JSON.tmLanguage":
				view.set_syntax_file(path.join("Packages", packageName, "JSON.tmLanguage"))
			if syntax == "JavaScript.tmLanguage":
				view.set_syntax_file(path.join("Packages", packageName, "JavaScript (DOM).tmLanguage"))

	if not "JavaScript" in disabled:
		disabled.append("JavaScript")
		userSettings.set("ignored_packages", disabled)
		sublime.save_settings("Preferences.sublime-settings")




def plugin_loaded():
	global userSettings
	userSettings = sublime.load_settings("Preferences.sublime-settings")
	disable_js_package()


# Since ST < 3 does not provide the plugin_loaded() hook, we need to run manually. However, if we
# run too soon, then the settings loaded will be empty, which can cause problems like all the user
# settings getting erased. This will wait until we believe the user settings have loaded before
# executing the disable_js_package method.
def ensureLoaded():
	if userSettings.has('ignored_packages'):
		disable_js_package()
	else:
		sublime.set_timeout(ensureLoaded, 1000)

if int(sublime.version()) < 3000:
	userSettings = sublime.load_settings("Preferences.sublime-settings")
	ensureLoaded()