// src/components/Pagination.jsx

import Button from "./Button.jsx";

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) {
    return null;
  }

  function handlePrevious() {
    if (page > 1) {
      onPageChange(page - 1);
    }
  }

  function handleNext() {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  }

  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row">
      <p className="text-sm text-slate-600">
        Page <span className="font-medium">{page}</span> of{" "}
        <span className="font-medium">{totalPages}</span>
      </p>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={handlePrevious}
          disabled={page === 1}
        >
          Previous
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={handleNext}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}