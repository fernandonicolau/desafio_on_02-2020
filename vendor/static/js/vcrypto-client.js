var address = "ws://localhost:22501/services";

function callWebSocket(callback, action, requestContent) {

	var ws = new WebSocket( address );

	var request = {
		plugin: "listener-crypto",
		action: action,
		nonce: Math.floor((Math.random() * 999999) + 100000),
		hash: "",
		content: ""
	};

	if ( requestContent ) {
		request.content = JSON.stringify( requestContent );	
	}

	ws.onopen = function() {
		ws.send( JSON.stringify( request ) );
	};

	ws.onmessage = function(event) {

		var response = JSON.parse( event.data );

		if ( response.nonce == request.nonce ) {

			callback( response.content );

			ws.close();
		}
	};

	ws.onerror = function(event) {

		console.log( event );

		ws.close();
	};

	ws.onclose = function() {
	};
}

/*
 * resp:
 *	[
 *		{
 *			issuerCN: "...",
 *			subjectCN: "...",
 *			thumbprint: "...",
 *			validity: "..."
 *		},
 *		...
 *	]
 */
function listCertificates(callback) {
		
	var cb = function( content ) {
		callback( JSON.parse( content ) );
	};

	var action = "Plugin.ListCertificates";

	callWebSocket( cb, action );			
}

/*
 * resp:
 *	{
 *		signedData: "...",
 *		certificateSelected: "..."
 *	}
 */
function signPKCS7(thumbprint, data, callback) {

	var cb = function( content ) {
		callback( JSON.parse( content ) );
	};

	var action =  "Plugin.SignPKCS7";
		
	var requestContent = {
		thumbprint: thumbprint,
		password: "", // nao esta em uso
		data: data						
	}

	callWebSocket( cb, action, requestContent );			
}

/*
 *  resp:
 *	[
 *		{
 *			id: "...",
 *			data: "...",
 *			signed: "..."
 *		},
 *		...
 *	]
 */
function signPKCS1(thumbprint, data, callback) {

	var cb = function( content ) {

		var json = JSON.parse( content );

		callback( JSON.parse( json.signature ) );
	};

	var action =  "Plugin.SignPKCS1";
		
	var requestContent = {
		thumbprint: thumbprint,
		password: "", // nao esta em uso
		data: JSON.stringify( data )
	}

	callWebSocket( cb, action, requestContent );			
}