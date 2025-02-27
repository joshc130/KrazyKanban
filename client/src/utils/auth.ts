import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  // Decode and return the user profile from the stored token
  getProfile() {
    const token = this.getToken();
    if (!token) return null;
    try {
      // Decode the token to extract user data
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }

  // Check if a user is logged in by verifying the token exists and is not expired
  loggedIn() {
    const token = this.getToken();
    return token !== '' && !this.isTokenExpired(token);
  }
  
  // Determine if the token is expired
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload & { exp?: number }>(token);
      if (!decoded.exp) {
        // If token doesn't have an expiration claim, assume it's valid
        return false;
      }
      // exp is in seconds; convert to milliseconds
      return Date.now() >= decoded.exp * 1000;
    } catch (error) {
      // If there's an error decoding, consider the token expired
      console.error('Token decode error:', error);
      return true;
    }
  }

  // Retrieve the token from localStorage
  getToken(): string {
    return localStorage.getItem('id_token') || '';
  }

  // Store the token and redirect to the home page
  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    // Redirect to home page
    window.location.assign('/');
  }

  // Remove the token and redirect to the login page
  logout() {
    localStorage.removeItem('id_token');
    // Redirect to login page
    window.location.assign('/login');
  }
}

export default new AuthService();
