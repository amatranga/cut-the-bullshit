type ErrorMessageProps = {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-100">
    <p className="text-xs uppercase tracking-[0.25em] text-red-300">
      Strategic Escalation Notice
    </p>

    <p className="mt-2">
      {message}
    </p>
  </div>
);

export { ErrorMessage };