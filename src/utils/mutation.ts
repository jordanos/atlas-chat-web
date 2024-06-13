/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'components/Toast';
import { reactHookErrorAdapter } from './errorHandlers';

const WENT_WRONG = 'Something went wrong while processing your request';

const flattenObject = (input) => {
  let result = {};
  Object.keys(input).forEach((key) => {
    const newKey = key;
    if (typeof input[key] === 'object' && !Array.isArray(input[key])) {
      result = { ...result, ...flattenObject(input[key], newKey) };
    } else {
      result[newKey] = input[key];
    }
  });
  return result;
};

const transformFieldErrors = (e) => {
  const errors = flattenObject(e);
  const newErrors = {};

  Object.keys(errors).forEach((key) => {
    newErrors[key] = errors[key].reduce(
      (a, v, i) => (i >= errors[key].length - 1 ? `${a} ${v}` : `${a} ${v}, `),
      ''
    );
  });

  return newErrors;
};

export const mutatationAdapter = async ({
  mutateFn,
  onSuccess = () => {},
  onError = () => {},
  setError = () => {},
  successMessage,
}: {
  mutateFn: () => Promise<any>;
  successMessage: string;
  onSuccess?: Function;
  onError?: Function;
  setError?: Function;
}) => {
  try {
    const res = await mutateFn();
    onSuccess(res);
    if (successMessage !== '') toast({ message: successMessage });
    return true;
  } catch (e) {
    let message = WENT_WRONG;
    if (e?.data) {
      if (e.status === 400) {
        const errors = transformFieldErrors(e.data);
        reactHookErrorAdapter(errors, setError);
        if (errors?.non_field_errors) {
          message = errors.non_field_errors;
        }
      }
      if (e.status > 400 && e.status < 500) {
        message = e.data?.detail;
      }
    }
    toast({
      message,
      severity: 'error',
    });
    onError(e);
    return false;
  }
};
