import { Box, Button } from '@mui/material';
import CustomModal from 'components/CustomModal';
import PageLoadingIndicator from 'components/widgets/PageLoadingIndicator';
import { UserModel } from 'features/auth/models';
import useGetPaginatedData from 'hooks/useGetPaginatedData';
import { useModal } from 'hooks/useModal';
import { FC } from 'react';
import { useGetRoomUsersQuery } from '../api/roomApiSlice';
import { RoomModel } from '../models';
import AddUser from './AddUser';
import UserCard from './UserCard';

interface Props {
  room: RoomModel;
}

const RoomUsers: FC<Props> = ({ room }) => {
  const { toggleModal } = useModal();
  // get users in the room
  const { data: users, isLoading } = useGetPaginatedData(useGetRoomUsersQuery, {
    filters: { order_by: '-is_online' },
    path: { room_id: room.id },
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <PageLoadingIndicator />;
  }

  return (
    <Box>
      <Button
        variant="outlined"
        size="small"
        sx={{ my: 0.5 }}
        onClick={() => {
          toggleModal('md2', { title: `Add user to ${room.name}` });
        }}
      >
        Add User
      </Button>
      {users.map((user: UserModel) => (
        <UserCard key={user.id} user={user} />
      ))}
      <CustomModal modal="md2">
        <AddUser room={room} />
      </CustomModal>
    </Box>
  );
};

export default RoomUsers;
