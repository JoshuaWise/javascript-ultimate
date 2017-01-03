'use strict';
const replace = require('./replace');

module.exports = (library, source) => {
	Object.keys(library).forEach(key => {
		source = replace({
			source,
			regexp: new RegExp(`(^\\s+)?#####{include}\\s*${key}#####`, 'm'),
			replacement: library[key],
			required: false
		});
	});
	return source;
};
