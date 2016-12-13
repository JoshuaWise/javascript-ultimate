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
		this._parameters = this._template.match(/%%[\w-]+%%/g).filter((x, i, arr) => arr.indexOf(x) === i);
	}
	render(options = {}) {
		let result = this._template;
		this._parameters.forEach(param => {
			const value = options[param.slice(2, -2)];
			if (typeof value !== 'string') {
				throw new TypeError(`Expected parameter ${param} to be a string.`);
			}
			var re = new RegExp('(^\\s+)?' + param, 'gm');
			var match;
			while (match = re.exec(result)) {
				var indent = match[1] || '';
				result = result.slice(0, match.index)
					+ indent
					+ value.replace(/\r?\n/g, indent + '$&')
					+ result.slice(match.index + match[0].length);
			}
		});
		return result;
	}
	get name() {
		return this._name;
	}
};
