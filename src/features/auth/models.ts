/* eslint-disable @typescript-eslint/lines-between-class-members */
export class UserModel {
  id: number;
  username: string;
  isOnline: boolean;

  constructor(id: number, username: string, isOnline: boolean) {
    this.id = id;
    this.username = username;
    this.isOnline = isOnline;
  }

  static fromApiResponse(data: object) {
    return new UserModel(data.id, data.username, data.is_online);
  }
}
