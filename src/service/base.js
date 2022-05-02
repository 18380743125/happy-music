import axios from 'axios'

const baseUrl = '/'
const ERR_OK = 0

axios.defaults.baseURL = baseUrl

export function get (url, params) {
  return axios.get(url, {
    params
  }).then((res) => {
    const result = res.data
    if (result.code === ERR_OK) {
      return result.result
    }
  }).catch((e) => {
    console.log(e)
  })
}
