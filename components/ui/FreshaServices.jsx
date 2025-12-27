"use client";

import { useEffect, useState } from "react";

export default function FreshaServices({ freshaUrl }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (!freshaUrl) return;

    fetch(`/api/fresha/services?url=${encodeURIComponent(freshaUrl)}`)
      .then((res) => res.json())
      .then((data) => setServices(Array.isArray(data) ? data : []))
      .catch(() => setServices([]));
  }, [freshaUrl]);

  if (!services.length) return null;

  return (
    <section className="mt-6 bg-white rounded-2xl border border-green-200 p-6">
      <h2 className="font-semibold mb-4">
        Dịch vụ <span className="text-sm text-gray-500">(đồng bộ từ Fresha)</span>
      </h2>

      <div className="space-y-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm"
          >
            <div>
              <p className="font-medium">{service.name}</p>
              {service.duration && (
                <p className="text-sm text-gray-500">
                  {service.duration} phút
                </p>
              )}
            </div>

            <div className="font-semibold text-green-600">
              {service.price}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
