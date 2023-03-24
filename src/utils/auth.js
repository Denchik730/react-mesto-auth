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
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(`Ошибка: ${err}`));
};
