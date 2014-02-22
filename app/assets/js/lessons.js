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
		}
	};

	function startLesson(num) {
		$('.lesson' + num).show()
			.find('p, h1').each(function () {
				var $this = $(this),
					html = $this.html();

				// @todo: Don't use .html()!
				html = html.replace(/{{ (\S+) }}/, function (text, property) {
					return data[property] ? data[property] : text;
				});

				$this.html(html);
			});
	}
});