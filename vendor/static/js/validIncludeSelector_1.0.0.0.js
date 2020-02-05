function addJS(jsFile) {
	var newScript = document.createElement('script');
	newScript.type = 'text/javascript';
	newScript.src = jsFile;
	document.getElementsByTagName('head')[0].appendChild(newScript);
}

function includeChrome() {
	if (firstCall) {
		addJS('vendor/static/js/validChrome_1.0.0.0.js');
		firstCall = false;
	}
}

function includeApplet(functionType) {
	if (functionType == FunctionType.SIGNATURE) {
		addJS('vendor/static/js/validAppletSignature_1.0.0.0.js');
	} else if (functionType == FunctionType.DNA) {
		addJS('vendor/static/js/validAppletDNA_1.0.0.0.js');
	} else if (functionType == FunctionType.ENROLL) {
		addJS('vendor/static/js/validAppletEnroll_1.0.0.0.js');
	}
}

function doInclude(functionType) {
	addJS('vendor/static/js/validUtility_1.0.0.0.js');

	if (window.chrome) {
		includeChrome();
	} else {
		includeApplet(functionType);
	}
}

var FunctionType = {
	DNA : 1,
	SIGNATURE : 2,
	ENROLL : 3,
};

var firstCall = true;
