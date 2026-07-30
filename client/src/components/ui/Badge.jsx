// src/components/ui/Badge.jsx

import clsx from "clsx";

const variants = {
  Wishlist: "bg-slate-100 text-slate-700",
  Applied: "bg-blue-100 text-blue-700",
  Interview: "bg-amber-100 text-amber-700",
  Offer: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function Badge({
  status,
  children,
  className,
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        variants[status] ?? variants.Wishlist,
        className
      )}
    >
      {children ?? status}
    </span>
  );
}