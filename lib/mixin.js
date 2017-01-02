'use strict';
const fs = require('fs');
const path = require('path');

module.exports = class Mixin {
	constructor(filename, library = {}) {
		if (typeof filename !== 'string') {
			throw new TypeError('Expected filename to be a string.');
		}
		this._name = path.basename(filename, path.extname(filename));
		this._template = insertLibrary(library, fs.readFileSync(filename).toString());
		const params = this._template.match(/%%(~)?[\w-]+%%/g).map(param => param.slice(2, -2));
		const optionalParams = params.filter(param => param[0] === '~').map(param => param.slice(1)).filter((x, i, arr) => arr.indexOf(x) === i);
		const requiredParams = params.filter(param => param[0] !== '~').filter((x, i, arr) => arr.indexOf(x) === i);
		optionalParams.forEach(key => {
			if (requiredParams.includes(key)) {
				throw new TypeError(`Parameter %%key%% exists as both required and optional.`);
			}
		});
		this._parameters = optionalParams.map(key => ({key, full: `%%~${key}%%`, optional: true}))
			.concat(requiredParams.map(key => ({key, full: `%%${key}%%`, optional: false})));
	}
	render(options = {}) {
		let source = this._template;
		this._parameters.forEach(param => {
			source = replace({
				source,
				regexp: new RegExp('(^\\s+)?' + param.full, 'm'),
				replacement: options[param.key],
				required: !param.optional && {error: `Expected parameter ${param.full} to be a string.`}
			});
		});
		return source;
	}
	get name() {
		return this._name;
	}
};

const replace = ({source, regexp, replacement, required}) => {
	if (replacement === undefined && !required) {
		replacement = '';
	} else if (typeof replacement === 'object' && replacement !== null) {
		if (Array.isArray(replacement)) {
			replacement = '- ' + replacement.map(item => JSON.stringify(item)).join('\n- ');
		} else {
			replacement = '- ' + JSON.stringify(replacement);
		}
	} else if (typeof replacement !== 'string') {
		throw new TypeError('' + required.error);
	}
	let match;
	while (match = regexp.exec(source)) {
		const indent = match[1] || '';
		source = source.slice(0, match.index)
			+ indent
			+ replacement.replace(/\r?\n/g, '$&' + indent)
			+ source.slice(match.index + match[0].length);
	}
	return source;
};

const insertLibrary = (library, source) => {
	Object.keys(library).forEach(key => {
		source = replace({
			source,
			regexp: new RegExp('(^\\s+)?#####{include}\\s*' + key + '#####', 'm'),
			replacement: library[key],
			required: false
		});
	});
	return source;
};
