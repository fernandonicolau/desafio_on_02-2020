var thumbprint = '';
var functionCallback = 0;
var cn = '';

function getTimeNow() {
	return new Date().getTime();
}

(function () {
  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();

function argsUnion() {
	var elements = "";
	for (i = 0; i < arguments.length; i++) {
		if ((i + 1) == arguments.length) {
			elements += arguments[i];
		} else {
			elements += arguments[i] + ',';
		}
    }
	
	return elements;
}

function arrayUnion(array) {
	var elements = "";
	for (i = 0; i < array.length; i++) {
		if ((i + 1) == array.length) {
			elements += array[i];
		} else {
			elements += array[i] + ',';
		}
    }
	
	return elements;
}

function replaceAll(str, de, para){
    var pos = str.indexOf(de);
    while (pos > -1){
		str = str.replace(de, para);
		pos = str.indexOf(de);
	}
    return (str);
}

function showError(objError, message) {
	var errorMessage = message + "\n";
	errorMessage += "Tipo de Erro: " + objError.errorType + "\n";
	errorMessage += "Codigo do Erro: " + objError.errorCode + "\n";
	errorMessage += "Mensagem adicional: " + objError.errorMessage;
	alert(errorMessage);
}