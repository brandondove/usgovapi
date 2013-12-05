(window.badove.petitiondetails = function($) {
	var options = undefined,
		container = undefined,
		title = undefined,
		body = undefined,
		url = undefined,
		created = undefined,
		deadline = undefined,
		signatureCount = undefined,
		signatureThreshold = undefined,
		signaturesNeeded = undefined,
		issues = undefined,
		progbar = undefined;

	return {
		init: function(_options, callback) {
			options = _options;
			var containerId = '#' + (options.containerId ? options.containerId : 'petition-container'),
				titleId = '#' + (options.titleId ? options.titleId : 'ptitle')
				bodyId = '#' + (options.bodyId ? options.bodyId : 'pbody'),
				urlId = '#' + (options.urlId ? options.urlId : 'purl'),
				createdId = '#' + (options.createdId ? options.createdId : 'pcreated'),
				deadlineId = '#' + (options.deadlineId ? options.deadlineId : 'pdeadline'),
				signatureCountId = '#' + (options.signatureCountId ? options.signatureCountId : 'psignaturecount'),
				signatureThresholdId = '#' + (options.signatureThresholdId ? options.signatureThresholdId : 'psignaturethreshold'),
				signaturesNeededId = '#' + (options.signaturesNeededId ? options.signaturesNeededId : 'psignaturesneeded'),
				issuesId = '#' + (options.issuesId ? options.issuesId : 'pissues'),
				progressBarId = '#' + (options.progressBarId ? options.progressBarId : 'progressbar');

			container = $(containerId);
			title = container.find(titleId);
			body = container.find(bodyId);
			url = container.find(urlId);
			created = container.find(createdId);
			deadline = container.find(deadlineId);
			issues = container.find(issuesId);
			progbar = container.find(progressBarId);
			signatureCount = container.find(signatureCountId);
			signatureThreshold = container.find(signatureThresholdId);
			signaturesNeeded = container.find(signaturesNeededId);

			$.Mustache.load('/templates/petitiondetails.html');

			callback();
		},
		setTitle: function(_title) {
			var data = {
				title: _title
			}
			title.mustache('petition-title', data, {
				method: 'html'
			});
		},
		setBody: function(_body) {
			var data = {
				body: _body
			}
			body.mustache('petition-body', data, {
				method: 'html'
			});
		},
		setUrl: function(_url) {
			var data = {
				url: _url
			}
			url.mustache('petition-url', data, {
				method: 'html'
			});
		},
		setCreated: function(_created) {
			var data = {
				created: _created
			}
			created.mustache('petition-created', data, {
				method: 'html'
			});
		},
		setDeadline: function(_deadline) {
			var data = {
				deadline: _deadline
			}
			deadline.mustache('petition-deadline', data, {
				method: 'html'
			});
		},
		setSignatureCount: function(_signatureCount) {
			var data = {
				signatureCount: _signatureCount
			}
			signatureCount.mustache('signature-count', data, {
				method: 'html'
			});
		},
		setSignatureThreshold: function(_signatureThreshold) {
			var data = {
				signatureThreshold: _signatureThreshold
			}
			signatureThreshold.mustache('signature-threshold', data, {
				method: 'html'
			});
		},
		setSignaturesNeeded: function(_signaturesNeeded) {
			var data = {
				signaturesNeeded: _signaturesNeeded
			}
			signaturesNeeded.mustache('signatures-needed', data, {
				method: 'html'
			});
		},
		setProgress: function(_progressObject) {
			var data = {
				progress: _progressObject.progress,
				signatureCount: _progressObject.signatureCount,
				signatureThreshold: _progressObject.signatureThreshold,
				signaturesNeeded: _progressObject.signaturesNeeded
			}
			progbar.mustache('prog-bar', data, {
				method: 'html'
			});
		},
		addIssue: function(_issue) {
			var data = {
				issue: _issue
			}
			issues.mustache('petition-issue', data, {
				method: 'append'
			});
		}
	};

}(jQuery));