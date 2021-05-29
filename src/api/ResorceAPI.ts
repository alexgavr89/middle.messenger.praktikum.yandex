import HTTP from '../modules/http/inedx';

const http = new HTTP('https://ya-praktikum.tech/api/v2/resources');

export default class ResourceAPI {
  static get(path: string): Promise<XMLHttpRequest> {
    return http.get(path, {}).then((resp) => resp);
  }
}
