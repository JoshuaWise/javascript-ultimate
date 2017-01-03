'use strict';

module.exports = ({source, regexp, replacement, required}) => {
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
