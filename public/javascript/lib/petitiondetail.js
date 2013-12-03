(function($) {

	var petitionsdetail = (function() {
		var options = undefined,
			container = undefined,
			title = undefined,
			body = undefined,
			url = undefined,
			issues = undefined;

		var findTitle = function() {
			if (!title) {
				var titleId = '#' + (options.titleId ? options.titleId : 'petition-title');
				title = container.find(titleId);
			}
		};
		var findBody = function() {
			if (!body) {
				var bodyId = '#' + (options.bodyId ? options.bodyId : 'petition-body');
				body = container.find(bodyId);
			}
		};
		var findUrl = function() {
			if (!url) {
				var urlId = '#' + (options.urlId ? options.urlId : 'petition-url');
				url = container.find(urlId);
			}
		};
		var findIssues = function() {
			if (!issues) {
				var issuesId = '#' + (options.issuesId ? options.issuesId : 'petition-issues');
				issues = container.find(issuesId);
			}
		};

		return {
			init: function(_options) {
				options = _options;
				var containerId = '#' + (options.containerId ? options.containerId : 'petition-container');
				container = $(containerId);
				if (!container) throw new Error('You need to define some options for customization, or set the id of the petition div to "petition-container".');
			},
			setTitle: function(_title) {
				findTitle();
				title.text(_title);
			},
			setBody: function(_body) {
				findBody();
				body.text(_body);
			},
			setUrl: function(_url) {
				findUrl();
				url.href(_url);
			},
			addIssue: function(_issue) {
				findIssues();
				var span = $(document.createElement('span')).text(_issue).addClass('label label-primary');
				issues.append(span).append('&nbsp;');
			}
		}
	})();

	$(document).ready(function() {
		var socket = io.connect('http://localhost'),
			petitionid = $('#petitionId').val();

		petitionsdetail.init({
			containerId: 'petition-container',
			titleId: 'petition-title',
			bodyId: 'petition-body',
			urlId: 'petition-url',
			issuesId: 'petition-issues'
		});

		socket.on('title', function(title) {
			petitionsdetail.setTitle(title);
		});

		socket.on('body', function(body) {
			petitionsdetail.setBody(body);
		});

		socket.on('url', function(url) {
			petitionsdetail.setUrl(url);
		});

		socket.on('issue', function(issue) {
			petitionsdetail.addIssue(issue);
		});

		socket.emit('petitiondetail', petitionid);

	});

})(jQuery);