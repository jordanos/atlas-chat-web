import AddIcon from '@mui/icons-material/Add';
import { Box, Drawer, Fab, Grid } from '@mui/material';
import { styled } from '@mui/system';
import CustomModal from 'components/CustomModal';
import { toggleMobileNav } from 'features/app/appSlice';
import { useModal } from 'hooks/useModal';
import { useDispatch, useSelector } from 'react-redux';
import ActiveRoom from '../components/ActiveRoom';
import CreateRoom from '../components/CreateRoom';
import RoomHeader from '../components/RoomHeader';
import Rooms from '../components/Rooms';

const AsideMobileWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  top: 0,
  left: 0,
  bottom: 0,
  width: 250,
  height: '100vh',
  background: theme.palette.primary.main,

  [theme.breakpoints.up('md')]: {},
}));

const Chat = () => {
  const mobileNav = useSelector((state) => state.app.mobileNav);
  const dispatch = useDispatch();
  const { toggleModal } = useModal();

  return (
    <Box sx={{ width: '100%' }}>
      <Grid
        container
        spacing={0}
        sx={{ minHeight: '100vh', maxHeight: '100vh', width: '100%' }}
      >
        <Drawer
          anchor="left"
          open={mobileNav}
          onClose={() => dispatch(toggleMobileNav({}))}
          sx={{ display: { sm: 'block', md: 'none' } }}
        >
          <AsideMobileWrapper
            role="presentation"
            sx={{
              width: 250,
            }}
            isMobileNav={mobileNav}
          >
            <Rooms />
          </AsideMobileWrapper>
        </Drawer>
        <Grid item xs={0} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Rooms />
        </Grid>
        <Grid item xs={12} md={9} sx={{ pl: { xs: 0, md: 2 } }}>
          {/* room header */}
          <RoomHeader />
          <Box sx={{ height: 'calc(100vh - 70px)' }}>
            <ActiveRoom />
          </Box>
        </Grid>
      </Grid>
      <Fab
        size="small"
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', zIndex: 1000, left: '20px', bottom: '40px' }}
        onClick={() => {
          toggleModal('md1', { title: 'Create room' });
        }}
      >
        <AddIcon />
      </Fab>
      <CustomModal modal="md1">
        <CreateRoom />
      </CustomModal>
    </Box>
  );
};

export default Chat;
