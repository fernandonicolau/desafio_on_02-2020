/*
 * 	Estrutura JSON enviada para HostApp
 * 	{
 * 		"machineDNA":{}
 * 	}
 */

/*
 * "error": só estará presente caso success seja false
 * "content": só estará presente caso success seja true
 *  
 * Estrutura JSON retornada pelo HostApp
 * {
 * 		"machineDNA":
 *  	{
 *  		"success":<true/false>,
 * 			"error":
 *  		{
 *  			"errorType":"<tipo do erro>",
 *  			"errorCode":"<codigo do erro>",
 *  			"errorMessage":"<mensagem do erro>"
 *  		},
 * 			"content": 
 * 			{
 *  			"hostname":"<valor do hostname (string)>",
 *  			"dna":"<valor do dna (string)>", 
 *  			"dnaOld":"<valor do dna (sem uso da funcao Proxy no WMI) (string)>", 
 *  		}
 *  	}
 *		"magicNumber":<id da tab do chrome (preenchido pelo content-script)>
 * }
 */
function getMachineDNA() {
	var customEvent = new CustomEvent("sendToContentScriptEventJValidHostApp",
			{
				"detail" : {
					"machineDNA" : "",
					"magicNumber" : ""
				}
			});
	document.dispatchEvent(customEvent);
}

/*
 * <pre> Estrutura JSON enviada para HostApp { "checkICPAlg": { "thumbprint":"<thumbprint
 * do certificado que sera testado (string)>", "ignoreMicrosoftCSP":"<true/false>
 * (boolean)" } "magicNumber":<numero de identificacao da tab no chrome> }
 */

/*
 * <pre> "error": só estará presente caso success seja false "content": só
 * estará presente caso success seja true
 * 
 * Estrutura JSON retornada pelo HostApp { "checkICPAlg": { "success":<true/false>,
 * "error": { "errorType":"<tipo do erro>", "errorCode":"<codigo do erro>",
 * "errorMessage":"<mensagem do erro>" }, "content": { "checkResult":"<boolean
 * com o resultado do teste>" } } "magicNumber":<numero de identificacao da tab
 * no chrome> }
 */
function checkICPAlg(thumbprint, ignoreMicrosoftCSP) {
	var customEvent = new CustomEvent("sendToContentScriptEventJValidHostApp",
			{
				"detail" : {
					"checkICPAlg" : {
						"thumbprint" : thumbprint,
						"ignoreMicrosoftCSP" : ignoreMicrosoftCSP
					}
				},
				"magicNumber" : ""
			});
	document.dispatchEvent(customEvent);
}

/*
 * <pre> Estrutura JSON enviada para HostApp { "checkMaxContainers": {
 * "thumbprint":"<thumbprint do certificado que sera testado (string)>",
 * "maxContainers":<numero maximo de containers>, "ignoreMicrosoftCSP":"<true/false>
 * (boolean)" } "magicNumber":<numero de identificacao da tab no chrome> }
 */

/*
 * <pre> "error": só estará presente caso success seja false "content": só
 * estará presente caso success seja true
 * 
 * Estrutura JSON retornada pelo HostApp { "checkMaxContainers": { "success":<true/false>,
 * "error": { "errorType":"<tipo do erro>", "errorCode":"<codigo do erro>",
 * "errorMessage":"<mensagem do erro>" }, "content": { "checkResult":"<boolean
 * com o resultado do teste>" } } "magicNumber":<numero de identificacao da tab
 * no chrome> }
 */
function checkMaxContainers(thumbprint, maxContainers, ignoreMicrosoftCSP) {
	var customEvent = new CustomEvent("sendToContentScriptEventJValidHostApp",
			{
				"detail" : {
					"checkMaxContainers" : {
						"thumbprint" : thumbprint,
						"maxContainers" : maxContainers,
						"ignoreMicrosoftCSP" : ignoreMicrosoftCSP
					}
				},
				"magicNumber" : ""
			});
	document.dispatchEvent(customEvent);
}

/*
 * <pre> Estrutura JSON enviada para HostApp { "deviceType":{} "magicNumber":<numero
 * de identificacao da tab no chrome> }
 */

/*
 * <pre> "error": só estará presente caso success seja false "content": só
 * estará presente caso success seja true
 * 
 * Estrutura JSON retornada pelo HostApp { "deviceType": { "success":<true/false>,
 * "error": { "errorType":"<tipo do erro>", "errorCode":"<codigo do erro>",
 * "errorMessage":"<mensagem do erro>" }, "content": { "type":"<tipo do
 * dispositivo>" } } "magicNumber":<numero de identificacao da tab no chrome> }
 */
function deviceType() {
	var customEvent = new CustomEvent("sendToContentScriptEventJValidHostApp",
			{
				"detail" : {
					"deviceType" : "",
					"magicNumber" : ""
				}
			});
	document.dispatchEvent(customEvent);
}

function listMyCertificates() {
	listMyCertificatesOrder(false, 0);
}

/*
 * Estrutura JSON enviada para HostApp { "listMyCertificates": {
 * "orderByExpirationDate":<ordenar por data de expiracao (true/false)>,
 * "minDays":<listar apenas certificados a x dias da expiração (inteiro)> }
 * "magicNumber":<id da tab do chrome (preenchido pelo content-script)> }
 */

/*
 * "error": só estará presente caso success seja false "content": só estará
 * presente caso success seja true
 * 
 * Estrutura JSON retornada pelo HostApp { "listMyCertificates": { "success":<true/false>,
 * "error": { "errorType":"<tipo do erro>", "errorCode":"<codigo do erro>",
 * "errorMessage":"<mensagem do erro>" }, "content": [ {"thumbprint":"<thumbprint
 * do certificado 1 (string)>", "subjectcn":"<cn do subject dn do certificado 1
 * (string)>", "issuercn":"<cn do issuer dn do certificado 1 (string)>",
 * "validity":"<data de validade do certificado 1 (string)>"}, {"thumbprint":"<thumbprint
 * do certificado 2 (string)>", "subjectcn":"<cn do subject dn do certificado 2
 * (string)>", "issuercn":"<cn do issuer dn do certificado 2 (string)>",
 * "validity":"<data de validade do certificado 2 (string)>"}, {"thumbprint":"<thumbprint
 * do certificado n (string)>", "subjectcn":"<cn do subject dn do certificado n
 * (string)>", "issuercn":"<cn do issuer dn do certificado n (string)>",
 * "validity":"<data de validade do certificado n (string)>"} ] }
 * "magicNumber":<id da tab do chrome (preenchido pelo content-script)> }
 */
function listMyCertificatesOrder(orderByExpirationDate, minDays) {
	var customEvent = new CustomEvent("sendToContentScriptEventJValidHostApp",
			{
				"detail" : {
					"listMyCertificates" : {
						"orderByExpirationDate" : orderByExpirationDate,
						"minDays" : minDays
					},
					"magicNumber" : ""
				}
			});
	document.dispatchEvent(customEvent);
}

/*
 * Se for detached o esperado é que data seja o hash
 * 
 * Estrutura JSON enviada para HostApp { "signData": { "thumbprint":"<thumbprint
 * do certificado (signatário) (string)>", "data":"<dado a ser assinado>
 * (string)", "detached":"<true/false> (boolean)" } "magicNumber":<id da tab
 * do chrome (preenchido pelo content-script)> }
 */

/*
 * "error": só estará presente caso success seja false "content": só estará
 * presente caso success seja true
 * 
 * Estrutura JSON retornada pelo HostApp { "signData": { "success":<true/false>,
 * "error": { "errorType":"<tipo do erro>", "errorCode":"<codigo do erro>",
 * "errorMessage":"<mensagem do erro>" }, "content": { "data":"<dado assinado
 * (base64 do CMS) (string)>" } } "magicNumber":<id da tab do chrome
 * (preenchido pelo content-script)> }
 */
function doSignature(dataToSign, thumbprint, detached) {
	var customEvent = new CustomEvent("sendToContentScriptEventJValidHostApp",
			{
				"detail" : {
					"signData" : {
						"thumbprint" : thumbprint,
						"data" : dataToSign,
						"detached" : detached
					}
				},
				"magicNumber" : ""
			});
	document.dispatchEvent(customEvent);
}

/*
 * Estrutura JSON enviada para HostApp { "signDataPKCS1": { "thumbprint":"<thumbprint
 * do certificado (signatário) (string)>", "sigalg":"<algoritmo de
 * assinatura>", "data":"<dado a ser assinado> (base64) (string)" }
 * "magicNumber":<id da tab do chrome (preenchido pelo content-script)> }
 */

/*
 * "error": só estará presente caso success seja false "content": só estará
 * presente caso success seja true
 * 
 * Estrutura JSON retornada pelo HostApp { "signDataPKCS1": { "success":<true/false>,
 * "error": { "errorType":"<tipo do erro>", "errorCode":"<codigo do erro>",
 * "errorMessage":"<mensagem do erro>" }, "content": { "data":"<dado assinado
 * (base64) (string)>" } } "magicNumber":<id da tab do chrome (preenchido pelo
 * content-script)> }
 */
function doSignaturePKCS1(dataToSign, thumbprint, sigalg) {
	var customEvent = new CustomEvent("sendToContentScriptEventJValidHostApp",
			{
				"detail" : {
					"signDataPKCS1" : {
						"thumbprint" : thumbprint,
						"sigalg" : sigalg,
						"data" : dataToSign
					},
					"magicNumber" : ""
				}
			});
	document.dispatchEvent(customEvent);
}

/*
 * Estrutura JSON enviada para HostApp { "listCSP":{} "magicNumber":<id da tab
 * do chrome (preenchido pelo content-script)> }
 */

/*
 * "error": só estará presente caso success seja false "content": só estará
 * presente caso success seja true
 * 
 * Estrutura JSON retornada pelo HostApp { "listCSP": { "success":<true/false>,
 * "error": { "errorType":"<tipo do erro>", "errorCode":"<codigo do erro>",
 * "errorMessage":"<mensagem do erro>" }, "content": [ {"cspname":"<nome do
 * CSP 1 (string)>", "csptype":<tipo do CSP 1 (inteiro)>}, {"cspname":"<nome
 * do CSP 2 (string)>", "csptype":<tipo do CSP 2 (inteiro)>}, {"cspname":"<nome
 * do CSP 3 (string)>", "csptype":<tipo do CSP 3 (inteiro)>} ] } "magicNumber":<id
 * da tab do chrome (preenchido pelo content-script)> }
 */
function listCSP() {
	var customEvent = new CustomEvent("sendToContentScriptEventJValidHostApp",
			{
				"detail" : {
					"listCSP" : "",
					"magicNumber" : ""
				}
			});
	document.dispatchEvent(customEvent);
}

/*
 * Estrutura JSON enviada para HostApp { "createKeyPair": { "subjectcn":"<DN do
 * Subject>","cspname":"<nome do CSP (string)>", "keysize":"<tamanho da chave
 * (inteiro)>", "sigalg":"<Algoritmo de assinatura>", "keyexportable":"<chave
 * exportável ou não (boolean)>" } "magicNumber":<id da tab do chrome
 * (preenchido pelo content-script)> }
 */

/*
 * "error": só estará presente caso success seja false "content": só estará
 * presente caso success seja true
 * 
 * Estrutura JSON retornada pelo HostApp { "createKeyPair": { "success":<true/false>,
 * "error": { "errorType":"<tipo do erro>", "errorCode":"<codigo do erro>",
 * "errorMessage":"<mensagem do erro>" }, "content": { "csr":"<pedido de
 * certificado assinado pela chave gerada em base 64 (string)>", "container":"<nome
 * do container gerado (string)>", "cspname":"<nome do CSP (string)>" } }
 * "magicNumber":<id da tab do chrome (preenchido pelo content-script)> }
 */
function createKeyPair(subjectcn, cspname, keysize, sigalg, keyexportable) {
	var customEvent = new CustomEvent("sendToContentScriptEventJValidHostApp",
			{
				"detail" : {
					"createKeyPair" : {
						"subjectcn" : subjectcn,
						"cspname" : cspname,
						"keysize" : keysize,
						"sigalg" : sigalg,
						"keyexportable" : keyexportable
					},
					"magicNumber" : ""
				}
			});
	document.dispatchEvent(customEvent);
}

/*
 * Estrutura JSON enviada para HostApp { "installCertificate": { "cspname":"<nome
 * do CSP (string)>", "container":"<nome do container (string)>",
 * "certificate":"<certificado ou cadeia no formato Base64 (string)>" }
 * "magicNumber":<id da tab do chrome (preenchido pelo content-script)> }
 */

/*
 * "error": só estará presente caso success seja false
 * 
 * Estrutura JSON retornada pelo HostApp { "installCertificate": { "success":<true/false>,
 * "error": { "errorType":"<tipo do erro>", "errorCode":"<codigo do erro>",
 * "errorMessage":"<mensagem do erro>" } } "magicNumber":<id da tab do chrome
 * (preenchido pelo content-script)> }
 */
function installCertificate(cspname, container, certificate) {
	var customEvent = new CustomEvent("sendToContentScriptEventJValidHostApp",
			{
				"detail" : {
					"installCertificate" : {
						"cspname" : cspname,
						"container" : container,
						"certificate" : certificate
					},
					"magicNumber" : ""
				}
			});
	document.dispatchEvent(customEvent);
}

/*
 * Estrutura JSON enviada para HostApp { "isValidCA": { "thumbprint":"<thumbprint
 * do certificado (string)>" } "magicNumber":<id da tab do chrome (preenchido
 * pelo content-script)> }
 */

/*
 * "error": só estará presente caso success seja false "content": só estará
 * presente caso success seja true
 * 
 * Estrutura JSON retornada pela função { "isValidCA": { "success":<true/false>,
 * "error": { "errorType":"<tipo do erro>", "errorCode":"<codigo do erro>",
 * "errorMessage":"<mensagem do erro>" }, "content": { "checkResult":"<boolean
 * com o resultado do teste>" } } }
 */
function isValidCA(thumbprint) {
	var customEvent = new CustomEvent("sendToContentScriptEventJValidHostApp",
			{
				"detail" : {
					"isValidCA" : {
						"thumbprint" : thumbprint
					},
					"magicNumber" : ""
				}
			});
	document.dispatchEvent(customEvent);
}

/*
 * Estrutura JSON enviada para HostApp { "getCertificateType": { "thumbprint":"<thumbprint
 * do certificado (string)>" } "magicNumber":<id da tab do chrome (preenchido
 * pelo content-script)> }
 */

/*
 * "error": só estará presente caso success seja false "content": só estará
 * presente caso success seja true
 * 
 * Estrutura JSON retornada pela função { "getCertificateType": { "success":<true/false>,
 * "error": { "errorType":"<tipo do erro>", "errorCode":"<codigo do erro>",
 * "errorMessage":"<mensagem do erro>" }, "content": { "type":"<tipo do
 * certificado>" } } }
 */
function getCertificateType(thumbprint) {
	var customEvent = new CustomEvent("sendToContentScriptEventJValidHostApp",
			{
				"detail" : {
					"getCertificateType" : {
						"thumbprint" : thumbprint
					},
					"magicNumber" : ""
				}
			});
	document.dispatchEvent(customEvent);
}

/*
 * Estrutura JSON enviada para HostApp { "getCertificatePem": { "thumbprint":"<thumbprint
 * do certificado (string)>" } "magicNumber":<id da tab do chrome (preenchido
 * pelo content-script)> }
 */

/*
 * "error": só estará presente caso success seja false "content": só estará
 * presente caso success seja true
 * 
 * Estrutura JSON retornada pela função { "getCertificatePem": { "success":<true/false>,
 * "error": { "errorType":"<tipo do erro>", "errorCode":"<codigo do erro>",
 * "errorMessage":"<mensagem do erro>" }, "content": { "certificate":"<certificado
 * no formato PEM>" } } }
 */
function getCertificatePem(thumbprint) {
	var customEvent = new CustomEvent("sendToContentScriptEventJValidHostApp",
			{
				"detail" : {
					"getCertificatePem" : {
						"thumbprint" : thumbprint
					},
					"magicNumber" : ""
				}
			});
	document.dispatchEvent(customEvent);
}

/*
 * Estrutura JSON enviada para HostApp { "applicationInfo":{} "magicNumber":<id
 * da tab do chrome (preenchido pelo content-script)> }
 */

/*
 * "error": só estará presente caso success seja false "content": só estará
 * presente caso success seja true
 * 
 * Estrutura JSON retornada pelo HostApp { "applicationInfo": { "success":<true/false>,
 * "error": { "errorType":"<tipo do erro>", "errorCode":"<codigo do erro>",
 * "errorMessage":"<mensagem do erro>" }, "content": { "name":"<nome da
 * aplicação>", "version":"<versão da aplicação>", "info":"<informações
 * gerais>" } } "magicNumber":<id da tab do chrome (preenchido pelo
 * content-script)> }
 */
function getApplicationInfo() {
	var customEvent = new CustomEvent("sendToContentScriptEventJValidHostApp",
			{
				"detail" : {
					"applicationInfo" : "",
					"magicNumber" : ""
				}
			});
	document.dispatchEvent(customEvent);
}

/*
 * Metodo de interface
 * 
 * Return: boolean
 */
function hasExtension() {
	return (appVersion != null);
}

/*
 * Metodo de interface @param localURL
 * 
 * Return: string
 */
function getInstallURL(localURL) {
	/*return "https://cert-checker.vpki.com.br/chrome/1.0.0.0/install.html?returnToURL="
			+ encodeURIComponent(localURL);*/
	return localURL+"/app/views/partials/pki.html";
}

function showResult(contentEvent) {
	var obj = JSON.parse(contentEvent.detail);

	if (obj.hasOwnProperty('listMyCertificates')) {
		document.dispatchEvent(new CustomEvent("listMyCertificatesEvent", {
			"detail" : '' + contentEvent.detail + ''
		}));
	} else if (obj.hasOwnProperty('signData')) {
		document.dispatchEvent(new CustomEvent("doSignatureEvent", {
			"detail" : '' + contentEvent.detail + ''
		}));
	} else if (obj.hasOwnProperty('applicationInfo')) {
		applicationInfoCalled = true;
		if (appVersion == null) {
			if (obj.applicationInfo.success) {
				appVersion = obj.applicationInfo.content.version;
			} else {
				window.location.href = getInstallURL(window.location.href);
				return;
			}
		} else {
			document.dispatchEvent(new CustomEvent("getApplicationInfoEvent", {
				"detail" : '' + contentEvent.detail + ''
			}));
		}
	} else if (obj.hasOwnProperty('signDataPKCS1')) {
		document.dispatchEvent(new CustomEvent("doSignaturePKCS1Event", {
			"detail" : '' + contentEvent.detail + ''
		}));
	} else if (obj.hasOwnProperty('machineDNA')) {
		document.dispatchEvent(new CustomEvent("machineDNAEvent", {
			"detail" : '' + contentEvent.detail + ''
		}));
	} else if (obj.hasOwnProperty('listCSP')) {
		document.dispatchEvent(new CustomEvent("listCSPEvent", {
			"detail" : '' + contentEvent.detail + ''
		}));
	} else if (obj.hasOwnProperty('createKeyPair')) {
		document.dispatchEvent(new CustomEvent("createKeyPairEvent", {
			"detail" : '' + contentEvent.detail + ''
		}));
	} else if (obj.hasOwnProperty('installCertificate')) {
		document.dispatchEvent(new CustomEvent("installCertificateEvent", {
			"detail" : '' + contentEvent.detail + ''
		}));
	} else if (obj.hasOwnProperty('checkICPAlg')) {
		document.dispatchEvent(new CustomEvent("checkICPAlgEvent", {
			"detail" : '' + contentEvent.detail + ''
		}));
	} else if (obj.hasOwnProperty('checkMaxContainers')) {
		document.dispatchEvent(new CustomEvent("checkMaxContainersEvent", {
			"detail" : '' + contentEvent.detail + ''
		}));
	} else if (obj.hasOwnProperty('deviceType')) {
		document.dispatchEvent(new CustomEvent("deviceTypeEvent", {
			"detail" : '' + contentEvent.detail + ''
		}));
	} else if (obj.hasOwnProperty('isValidCA')) {
		document.dispatchEvent(new CustomEvent("isValidCAEvent", {
			"detail" : '' + contentEvent.detail + ''
		}));
	} else if (obj.hasOwnProperty('getCertificateType')) {
		document.dispatchEvent(new CustomEvent("getCertificateTypeEvent", {
			"detail" : '' + contentEvent.detail + ''
		}));
	} else if (obj.hasOwnProperty('getCertificatePem')) {
		document.dispatchEvent(new CustomEvent("getCertificatePemEvent", {
			"detail" : '' + contentEvent.detail + ''
		}));
	} else if (obj.hasOwnProperty('error')) {
		if (obj.error.type == -1) {
			alert("Verifique se a extensao e a aplicacao foram instaladas corretamente");
		} else {
			document.dispatchEvent(new CustomEvent("errorEvent", {
				"detail" : '' + contentEvent.detail + ''
			}));
		}
	}
}

var verifyExtension = function() {
	var limit = (countTries >= 5);

	try {
		if (!applicationInfoCalled) {
			try {
				getApplicationInfo();
			} catch (e) {
			}
		}

		if (appVersion != VERSION_EXPECTED) {
			if (limit) {
				window.location.href = getInstallURL(window.location.href);
				return;
			}
		} else {
			return;
		}
	} catch (e) {
	}

	countTries++;
	setTimeout(verifyExtension, 1000);
};

document.addEventListener("sendToPageScriptEvent", showResult);
var appVersion = null;
var applicationInfoCalled = false;
var countTries = 0;
var VERSION_EXPECTED = "1.0.0.0-Java";
verifyExtension();
