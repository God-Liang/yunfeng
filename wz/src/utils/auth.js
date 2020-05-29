import Cookies from 'js-cookie'

const TokenKey = 'wx-Token'

const temporaryKey = 'ddCode'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getDdCode () {
  return Cookies.get(temporaryKey)
}

export function setDdCode (token) {
  return Cookies.set(temporaryKey, token)
}

export function removeDdCode () {
  return Cookies.remove(temporaryKey)
}
