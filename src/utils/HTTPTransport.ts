export enum Method {
    Get = 'Get',
    Post = 'Post',
    Put = 'Put',
    Patch = 'Patch',
    Delete = 'Delete'
}

type Options = {
    method: Method;
    data?: Object;
};
type HTTPMainMethod<Response = void> = (url: string, options?: Options) => Promise<Response>
type HTTPMethod<Response = any> = (url: string, data?: Object) => Promise<Response>


export default class HTTPTransport {
    static API_URL = 'https://ya-praktikum.tech/api/v2';
    protected endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
    }

    public get: HTTPMethod = (path = '/') => this.request(this.endpoint + path);

    public post: HTTPMethod = (path: string, data = {}) => this.request(this.endpoint + path, {
        method: Method.Post,
        data,
    });

    public put: HTTPMethod = (path: string, data = {}) => this.request(this.endpoint + path, {
        method: Method.Put,
        data,
    });

    public patch: HTTPMethod = (path: string, data = {}) => this.request(this.endpoint + path, {
        method: Method.Patch,
        data,
    });

    public delete: HTTPMethod = (path: string, data = {}) => this.request(this.endpoint + path, {
        method: Method.Delete,
        data
    });

    private request: HTTPMainMethod = (url: string, options: Options = {method: Method.Get}) => {
        const {method, data} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            xhr.onreadystatechange = () => {

                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status < 400) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.onabort = () => reject({reason: 'abort'});
            xhr.onerror = () => reject({reason: 'network error'});
            xhr.ontimeout = () => reject({reason: 'timeout'});
            if (!(data instanceof FormData)) {
                xhr.setRequestHeader('Content-Type', 'application/json');
            }
            xhr.withCredentials = true;
            xhr.responseType = 'json';
            if (method === Method.Get || !data) {
                xhr.send();
            } else {
                xhr.send(data instanceof FormData ? data : JSON.stringify(data));
            }
        });
    }
}
