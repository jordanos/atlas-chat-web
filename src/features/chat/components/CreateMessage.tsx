import { Box, Button, Grid } from '@mui/material';
import { CustomTextField } from 'components/form/CustomFormFields';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RoomModel } from '../models';

interface Props {
  room: RoomModel;
}

const CreateMessage: FC<Props> = ({ room }) => {
  const ws = useSelector((state) => state.app.ws);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { message: '' },
  });

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 100,
        pb: 4,
        px: 4,
        width: '100%',
        backgroundColor: 'white',
        height: '100px',
      }}
    >
      <form
        onSubmit={handleSubmit((values) => {
          if (values.message === '') {
            reset();
            return;
          }
          const data = {
            type: 'message',
            action: 'create',
            data: { room_id: room.id, text: values.message },
          };
          ws.send(JSON.stringify(data));
          reset();
        })}
      >
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <CustomTextField
              control={control}
              name="message"
              label="message"
              size="small"
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              type="submit"
              variant="contained"
              disableElevation
              sx={{ mt: 2 }}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateMessage;
