/* eslint-disable @typescript-eslint/indent */
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Switch,
  Typography,
  useTheme,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import {
  DateTimePicker,
  MobileDatePicker,
  TimePicker,
} from '@mui/x-date-pickers';
import { FC, useState } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

export type FieldOptionsType = { value: any; label: string }[];

export interface BaseFieldProps {
  name: string;
  label: string;
  options?: FieldOptionsType | undefined;
  required: boolean;
  type?: string | undefined;
  disabled?: boolean;
  multiple?: boolean;
}

interface FieldProps extends BaseFieldProps {
  control: Control<FieldValues>;
}

const defaultProps = {
  type: 'text',
  options: undefined,
  disabled: false,
  multiple: false,
};

export const CustomTextField: FC<FieldProps> = ({
  name,
  control,
  label,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          fullWidth
          variant="standard"
          size="small"
          sx={{ my: 1 }}
          label={label}
          {...field}
          error={!!error}
          helperText={error ? error.message : null}
          {...rest}
        />
      )}
    />
  );
};

CustomTextField.defaultProps = {
  ...defaultProps,
};

export const CustomPasswordField: FC<FieldProps> = ({
  name,
  control,
  label,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          fullWidth
          variant="standard"
          size="small"
          sx={{ my: 1 }}
          label={label}
          {...field}
          error={!!error}
          helperText={error ? error.message : null}
          {...rest}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                style={{ border: '0pc solid transparent' }}
              >
                <IconButton
                  size="small"
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? (
                    <Visibility sx={{ width: 22, height: 22 }} />
                  ) : (
                    <VisibilityOff sx={{ width: 22, height: 22 }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

CustomPasswordField.defaultProps = {
  ...defaultProps,
};

export const CustomTextAreaField: FC<FieldProps> = ({
  name,
  control,
  label,
  ...rest
}) => {
  const multiline = true;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          fullWidth
          variant="standard"
          size="small"
          sx={{ my: 1 }}
          label={label}
          {...field}
          error={!!error}
          helperText={error ? error.message : null}
          multiline={multiline}
          minRows={multiline ? 3 : undefined}
          maxRows={multiline ? 10 : undefined}
          {...rest}
        />
      )}
    />
  );
};

CustomTextAreaField.defaultProps = {
  ...defaultProps,
};

export const CustomSwitchField: FC<Omit<FieldProps, 'type' | 'options'>> = ({
  name,
  control,
  label,
  required,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormGroup>
          <FormControlLabel
            required={required}
            control={<Switch checked={field.value} onChange={field.onChange} />}
            label={label}
          />
        </FormGroup>
      )}
    />
  );
};

export const CustomCheckboxField: FC<Omit<FieldProps, 'type' | 'options'>> = ({
  name,
  control,
  label,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={field.value} onChange={field.onChange} />
            }
            label={label}
          />
          {error && (
            <FormHelperText id={`${name}Helper`} sx={{ color: 'error.main' }}>
              <Typography variant="caption" color="inherit">
                {error.message}
              </Typography>
            </FormHelperText>
          )}
        </FormGroup>
      )}
    />
  );
};

export const CustomSelectField: FC<FieldProps> = ({
  name,
  control,
  label,
  options,
  multiple,
  ...rest
}) => {
  const theme = useTheme();
  const colors = {
    successLight: theme.palette.success.light,
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl
          variant="standard"
          size="small"
          fullWidth
          sx={{ my: 1 }}
          {...rest}
        >
          <InputLabel id={`${name}Label`}>{label}</InputLabel>

          <Select
            multiple={multiple}
            variant="standard"
            size="small"
            fullWidth
            label={label}
            renderValue={
              multiple
                ? (selected) => {
                    // Custom render for multi-select
                    return (
                      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {selected.map((value) => (
                          <Box
                            style={{
                              backgroundColor: colors.successLight,
                              borderRadius: '3px',
                              padding: '2px 8px',
                            }}
                            key={value}
                            sx={{ m: 0.5 }}
                          >
                            {
                              options?.find((option) => option.value === value)
                                ?.label
                            }
                          </Box>
                        ))}
                      </div>
                    );
                  }
                : undefined
            }
            {...field}
            {...rest}
            error={!!error}
          >
            {options?.map((item) => (
              <MenuItem key={item.label} value={item.value}>
                <Box>{item.label}</Box>
              </MenuItem>
            ))}
          </Select>
          {error && (
            <FormHelperText id={`${name}Helper`} sx={{ color: 'error.main' }}>
              <Typography variant="caption" color="inherit">
                {error.message}
              </Typography>
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

CustomSelectField.defaultProps = {
  ...defaultProps,
};

export const CustomDateField: FC<FieldProps> = ({
  name,
  control,
  label,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MobileDatePicker
          sx={{ my: 1 }}
          label={label}
          {...field}
          {...rest}
          slotProps={{
            textField: {
              variant: 'standard',
              fullWidth: true,
              error: !!error,
              helperText: error ? error.message : null,
              ...rest,
            },
          }}
        />
      )}
    />
  );
};

CustomDateField.defaultProps = {
  ...defaultProps,
};

export const CustomDateTimeField: FC<FieldProps> = ({
  name,
  control,
  label,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DateTimePicker
          sx={{ my: 0.5 }}
          label={label}
          {...field}
          {...rest}
          format="DD/MM/YYYY HH:mm:ss"
          slotProps={{
            textField: {
              variant: 'standard',
              fullWidth: true,
              error: !!error,
              helperText: error ? error.message : null,
              ...rest,
            },
          }}
        />
      )}
    />
  );
};

CustomDateTimeField.defaultProps = {
  ...defaultProps,
};

export const CustomTimeField: FC<FieldProps> = ({
  name,
  control,
  label,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TimePicker
          sx={{ my: 1 }}
          label={label}
          {...field}
          {...rest}
          slotProps={{
            textField: {
              variant: 'standard',
              fullWidth: true,
              error: !!error,
              helperText: error ? error.message : null,
              ...rest,
            },
          }}
        />
      )}
    />
  );
};

CustomTimeField.defaultProps = {
  ...defaultProps,
};

export const CustomRangeField: FC<FieldProps> = ({
  name,
  control,
  label,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box sx={{ mt: 1.9 }}>
          <FormLabel sx={{ fontSize: 14 }}>{label}</FormLabel>
          <Slider
            size="small"
            getAriaLabel={() => label}
            valueLabelDisplay="auto"
            getAriaValueText={(v) => `${v}%`}
            min={0}
            max={100}
            {...field}
            {...rest}
          />
          {error && (
            <FormHelperText id={`${name}Helper`} sx={{ color: 'error.main' }}>
              <Typography variant="caption" color="inherit">
                {error.message}
              </Typography>
            </FormHelperText>
          )}
        </Box>
      )}
    />
  );
};

CustomRangeField.defaultProps = {
  ...defaultProps,
};

interface ButtonProps {
  isSubmitting: boolean;
  isDisabled?: boolean;
  text?: string;
}

export const SubmitButton: FC<ButtonProps> = ({
  isSubmitting,
  isDisabled,
  text = 'Continue',
  ...props
}) => {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      disabled={isSubmitting || isDisabled}
      sx={{ my: 1, textTransform: 'none' }}
      {...props}
    >
      {text}
      {isSubmitting && <CircularProgress size={16} sx={{ ml: 2 }} />}
    </Button>
  );
};

SubmitButton.defaultProps = {
  isDisabled: false,
  text: 'submit',
};
