import ResourceAPI from '../api/ResorceAPI';

export default class ResourceController {
  get(path: string): void {
    ResourceAPI.get(path);
  }
}
