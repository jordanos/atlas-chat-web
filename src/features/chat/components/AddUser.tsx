import { Box } from '@mui/material';
import CustomForm, {
  FormField,
  OnSubmitProps,
} from 'components/form/CustomForm';
import { FC } from 'react';
import { mutatationAdapter } from 'utils/mutation';
import { z } from 'zod';
import { useAddUserToRoomMutation } from '../api/roomApiSlice';
import { RoomModel } from '../models';

const fields: FormField[] = [
  {
    fieldType: 'Text',
    required: true,
    name: 'username',
    label: 'Username',
    initValue: '',
    validation: z.string().min(1, { message: 'Username is required.' }),
  },
];

interface Props {
  room: RoomModel;
}

const AddUser: FC<Props> = ({ room }) => {
  const [addUser, { isLoading }] = useAddUserToRoomMutation();

  const onSubmit: (arg0: OnSubmitProps) => void = async ({
    values,
    setError,
    reset,
  }) => {
    await mutatationAdapter({
      mutateFn: async () => {
        return await addUser({ ...values, room_id: room.id }).unwrap();
      },
      successMessage: 'User added successfully.',
      onSuccess: () => {
        reset();
      },
      setError,
    });
  };

  return (
    <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column' }}>
      <CustomForm
        fields={fields}
        onSubmit={onSubmit}
        isLoading={isLoading}
        btnText="Add"
      />
    </Box>
  );
};

export default AddUser;
