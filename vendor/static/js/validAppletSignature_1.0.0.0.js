document.write('<script type="text/javascript" src="vendor/static/js/validUtility_1.0.0.0.js"></script>');

function getAppletSignatureVersion() {
	return "1.3.0.4";
}

function getAppletSignatureName() {
	return "VALIDSignerApplet";
}

function getAppletSignatureInfo() {
	return "Applet de Assinatura Digital";
}

function addAppletSignature() {
	/* document.getElementById('divSignatureObject').innerHTML = 
		"<object id='VALIDSignerApplet' classid='clsid:8AD9C840-044E-11D1-B3E9-00805F499D93' width='0' height='0' style='width: 0px; height: 0px; float: left;'>" +
			"<param name='code' value='br.com.valid.cd.applet.signer.main.VALIDSignerApplet.class' />" +
			"<param name='codebase' value='applets'/>" +
			"<param name='type' value='application/x-java-applet' />" +

			"<param name='archive' value='VALIDSignerApplet-1.3.0.4.jar'/>" +
			"<param name='cache_archive' value='VALIDSignerApplet-1.3.0.4.jar'/>" +
			"<param name='cache_version' value='1.3.0.4'/>" +
			"<param name='separate_jvm' value='true'/>" +
			"<param name='setError' value='setError'/>" +
			"<param name='showException' value='showException'/>" +
			"<param name='activateDialog' value='false'/>" +

			"<param name='mayscript' value='true' />" +
			"<param name='scriptable' value='true' />" +
			"<param name='appDialogTitle' value='#{msg['gcu.page.private.appDialogTitle']}'/>" +
			"<param name='chooseCertificateTitle' value='#{msg['gcu.page.private.chooseDialogTitle']}'/>" +
			"<param name='chooseCertificateSubTitle' value='#{msg['gcu.page.private.certificateSubTitle']}'/>" +

			"<embed name='VALIDSignerApplet'" +
				   "type='application/x-java-applet'" +
				   "width = '0'" +
				   "height = '0'" +
				   "code = 'br.com.valid.cd.applet.signer.main.VALIDSignerApplet.class'" +
				   "codebase = 'applets'" +
				   "archive = 'VALIDSignerApplet-1.3.0.4.jar'" +
				   "cache_archive = 'VALIDSignerApplet-1.3.0.4.jar'" +
				   "cache_version = '1.3.0.4'" +
				   "mayscript = 'true'" +
				   "scriptable = 'true'" +
				   "separate_jvm = 'true'" +
				   "setError = 'setError'" +
				   "showException = 'showException'" +
				   "activateDialog='false'" +
				   "appDialogTitle='#{msg['gcu.page.private.appDialogTitle']}'" +
				   "chooseCertificateTitle='#{msg['gcu.page.private.chooseDialogTitle']}'" +
				   "chooseCertificateSubTitle='#{msg['gcu.page.private.certificateSubTitle']}'>" +
			"</embed>" +
		"</object>"; */
}

function listMyCertificates() {
	listMyCertificatesOrder(false, 0);
}

/*
 * "error": só estará presente caso success seja false
 * "content": só estará presente caso success seja true
 * 
 * Estrutura JSON retornada pela função
 * {
 * 		"listMyCertificates":
 * 		{
 * 			"success":<true/false>,
 * 			"error":
 * 			{
 * 				"errorType":"<tipo do erro>",
 * 				"errorCode":"<codigo do erro>",
 * 				"errorMessage":"<mensagem do erro>"
 * 			},
 * 			"content": 
 *  		[
 * 				{"thumbprint":"<thumbprint do certificado 1 (string)>", "subjectcn":"<cn do subject dn do certificado 1 (string)>", "issuercn":"<cn do issuer dn do certificado 1 (string)>", "validity":"<data de validade do certificado 1 (string)>"},
 * 				{"thumbprint":"<thumbprint do certificado 2 (string)>", "subjectcn":"<cn do subject dn do certificado 2 (string)>", "issuercn":"<cn do issuer dn do certificado 2 (string)>", "validity":"<data de validade do certificado 2 (string)>"},
 * 				{"thumbprint":"<thumbprint do certificado n (string)>", "subjectcn":"<cn do subject dn do certificado n (string)>", "issuercn":"<cn do issuer dn do certificado n (string)>", "validity":"<data de validade do certificado n (string)>"}
 * 			]
 * 		}
 * }
 */
function listMyCertificatesOrder(orderByExpirationDate, minDays) {
	alert('Acessei: listMyCertificatesOrder');
	var certInfo = [];
	var dataJSON = "";
	
	var result;
	
	if (orderByExpirationDate) {
		result = document.VALIDSignerApplet.selectCertificates("Microsoft", orderByExpirationDate, minDays);
	} else {
		result = document.VALIDSignerApplet.selectCertificates("Microsoft");
	}
	
	if(result) {
		while(document.VALIDSignerApplet.hasNext()) {
			var thumbprint = '"thumbprint":"' + document.VALIDSignerApplet.getThumbprint() + '"';
			var subjectcn = '"subjectcn":"' + document.VALIDSignerApplet.getSubjectCN() + '"';
			var issuercn = '"issuercn":"' + document.VALIDSignerApplet.getIssuerCN() + '"';
			var validity = '"validity":"' + document.VALIDSignerApplet.getNotAfter() + '"';
			certInfo.push('{' + argsUnion(thumbprint, subjectcn, issuercn, validity) + '}');
		}
		
		dataJSON = '"listMyCertificates":{"success":true,"content":[' + arrayUnion(certInfo) + ']}';
	} else {
		var lastErrorType = '"errorType":' + 3;
		var lastErrorCode = '"errorCode":' + 1;
		var lastErrorMessage = "";
		if (document.VALIDSignerApplet.getErrors() != null) {
			lastErrorMessage = document.VALIDSignerApplet.getErrors().replace(/\n/g, "\\n").replace(/\r/g, "\\r");
		}
		lastErrorMessage = '"errorMessage":"' + lastErrorMessage + '"';
		dataJSON = '"listMyCertificates":{"success":false,"error":{' + argsUnion(lastErrorType, lastErrorCode, lastErrorMessage) + '}}';
	}
	
	document.dispatchEvent(new CustomEvent("listMyCertificatesEvent",  {"detail":'{' + dataJSON + '}'}));
}

/*
 * "error": só estará presente caso success seja false
 * "content": só estará presente caso success seja true
 *  
 * Estrutura JSON retornada pela função
 * {
 * 		"signData":
 * 		{
 *  		"success":<true/false>,
 * 			"error":
 *  		{
 *  			"errorType":"<tipo do erro>",
 *  			"errorCode":"<codigo do erro>",
 *  			"errorMessage":"<mensagem do erro>"
 *  		},
 * 			"content": 
 * 			{
 *  			"data":"<dado assinado (base64 do CMS) (string)>"
 *  		}
 * 		}
 * }
 */
function doSignature(dataToSign, thumbprint, detached) {
	var signedData;
	if (detached) {
		signedData = document.VALIDSignerApplet.signDetachedWithMessageDigest(dataToSign, thumbprint);
	} else {
		signedData = document.VALIDSignerApplet.sign(dataToSign, thumbprint);
	}
					
	var dataJSON = "";
	if(signedData != '') {
		signedData = signedData.replace(/\n/g, "\\n").replace(/\r/g, "\\r");
		var el = '{"data":"' + signedData + '"}';
		dataJSON = '"signData":{"success":true,"content":' + el + '}';
	} else {
		var lastErrorType = '"errorType":' + 3;
		var lastErrorCode = '"errorCode":' + 5;
		var lastErrorMessage = "";
		if (document.VALIDSignerApplet.getErrors() != null) {
			lastErrorMessage = document.VALIDSignerApplet.getErrors().replace(/\n/g, "\\n").replace(/\r/g, "\\r");
		}
		lastErrorMessage = '"errorMessage":"' + lastErrorMessage + '"';
		dataJSON = '"signData":{"success":false,"error":{' + argsUnion(lastErrorType, lastErrorCode, lastErrorMessage) + '}}';
	}
	
	document.dispatchEvent(new CustomEvent("doSignatureEvent",  {"detail":'{' + dataJSON + '}'}));
}

/*
 * "error": só estará presente caso success seja false
 * "content": só estará presente caso success seja true
 *  
 * Estrutura JSON retornada pela função
 * {
 * 		"signDataPKCS1":
 * 		{
 *  		"success":<true/false>,
 * 			"error":
 *  		{
 *  			"errorType":"<tipo do erro>",
 *  			"errorCode":"<codigo do erro>",
 *  			"errorMessage":"<mensagem do erro>"
 *  		},
 * 			"content": 
 * 			{
 *  			"data":"<dado assinado (base64) (string)>"
 *  		}
 * 		}
 * }
 */
function doSignaturePKCS1(dataToSign, thumbprint, sigAlg) {
	var signedData = document.VALIDSignerApplet.signPkcs1Base64(dataToSign, thumbprint, sigAlg);
	var dataJSON = "";
	if(signedData != '') {
		signedData = signedData.replace(/\n/g, "\\n").replace(/\r/g, "\\r");
		var el = '{"data":"' + signedData + '"}';
		dataJSON = '"signDataPKCS1":{"success":true,"content":' + el + '}';
	} else {
		var lastErrorType = '"errorType":' + 3;
		var lastErrorCode = '"errorCode":' + 5;
		var lastErrorMessage = "";
		if (document.VALIDSignerApplet.getErrors() != null) {
			lastErrorMessage = document.VALIDSignerApplet.getErrors().replace(/\n/g, "\\n").replace(/\r/g, "\\r");
		}
		lastErrorMessage = '"errorMessage":"' + lastErrorMessage + '"';
		dataJSON = '"signDataPKCS1":{"success":false,"error":{' + argsUnion(lastErrorType, lastErrorCode, lastErrorMessage) + '}}';
	}
	
	document.dispatchEvent(new CustomEvent("doSignaturePKCS1Event",  {"detail":'{' + dataJSON + '}'}));
}

/*
 * "error": só estará presente caso success seja false
 * "content": só estará presente caso success seja true
 *  
 * Estrutura JSON retornada pela função
 * {
 * 		"isValidCA":
 * 		{
 *  		"success":<true/false>,
 * 			"error":
 *  		{
 *  			"errorType":"<tipo do erro>",
 *  			"errorCode":"<codigo do erro>",
 *  			"errorMessage":"<mensagem do erro>"
 *  		},
 * 			"content": 
 * 			{
 *  			"checkResult":"<boolean com o resultado do teste>"
 *  		}
 * 		}
 * }
 */
function isValidCA(thumbprint) {
	var checkResult = '"checkResult":"' + document.VALIDSignerApplet.isValidCA(thumbprint) + '"';
	var el = '{' + argsUnion(checkResult) + '}';
	
	var dataJSON = '"isValidCA":{"success":true,"content":' + el + '}';
	document.dispatchEvent(new CustomEvent("isValidCAEvent",  {"detail":'{' + dataJSON + '}'}));
}

/*
 * "error": só estará presente caso success seja false
 * "content": só estará presente caso success seja true
 *  
 * Estrutura JSON retornada pela função
 * {
 * 		"getCertificateType":
 * 		{
 *  		"success":<true/false>,
 * 			"error":
 *  		{
 *  			"errorType":"<tipo do erro>",
 *  			"errorCode":"<codigo do erro>",
 *  			"errorMessage":"<mensagem do erro>"
 *  		},
 * 			"content": 
 * 			{
 *  			"type":"<tipo do certificado>"
 *  		}
 * 		}
 * }
 */
function getCertificateType(thumbprint) {
	var type = '"type":"' + document.VALIDSignerApplet.getCertificateType(thumbprint) + '"';
	var el = '{' + argsUnion(type) + '}';
	
	var dataJSON = '"getCertificateType":{"success":true,"content":' + el + '}';
	document.dispatchEvent(new CustomEvent("getCertificateTypeEvent",  {"detail":'{' + dataJSON + '}'}));
}

/*
 * "error": só estará presente caso success seja false
 * "content": só estará presente caso success seja true
 *  
 * Estrutura JSON retornada pela função
 * {
 * 		"getCertificatePem":
 * 		{
 *  		"success":<true/false>,
 * 			"error":
 *  		{
 *  			"errorType":"<tipo do erro>",
 *  			"errorCode":"<codigo do erro>",
 *  			"errorMessage":"<mensagem do erro>"
 *  		},
 * 			"content": 
 * 			{
 *  			"certificate":"<certificado no formato PEM>"
 *  		}
 * 		}
 * }
 */
function getCertificatePem(thumbprint) {
	var certificate = '"certificate":"' + document.VALIDSignerApplet.getCertificate(thumbprint) + '"';
	certificate = certificate.replace(/\n/g, "\\n").replace(/\r/g, "\\r");
	var el = '{' + argsUnion(certificate) + '}';
	
	var dataJSON = '"getCertificatePem":{"success":true,"content":' + el + '}';
	document.dispatchEvent(new CustomEvent("getCertificatePemEvent",  {"detail":'{' + dataJSON + '}'}));
}

/*
 * "error": só estará presente caso success seja false
 * "content": só estará presente caso success seja true
 * 
 * Estrutura JSON retornada pela função
 * {
 * 		"applicationInfo":
 * 		{
 * 			"success":<true/false>,
 * 			"error":
 * 			{
 * 				"errorType":"<tipo do erro>",
 * 				"errorCode":"<codigo do erro>",
 * 				"errorMessage":"<mensagem do erro>"
 * 			},
 * 			"content":
 * 			{
 * 				"name":"<nome da aplicação>",
 * 				"version":"<versão da aplicação>",
 * 				"info":"<informações gerais>"
 * 			}
 * 		}
 * }
 */
function getApplicationInfo() {
	var name = '"name":"' + getAppletSignatureName() + '"';
	var version = '"version":"' + getAppletSignatureVersion() + '"';
	var info = '"info":"' + getAppletSignatureInfo() + '"';
	
	var el = '{' + argsUnion(name, version, info) + '}';
	
	var dataJSON = '"applicationInfo":{"success":true,"content":' + el + '}';
	document.dispatchEvent(new CustomEvent("getApplicationInfoEvent",  {"detail":'{' + dataJSON + '}'}));
}

/*
 * Metodo de interface
 * 
 * Return: boolean
 */
function hasExtension() {
	// TODO - deveria validar se o Java está instalado
	return true;
}

/*
 * Metodo de interface
 * @param localURL
 * 
 * Return: string
 */
function getInstallURL(localURL) {
	// TODO instalacao do Java
	return "";
}

addAppletSignature();