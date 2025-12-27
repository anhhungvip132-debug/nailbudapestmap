export default function BookingStatusBadge({ status }) {
  const map = {
    pending: {
      label: "PENDING",
      className: "bg-yellow-100 text-yellow-700 border-yellow-200",
    },
    approved: {
      label: "APPROVED",
      className: "bg-green-100 text-green-700 border-green-200",
    },
    rejected: {
      label: "REJECTED",
      className: "bg-red-100 text-red-700 border-red-200",
    },
  };

  const cfg = map[status] || map.pending;

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${cfg.className}`}
    >
      {cfg.label}
    </span>
  );
}
