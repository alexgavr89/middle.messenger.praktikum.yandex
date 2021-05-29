import queryStringify from '../../utils/query-srtingify';

enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

interface Options {
  data?: {
    [key: string]: unknown;
  };
  headers?: string[];
  method?: METHODS;
  timeout?: number;
}

export default class HTTP {
  constructor(protected baseurl: string) {}

  get(url: string, options: Options): Promise<XMLHttpRequest> {
    return HTTP.request(
      this.baseurl + url + queryStringify(options.data),
      { ...options, method: METHODS.GET },
      options.timeout,
    );
  }

  post(url: string, options: Options): Promise<XMLHttpRequest> {
    return HTTP.request(
      this.baseurl + url,
      { ...options, method: METHODS.POST },
      options.timeout,
    );
  }

  put(url: string, options: Options): Promise<XMLHttpRequest> {
    return HTTP.request(
      this.baseurl + url,
      { ...options, method: METHODS.PUT },
      options.timeout,
    );
  }

  delete(url: string, options: Options): Promise<XMLHttpRequest> {
    return HTTP.request(
      this.baseurl + url,
      { ...options, method: METHODS.DELETE },
      options.timeout,
    );
  }

  private static request(
    url: string,
    options: Options,
    timeout = 5000,
  ): Promise<XMLHttpRequest> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const { data, headers, method } = options;

      xhr.open(method, url);

      xhr.withCredentials = true;

      if (headers) {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = () => {
        reject(xhr);
      };

      xhr.onerror = () => {
        reject(xhr);
      };

      xhr.timeout = timeout;

      xhr.ontimeout = () => {
        reject(xhr);
      };

      if (options.method === METHODS.GET) {
        xhr.send();
      }

      if (
        options.method === METHODS.POST
        || options.method === METHODS.DELETE
      ) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }

      if (options.method === METHODS.PUT) {
        if (data instanceof FormData) {
          xhr.send(data);
        } else {
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify(data));
        }
      }
    });
  }
}
