import HTTP from '../modules/http/inedx';

const http = new HTTP('https://ya-praktikum.tech/api/v2/chats');

export default class ChatAPI {
  static get(): Promise<XMLHttpRequest> {
    return http.get('/');
  }

  static create(value: string): Promise<XMLHttpRequest> {
    return http.post('/', { data: { title: value } });
  }

  static getToken(chatId: number): Promise<XMLHttpRequest> {
    return http.post(`/token/${chatId}`);
  }
}
