import Link from "next/link";
import {
  InstagramLogo,
  LinkedinLogo,
  TwitterLogo,
} from "@phosphor-icons/react/dist/ssr";

const columns = [
  {
    title: "Product",
    links: ["Cost tracking", "Bids & estimates", "Crew management", "Bill pay"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Contact", "Press"],
  },
  {
    title: "Resources",
    links: ["Help center", "Guides", "API docs", "Status"],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border-default bg-bg-elevated">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2">
            <Link href="/prototypes/marketing" className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-cta text-sm font-bold text-white">
                G
              </span>
              <span className="text-lg font-semibold tracking-tight text-text-primary">
                Gravel
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-secondary">
              The business side of contracting, finally simple.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a href="#" aria-label="Twitter" className="text-text-tertiary hover:text-text-secondary">
                <TwitterLogo size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-text-tertiary hover:text-text-secondary">
                <InstagramLogo size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-text-tertiary hover:text-text-secondary">
                <LinkedinLogo size={20} />
              </a>
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-text-primary">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border-default pt-8 sm:flex-row">
          <p className="text-sm text-text-tertiary">
            © {new Date().getFullYear()} Gravel. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-text-tertiary hover:text-text-secondary">
              Privacy
            </a>
            <a href="#" className="text-sm text-text-tertiary hover:text-text-secondary">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
