import HTTP from '../modules/http/inedx';

const http = new HTTP('https://ya-praktikum.tech/api/v2/chats');

export default class ChatUserAPI {
  static get(chatId: number): Promise<XMLHttpRequest> {
    return http.get(`/${chatId}/users`);
  }

  static remove(chatId: number, userId: number): Promise<XMLHttpRequest> {
    return http.delete('/users', { data: { chatId, users: [userId] } });
  }

  static add(chatId: number, userId: number): Promise<XMLHttpRequest> {
    return http.put('/users', { data: { chatId, users: [userId] } });
  }
}
