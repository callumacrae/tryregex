define(['jquery', 'console'], function ($, regexConsole) {
	'use strict';

	var currentLesson = localStorage.getItem('currentLesson') || 1,
		data = {};

	if (currentLesson !== 1) {
		$('.lesson1').hide();
		$('.lesson' + currentLesson).show();
	}


	// Called after code executed
	$(regexConsole).on('data', function (e, input, output) {
		var lesson = 'lesson' + currentLesson;
		if (lessonCompleted[lesson]) {
			var result = lessonCompleted[lesson].call(this, input, output);

			if (result) {
				$('.lesson' + currentLesson++).hide();
				localStorage.setItem('currentLesson', currentLesson);

				var $newLesson = $('.lesson' + currentLesson);
				$newLesson.show();

				$newLesson.find('p, h1').each(function () {
					var $this = $(this),
						html = $this.html();

					// @todo: Don't use .html()!
					html = html.replace(/{{ (\S+) }}/, function (text, property) {
						return data[property] ? data[property] : text;
					});

					$this.html(html);
				});
			}
		}
	});

	var lessonCompleted = {
		lesson1: function () {
			return !!data.name;
		},

		lesson2: function (input, output) {
			return ($.isArray(output) && output[0] === data.firstName);
		}
	};

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
});