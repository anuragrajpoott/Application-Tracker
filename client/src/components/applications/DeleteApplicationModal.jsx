import Modal from "../ui/Modal";

function DeleteApplicationModal({
  application,
  open,
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!open || !application) {
    return null;
  }

  return (
    <Modal
      title="Delete Application"
      confirmText="Delete"
      confirmVariant="danger"
      cancelText="Cancel"
      confirmLoading={loading}
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <p className="text-sm text-slate-600">
        Are you sure you want to delete your application for{" "}
        <span className="font-semibold text-slate-900">
          {application.role}
        </span>{" "}
        at{" "}
        <span className="font-semibold text-slate-900">
          {application.company}
        </span>
        ?
      </p>

      <p className="mt-3 text-sm text-red-600">
        This action cannot be undone.
      </p>
    </Modal>
  );
}

export default DeleteApplicationModal;