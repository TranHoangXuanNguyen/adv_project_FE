import { jwtDecode } from 'jwt-decode';

export const login = async (email, password) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        // Handle HTTP errors
        if (response.status === 401) {
            throw new Error('Invalid email or password');
        }
        if (response.status === 403) {
            throw new Error('Access denied');
        }
        if (response.status === 500) {
            throw new Error('Server error');
        }
    }

    const data = await response.json();

    if (!data.access_token) {
      throw new Error('Token not received');
    }

    // Decoding the token to get user data
    const decodedToken = jwtDecode(data.access_token);

    return { token: data.access_token, decodedToken };
  } catch (error) {
    throw error;  
  }
};
