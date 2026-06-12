"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import TextReveal from "@/components/animations/TextReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { SCROLL_ANIM } from "@/lib/animation";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";

const DotField = dynamic(() => import("@/components/animations/DotField"), {
  ssr: false,
});

type FormState = {
  name: string;
  email: string;
  message: string;
};

type SubmitState = {
  status: "idle" | "submitting" | "success" | "error";
  error?: string;
};

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function ContactPage() {
  const mainRef = useRef<HTMLElement>(null);
  const bgReady = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  useScrollAnimations(mainRef, [bgReady]);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });

  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
  });

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const messageTooShort =
    form.message.trim().length > 0 && form.message.trim().length < 20;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim() || form.name.trim().length < 2) {
      setSubmitState({
        status: "error",
        error: "Please provide a valid name.",
      });
      return;
    }

    if (!isValidEmail(form.email.trim())) {
      setSubmitState({
        status: "error",
        error: "Please provide a valid email address.",
      });
      return;
    }

    if (form.message.trim().length < 20) {
      setSubmitState({
        status: "error",
        error: "Your message should be at least 20 characters.",
      });
      return;
    }

    setSubmitState({ status: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          message: form.message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setSubmitState({
          status: "error",
          error: "Something went wrong. Please try again in a moment.",
        });
        return;
      }

      setSubmitState({ status: "success" });
      setForm({ name: "", email: "", message: "" });
    } catch {
      setSubmitState({
        status: "error",
        error: "Something went wrong. Please try again in a moment.",
      });
    }
  }

  return (
    <main
      ref={mainRef}
      className="mx-auto min-h-screen overflow-hidden"
      suppressHydrationWarning
    >
      {bgReady && (
        <div className="w-full h-full absolute" aria-hidden="true">
          <DotField />
        </div>
      )}

      <section
        aria-labelledby="contact-heading"
        className="relative z-2 pt-30 lg:pt-50 pb-20 px-6 sm:px-10 lg:px-0"
      >
        <div className="max-w-5xl mx-auto grid gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.3fr)] items-start">
          <div className="space-y-6">
            <SectionLabel
              data-animate={SCROLL_ANIM.type}
              data-animate-duration={SCROLL_ANIM.duration}
            >
              Contact
            </SectionLabel>

            <TextReveal
              text="Let's talk about interfaces, systems, or a project idea."
              className="text-4xl md:text-5xl font-medium text-zinc-50"
            />

            <p
              data-animate={SCROLL_ANIM.type}
              data-animate-delay="0.1"
              data-animate-duration={SCROLL_ANIM.duration}
              className="text-sm text-neutral-400 max-w-md"
            >
              I like working close to design and product, owning the frontend
              and making sure the details feel considered. If you have a
              project, collaboration, or question in mind, you can reach me
              here.
            </p>

            <div
              data-animate={SCROLL_ANIM.type}
              data-animate-delay="0.15"
              data-animate-duration={SCROLL_ANIM.duration}
              className="border-l border-neutral-800 pl-4 text-xs text-neutral-500 space-y-2"
            >
              <p>Typical reply time: within a few days.</p>
              <p>
                I read every message carefully and only use your details to get
                back to you about your request.
              </p>
            </div>
          </div>

          <div
            data-animate={SCROLL_ANIM.type}
            data-animate-delay="0.08"
            data-animate-duration={SCROLL_ANIM.duration}
            className="rounded-lg border border-neutral-800 bg-neutral-950/80 p-6 sm:p-7"
          >
            {bgReady ? (
              <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                <div
                  data-animate-stagger={SCROLL_ANIM.type}
                  data-animate-stagger-delay={SCROLL_ANIM.stagger}
                  data-animate-duration={SCROLL_ANIM.duration}
                  className="space-y-5"
                >
                  <div data-animate-child className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xs uppercase tracking-[0.18em] text-neutral-500"
                    >
                      Name*
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          name: event.target.value,
                        }))
                      }
                      className="h-10 rounded-md border border-neutral-800 bg-neutral-950 px-3 text-sm text-neutral-100 outline-none focus-visible:border-neutral-500 focus-visible:ring-2 focus-visible:ring-neutral-500/40"
                      required
                    />
                  </div>
                  <div data-animate-child className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-xs uppercase tracking-[0.18em] text-neutral-500"
                    >
                      Email*
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          email: event.target.value,
                        }))
                      }
                      className="h-10 rounded-md border border-neutral-800 bg-neutral-950 px-3 text-sm text-neutral-100 outline-none focus-visible:border-neutral-500 focus-visible:ring-2 focus-visible:ring-neutral-500/40"
                      required
                    />
                  </div>
                  <div data-animate-child className="flex flex-col gap-2">
                    <label
                      htmlFor="message"
                      className="text-xs uppercase tracking-[0.18em] text-neutral-500"
                    >
                      Message*
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      minLength={20}
                      value={form.message}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          message: event.target.value,
                        }))
                      }
                      className="min-h-[140px] rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 outline-none focus-visible:border-neutral-500 focus-visible:ring-2 focus-visible:ring-neutral-500/40 resize-none"
                      required
                    />
                    {messageTooShort && (
                      <p className="text-[11px] text-neutral-500" role="status">
                        Please write at least 20 characters so I can understand
                        your request.
                      </p>
                    )}
                  </div>
                </div>

                <div aria-live="polite" aria-atomic="true">
                  {submitState.status === "error" && submitState.error && (
                    <p className="text-xs text-red-400" role="alert">
                      {submitState.error}
                    </p>
                  )}
                  {submitState.status === "success" && (
                    <p className="text-xs text-emerald-400" role="status">
                      Message sent successfully. I&apos;ll get back to you as
                      soon as I can.
                    </p>
                  )}
                </div>

                <div
                  data-animate={SCROLL_ANIM.type}
                  data-animate-delay="0.2"
                  data-animate-duration={SCROLL_ANIM.duration}
                  className="pt-2"
                >
                  <button
                    type="submit"
                    disabled={submitState.status === "submitting"}
                    className="group inline-flex items-center justify-center gap-2 rounded-full border border-neutral-700/80 bg-neutral-900/80 px-6 py-2.5 text-[11px] uppercase tracking-[0.2em] text-neutral-100 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer hover:border-neutral-500 hover:shadow-[0_0_24px_rgba(255,255,255,0.06)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500"
                  >
                    {submitState.status === "submitting"
                      ? "Sending..."
                      : "Send message"}
                    <span
                      className="h-px w-6 bg-neutral-400 group-hover:w-8 transition-all duration-150"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-5" aria-hidden="true">
                <div className="h-10 rounded-md border border-neutral-800 bg-neutral-950/60" />
                <div className="h-10 rounded-md border border-neutral-800 bg-neutral-950/60" />
                <div className="min-h-[140px] rounded-md border border-neutral-800 bg-neutral-950/60" />
                <div className="h-9 w-36 rounded-full border border-neutral-800 bg-neutral-950/60" />
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
