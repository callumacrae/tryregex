define(function () {
	'use strict';

	function objToString(obj) {
		if (Array.isArray(obj)) {
			return '[' + obj.map(objToString).join(', ') + ']';
		}

		if (obj === null) {
			return 'null';
		}

		if (typeof obj === 'undefined') {
			return 'undefined';
		}

		if (typeof obj === 'object' && !(obj instanceof RegExp)) {
			var objStringArray = [];

			for (var key in obj) {
				if (!obj.hasOwnProperty(key)) {
					continue;
				}

				objStringArray.push(key + ': ' + objToString(obj[key]));
			}

			return '{' + objStringArray.join(', ') + '}';
		}

		if (typeof obj === 'string') {
			return '"' + obj.replace(/"/g, '\\\"') + '"';
		}

		return obj.toString();
	}

	return objToString;
});