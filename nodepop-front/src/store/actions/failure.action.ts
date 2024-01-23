interface Payload {
  type: string;
  error: unknown;
}

export const failureAction = ({ type, error }: Payload) => ({
  type,
  error: true,
  payload: error,
});
