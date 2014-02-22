define(['jquery', 'console', 'evaluate', 'globalFuncs'], function ($, regexConsole, evaluate, data) {
	'use strict';

	var currentLesson = localStorage.getItem('currentLesson') || 1;

	if (currentLesson !== 1) {
		$('.lesson1').hide();
		evaluate.init();
		startLesson(currentLesson);
	}


	// Called after code executed
	$(regexConsole).on('data', function (e, input, output) {
		var lesson = 'lesson' + currentLesson;
		if (lessonCompleted[lesson]) {
			var result = lessonCompleted[lesson].call(this, input, output);

			if (result) {
				$('.lesson' + currentLesson).hide();
				currentLesson++;

				localStorage.setItem('currentLesson', currentLesson);
				startLesson(currentLesson);
			}
		}
	});

	var lessonCompleted = {
		lesson1: function () {
			return !!data.name;
		},

		lesson2: function (input, output) {
			return ($.isArray(output) && output[0] === data.firstName);
		},

		lesson3: function (input, output) {
			return ($.isArray(output) && output[0] === data.firstName);
		},

		lesson4: function (input, output) {
			return (typeof output === 'boolean');
		},

		lesson5: function (input, output) {
			var expected = window.bio.replace(data.firstName, '[redacted]');
			return contains(input, 'replace') && output === expected;
		},

		lesson6: function (input, output) {
			if (!contains(input, 'num')) {
				return false;
			}

			if (contains(input, 'exec') || contains(input, 'match')) {
				return output === null;
			} else if (contains(input, 'test')) {
				return output === false;
			}

			return false;
		},

		lesson7: function (input, output) {
			if (!contains(input, '3.5')) {
				return false;
			}

			return (output === true ||
				($.isArray(output) && output[0] === '345'));
		},

		lesson8: function (input) {
			if (!contains(input, '?')) {
				return false;
			}

			var expr = data.lastAnswer;
			return (expr.test('frontend') && expr.test('front-end'));
		}
	};

	function startLesson(num) {
		$('.lesson' + num).show()
			.find('p, h1, pre').each(function () {
				var $this = $(this),
					html = $this.html();

				// @todo: Don't use .html()!
				html = html.replace(/{{ (\S+) }}/, function (text, property) {
					return data[property] ? data[property] : text;
				});

				$this.html(html);
			});
	}

	function contains(string, substr) {
		return string.indexOf(substr) !== -1;
	}
});