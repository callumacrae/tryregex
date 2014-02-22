if (typeof DEBUG === 'undefined') {
	DEBUG = true;
}

/**
 * tryregex
 *
 * Copyright (c) 2014 Callum Macrae
 */

/* global requirejs */
requirejs.config({
	paths: {
		jquery: 'bower/jquery/jquery'
	}
});

require(['jquery', 'evaluate', 'keymap'], function ($, evaluate, keymap) {
	'use strict';

	var $console = $('.console');

	/**
	 * When someone presses enter, evaluate code and display result.
	 */
	$('#regexInput').on('keydown', function (e) {
		if (e.keyCode !== keymap.ENTER) {
			return;
		}

		var $this = $(this),
			code = $this.val(),
			result = evaluate(code);

		if (result instanceof Error) {
			result = '<strong class="error">' + result + '</strong>';
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
});