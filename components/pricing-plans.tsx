"use client";

import Link from "next/link";
import { useState } from "react";
import { formatPrice, PLANS } from "@/lib/plans";
import { btn } from "@/lib/ui";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "yearly";

export function PricingPlans() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <div>
      <fieldset className="inline-flex rounded-full border border-line p-1">
        <legend className="sr-only">Billing period</legend>
        {(["monthly", "yearly"] as const).map((b) => (
          <label
            key={b}
            className={cn(
              "relative cursor-pointer rounded-full px-4 py-2 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-white",
              billing === b ? "bg-white text-black" : "text-ash hover:text-white",
            )}
          >
            <input
              type="radio"
              name="billing"
              value={b}
              checked={billing === b}
              onChange={() => setBilling(b)}
              className="sr-only"
            />
            {b === "monthly" ? "Monthly" : "Yearly, 2 months free"}
          </label>
        ))}
      </fieldset>

      <ul className="mt-10 grid gap-5 lg:grid-cols-3">
        {PLANS.map((plan) => {
          const featured = plan.id === "upgraded";
          const amount = billing === "monthly" ? plan.price : plan.price * 10;
          return (
            <li
              key={plan.id}
              className={cn(
                "flex flex-col rounded-3xl border p-7 sm:p-8",
                featured ? "border-white" : "border-line",
              )}
              aria-labelledby={`plan-${plan.id}`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h2 id={`plan-${plan.id}`} className="font-display text-2xl font-medium">
                  {plan.name}
                </h2>
                {featured && <span className="text-sm text-ash">Recommended</span>}
              </div>
              <p className="mt-3 min-h-[3em] leading-relaxed text-ash">{plan.summary}</p>
              <p className="mt-8 flex flex-wrap items-baseline gap-x-2">
                <span className="font-display text-5xl font-medium tracking-tight tabular-nums">
                  {formatPrice(amount)}
                </span>
                <span className="whitespace-nowrap text-ash">{plan.price === 0 ? "forever" : billing === "monthly" ? "per month" : "per year"}</span>
              </p>
              <Link
                href={`/signup?plan=${plan.id}`}
                className={cn(featured ? btn.solid : btn.outline, btn.md, "mt-8 w-full")}
              >
                {plan.cta}
              </Link>
              <div className="mt-8 border-t border-line pt-7">
                {plan.includesFrom && <p className="text-sm font-medium">{plan.includesFrom}</p>}
                <ul className={cn("space-y-3.5", plan.includesFrom && "mt-4")}>
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-3 leading-snug">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        className="mt-[3px] size-4 shrink-0 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 8.5l3 3 7-7" />
                      </svg>
                      <span className="text-white/90">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
