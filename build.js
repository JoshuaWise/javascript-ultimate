'use strict';
const fs = require('fs');
const glob = require('glob').sync;
const yaml = require('js-yaml');
const Mixin = require('./lib/mixin');
const mixins = glob('./mixins/*.yaml').map(filename => new Mixin(filename));

const getMixin = (name) => {
	return mixins.find(mixin => mixin.name === name);
};

const walk = (obj, fn) => {
	for (let key in obj) {
		if (obj[key].hasOwnProperty('mixin')) {
			fn(obj[key], key, obj);
		}
	}
};

glob('./*.sublime-syntax.source').forEach(filename => {
	const file = yaml.safeLoad(fs.readFileSync(filename).toString());
	walk(file.contexts, (def, key, obj) => {
		const mixin = getMixin(def.mixin);
		def.name = key;
		delete def.mixin;
		delete obj[key];
		const results = yaml.safeLoad(mixin.render(def));
		for (let context in results) {
			obj[context] = results[context];
		}
	});
	fs.writeFileSync(filename.replace(/\.source$/g, ''), '%YAML 1.2\n---\n' + JSON.stringify(file, null, '    '));
});
