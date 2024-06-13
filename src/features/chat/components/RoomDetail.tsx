import { Box } from '@mui/material';
import PageLoadingIndicator from 'components/widgets/PageLoadingIndicator';
import useGetPaginatedData from 'hooks/useGetPaginatedData';
import { FC } from 'react';
import { useGetMessagesQuery } from '../api/messageApiSlice';
import { RoomModel } from '../models';
import CreateMessage from './CreateMessage';
import MessageCard from './MessageCard';

interface Props {
  room: RoomModel;
}

const RoomDetail: FC<Props> = ({ room }) => {
  // load room messages
  const { data: messages, isLoading } = useGetPaginatedData(
    useGetMessagesQuery,
    { filters: { room: room.id } }
  );

  if (isLoading) return <PageLoadingIndicator />;
  if (messages === undefined) return <PageLoadingIndicator />;

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
      }}
    >
      {/* messages */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          py: 4,
          px: 4,
          maxHeight: 'calc(100vh - 176px)',
          width: '100%',
          overflowY: 'scroll',
          zIndex: 1,
        }}
      >
        {messages.toReversed().map((message) => (
          <MessageCard message={message} key={message.id} />
        ))}
      </Box>
      {/* send message */}
      <Box
        sx={{
          width: '100%',
          zIndex: 3,
        }}
      >
        <CreateMessage room={room} />
      </Box>
    </Box>
  );
};

export default RoomDetail;
