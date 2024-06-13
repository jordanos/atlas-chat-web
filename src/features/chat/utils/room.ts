import { RoomModel } from '../models';

export const getRoomName = (room: RoomModel, userId: number) => {
  const users = room.users.filter((user) => user.id !== userId);
  if (users.length === 1) {
    return users[0].username;
  }
  return room.name;
};
