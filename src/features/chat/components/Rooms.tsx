import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from '@mui/material';
import { toggleMobileNav } from 'features/app/appSlice';
import useGetPaginatedData from 'hooks/useGetPaginatedData';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetRoomsQuery } from '../api/roomApiSlice';
import { setChat } from '../chatSlice';
import { RoomModel } from '../models';
import { getRoomName } from '../utils/room';

interface RoomCardProps {
  room: RoomModel;
}

const RoomCard: FC<RoomCardProps> = ({ room }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
  const mobileNav = useSelector((state) => state.app.mobileNav);

  const handleClick = () => {
    if (mobileNav) {
      dispatch(toggleMobileNav({}));
    }
    dispatch(setChat({ activeRoom: room }));
    const currentUrl = new URL(window.location);
    currentUrl.searchParams.set('room_id', room.id);
    // eslint-disable-next-line no-restricted-globals
    history.pushState({}, '', currentUrl);
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
              {getRoomName(room, userId).charAt(0).toUpperCase()}
            </Typography>
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ mb: -0.5 }}>
              {room.type === 'private' ? getRoomName(room, userId) : room.name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              {room.type}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const Rooms = () => {
  const { data: rooms, isLoading } = useGetPaginatedData(useGetRoomsQuery);

  if (isLoading) {
    return <CircularProgress disableShrink />;
  }

  return (
    <Box sx={{ width: '100%', pl: 1, maxHeight: '100vh', overflowY: 'scroll' }}>
      {/* list of rooms */}
      {rooms.map((room: RoomModel) => {
        return <RoomCard room={room} key={room.id} />;
      })}
    </Box>
  );
};

export default Rooms;
