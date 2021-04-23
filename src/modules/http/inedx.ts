enum METHODS {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE',
}

function queryStringify(data: string): string {
    return '?' + Object.entries(data).map(kv => kv.join("=")).join("&");
}

export default class HTTPTransport {
    get<T, R>(url: string, options: T): Promise<R> {
        url = (options.data) ? url + queryStringify(options.data) : url;

        return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    }

    post<T, R>(url: string, options:  T): Promise<R> {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    }

    put<T, R>(url: string, options: T): Promise<R> {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    }

    delete<T, R>(url: string, options: T): Promise<R> {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    }

    request<T, R>(url: string, options: T, timeout = 5000): Promise<R> {
        return new Promise((resolve, reject) => {
            const {data, headers} = options;
            const xhr = new XMLHttpRequest();

            xhr.open(options.method, url);

            for (const key in headers) {
                xhr.setRequestHeader(key, headers[key]);
            }

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = function () {
                reject(xhr);
            };

            xhr.onerror = function () {
                reject(xhr);
            };

            xhr.timeout = timeout;
            xhr.ontimeout = function () {
                reject(xhr);
            };

            if (options.method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    }
}
