import { Box, Link, Typography } from '@mui/material';
import CustomForm, {
  FormField,
  OnSubmitProps,
} from 'components/form/CustomForm';
import { FC } from 'react';
import { publicPages } from 'routes/menu';
import { mutatationAdapter } from 'utils/mutation';
import { z } from 'zod';
import { useRegisterMutation } from '../api/authApiSlice';

const fields: FormField[] = [
  {
    fieldType: 'Text',
    required: true,
    name: 'username',
    label: 'Username',
    initValue: '',
    validation: z.string().min(1, { message: 'Username is required.' }),
  },
  {
    fieldType: 'Password',
    required: true,
    name: 'password',
    label: 'Password',
    initValue: '',
    validation: z
      .string()
      .min(6, { message: 'Password must be atleast 6 characters.' }),
  },
];

interface Props {
  handleRegister: Function;
}

const RegisterForm: FC<Props> = ({ handleRegister }) => {
  const [register, { isLoading }] = useRegisterMutation();

  const onSubmit: (arg0: OnSubmitProps) => void = async ({
    values,
    setError,
  }) => {
    await mutatationAdapter({
      mutateFn: async () => {
        return await register(values).unwrap();
      },
      successMessage: 'Registration completed successfully.',
      onSuccess: handleRegister,
      setError,
    });
  };

  return (
    <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column' }}>
      <CustomForm
        fields={fields}
        onSubmit={onSubmit}
        isLoading={isLoading}
        btnText="Register"
      />
      <Typography variant="body2" sx={{ mt: 1.5 }}>
        Already have an account? &nbsp;
        <Link href={publicPages.login.path} variant="body2">
          Login
        </Link>
      </Typography>
    </Box>
  );
};

export default RegisterForm;
