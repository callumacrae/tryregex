define(['jquery', 'evaluate', 'keymap'], function ($, evaluate, keymap) {
	'use strict';

	var $console = $('.console'),
		$input = $('.regex-input'),
		eventObject = {},
		reverseCmdIndex = 0;

	var previousCmds = localStorage.getItem('previousCommands');
	previousCmds = previousCmds ? JSON.parse(previousCmds) : [];

	$console.click(function () {
		$input.focus();
	});

	// When someone presses enter, evaluate code and display result.
	$input.keydown(function (e) {
		if (e.keyCode === keymap.ENTER) {
			var $this = $(this),
				code = $this.val();

			if (code.length === 0) {
				return;
			}

			if (code.slice(0, 6) === 'reset(') {
				pushToPreviousCmds(code);
				window.reset();
				return;
			}

			var result = evaluate(code);

			if (result instanceof Error) {
				result = '<strong class="error">' + result + '</strong>';
			} else {
				$(eventObject).trigger('data', [code, result]);
				result = JSON.stringify(result);

				pushToPreviousCmds(code);
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
		} else if (e.keyCode === keymap.UP) {
			if (reverseCmdIndex >= previousCmds.length) {
				return;
			}

			if (reverseCmdIndex === 0 && $input.val()) {
				pushToPreviousCmds($input.val());
				reverseCmdIndex++; // Yes, increase twice
			}

			reverseCmdIndex++;

			$input.val(previousCmds[previousCmds.length - reverseCmdIndex]);
		} else if (e.keyCode === keymap.DOWN) {
			if (reverseCmdIndex < 1) {
				return;
			}

			reverseCmdIndex--;

			$input.val(previousCmds[previousCmds.length - reverseCmdIndex]);
		}
	}).on('input', function () {
		reverseCmdIndex = 0;
	}).focus();

	return eventObject;


	function pushToPreviousCmds(cmd) {
		previousCmds.push(cmd);
		var prevCmdString = JSON.stringify(previousCmds);
		localStorage.setItem('previousCommands', prevCmdString);
	}
});