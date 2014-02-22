define(function () {
	'use strict';

	var codeSoFar = localStorage.getItem('codeSoFar') || '';

	/**
	 * Evaluates all code so far
	 *
	 * @todo: Make eval call more safe
	 */
	return function (code) {
		var newCode = codeSoFar + '\n;' + code;

		// If code works, add it to codeSoFar so that variables are preserved
		try {
			var result = eval(newCode); // jshint ignore: line

			codeSoFar = newCode;
			localStorage.setItem('codeSoFar', codeSoFar);

			return result;
		} catch (e) {
			return e;
		}
	};
});