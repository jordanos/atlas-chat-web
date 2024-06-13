/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/lines-between-class-members */

import { UserModel } from 'features/auth/models';

/* eslint-disable max-classes-per-file */
export class RoomModel {
  id: number;
  name: string;
  type: string;
  owner: UserModel;
  users: UserModel[];

  constructor(
    id: number,
    name: string,
    type: string,
    owner: UserModel,
    users: UserModel[]
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.owner = owner;
    this.users = users;
  }

  static fromApiResponse(data: object) {
    const owner = UserModel.fromApiResponse(data.owner);
    const users = data.users.map((user) => UserModel.fromApiResponse(user));
    return new RoomModel(data.id, data.name, data.type, owner, users);
  }
}

export class MessageModel {
  id: number;
  text: string;
  owner: UserModel;
  room: RoomModel;

  constructor(id: number, text: string, owner: UserModel, room: RoomModel) {
    this.id = id;
    this.text = text;
    this.owner = owner;
    this.room = room;
  }

  static fromApiResponse(data: object) {
    const user = UserModel.fromApiResponse(data.owner);
    const room = RoomModel.fromApiResponse(data.room);
    return new MessageModel(data.id, data.text, user, room);
  }
}
