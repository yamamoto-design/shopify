import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AuthCallback = () => {
  const location = useLocation();

  useEffect(() => {
    // Get the `code` and `state` from the URL query parameters
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const state = params.get('state');

    if (code) {
      // Send the `code` to your backend to exchange for an access token
      fetch('https://c3e8-77-247-126-189.ngrok-free.app/auth/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, state }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Store the access token in localStorage or cookies
          localStorage.setItem('shopify_access_token', data.access_token);
        })
        .catch((error) => {
          console.error('Error exchanging authorization code for access token:', error);
        });
    }
  }, [location]);

  return (
    <div>
      <h1>OAuth Callback</h1>
      <p>Redirecting...</p>
    </div>
  );
};

export default AuthCallback;
