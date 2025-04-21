import { useState, useEffect } from 'react';
import { fetchData } from '../utils/fetchData';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const postMedia = async (mediaData, token) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(mediaData),
    };
    return await fetchData(import.meta.env.VITE_MEDIA_API + '/media', fetchOptions);
  };

  const getMedia = async () => {
    try {
      const mediaData = await fetchData(import.meta.env.VITE_MEDIA_API + '/media');

      const mediaWithUser = await Promise.all(mediaData.map(async (item) => {
        try {
          const userData = await fetchData(import.meta.env.VITE_AUTH_API + '/users/' + item.user_id);
          return { ...item, username: userData.username };
        } catch (userError) {
          console.error('Failed to fetch user data for item:', item.media_id, userError);
          return { ...item, username: 'Unknown' };
        }
      }));

      setMediaArray(mediaWithUser);
    } catch (error) {
      console.error('getMedia failed:', error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  return { mediaArray };
};

const useAuthentication = () => {
  const postLogin = async (credentials) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    };
    return await fetchData(import.meta.env.VITE_AUTH_API + '/auth/login', fetchOptions);
  };

  return { postLogin };
};

const useUser = () => {
  const getUserByToken = async (token) => {
    const fetchOptions = {
      headers: {
        'x-access-token': token,
      },
    };
    return await fetchData(import.meta.env.VITE_AUTH_API + '/users/token', fetchOptions);
  };

  const postUser = async (userData) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };
    return await fetchData(import.meta.env.VITE_AUTH_API + '/users', fetchOptions);
  };

  return { getUserByToken, postUser };
};

const useFile = () => {
  const postFile = async (file, token) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
      },
      body: formData,
    };
    return await fetchData(import.meta.env.VITE_UPLOAD_SERVER + '/upload', fetchOptions);
  };

  return { postFile };
};

export { useMedia, useAuthentication, useUser, useFile };
