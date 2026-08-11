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
  const [typing, setTyping] = useState(false);
  const [live, setLive] = useState<boolean | null>(null);
  const end = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  /* The planner lands a beat later, with a typing bubble in between —
     without it the replies appear instantly and it reads as a form. */
  const say = (texts: string[], first = 420, gap = 620) => {
    setTyping(true);
    let at = first;
    texts.forEach((text, i) => {
      timers.current.push(
        window.setTimeout(() => {
          setTurns((prev) => [...prev, { from: "planner", text }]);
          if (i === texts.length - 1) setTyping(false);
        }, at),
      );
      at += gap;
    });
  };

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // open on what they typed, and say back what was actually understood
  useEffect(() => {
    const found = readMood(mood);
    setSignals(found);
    const opening = found.length
      ? `Got it — ${found.slice(0, 3).map((f) => SIGNAL_LABEL[f]).join(", ")}. Everything I suggest is a trip we actually run, at the real price.`
      : "Let's work out what fits. Everything I suggest is a trip we actually run, at the real price.";
    setTurns(mood ? ([{ from: "you", text: mood }] as Turn[]) : []);
    say([opening, STEP_QUESTION.days]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mood]);

  useEffect(() => {
    end.current?.scrollIntoView({ block: "nearest" });
  }, [turns]);

  const answer = (label: string, value: string) => {
    const next = { ...answers, [step]: value };
    setAnswers(next);
    const order: StepKey[] = ["days", "pax", "budget", "done"];
    const following = order[order.indexOf(step) + 1];
    setTurns((t) => [...t, { from: "you", text: label }]);
    say([
      following !== "done"
        ? STEP_QUESTION[following]
        : "Here's what I'd send you on. Pick one and I'll carry your answers into it.",
    ]);
    setStep(following);
  };

  /* Free text always feeds the matcher. If a model is configured it also
     answers the question properly; if not, or if the call fails, the local
     reply stands and the customer sees no difference. */
  const sendTyped = async () => {
    const text = typed.trim();
    if (!text) return;
    const more = readMood(text);
    setSignals((prev) => Array.from(new Set([...prev, ...more])));
    const history: { role: "user" | "assistant"; content: string }[] = [
      ...turns.map((t) => ({
        role: (t.from === "you" ? "user" : "assistant") as "user" | "assistant",
        content: t.text,
      })),
      { role: "user", content: text },
    ];
    setTurns((t) => [...t, { from: "you", text }]);
    setTyped("");

    const local = more.length
      ? `Noted — ${more.map((m) => SIGNAL_LABEL[m]).join(" and ")}.${step === "done" ? " I've reshuffled the list below." : ""}`
      : "Noted. I'll keep that in mind.";

    if (live === false) return say([local]);

    setTyping(true);
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();
      setLive(Boolean(data?.configured));
      setTyping(false);
      say([data?.configured && data?.reply ? data.reply : local], 120);
    } catch {
      setLive(false);
      setTyping(false);
      say([local], 120);
    }
  };

  const ranked = db ? rankDestinations(db.destinations, signals).slice(0, 3) : [];
  const days = Number(answers.days) || 7;
  const pax = Number(answers.pax) || 2;
  const style = (answers.budget as ReturnType<typeof styleFor>) || styleFor(signals);

  const restart = () => {
    timers.current.forEach(clearTimeout);
    setAnswers({});
    setStep("days");
    setTurns([]);
    say(["Start again then. How long have you got?"], 260);
  };

  const build = (destId: string, destDays: number) => {
    const draft = emptyDraft(destId, days || destDays);
    draft.pax = pax;
    draft.style = style;
    draft.pace = paceFor(signals);
    saveDraft(draft);
    router.push("/book/customize");
  };

  return (
    <BookingShell title="Plan a trip" titleAs="hidden" fill>
      <div className={s.planWrap}>
        <div className={s.planPanel}>
          <div className={s.planThread} role="log" aria-live="polite">
            {turns.map((turn, i) =>
              turn.from === "you" ? (
                <p key={i} className={s.planYou}>
                  {turn.text}
                </p>
              ) : (
                <p key={i} className={s.planBot}>
                  {turn.text}
                </p>
              ),
            )}

            {typing ? (
              <p className={s.planTyping} aria-label="Planner is typing">
                <span />
                <span />
                <span />
              </p>
            ) : null}

            {!typing && step !== "done" ? (
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

            {!typing && step === "done" && ranked.length ? (
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

          {step !== "days" || Object.keys(answers).length ? (
            <button type="button" className={s.planRestart} onClick={restart}>
              Start over
            </button>
          ) : null}
        </div>

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
