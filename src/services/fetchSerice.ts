async function fetchBase (path: string, opt: RequestInit) {
    const url: RequestInfo = new Request(new URL(path, process.env.REACT_APP_API_URL as string).toString())
    // const headers = new Headers(opt.headers);

    // headers.append('Content-Type', 'application/json')

    const options: RequestInit = {
        method: opt.method,
        // headers,
    }

    try {
        const response = await fetch(url, options)
        console.log(response)
    } catch (error) {
        // Catch the error, do something and dispatch next catch
        console.error(error)
        throw error
    }

}

export const get = (path:string = '', qs: string = '') => {
    const method = 'get'
    return fetchBase(path, {method, body: qs})
}

export const post = (path: string = '', body: any, headers: any) => {
    const method = 'post'
    return fetchBase(path, {method, body, headers})
}

// export const put = (path = '', body, headers) => {
//     const method = 'put'
//     return fetchBase(path, {method, body, headers})
// }

// export const del = (path = '', headers) => {
//     const method = 'delete'
//     return fetchBase(path, {method, headers})
// }
