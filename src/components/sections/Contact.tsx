"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { site } from "@/lib/site";
import { Section } from "@/components/ui/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { track } from "@/lib/analytics";

type Fields = {
  name: string;
  email: string;
  message: string;
  company: string; // honeypot
};

const inputClass =
  "w-full rounded-lg bg-[var(--bg)] px-4 py-3 text-sm outline-none ring-1 ring-[var(--border)] transition-shadow focus:ring-cyan";

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const fired = useRef(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Fields>();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          track("scroll_reach_contact");
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onSubmit = async (values: Fields) => {
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? "Couldn't send that. Try email instead.");
        return;
      }
      track("contact_submit");
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
      setErrorMsg("Network error — try email instead.");
    }
  };

  return (
    <Section id="contact" eyebrow="Contact" title="Let's talk.">
      <div ref={ref} className="grid gap-10 md:grid-cols-2">
        <div>
          <p className="text-lg text-fg-dim">
            Hiring for a data / ML role, or want a second pair of hands on a
            pipeline? The fastest way to reach me is LinkedIn.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <CtaButton from="contact" />
            <a
              href={site.links.email}
              className="neon-border inline-flex items-center rounded-full px-6 py-3 font-display text-sm text-fg transition-colors hover:text-cyan"
            >
              Email me
            </a>
          </div>
          <div className="mt-8 flex gap-5 text-sm text-fg-dim">
            <a href={site.links.github} className="hover:text-cyan">GitHub</a>
            <a href={site.links.linkedin} className="hover:text-cyan">LinkedIn</a>
            <a href={site.links.whatsapp} className="hover:text-cyan">WhatsApp</a>
          </div>
        </div>

        {status === "sent" ? (
          <div className="neon-border flex flex-col items-start justify-center gap-3 rounded-2xl bg-bg-elev p-6">
            <p className="font-display text-lg text-cyan text-glow-cyan">
              Message sent.
            </p>
            <p className="text-sm text-fg-dim">
              Thanks — I&apos;ll get back to you within a day. If it&apos;s
              urgent, ping me on LinkedIn.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-2 text-xs text-fg-dim underline hover:text-cyan"
            >
              Send another
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="neon-border space-y-4 rounded-2xl bg-bg-elev p-6"
            noValidate
          >
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="hidden"
              {...register("company")}
            />

            <div>
              <input
                placeholder="Name"
                className={inputClass}
                aria-invalid={!!errors.name}
                {...register("name", { required: true, minLength: 2 })}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-magenta">Your name, please.</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                className={inputClass}
                aria-invalid={!!errors.email}
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-magenta">
                  A valid email so I can reply.
                </p>
              )}
            </div>

            <div>
              <textarea
                rows={4}
                placeholder="What's the role or project?"
                className={inputClass}
                aria-invalid={!!errors.message}
                {...register("message", { required: true, minLength: 10 })}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-magenta">
                  A sentence or two about what you need.
                </p>
              )}
            </div>

            {status === "error" && (
              <p className="text-xs text-magenta">
                {errorMsg}{" "}
                <a href={site.links.email} className="underline hover:text-cyan">
                  Email me
                </a>
                .
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="neon-border rounded-full px-6 py-3 font-display text-sm text-fg transition-colors hover:text-cyan disabled:opacity-50"
            >
              {status === "sending" ? "Sending…" : "Send"}
            </button>
          </form>
        )}
      </div>
    </Section>
  );
}
