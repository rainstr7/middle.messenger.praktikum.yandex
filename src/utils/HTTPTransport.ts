import queryStringify from "./queryStringify";

export enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

type Options = {
    method: METHODS;
    data?: any;
    headers?: any;
    timeout?: number;
};

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>

export default class HTTPTransport {

    get: HTTPMethod = (url, options) => {
        const parameters = queryStringify(options?.data);
        return this.request(url + parameters, {...options, method: METHODS.GET});
    }
    put: HTTPMethod = (url, options) => (
        this.request(url, {...options, method: METHODS.PUT})
    )
    post: HTTPMethod = (url, options) => (
        this.request(url, {...options, method: METHODS.POST})
    )
    delete: HTTPMethod = (url, options) => (
        this.request(url, {...options, method: METHODS.DELETE})
    )

    private request(url: string, options: Options): Promise<Response> {
        const {method = METHODS.GET, data = null, headers = {}, timeout = 5000} = options;
        return new Promise((resolve, reject) => {
            if (!Object.keys(METHODS).includes(method)) {
                reject('Wrong method');
                return;
            }
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.timeout = timeout;

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = () => {
                if (xhr.status < 400) {
                    resolve(xhr.response);
                } else {
                    reject(xhr);
                }
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;
            xhr.responseType = "json";

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        })
    };
}
