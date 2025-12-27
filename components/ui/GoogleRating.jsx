"use client";

export default function GoogleRating({ salon }) {
  const g = salon?.google;

  if (!g || !g.rating) return null;

  const placeId = g.placeId;
  const googleMapsUrl = placeId
    ? `https://www.google.com/maps/place/?q=place_id:${placeId}`
    : null;

  return (
    <div className="flex items-center gap-3 mt-3 text-sm">
      {/* GOOGLE LOGO */}
      <span className="flex items-center gap-1 font-semibold">
        <svg
          width="18"
          height="18"
          viewBox="0 0 533.5 544.3"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#4285f4"
            d="M533.5 278.4c0-18.6-1.5-37.1-4.7-55.2H272v104.6h146.9c-6.3 33.8-25 62.4-53.1 81.6v67h85.9c50.3-46.3 81.8-114.6 81.8-198z"
          />
          <path
            fill="#34a853"
            d="M272 544.3c72.6 0 133.5-23.9 178-64.9l-85.9-67c-23.9 16-54.4 25.4-92.1 25.4-70.9 0-131-47.9-152.5-112.3H30.6v70.6C74.9 482.5 167.1 544.3 272 544.3z"
          />
          <path
            fill="#fbbc04"
            d="M119.5 325.5c-10.4-30.8-10.4-64.1 0-94.9V160H30.6c-39.1 77.6-39.1 168.8 0 246.4l88.9-70.9z"
          />
          <path
            fill="#ea4335"
            d="M272 107.7c39.5-.6 77.5 14.3 106.6 41.8l79.3-79.3C413.3 24.6 343.5-1.1 272 0 167.1 0 74.9 61.8 30.6 160l88.9 70.6C141 155.6 201.1 107.7 272 107.7z"
          />
        </svg>

        <span>{g.rating.toFixed(1)}</span>
      </span>

      {/* STARS */}
      <span className="text-yellow-500">★★★★★</span>

      {/* REVIEWS */}
      <span className="text-gray-500">
        ({g.reviewsCount} Google reviews)
      </span>

      {/* VERIFIED */}
      {g.verified && (
        <span className="text-blue-600 font-medium flex items-center gap-1">
          ✓ Verified
        </span>
      )}

      {/* LINK */}
      {googleMapsUrl && (
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-600 hover:underline ml-2"
        >
          View on Google Maps
        </a>
      )}
    </div>
  );
}
