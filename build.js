'use strict';
const fs = require('fs');
const path = require('path');
const glob = require('glob').sync;
const yaml = require('js-yaml');
const Mixin = require('./lib/mixin');
const applyVersion = require('./lib/apply-version');
const sourceFilename = glob('./*.sublime-syntax.source')[0];

const getMixin = (mixins, name) => {
	const mixin = mixins.find(mixin => mixin.name === name);
	if (!mixin) {
		throw new ReferenceError(`Unrecognized mixin "${name}".`);
	}
	return mixin;
};

const walkMixins = (obj, fn) => {
	let count = 0;
	for (let key in obj) {
		if (obj[key].hasOwnProperty('mixin')) {
			fn(obj[key], key, obj);
			count += 1;
		}
	}
	return count;
};

glob('./versions/*.yaml').forEach(filename => {
	let versionName = path.basename(filename, path.extname(filename));
	const versionLibrary = yaml.safeLoad(fs.readFileSync(filename).toString());
	const mixins = glob('./mixins/*.yaml').map(filename => new Mixin(filename, versionLibrary));
	if (versionName === 'default') {
		versionName = '';
	} else {
		versionName = '.' + versionName;
	}
	(function process(filename) {
		const file = yaml.safeLoad(applyVersion(versionLibrary, fs.readFileSync(filename).toString()));
		const count = walkMixins(file.contexts, (def, key, obj) => {
			const mixin = getMixin(mixins, def.mixin);
			def.name = key;
			delete def.mixin;
			delete obj[key];
			const results = yaml.safeLoad(mixin.render(def));
			for (let context in results) {
				obj[context] = results[context];
			}
		});
		filename = filename.replace(/\.sublime-syntax\.source$/g, versionName + '.sublime-syntax');
		fs.writeFileSync(filename, '%YAML 1.2\n---\n' + JSON.stringify(file, null, '    '));
		count && process(filename);
	}(sourceFilename));
});
