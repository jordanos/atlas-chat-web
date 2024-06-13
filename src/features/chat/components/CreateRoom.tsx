import { Box } from '@mui/material';
import CustomForm, {
  FormField,
  OnSubmitProps,
} from 'components/form/CustomForm';
import { ROOM_TYPES } from 'constants/options';
import { FC } from 'react';
import { mutatationAdapter } from 'utils/mutation';
import { z } from 'zod';
import { useCreateRoomMutation } from '../api/roomApiSlice';

const fields: FormField[] = [
  {
    fieldType: 'Text',
    required: true,
    name: 'name',
    label: 'Name',
    initValue: '',
    validation: z.string().min(1, { message: 'Room name is required.' }),
  },
  {
    fieldType: 'Choice',
    required: true,
    name: 'type',
    label: 'Room type',
    initValue: 'private',
    options: ROOM_TYPES.map((t) => ({ value: t, label: t })),
    validation: z.string().min(1, { message: 'Room type is required.' }),
  },
];

interface Props {}

const CreateRoom: FC<Props> = () => {
  const [create, { isLoading }] = useCreateRoomMutation();

  const onSubmit: (arg0: OnSubmitProps) => void = async ({
    values,
    setError,
    reset,
  }) => {
    await mutatationAdapter({
      mutateFn: async () => {
        return await create(values).unwrap();
      },
      successMessage: 'Room created successfully.',
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
        btnText="Create"
      />
    </Box>
  );
};

export default CreateRoom;
