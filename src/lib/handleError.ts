const handleError = (error: any, operation: string) => {
  const errors = JSON.stringify(error?.response?.errors, undefined, 2);
  throw new Error(`Failed to ${operation} ${errors}`);
};

export default handleError;
