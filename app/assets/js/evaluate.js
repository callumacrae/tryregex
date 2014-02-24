define(function () {
	'use strict';

	var codeSoFar = localStorage.getItem('codeSoFar') || '';

	/**
	 * Evaluates all code so far
	 *
	 * @todo: Make eval call more safe
	 */
	var evaluate = function (code) {
		if (code.indexOf('var') !== -1 || code.indexOf('function') !== -1) {
			code = 'undefined;' + code;
		}

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

	evaluate.init = function () {
		eval(codeSoFar); // jshint ignore: line
	};

	return evaluate;
});