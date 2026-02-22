"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Sparkles } from "lucide-react";
import type { DayNameResult } from "@/schemas/day-name";

type DayNameSectionProps = {
  dayName: DayNameResult | null;
  onDayNameChange: (result: DayNameResult | null) => void;
};

export function DayNameSection({ dayName, onDayNameChange }: DayNameSectionProps) {
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [loading, setLoading] = useState(false);

  const fetchDayName = async () => {
    if (!dob) return;
    setLoading(true);
    try {
      const res = await fetch("/api/day-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dateOfBirth: dob, gender }),
      });
      if (res.ok) {
        const result: DayNameResult = await res.json();
        onDayNameChange(result);
      }
    } catch {
      console.error("Failed to fetch day name");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-text-primary mb-2 block">
          Akan Day Name
        </label>
        <p className="text-xs text-text-tertiary mb-3">
          In Akan tradition, your day of birth determines a spiritual name that
          carries meaning and personality traits.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label className="text-xs text-text-secondary mb-1 block">Date of Birth</label>
          <div className="relative">
            <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
            <Input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <div className="w-full sm:w-36">
          <label className="text-xs text-text-secondary mb-1 block">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as "male" | "female")}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="flex items-end">
          <Button onClick={fetchDayName} disabled={!dob || loading} size="md">
            <Sparkles size={14} className="mr-1.5" />
            Reveal
          </Button>
        </div>
      </div>

      {/* Day name result */}
      {dayName && (
        <div className="rounded-xl border border-accent/30 bg-accent-subtle p-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-accent">{dayName.name}</span>
            <span className="text-sm text-text-tertiary">({dayName.day})</span>
          </div>
          <p className="text-sm text-text-secondary">{dayName.meaning}</p>
          <div className="flex flex-wrap gap-2">
            {dayName.traits.map((trait) => (
              <span
                key={trait}
                className="rounded-full bg-surface px-2.5 py-0.5 text-xs text-text-secondary capitalize"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
