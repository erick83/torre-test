async function fetchBase (path: string, opt: RequestInit) {
    const url: RequestInfo = new Request(new URL(path, process.env.REACT_APP_API_URL as string).toString())
    const headers = new Headers();
    headers.append('Content-Type', 'pplication/json;charset=UTF-8')

    const options: RequestInit = {
        method: opt.method,
        headers
    }

    if (opt.body) {
        options.body = JSON.stringify(opt.body)
    }

    try {
        const response = await fetch(url, options)
        return response.json()
    } catch (error) {
        // Catch the error, do something and dispatch next catch
        console.error(error)
        throw error
    }

}

export const get = (path:string = '', qs?: any | undefined) => {
    const method = 'get'
    return fetchBase(qs ? path + concatQs(qs) : path, {method})
}

export const post = (path: string = '', { qs, body }: { qs?: any, body?: any } = {}) => {
    const method = 'post'
    return fetchBase(qs ? path + concatQs(qs) : path, {method, body})
}

function concatQs(qs: any): string {
    let str = ''
    for (const prop in qs) {
        const p = `${prop}=${qs[prop]}`
        str+= (str === '') ? '?'+p : '&'+p
    }
    return str
}
