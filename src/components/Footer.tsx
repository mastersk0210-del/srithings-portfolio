import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa6";
import { site } from "@/lib/site";

const socials = [
  { label: "GitHub", href: site.links.github, Icon: FaGithub },
  { label: "LinkedIn", href: site.links.linkedin, Icon: FaLinkedinIn },
  { label: "Email", href: site.links.email, Icon: FaEnvelope },
  { label: "WhatsApp", href: site.links.whatsapp, Icon: FaWhatsapp },
  { label: "Instagram", href: site.links.instagram, Icon: FaInstagram },
];

export function Footer() {
  return (
    <footer className="container-page border-t border-[var(--border)] py-10 text-sm text-fg-dim">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <p>
          © {new Date().getFullYear()} {site.name} — {site.role}
        </p>
        <div className="flex gap-3">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="grid size-9 place-items-center rounded-full border border-[var(--border)] text-fg-dim transition-colors hover:border-cyan hover:text-cyan"
            >
              <Icon className="size-4" aria-hidden />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
