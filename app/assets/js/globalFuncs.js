define(function () {
	'use strict';

	var data = {};

	// Functions are declared globally so that eval can access them.
	window.setName = function (name) {
		var firstName = name.split(' ')[0];

		if (firstName === 'code') {
			return 'Your name isn\'t code! Stop it.';
		}

		window.bio = 'A developer called ' + firstName + ' is learning regex';

		data.name = name;
		data.firstName = firstName;

		return 'Hello, ' + name + '!';
	};

	window.reset = function () {
		localStorage.removeItem('currentLesson');
		localStorage.removeItem('codeSoFar');

		setTimeout(location.reload.bind(location), 100);

		return 'Resetting…';
	};

	window.clear = function () {
		setTimeout(function () {
			$('.console li:not(.input-container)').remove();
		}, 10);
	};

	return data;
});