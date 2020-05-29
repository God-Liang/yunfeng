import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

const temporaryKey = 'temporaryToken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getTemToken() {
  return Cookies.get(temporaryKey)
}

export function setTemToken(token) {
  return Cookies.set(temporaryKey, token)
}

export function removeTemToken() {
  return Cookies.remove(temporaryKey)
}
