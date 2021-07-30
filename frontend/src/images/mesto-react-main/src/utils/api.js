const onResultQuery = res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  getUserInfoServ() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers
    })
    .then(onResultQuery)
  }

  saveUserInfoServ(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(onResultQuery)
  }

  getCardList() {
    return fetch(`${this._url}cards`, {
      headers: this._headers
    })
    .then(onResultQuery)
  }

  saveNewCard(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(onResultQuery)
  }

  removeCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(onResultQuery)
  }

  changeLikeCardStatus(cardId, state) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: state ? 'PUT' : 'DELETE',
      headers: this._headers,
    })
    .then(onResultQuery)
  }

  updateAvatar(link) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(link)
    })
    .then(onResultQuery)
  }
}

const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-20/',
  headers: {
    authorization: 'baadb45e-be37-4889-9243-ceacbed5cc22',
    'Content-Type': 'application/json'
  }
}

const api = new Api(apiConfig);
export default api;
