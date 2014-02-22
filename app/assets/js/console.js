define(['jquery', 'evaluate', 'keymap'], function ($, evaluate, keymap) {
	'use strict';

	var $console = $('.console'),
		eventObject = {};

	var previousCommands = localStorage.getItem('previousCommands');
	previousCommands = previousCommands ? JSON.parse(previousCommands) : [];

	// When someone presses enter, evaluate code and display result.
	$('#regexInput').on('keydown', function (e) {
		if (e.keyCode !== keymap.ENTER) {
			return;
		}

		var $this = $(this),
			code = $this.val();

		if (code.length === 0) {
			return;
		}

		if (code.slice(0, 6) === 'reset(') {
			window.reset();
			return;
		}

		var result = evaluate(code);

		if (result instanceof Error) {
			result = '<strong class="error">' + result + '</strong>';
		} else {
			$(eventObject).trigger('data', [code, result]);
			result = JSON.stringify(result);

			previousCommands.push(code);
			var previousCommandsString = JSON.stringify(previousCommands);
			localStorage.setItem('previousCommands', previousCommandsString);
		}

		$('.prompt-completed').clone()
			.removeClass('prompt-completed')
			.insertBefore($this.parent())
			.find('code')
			.text(code);

		$('.prompt-result').clone()
			.removeClass('prompt-result')
			.insertBefore($this.parent())
			.find('code')
			.html(result);

		$this.val('');

		$console.scrollTop($console.prop('scrollHeight'));
	}).focus();

	return eventObject;
});