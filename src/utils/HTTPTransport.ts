export enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

type Options = {
    method: Method;
    data?: any;
    timeout: number;
    headers?: any;
};

function queryStringify(data: any) {
    if (!(data instanceof Object)) {
        return null;

    }
    return Object.keys(data).reduce((queryString, key, index, keys) => (
        `${queryString}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`
    ), '?');
}

export default class HTTPTransport {
    get = (url: string, options: Options) => {
        return this.request(url, {...options, method: Method.GET}, options.timeout);
    };

    post = (url: string, options: Options) => {
        return this.request(url, {...options, method: Method.POST}, options.timeout);
    };

    put = (url: string, options: Options) => {
        return this.request(url, {...options, method: Method.PUT}, options.timeout);
    };

    delete = (url: string, options: Options) => {
        return this.request(url, {...options, method: Method.DELETE}, options.timeout);
    };
    request = (url: string, options: Options, timeout = 5000) => {
        const {method = Method.GET, data = null, headers = {}} = options;
        return new Promise((resolve, reject) => {
            if (!Object.keys(Method).includes(method)) {
                reject('Wrong method');
                return;
            }
            const xhr = new XMLHttpRequest();
            const isGet = method === Method.GET;
            const getURL = isGet && !!data ? `${url}${queryStringify(data)}` : url;

            xhr.open(method, getURL);

            Object.keys(headers).forEach((key) => xhr.setRequestHeader(key, headers[key]));
            xhr.onload = () => {
                resolve(xhr)
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            xhr.send(isGet ? null : data);
        })
    };
}
