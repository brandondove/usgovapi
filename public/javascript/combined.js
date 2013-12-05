/*! US Government API - v0.0.1
 * https://github.com/brandondove/usgovapi/
 * Copyright (c) 2013; * Licensed GPLv2+ */
(function(){
	var badove = window.badove || {};
	if(!window.badove) window.badove = badove;
})();
/*! US Government API - v0.0.1
 * https://github.com/brandondove/usgovapi/
 * Copyright (c) 2013; * Licensed GPLv2+ */
(function(){
	var badove = window.badove || {};
	if(!window.badove) window.badove = badove;
})();
/*! US Government API - v0.0.1
 * https://github.com/brandondove/usgovapi/
 * Copyright (c) 2013; * Licensed GPLv2+ */

/*! US Government API - v0.0.1
 * https://github.com/brandondove/usgovapi/
 * Copyright (c) 2013; * Licensed GPLv2+ */

$(document).ready(function() {
	var socket = io.connect('http://localhost'),
		petitionid = $('#petitionId').val(),
		petitiondetails = window.badove.petitiondetails,
		signaturestable = window.badove.signaturestable;

	petitiondetails.init({
		containerId: 'petition-container',
		titleId: 'ptitle',
		bodyId: 'pbody',
		urlId: 'purl',
		createdId: 'pcreated',
		deadlineId: 'pdeadline',
		signatureCountId: 'psignaturecount',
		signatureThresholdId: 'psignaturethreshold',
		signaturesNeededId: 'psignaturesneeded',
		issuesId: 'pissues',
		progressBarId: 'progressbar'
	}, function petitiondetailscallback() {
		socket.on('title', petitiondetails.setTitle);
		socket.on('body', petitiondetails.setBody);
		socket.on('url', petitiondetails.setUrl);
		socket.on('created', petitiondetails.setCreated);
		socket.on('deadline', petitiondetails.setDeadline);
		socket.on('signatureCount', petitiondetails.setSignatureCount);
		socket.on('signatureThreshold', petitiondetails.setSignatureThreshold);
		socket.on('signaturesNeeded', petitiondetails.setSignaturesNeeded);
		socket.on('issue', petitiondetails.addIssue);
		socket.on('progress', petitiondetails.setProgress);

		socket.emit('petitiondetails', petitionid);
	});

	signaturestable.init('signatures', function signaturestablecallback() {
		socket.on('signature', signaturestable.addSignature);
		socket.emit('signaturestable', petitionid);
	});

});
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
jQuery(document).ready(function() {
	var socket = io.connect('http://localhost'),
		petitionstable = window.badove.petitionstable;

	petitionstable.init('petitions', function() {
		socket.on('petition', petitionstable.addPetition);
		socket.emit('petitionstable');
	});

});
(window.badove.petitionstable = function($) {

	var table = undefined,
		tablebody = undefined;

	return {
		init: function(_tableid, callback) {
			$.Mustache.load('/templates/petitionstable.html');
			table = $('#' + _tableid);
			tablebody = table.find('tbody');
			callback();
		},
		addPetition: function(petition) {
			var rowdata = {
				id: petition.id,
				title: petition.title
			}
			tablebody.mustache('petition-row', rowdata, {
				method: 'append'
			});
		}
	}


}(jQuery));
(window.badove.signaturesheatmap = function($) {
	var map, pointarray, heatmap;

	return {
		init: function(mapid, callback) {
			var mapOptions = {
				zoom: 4,
				center: new google.maps.LatLng(39.8282, -98.5795),
				mapTypeId: google.maps.MapTypeId.SATELLITE
			};

			map = new google.maps.Map(document.getElementById(mapid),
				mapOptions);

			pointarray = new google.maps.MVCArray();

			heatmap = new google.maps.visualization.HeatmapLayer({
				data: pointarray
			});

			heatmap.setMap(map);
			callback();
		},
		addLatLonPoint: function(latlon) {
			pointarray.push(new google.maps.LatLng(latlon.latitude, latlon.longitude));
		}
	}

}(jQuery));
$(document).ready(function() {
	var petitionid = $('#petitionId').val(),
		socket = io.connect('http://localhost'),
		signaturesheatmap = window.badove.signaturesheatmap;

	signaturesheatmap.init('map-canvas', function() {
		socket.emit('signaturesheatmap', petitionid);
		socket.on('latlon', signaturesheatmap.addLatLonPoint);
	});

})
(window.badove.signaturestable = function($) {
	var table = undefined,
		tablebody = undefined;

	return {
		init: function(_tableid, callback) {
			$.Mustache.load('/templates/signaturestable.html');
			table = $('#' + _tableid);
			tablebody = table.find('tbody');
			callback();
		},
		addSignature: function(_signature) {
			var rowdata = {
				name: _signature.name,
				zip: _signature.zip,
				city: _signature.city,
				state: _signature.state,
				created: function() {
					return new Date(_signature.created * 1000).toString();
				}
			}
			tablebody.mustache('signature-row', rowdata, {
				method: 'append'
			});
		}
	};

}(jQuery));
/*! US Government API - v0.0.1
 * https://github.com/brandondove/usgovapi/
 * Copyright (c) 2013; * Licensed GPLv2+ */
(function(){var e=window.badove||{};window.badove||(window.badove=e)})(),$(document).ready(function(){var e=io.connect("http://localhost"),t=$("#petitionId").val(),n=window.badove.petitiondetails,d=window.badove.signaturestable;n.init({containerId:"petition-container",titleId:"ptitle",bodyId:"pbody",urlId:"purl",createdId:"pcreated",deadlineId:"pdeadline",signatureCountId:"psignaturecount",signatureThresholdId:"psignaturethreshold",signaturesNeededId:"psignaturesneeded",issuesId:"pissues",progressBarId:"progressbar"},function(){e.on("title",n.setTitle),e.on("body",n.setBody),e.on("url",n.setUrl),e.on("created",n.setCreated),e.on("deadline",n.setDeadline),e.on("signatureCount",n.setSignatureCount),e.on("signatureThreshold",n.setSignatureThreshold),e.on("signaturesNeeded",n.setSignaturesNeeded),e.on("issue",n.addIssue),e.on("progress",n.setProgress),e.emit("petitiondetails",t)}),d.init("signatures",function(){e.on("signature",d.addSignature),e.emit("signaturestable",t)})}),window.badove.petitiondetails=function(e){var t=void 0,n=void 0,d=void 0,i=void 0,o=void 0,a=void 0,s=void 0,r=void 0,u=void 0,l=void 0,g=void 0,c=void 0;return{init:function(p,h){t=p;var m="#"+(t.containerId?t.containerId:"petition-container"),I="#"+(t.titleId?t.titleId:"ptitle");bodyId="#"+(t.bodyId?t.bodyId:"pbody"),urlId="#"+(t.urlId?t.urlId:"purl"),createdId="#"+(t.createdId?t.createdId:"pcreated"),deadlineId="#"+(t.deadlineId?t.deadlineId:"pdeadline"),signatureCountId="#"+(t.signatureCountId?t.signatureCountId:"psignaturecount"),signatureThresholdId="#"+(t.signatureThresholdId?t.signatureThresholdId:"psignaturethreshold"),signaturesNeededId="#"+(t.signaturesNeededId?t.signaturesNeededId:"psignaturesneeded"),issuesId="#"+(t.issuesId?t.issuesId:"pissues"),progressBarId="#"+(t.progressBarId?t.progressBarId:"progressbar"),n=e(m),d=n.find(I),i=n.find(bodyId),o=n.find(urlId),a=n.find(createdId),s=n.find(deadlineId),g=n.find(issuesId),c=n.find(progressBarId),r=n.find(signatureCountId),u=n.find(signatureThresholdId),l=n.find(signaturesNeededId),e.Mustache.load("/templates/petitiondetails.html"),h()},setTitle:function(e){var t={title:e};d.mustache("petition-title",t,{method:"html"})},setBody:function(e){var t={body:e};i.mustache("petition-body",t,{method:"html"})},setUrl:function(e){var t={url:e};o.mustache("petition-url",t,{method:"html"})},setCreated:function(e){var t={created:e};a.mustache("petition-created",t,{method:"html"})},setDeadline:function(e){var t={deadline:e};s.mustache("petition-deadline",t,{method:"html"})},setSignatureCount:function(e){var t={signatureCount:e};r.mustache("signature-count",t,{method:"html"})},setSignatureThreshold:function(e){var t={signatureThreshold:e};u.mustache("signature-threshold",t,{method:"html"})},setSignaturesNeeded:function(e){var t={signaturesNeeded:e};l.mustache("signatures-needed",t,{method:"html"})},setProgress:function(e){var t={progress:e.progress,signatureCount:e.signatureCount,signatureThreshold:e.signatureThreshold,signaturesNeeded:e.signaturesNeeded};c.mustache("prog-bar",t,{method:"html"})},addIssue:function(e){var t={issue:e};g.mustache("petition-issue",t,{method:"append"})}}}(jQuery),jQuery(document).ready(function(){var e=io.connect("http://localhost"),t=window.badove.petitionstable;t.init("petitions",function(){e.on("petition",t.addPetition),e.emit("petitionstable")})}),window.badove.petitionstable=function(e){var t=void 0,n=void 0;return{init:function(d,i){e.Mustache.load("/templates/petitionstable.html"),t=e("#"+d),n=t.find("tbody"),i()},addPetition:function(e){var t={id:e.id,title:e.title};n.mustache("petition-row",t,{method:"append"})}}}(jQuery),window.badove.signaturesheatmap=function(){var e,t,n;return{init:function(d,i){var o={zoom:4,center:new google.maps.LatLng(39.8282,-98.5795),mapTypeId:google.maps.MapTypeId.SATELLITE};e=new google.maps.Map(document.getElementById(d),o),t=new google.maps.MVCArray,n=new google.maps.visualization.HeatmapLayer({data:t}),n.setMap(e),i()},addLatLonPoint:function(e){t.push(new google.maps.LatLng(e.latitude,e.longitude))}}}(jQuery),$(document).ready(function(){var e=$("#petitionId").val(),t=io.connect("http://localhost"),n=window.badove.signaturesheatmap;n.init("map-canvas",function(){t.emit("signaturesheatmap",e),t.on("latlon",n.addLatLonPoint)})})(window.badove.signaturestable=function(e){var t=void 0,n=void 0;return{init:function(d,i){e.Mustache.load("/templates/signaturestable.html"),t=e("#"+d),n=t.find("tbody"),i()},addSignature:function(e){var t={name:e.name,zip:e.zip,city:e.city,state:e.state,created:function(){return""+new Date(1e3*e.created)}};n.mustache("signature-row",t,{method:"append"})}}}(jQuery));
$(document).ready(function() {
	var socket = io.connect('http://localhost'),
		petitionid = $('#petitionId').val(),
		petitiondetails = window.badove.petitiondetails,
		signaturestable = window.badove.signaturestable;

	petitiondetails.init({
		containerId: 'petition-container',
		titleId: 'ptitle',
		bodyId: 'pbody',
		urlId: 'purl',
		createdId: 'pcreated',
		deadlineId: 'pdeadline',
		signatureCountId: 'psignaturecount',
		signatureThresholdId: 'psignaturethreshold',
		signaturesNeededId: 'psignaturesneeded',
		issuesId: 'pissues',
		progressBarId: 'progressbar'
	}, function petitiondetailscallback() {
		socket.on('title', petitiondetails.setTitle);
		socket.on('body', petitiondetails.setBody);
		socket.on('url', petitiondetails.setUrl);
		socket.on('created', petitiondetails.setCreated);
		socket.on('deadline', petitiondetails.setDeadline);
		socket.on('signatureCount', petitiondetails.setSignatureCount);
		socket.on('signatureThreshold', petitiondetails.setSignatureThreshold);
		socket.on('signaturesNeeded', petitiondetails.setSignaturesNeeded);
		socket.on('issue', petitiondetails.addIssue);
		socket.on('progress', petitiondetails.setProgress);

		socket.emit('petitiondetails', petitionid);
	});

	signaturestable.init('signatures', function signaturestablecallback() {
		socket.on('signature', signaturestable.addSignature);
		socket.emit('signaturestable', petitionid);
	});

});
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
jQuery(document).ready(function() {
	var socket = io.connect('http://localhost'),
		petitionstable = window.badove.petitionstable;

	petitionstable.init('petitions', function() {
		socket.on('petition', petitionstable.addPetition);
		socket.emit('petitionstable');
	});

});
(window.badove.petitionstable = function($) {

	var table = undefined,
		tablebody = undefined;

	return {
		init: function(_tableid, callback) {
			$.Mustache.load('/templates/petitionstable.html');
			table = $('#' + _tableid);
			tablebody = table.find('tbody');
			callback();
		},
		addPetition: function(petition) {
			var rowdata = {
				id: petition.id,
				title: petition.title
			}
			tablebody.mustache('petition-row', rowdata, {
				method: 'append'
			});
		}
	}


}(jQuery));
(window.badove.signaturesheatmap = function($) {
	var map, pointarray, heatmap;

	return {
		init: function(mapid, callback) {
			var mapOptions = {
				zoom: 4,
				center: new google.maps.LatLng(39.8282, -98.5795),
				mapTypeId: google.maps.MapTypeId.SATELLITE
			};

			map = new google.maps.Map(document.getElementById(mapid),
				mapOptions);

			pointarray = new google.maps.MVCArray();

			heatmap = new google.maps.visualization.HeatmapLayer({
				data: pointarray
			});

			heatmap.setMap(map);
			callback();
		},
		addLatLonPoint: function(latlon) {
			pointarray.push(new google.maps.LatLng(latlon.latitude, latlon.longitude));
		}
	}

}(jQuery));
$(document).ready(function() {
	var petitionid = $('#petitionId').val(),
		socket = io.connect('http://localhost'),
		signaturesheatmap = window.badove.signaturesheatmap;

	signaturesheatmap.init('map-canvas', function() {
		socket.emit('signaturesheatmap', petitionid);
		socket.on('latlon', signaturesheatmap.addLatLonPoint);
	});

})
(window.badove.signaturestable = function($) {
	var table = undefined,
		tablebody = undefined;

	return {
		init: function(_tableid, callback) {
			$.Mustache.load('/templates/signaturestable.html');
			table = $('#' + _tableid);
			tablebody = table.find('tbody');
			callback();
		},
		addSignature: function(_signature) {
			var rowdata = {
				name: _signature.name,
				zip: _signature.zip,
				city: _signature.city,
				state: _signature.state,
				created: function() {
					return new Date(_signature.created * 1000).toString();
				}
			}
			tablebody.mustache('signature-row', rowdata, {
				method: 'append'
			});
		}
	};

}(jQuery));