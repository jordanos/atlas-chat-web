import { Box, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
  message?: string;
}

const ErrorPage: FC<Props> = ({ message }) => {
  return (
    <Box sx={{ px: 4 }}>
      <Typography variant="body">{message}</Typography>
    </Box>
  );
};

ErrorPage.defaultProps = {
  message: 'Something went wrong while loading your data',
};

export default ErrorPage;
