import { API_URL } from '../config'
import fetch from 'isomorphic-unfetch'
import store from '../store'
import { setAlert } from '../actions/ui'

const makeJson = async (response, status) => {
    const json = await response.json()
    return Promise.resolve({...json, statusCode: status})
}

const responseHandler = alert => response => {
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.indexOf('application/json') !== -1) {
        const promise = makeJson(response, response.status)
        const ok = response.ok
        if (alert) {
            promise.then(response => {
                if (response.validate) {
                    for (let k in response.validate) {
                        if (k !== '_service') {
                            for (let j in response.validate[k]) {
                                store.dispatch(setAlert(response.validate[k][j], 'error'))
                            }
                        }
                    }
                }

                if (response.message && (! response.validate || response.validate == null)) {
                    store.dispatch(setAlert(response.message, ok ? 'success' : 'error'))
                }
            })
        }
        return promise;
    }
}

const responseBlobHandler = response => {
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.indexOf('application/pdf') !== -1) {
        const promise = response.blob()
        return promise
    }
}

const getHeader = () => 
    ({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${store.getState().user.token}`,
    })

export const get = (...data) => {
	const [url, alert = false] = data
    return fetch(`${API_URL}/${url}`, {
        method: 'get',
        headers: getHeader(),
    })
    .then(responseHandler(alert))
}
 
export const post = (...data) => {
	const [url, alert = true, body] = data
    return fetch(`${API_URL}/${url}`, {
        method: 'post',
        headers: getHeader(),
        body: JSON.stringify(body)
    })
    .then(responseHandler(alert))
}

export const put = (...data) => {
    const [url, alert = false, body] = data
    return fetch(`${API_URL}/${url}`, {
        method: 'put',
        headers: getHeader(),
        body: JSON.stringify(body)
    })
    .then(responseHandler(alert))
}

export const remove = (...data) => {
	const [url, alert = false] = data
    return fetch(`${API_URL}/${url}`, {
        method: 'delete',
        headers: getHeader()
    })
    .then(responseHandler(alert))
}

export const patch = (...data) => {
    const [url, alert = false, body] = data
    return fetch(`${API_URL}/${url}`, {
        method: 'patch',
        headers: getHeader(),
        body: JSON.stringify(body)
    })
    .then(responseHandler(alert))
}

export const image = (...data) => {
    const [url, alert = false, body] = data
    return fetch(`${API_URL}/${url}`, {
        method: 'post',
        headers: {'Authorization': `Bearer ${store.getState().user.token}`},
        body: body
    })
    .then(responseHandler(alert))
}

export const message = (...data) => {
    const [url, alert = true, body] = data
    return fetch(`${API_URL}/${url}`, {
        method: 'post',
        headers: {'Authorization': `Bearer ${store.getState().user.token}`},
        body: body
    })
    .then(responseHandler(alert))
}

export const getMyCountry = () => {
    return fetch('https://ipinfo.io', {
        method: 'get',
        headers: {
            'Authorization': `Bearer 85f0a91cfac5da`,
            'Accept': 'application/json',
        },
    })
    .then(responseHandler())
}

export const goAuth = () => {
    return fetch(`${API_URL}/login/check`, {
        method: 'get',
        headers: {'Authorization': `Bearer ${store.getState().user.token}`},
    })
    .then(res => res)
}