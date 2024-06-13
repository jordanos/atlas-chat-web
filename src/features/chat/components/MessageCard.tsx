import { Avatar, Box, Card, Typography } from '@mui/material';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { MessageModel } from '../models';

interface Props {
  message: MessageModel;
}

const MessageCard: FC<Props> = ({ message }) => {
  const userId = useSelector((state) => state.user.id);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: userId === message.owner.id ? 'row-reverse' : 'row',
      }}
    >
      <Avatar
        sx={{
          width: 24,
          height: 24,
          mt: 0.5,
          mr: userId === message.owner.id ? 0 : 1,
          ml: userId === message.owner.id ? 1 : 0,
        }}
      >
        <Typography variant="caption">
          {message.owner.username.charAt(0).toUpperCase()}
        </Typography>
      </Avatar>
      <Card
        sx={{
          maxWidth: '80%',
          width: 'auto',
          mb: 1,
          alignSelf: userId === message.owner ? 'end' : 'start',
          px: 2,
          py: 1,
        }}
      >
        {message.room.type !== 'private' && (
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {message.owner.username}
          </Typography>
        )}
        <Typography variant="body2">{message.text}</Typography>
      </Card>
    </Box>
  );
};

export default MessageCard;
