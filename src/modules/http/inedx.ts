const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE',
};

function queryStringify(data) {
    return '?' + Object.entries(data).map(kv => kv.join("=")).join("&");
}

export default class HTTPTransport {
    get(url, options = {}) {
        url = (options.data) ? url + queryStringify(options.data) : url;

        return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    }

    post (url, options = {}) {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    }

    put(url, options = {}) {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    }

    delete = (url, options = {}) => {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    }

    request = (url, options, timeout = 5000) => {
        return new Promise((resolve, reject) => {
            const {data, headers} = options;
            const xhr = new XMLHttpRequest();

            xhr.open(options.method, url);

            for (let key in headers) {
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
