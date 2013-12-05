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