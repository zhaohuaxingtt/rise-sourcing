import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_RFQ)


export function getAllSupplier(parmars) {
  return requst({
    url: '/api/getAllSupplier',
    method: 'POST',
    data: parmars
  })
}

export function getAllAnnex(parmars) {
  return requst({
    url: '/api/getAllAnnex',
    method: 'POST',
    data: parmars
  })
}

export function deleteAnnex(parmars) {
  return requst({
    url: '/api/deleteAnnex',
    method: 'POST',
    data: parmars
  })
}
