import 'regenerator-runtime/runtime';
import ResourceAPI from '../api/ResorceAPI';

export default class ResourceController {
  static get(path: string): void {
    ResourceAPI.get(path);
  }
}
