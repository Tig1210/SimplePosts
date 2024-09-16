import { jwtDecode } from 'jwt-decode'

export let decode

if (!sessionStorage.getItem('auth') === null) {
  decode = jwtDecode(sessionStorage.getItem('auth'))
}
