import { MAKEPAYMENT } from './types'

class Pretium {
  api_key: string
  baseURL: string

  constructor(api_Key: string, baseURL: string) {
    this.api_key = api_Key
    this.baseURL = baseURL
  }

  getHeaders = () => {
    const requestHeaders: HeadersInit = new Headers()
    requestHeaders.set('Content-Type', 'application/json')
    requestHeaders.set('x-api-key', this.api_key)
    console.log('THE REQUEST HEADERS', requestHeaders)
    return requestHeaders
  }

  exchange_rate = async (local_currency_code: string = 'KES') => {
    const requestOptions = {
      method: 'POST' as const,
      headers: this.getHeaders(),
      body: JSON.stringify({
        currency_code: local_currency_code,
      }),
    }
    const url = `${this.baseURL}v1/exchange-rate`
    try {
      const response = await fetch(url, requestOptions)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Exchange rate fetch failed:', error)
      throw error
    }
  }
    
  account_validation = async (shortcode: string, type: string, mobile_network: string) => {
    const requestOptions = {
      method: 'POST' as const,
      headers: this.getHeaders(),
      body: JSON.stringify({
        shortcode: shortcode,
        type: type,
        mobile_network: mobile_network,
      }),
    }
    const url = `${this.baseURL}v1/validation`
    try {
      const response = await fetch(url, requestOptions)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error validating account:', error)
      console.log('THE ERROR IS', error)
      //throw error;
    }
  }

  make_payment = async (makepayment: MAKEPAYMENT) => {
    //     "transaction_hash":"0x325caeb3cbb408faacb438a03e5b30f6f1068f65ec5b7de934f8d4a9ac2717b5",
    // "type": "MOBILE",
    // "shortcode": "0725212418",
    // "amount": "5000",
    // country: "Uganda"
    // Kenya "mobile_network": "Safaricom"
    // Uganda (mobile_network): Airtel,MTN
    // Ghana (mobile_network): Tigo,MTN

    const payload: MAKEPAYMENT = {
      transaction_hash: makepayment.transaction_hash,
      type: makepayment.type,
      shortcode: makepayment.shortcode,
      amount: makepayment.amount,
      mobile_network: makepayment.mobile_network,
    }
    const requestOptions = {
      method: 'POST' as const,
      headers: this.getHeaders(),
      body: JSON.stringify(payload),
    }

    const url = `${this.baseURL}v1/pay`
    try {
      const response = await fetch(url, requestOptions)
      const data = await response.json()
      return data
    } catch (error) {
      console.log('ERROR making payment')
    }
  }
}

export { Pretium }
