import clsx from "clsx";

const variants = {
  Wishlist: "bg-slate-100 text-slate-700",
  Applied: "bg-blue-100 text-blue-700",
  "OA Received": "bg-purple-100 text-purple-700",
  "OA Cleared": "bg-indigo-100 text-indigo-700",
  "Interview Scheduled": "bg-amber-100 text-amber-700",
  Offer: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  Ghosted: "bg-gray-200 text-gray-700",
};

function Badge({ children, className }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        variants[children] || "bg-slate-100 text-slate-700",
        className
      )}
    >
      {children}
    </span>
  );
}

export default Badge;