export function isPlanActive(expiresAt) {
  if (!expiresAt) return false;

  const date =
    typeof expiresAt.toDate === "function"
      ? expiresAt.toDate()
      : new Date(expiresAt);

  return date.getTime() > Date.now();
}
