import { Box, Typography } from '@mui/material';
import PageLoadingIndicator from 'components/widgets/PageLoadingIndicator';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { apiSlice } from 'store/api/apiSlice';
import { setChat } from '../chatSlice';
import RoomDetail from './RoomDetail';

const DisabledRoom = () => {
  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        height: '100%',
        py: 10,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="overline">Please select a room.</Typography>
    </Box>
  );
};

const ActiveRoom = () => {
  const dispatch = useDispatch();
  // get room from query_param
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const newRoomId = searchParams.get('room_id');
  // get the roomid from query params
  const [getRoom, { data: room, isLoading }] =
    apiSlice.endpoints.getRoom.useLazyQuery({});
  useEffect(() => {
    if (newRoomId) {
      // get the room detail and update active room in state
      // get room using api
      getRoom(newRoomId);
    }
  }, [newRoomId, getRoom]);

  useEffect(() => {
    if (room !== undefined && room !== null) {
      // update active room
      dispatch(setChat({ activeRoom: room }));
    }
  }, [room, dispatch]);

  const activeRoom = useSelector((state) => state.chat.activeRoom);

  if (isLoading) {
    return <PageLoadingIndicator />;
  }

  if (activeRoom === null) {
    return <DisabledRoom />;
  }

  return <RoomDetail room={activeRoom} />;
};

export default ActiveRoom;
