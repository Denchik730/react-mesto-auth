export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      password: password,
      email: email,
    })
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response.status);
  })
  .then((response) => {
    return response;
  })
};

export const login = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      password: password,
      email: email,
    })
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response.status);
  })
  .then((response) => {
    if (response.token) {
      localStorage.setItem('token', response.token);
      return response;
    }
  })
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response.status);
  })
  .then(data => data)
}
