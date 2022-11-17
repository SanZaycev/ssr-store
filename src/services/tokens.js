const LOCAL_ACCESS_NAME = 'auth_accessToken';

function setTokens(access){
	if (process.__CLIENT__) {
		localStorage.setItem(LOCAL_ACCESS_NAME, access);
	}
}

function cleanTokensData(){
	if (process.__CLIENT__) {
		localStorage.removeItem(LOCAL_ACCESS_NAME);
	}
}

function getJWTPayload(token){
	return _parseJWT(token).payload;
}

function addAccessToken(request){
	const token = getAccessToken()
	if (token) {
		request.headers.Authorization = `Bearer ${token}`
	}
	return request
}

function getAccessToken(){
	if (process.__CLIENT__) {
		return localStorage.getItem(LOCAL_ACCESS_NAME);
	}
	return ""
}

function _parseJWT(token){
	const parts = token.split('.');
	return {
		header: _parsePart(parts[0]),
		payload: _parsePart(parts[1]),
		sign: parts[2]
	}
}

function _parsePart(str){
	if (process.__CLIENT__) {
		return JSON.parse(window.atob(str));
	}
}

export { setTokens, cleanTokensData, getJWTPayload, addAccessToken, getAccessToken }
