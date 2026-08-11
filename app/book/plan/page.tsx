"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { useDeshatan } from "@/lib/context";
import BookingShell from "@/components/booking/BookingShell";
import { TRIP_ALT, TRIP_PHOTOS, inr } from "@/components/booking/trips";
import { emptyDraft, estimateFor, saveDraft } from "@/components/booking/draft";
import {
  SIGNAL_LABEL,
  Signal,
  paceFor,
  rankDestinations,
  readMood,
  styleFor,
} from "@/components/booking/intent";
import s from "@/components/booking/booking.module.css";

type Turn = { from: "you" | "planner"; text: string };

type StepKey = "days" | "pax" | "budget" | "done";

const STEP_QUESTION: Record<Exclude<StepKey, "done">, string> = {
  days: "How long have you got?",
  pax: "And how many of you are going?",
  budget: "Last one — how should it feel?",
};

const OPTIONS: Record<Exclude<StepKey, "done">, { label: string; value: string }[]> = {
  days: [
    { label: "A long weekend", value: "4" },
    { label: "About a week", value: "7" },
    { label: "Ten days or so", value: "10" },
    { label: "Two weeks +", value: "14" },
  ],
  pax: [
    { label: "Just me", value: "1" },
    { label: "Two of us", value: "2" },
    { label: "A small group", value: "4" },
    { label: "Six or more", value: "7" },
  ],
  budget: [
    { label: "Keep it lean", value: "backpacker" },
    { label: "Comfortable", value: "comfort" },
    { label: "Really treat us", value: "heritage" },
  ],
};

function PlanInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { db } = useDeshatan();

  const mood = params.get("mood") ?? "";
  const [turns, setTurns] = useState<Turn[]>([]);
  const [step, setStep] = useState<StepKey>("days");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [typed, setTyped] = useState("");
  const [signals, setSignals] = useState<Signal[]>([]);
  const end = useRef<HTMLDivElement>(null);

  // open on what they typed, and say back what was actually understood
  useEffect(() => {
    const found = readMood(mood);
    setSignals(found);
    const opening = found.length
      ? `Got it — ${found.slice(0, 3).map((f) => SIGNAL_LABEL[f]).join(", ")}. I can work with that.`
      : "Right, let's work out what fits. Three quick questions.";
    setTurns([
      ...(mood ? ([{ from: "you", text: mood }] as Turn[]) : []),
      { from: "planner", text: opening },
      { from: "planner", text: STEP_QUESTION.days },
    ]);
  }, [mood]);

  useEffect(() => {
    end.current?.scrollIntoView({ block: "nearest" });
  }, [turns]);

  const answer = (label: string, value: string) => {
    const next = { ...answers, [step]: value };
    setAnswers(next);
    const order: StepKey[] = ["days", "pax", "budget", "done"];
    const following = order[order.indexOf(step) + 1];
    setTurns((t) => [
      ...t,
      { from: "you", text: label },
      ...(following !== "done"
        ? ([{ from: "planner", text: STEP_QUESTION[following] }] as Turn[])
        : ([
            {
              from: "planner",
              text: "Here's what I'd send you on. Pick one and I'll carry your answers into it.",
            },
          ] as Turn[])),
    ]);
    setStep(following);
  };

  /* Free text at any point is read for more signals rather than dropped. */
  const sendTyped = () => {
    const text = typed.trim();
    if (!text) return;
    const more = readMood(text);
    setSignals((prev) => Array.from(new Set([...prev, ...more])));
    setTurns((t) => [
      ...t,
      { from: "you", text },
      {
        from: "planner",
        text: more.length
          ? `Noted — ${more.map((m) => SIGNAL_LABEL[m]).join(" and ")}. ${step === "done" ? "I've reshuffled the list below." : ""}`
          : "Noted. I'll keep that in mind.",
      },
    ]);
    setTyped("");
  };

  const ranked = db ? rankDestinations(db.destinations, signals).slice(0, 3) : [];
  const days = Number(answers.days) || 7;
  const pax = Number(answers.pax) || 2;
  const style = (answers.budget as ReturnType<typeof styleFor>) || styleFor(signals);

  const build = (destId: string, destDays: number) => {
    const draft = emptyDraft(destId, days || destDays);
    draft.pax = pax;
    draft.style = style;
    draft.pace = paceFor(signals);
    saveDraft(draft);
    router.push("/book/customize");
  };

  return (
    <BookingShell
      eyebrow="Batao Na"
      title="Tell me the trip you want"
      lede="Not a search box — say what you're after and I'll match it against what we actually run."
    >
      <div className={s.planWrap}>
        <div className={s.planPanel}>
          <header className={s.planHeader}>
            <span className={s.planAvatar} aria-hidden="true">
              ✦
            </span>
            <span className={s.planWho}>
              <b>Deshatan planner</b>
              <small>Matches what you say against the trips we run</small>
            </span>
          </header>

          <div className={s.planThread} role="log" aria-live="polite">
            {turns.map((turn, i) =>
              turn.from === "you" ? (
                <p key={i} className={s.planYou}>
                  {turn.text}
                </p>
              ) : (
                <div key={i} className={s.planRow}>
                  <span className={s.planAvatarSm} aria-hidden="true">
                    ✦
                  </span>
                  <p className={s.planBot}>{turn.text}</p>
                </div>
              ),
            )}

            {step !== "done" ? (
            <div className={s.planChoices}>
              {OPTIONS[step].map((o) => (
                <button
                  type="button"
                  key={o.value}
                  className={s.chip}
                  onClick={() => answer(o.label, o.value)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          ) : null}

            {step === "done" && ranked.length ? (
            <div className={s.planResults}>
              {ranked.map(({ dest, why }) => (
                <article className={s.planCard} key={dest.id}>
                  <span className={s.planCardMedia}>
                    {TRIP_PHOTOS[dest.id] ? (
                      <Image
                        src={TRIP_PHOTOS[dest.id]}
                        alt={TRIP_ALT[dest.id] ?? dest.title}
                        width={400}
                        height={260}
                        sizes="180px"
                      />
                    ) : null}
                  </span>
                  <div className={s.planCardBody}>
                    <h2>{dest.title}</h2>
                    <p className={s.tripMeta}>
                      {days} days · {pax} {pax === 1 ? "person" : "people"} ·{" "}
                      <b>{inr(estimateFor(dest, pax, days))}</b>
                    </p>
                    {why.length ? (
                      <p className={s.planWhy}>
                        Matched on {Array.from(new Set(why)).join(", ")}
                      </p>
                    ) : (
                      <p className={s.planWhy}>Our most-booked trip</p>
                    )}
                    <div className={s.planCardActions}>
                      <Link className={s.btnGhost} href={`/book/trip/${dest.id}`}>
                        See the trip
                      </Link>
                      <button
                        type="button"
                        className={s.btn}
                        onClick={() => build(dest.id, dest.days)}
                      >
                        Build this →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : null}

            <div ref={end} />
          </div>

          <form
            className={s.planComposer}
            onSubmit={(e) => {
              e.preventDefault();
              sendTyped();
            }}
          >
            <label className={s.srOnly} htmlFor="plan-input">
              Add anything else
            </label>
            <input
              id="plan-input"
              value={typed}
              placeholder="Anything else? Dates, people, things to avoid…"
              onChange={(e) => setTyped(e.target.value)}
            />
            <button
              type="submit"
              className={s.planSend}
              aria-label="Send"
              disabled={!typed.trim()}
            >
              <span aria-hidden="true">→</span>
            </button>
          </form>
        </div>

        <p className={s.planNote}>
          This planner reads what you type for intent and matches it against the
          trips we run. It isn&apos;t a chatbot — every answer comes from the real
          catalogue and the real prices.
        </p>
      </div>
    </BookingShell>
  );
}

export default function PlanPage() {
  return (
    <Suspense
      fallback={
        <BookingShell eyebrow="Batao Na" title="Tell me the trip you want">
          <p style={{ textAlign: "center" }}>One moment.</p>
        </BookingShell>
      }
    >
      <PlanInner />
    </Suspense>
  );
}
