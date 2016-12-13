'use strict';
const fs = require('fs');
const path = require('path');

module.exports = class Mixin {
	constructor(filename) {
		if (typeof filename !== 'string') {
			throw new TypeError('Expected filename to be a string.');
		}
		this._name = path.basename(filename, path.extname(filename));
		this._template = fs.readFileSync(filename).toString();
		var params = this._template.match(/%%(~)?[\w-]+%%/g).map(param => param.slice(2, -2));
		var optionalParams = params.filter(param => param[0] === '~').map(param => param.slice(1)).filter((x, i, arr) => arr.indexOf(x) === i);
		var requiredParams = params.filter(param => param[0] !== '~').filter((x, i, arr) => arr.indexOf(x) === i);
		optionalParams.forEach(key => {
			if (requiredParams.includes(key)) {
				throw new TypeError(`Parameter %%key%% exists as both required and optional.`);
			}
		});
		this._parameters = optionalParams.map(key => ({key, full: `%%~${key}%%`, optional: true}))
			.concat(requiredParams.map(key => ({key, full: `%%${key}%%`, optional: false})));
	}
	render(options = {}) {
		let result = this._template;
		this._parameters.forEach(param => {
			let value = options[param.key];
			if (value === undefined && param.optional) {
				value = '';
			} else if (typeof value === 'object' && value !== null) {
				if (Array.isArray(value)) {
					value = '- ' + value.map(item => JSON.stringify(item)).join('\n- ');
				} else {
					value = '- ' + JSON.stringify(value);
				}
			} else if (typeof value !== 'string') {
				throw new TypeError(`Expected parameter ${param.full} to be a string.`);
			}
			var re = new RegExp('(^\\s+)?' + param.full, 'gm');
			var match;
			while (match = re.exec(result)) {
				var indent = match[1] || '';
				result = result.slice(0, match.index)
					+ indent
					+ value.replace(/\r?\n/g, '$&' + indent)
					+ result.slice(match.index + match[0].length);
			}
		});
		return result;
	}
	get name() {
		return this._name;
	}
};
