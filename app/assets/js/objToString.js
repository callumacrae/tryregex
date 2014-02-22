define(function () {
	'use strict';

	function objToString(obj) {
		if (Array.isArray(obj)) {
			return '[' + obj.map(objToString).join(', ') + ']';
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

	window.objToString = objToString;

	return objToString;
});