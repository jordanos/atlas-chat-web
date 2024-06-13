export const reactHookErrorAdapter = (errors, setError) => {
  const keys = Object.keys(errors);

  keys.forEach((key) => {
    setError(key, { message: errors[key] });
  });
};
