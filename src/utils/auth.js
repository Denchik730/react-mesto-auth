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
    return Promise.reject(`${response.status}`);
  })
  .then((response) => {
    return response;
  })
  .catch((err) => console.log(`Ошибка: ${err}`));
};

export const authorize = (password, email) => {
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
    return Promise.reject(`${response.status}`);
  })
  .then((response) => {
    if (response.token) {
      localStorage.setItem('token', response.token);
      return response;
    }
  })
  .catch((err) => console.log(`Ошибка: ${err}`));
}

export const getContent = (token) => {
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
    return Promise.reject(`${response.status}`);
  })
  .then(data => data)
  .catch((err) => console.log(`Ошибка: ${err}`));
}

// // отправляем запрос на роут аутентификации
// fetсh('https://api.mywebsite.com/signin', {
//   method: 'POST',
//   body: JSON.stringify({
//     email: 'stasbasov@yandex.ru',
//     password: 'StasBasov1989'
//   })
// })
// .then(res => res.json())
// .then((data) => {
//   // сохраняем токен
//   localStorage.setItem('token', data.token);
// });

// fetch('https://api.mywebsite.com/posts', {
//   method: 'GET',
//   headers: {
//     authorization: `Bearer ${localStorage.getItem('token')}`
//   }
// });
