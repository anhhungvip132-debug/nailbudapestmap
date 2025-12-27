// lib/planUiUtils.js

export function getDaysLeft(expiresAt) {
  if (!expiresAt) return null;

  const d =
    expiresAt.seconds
      ? new Date(expiresAt.seconds * 1000)
      : new Date(expiresAt);

  const now = new Date();
  const diffMs = d.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export function getPlanBadge(plan) {
  switch (plan) {
    case "premium":
      return "bg-purple-100 text-purple-700";
    case "sponsored":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
}
