define('evaluate', function () {
	'use strict';

	var codeSoFar = '';

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

			return JSON.stringify(result);
		} catch (e) {
			return e;
		}
	};
});