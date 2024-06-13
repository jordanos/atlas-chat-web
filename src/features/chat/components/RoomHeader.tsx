import GroupIcon from '@mui/icons-material/Group';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { Box, Card, IconButton, Typography, styled } from '@mui/material';
import CustomModal from 'components/CustomModal';
import { toggleMobileNav } from 'features/app/appSlice';
import { logout } from 'features/auth/userSlice';
import { useModal } from 'hooks/useModal';
import { FC } from 'react';
import { HiOutlineMenu } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { getRoomName } from '../utils/room';
import RoomUsers from './RoomUsers';

export const StyledMenuIcon = styled(HiOutlineMenu)(({ theme }) => ({
  display: 'none',
  fontSize: '2rem',
  color: theme.palette.primary.main,
  marginRight: '0.5em',

  '&:hover': {
    cursor: 'pointer',
  },
  [theme.breakpoints.down('md')]: {
    display: 'block',
  },
}));

interface Props {}

const RoomHeader: FC<Props> = () => {
  const room = useSelector((state) => state.chat.activeRoom);
  const { username, id } = useSelector((state) => state.user);
  const { toggleModal } = useModal();
  const dispatch = useDispatch();

  return (
    <>
      <Card
        sx={{
          width: '100%',
          borderRadius: '0px',
          boxShadow: 1,
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          py: 1,
          px: 2,
          height: '64px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            alignSelf: 'start',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <StyledMenuIcon onClick={() => dispatch(toggleMobileNav({}))} />
          {room && (
            <Box>
              <Typography
                variant="body1"
                sx={{ fontWeight: 500, textTransform: 'capitalize' }}
              >
                {getRoomName(room, id)}
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontWeight: 600, color: 'text.disabled' }}
              >
                {`${room.users.length} members`}
              </Typography>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignSelf: 'end',
            alignItems: 'center',
            height: '100%',
          }}
        >
          {room && (
            <IconButton
              size="small"
              onClick={() => {
                toggleModal('users', { title: `${room.name} users` });
              }}
            >
              <GroupIcon />
            </IconButton>
          )}
          <IconButton
            size="small"
            sx={{ ml: 0.5, mr: 0.5 }}
            onClick={() => {
              dispatch(logout({}));
            }}
          >
            <PowerSettingsNewIcon />
          </IconButton>
          <Typography variant="overline" sx={{ mt: 0.25 }}>
            {username}
          </Typography>
        </Box>
      </Card>
      <CustomModal modal="users">
        <RoomUsers room={room} />
      </CustomModal>
    </>
  );
};

export default RoomHeader;
