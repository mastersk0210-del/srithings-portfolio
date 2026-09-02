import { track as vercelTrack } from "@vercel/analytics";

export type AppEvent =
  | "cta_book_click"
  | "model_open"
  | "demo_run"
  | "scroll_reach_contact"
  | "contact_submit";

export function track(event: AppEvent, props?: Record<string, string | number | boolean>) {
  try {
    vercelTrack(event, props);
  } catch {
    /* no-op */
  }
}
