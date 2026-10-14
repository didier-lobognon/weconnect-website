"use client";

import { useEffect, useState } from "react";

const units = [
  { key: "d", label: "jours", ms: 86_400_000 },
  { key: "h", label: "heures", ms: 3_600_000 },
  { key: "m", label: "min", ms: 60_000 },
  { key: "s", label: "sec", ms: 1_000 },
] as const;

/** Live countdown to an ISO date (local midnight). Renders placeholders until mounted. */
export function Countdown({ date }: { date: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  let rest = now === null ? 0 : Math.max(0, new Date(`${date}T00:00:00`).getTime() - now);

  return (
    <div className="countdown" role="timer" aria-label="Temps restant avant l’événement">
      {units.map((u) => {
        const value = Math.floor(rest / u.ms);
        rest -= value * u.ms;
        return (
          <div className="countdown-unit" key={u.key}>
            <strong>{now === null ? "--" : String(value).padStart(2, "0")}</strong>
            <span>{u.label}</span>
          </div>
        );
      })}
    </div>
  );
}
