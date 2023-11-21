const ErrorComponent = ({ message }: { message: string }) => {
  return <div className="alert alert-danger">{message}</div>;
};

export default ErrorComponent;
