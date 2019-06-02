class Auth {
	constructor() {
		this.isAuthenticated = true;
	}

	setAuthenticated(a) {
		this.isAuthenticated = a;
	}

	getAuthenticated() {
		return this.isAuthenticated;
	}
}

var auth = new Auth();

export default auth;


