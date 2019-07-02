class Auth {
	constructor() {
		this.isAuthenticated = false;
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


