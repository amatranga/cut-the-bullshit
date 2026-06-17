type CardActionButtonsProps = {
  copied: boolean;
  shared: boolean;
  onCopy: () => void | Promise<void>;
  onShare: () => void | Promise<void>;
};

const CardActionButtons = ({ copied, shared, onCopy, onShare }: CardActionButtonsProps) => {
  return (
    <div className="mt-5 flex flex-col gap-2 border-t border-slate-800 pt-4 sm:flex-row sm:justify-end">
      <button
        type="button"
        onClick={onCopy}
        className="rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2 text-sm text-slate-300 transition hover:border-slate-500 hover:bg-slate-700 active:scale-[0.98]"
      >
        {copied ? "Copied Card!" : "Copy Card"}
      </button>

      <button
        type="button"
        onClick={onShare}
        className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300 transition hover:border-cyan-400 hover:bg-cyan-500/20 active:scale-[0.98]"
      >
        {shared ? "Shared!" : "Share Result"}
      </button>
    </div>
  );
};

export { CardActionButtons };