'use strict';
const fs = require('fs');
const path = require('path');
const replace = require('./replace');
const applyVersion = require('./apply-version');

module.exports = class Mixin {
	constructor(filename, library) {
		if (typeof filename !== 'string') {
			throw new TypeError('Expected filename to be a string.');
		}
		this._name = path.basename(filename, path.extname(filename));
		this._template = applyVersion(library, fs.readFileSync(filename).toString());
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
