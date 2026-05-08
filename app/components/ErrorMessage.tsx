type ErrorMessageProps = {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
    {message}
  </div>
);