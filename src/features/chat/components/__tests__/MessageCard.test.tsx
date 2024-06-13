import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { MessageModel } from 'features/chat/models';
import MessageCard from '../MessageCard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#800080',
    },
    secondary: {
      main: '#ede6ed',
    },
  },
});

describe('SentMessage', () => {
  const setup = () => {
    render(
      <ThemeProvider theme={theme}>
        <MessageCard message={new MessageModel('hello', 2, 1, 1)} />
      </ThemeProvider>
    );
  };
  beforeEach(() => {});

  it('renders without crashing', () => {
    setup();
    expect(screen).toBeTruthy();
  });

  it('renders the message', () => {
    setup();
    const message = screen.getByText('hello');
    expect(message).toBeInTheDocument();
  });

  it('renders the date', () => {
    setup();
    const date = screen.queryByTestId('time');
    expect(date).toBeInTheDocument();
  });
});
