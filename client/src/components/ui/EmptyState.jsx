import { CirclePlus } from "lucide-react";

import Button from "./Button";

function EmptyState({
  title,
  description,
  actionText,
  onAction,
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <h2 className="text-xl font-semibold text-slate-900">
        {title}
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>

      {actionText && (
        <Button
          className="mt-6"
          onClick={onAction}
        >
          <CirclePlus size={18} />

          {actionText}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;