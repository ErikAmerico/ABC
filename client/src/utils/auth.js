import Cookies from "js-cookie";
import decode from "jwt-decode";

class AuthService {
  // get user data
  getProfile() {
    const token = this.getToken();

    if (!token) {
      return null;
    }
    try {
      return decode(token);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  // check if user's logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // remove token from cookies
        Cookies.remove("id_token");
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return Cookies.get("id_token");
  }

  login(idToken) {
    const decodedToken = decode(idToken);

    console.log(decodedToken);

    // Saves user token to cookies
    Cookies.set("id_token", idToken);

    window.location.assign("/");
  }

  logout() {
    Cookies.remove("id_token");
    window.location.assign("/");
  }
}

export default new AuthService();
