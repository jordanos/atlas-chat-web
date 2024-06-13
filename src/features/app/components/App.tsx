import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ModalProvider from 'components/CustomModal/ModalProvider';
import { Toaster } from 'components/Toast';
import { MessageModel } from 'features/chat/models';
import { FC, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { protectedRoutes, publicRoutes } from 'routes/contentRoutes';
import { publicPages } from 'routes/menu';
import { apiSlice } from 'store/api/apiSlice';
import { setWebSocket } from '../appSlice';
import { themeOptions as lightTheme } from '../constants/lightTheme';
import ProtectedRoutes from './ProtectedRoutes';

const App: FC = () => {
  const theme = useMemo(() => createTheme(lightTheme), []);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const wsRef = useRef<null | WebSocket>(null);
  useEffect(() => {
    if (token === null) return;

    const ws = new WebSocket(`ws://localhost:8000/ws/?token=${token}`);
    wsRef.current = ws;

    ws.onopen = () => {
      dispatch(setWebSocket({ ws }));
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      // handle recieved data based on the type and action
      if (data.type === 'message' && data.action === 'create') {
        const message = MessageModel.fromApiResponse(data.data);
        dispatch(
          apiSlice.util.updateQueryData(
            'getMessages',
            {
              pagination: { pageIndex: 0, pageSize: 25 },
              filters: `&room=${message.room.id}`,
              searchValue: '',
            },
            (draft) => {
              draft.results.unshift(message);
            }
          )
        );
      }
    };

    ws.onclose = () => {
      dispatch(setWebSocket({ ws: null }));
    };

    return () => {
      dispatch(setWebSocket({ ws: null }));
      ws.close();
    };
  }, [token, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <ModalProvider>
          <Box sx={{ display: 'flex', height: '100vh', width: '100%' }}>
            <Routes>
              {publicRoutes.map(({ element, ...content }) => {
                return (
                  <Route key={content.path} {...content} element={element} />
                );
              })}
              <Route
                element={
                  <ProtectedRoutes redirectPath={publicPages.login.path} />
                }
              >
                {protectedRoutes.map(({ element, ...content }) => {
                  return (
                    <Route key={content.path} {...content} element={element} />
                  );
                })}
              </Route>
            </Routes>
          </Box>
        </ModalProvider>
        <Toaster position="bottom-left" />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
