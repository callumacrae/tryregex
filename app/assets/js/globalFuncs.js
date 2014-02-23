define(function () {
	'use strict';

	var data = {};

	// Functions are declared globally so that eval can access them.
	window.setName = function (name) {
		if (data.name) {
			return 'You have already set your name! Type reset() to start again, if you want.';
		}

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

	window.num = '123456';

	window.answer = function (expression) {
		data.lastAnswer = expression;

		return 'Answer received';
	};

	window.shortStory = 'A regular expression (also regex or regexp) is a string.';

	window.shorterStory = '(123) (123456) (123456789)';

	window.username = 'BobbyTables';

	window.charTypeTest = 'Matinée 1920';

	window.possibleUrl = 'https://example.com/';

	window.rabbit = 'The rabbit ate';

	window.userData = 'user1=sad;\nuser2=angry;\n' +
		window.username + '=happy;\nuser4=crazy';

	window.boldText = '**bold text!**';

	window.partialSums = '1+1,2+2,3+3=,8+10,10+10+20,6+3=9,5+3';

	return data;
});