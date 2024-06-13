import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import { UserModel } from 'features/auth/models';
import { useModal } from 'hooks/useModal';
import { FC } from 'react';
import { mutatationAdapter } from 'utils/mutation';
import { useJoinPrivateRoomMutation } from '../api/roomApiSlice';
import { RoomModel } from '../models';

interface UserProps {
  user: UserModel;
}

const UserCard: FC<UserProps> = ({ user }) => {
  const [joinPrivateRoom] = useJoinPrivateRoomMutation();
  const { toggleModal } = useModal();

  const handleClick = async () => {
    await mutatationAdapter({
      mutateFn: async () => {
        return await joinPrivateRoom({ user_id: user.id }).unwrap();
      },
      successMessage: 'Joining Room...',
      onSuccess: (data) => {
        const room = RoomModel.fromApiResponse(data);
        const currentUrl = new URL(window.location);
        currentUrl.searchParams.set('room_id', room.id);
        history.pushState({}, '', currentUrl);
        toggleModal('users', {});
      },
    });
  };

  return (
    <Card
      sx={{
        height: '60px',
        borderRadius: '0px',
        marginTop: 0.5,
        cursor: 'pointer',
      }}
      onClick={() => {
        handleClick();
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Avatar sx={{ width: 32, height: 32, mr: 4 }}>
            <Typography variant="body1">
              {user.username.charAt(0).toUpperCase()}
            </Typography>
          </Avatar>
          <Box>
            <Typography variant="body2">{user.username}</Typography>
            <Typography
              variant="caption"
              sx={{ color: user.isOnline ? 'text.primary' : 'text.disabled' }}
            >
              {user.isOnline ? 'Online' : 'Offline'}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCard;
