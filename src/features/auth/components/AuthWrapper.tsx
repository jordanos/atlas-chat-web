import { Box, Container, Paper, Typography } from '@mui/material';
import { SYSTEM_PROVIDER_NAME } from 'constants/settings';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const AuthWrapper: FC<Props> = ({ children }) => {
  return (
    <Container maxWidth="xs">
      <Paper
        elevation={2}
        sx={{
          width: '100%',
          p: 2,
          mt: '23vh',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 1.5,
            mb: 2,
          }}
        >
          <Typography
            variant="h1"
            textAlign="center"
            sx={{ fontSize: 24, fontWeight: 600, mt: 1, color: 'grey.900' }}
          >
            {SYSTEM_PROVIDER_NAME}
          </Typography>
        </Box>
        {children}
      </Paper>
    </Container>
  );
};

export default AuthWrapper;
