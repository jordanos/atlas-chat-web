/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { Grid } from '@mui/material';
import { FC, useMemo } from 'react';
import {
  Control,
  SubmitHandler,
  UseFormReset,
  UseFormSetError,
  useForm,
} from 'react-hook-form';
import { getInitialValues } from 'utils/form';
import { ZodTypeAny, z } from 'zod';
import {
  BaseFieldProps,
  CustomDateField,
  CustomDateTimeField,
  CustomPasswordField,
  CustomRangeField,
  CustomSelectField,
  CustomSwitchField,
  CustomTextAreaField,
  CustomTextField,
  CustomTimeField,
  SubmitButton,
} from './CustomFormFields';

export interface FormField extends BaseFieldProps {
  validation: ZodTypeAny;
  initValue: unknown;
  fieldType:
  | 'Text'
  | 'Password'
  | 'Paragraph'
  | 'Boolean'
  | 'Choice'
  | 'Date'
  | 'Time'
  | 'DateTime'
  | 'Range';
}

export interface OnSubmitProps {
  values: any;
  reset: UseFormReset<{ [key: string]: any }>;
  setError: UseFormSetError<{ [key: string]: any }>;
}

interface GetFieldProps {
  field: FormField;
  control: Control<object, any>;
}

const GetField: FC<GetFieldProps> = ({ field, control }) => {
  // Render fields dynamically
  // this will help in minimizing validation errors and missing values
  const { fieldType, ...rest } = field;
  const commonProps = {
    key: field.name,
    control,
    ...rest,
  };
  switch (fieldType) {
    case 'Text':
      return <CustomTextField {...commonProps} />;
    case 'Password':
      return <CustomPasswordField {...commonProps} />;
    case 'Paragraph':
      return <CustomTextAreaField {...commonProps} />;
    case 'Boolean':
      return <CustomSwitchField {...commonProps} />;
    case 'Choice':
      return <CustomSelectField {...commonProps} />;
    case 'Date':
      return <CustomDateField {...commonProps} />;
    case 'Time':
      return <CustomTimeField {...commonProps} />;
    case 'DateTime':
      return <CustomDateTimeField {...commonProps} />;
    case 'Range':
      return <CustomRangeField {...commonProps} />;
    default:
      return null;
  }
};

interface Props {
  fields: FormField[];
  defaultValues?: object | null;
  onSubmit: SubmitHandler<OnSubmitProps>;
  isLoading: boolean;
  schemaRefinements?: {
    cb: (arg: { [x: string]: any }) => unknown;
    info: any;
  }[];
  btnText?: string;
  showBtn?: boolean;
  makeGrids?: boolean;
}

const CustomForm: FC<Props> = ({
  fields,
  defaultValues,
  onSubmit,
  isLoading,
  schemaRefinements,
  btnText,
  showBtn,
  makeGrids,
}) => {
  const validationSchema = useMemo(() => {
    // Get validation schema dynamically from fields
    const v = fields.reduce<{ [key: string]: ZodTypeAny }>((acc, cur) => {
      // Call validate on every field with the field name
      // This will return a zod schema
      acc[cur.name] = cur.validation;
      return acc;
    }, {});

    if (schemaRefinements !== undefined && schemaRefinements.length > 0) {
      return z
        .object(v)
        .refine(schemaRefinements[0].cb, schemaRefinements[0].info);
    }
    return z.object(v);
  }, [fields, schemaRefinements]);

  const { control, handleSubmit, reset, setError } = useForm({
    defaultValues: defaultValues || getInitialValues(fields),
    resolver: zodResolver(validationSchema),
  });

  return (
    <form
      data-testid="form-handler"
      onSubmit={handleSubmit((values) => onSubmit({ values, reset, setError }))}
    >
      <Grid container spacing={2}>
        {fields.map((field) => {
          // Render fields dynamically
          // this will help in minimizing validation errors and missing values
          return (
            <Grid item xs={12} sm={12} md={makeGrids ? 6 : 12}>
              <GetField control={control} field={field} />
            </Grid>
          );
        })}
      </Grid>
      {showBtn && <SubmitButton text={btnText} isSubmitting={isLoading} />}
    </form>
  );
};

CustomForm.defaultProps = {
  defaultValues: null,
  schemaRefinements: [],
  btnText: 'Submit',
  showBtn: true,
  makeGrids: false,
};

export default CustomForm;
