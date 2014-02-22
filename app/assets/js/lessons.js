define(['jquery', 'console'], function ($, regexConsole) {
	'use strict';

	var currentLesson = 1,
		data = {};

	// Called after code executed
	$(regexConsole).on('data', function (e, input, output) {
		var lesson = 'lesson' + currentLesson;
		if (lessonCompleted[lesson]) {
			var result = lessonCompleted[lesson].call(this, input, output);

			if (result) {
				$('.lesson' + currentLesson++).hide();

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
			if (data.name) {
				window.bio = 'A developer called ' +
					data.firstName + ' is learning regex';

				return true;
			}

			return false;
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

		data.name = name;
		data.firstName = firstName;

		return 'Hello, ' + name + '!';
	};
});