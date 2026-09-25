import { useEffect } from "react";
import { siteConfig } from "../config/brand";

interface PageMeta {
  title: string;
  description: string;
  path: string;
  image?: string;
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Client-side SEO metadata (Section 36).
 * Every route sets title, description, canonical, OG and Twitter tags.
 */
export function usePageMeta(meta: PageMeta): void {
  useEffect(() => {
    const url = `${siteConfig.domain}${meta.path === "/" ? "/" : meta.path}`;
    const title = `${meta.title} — BharatX Group`;
    const image = meta.image ?? "/assets/backgrounds/hero-field.jpg";

    document.title = title;
    upsertMeta("name", "description", meta.description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", meta.description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", `${siteConfig.domain}${image}`);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", meta.description);
    upsertMeta("name", "twitter:image", `${siteConfig.domain}${image}`);
    upsertLink("canonical", url);
  }, [meta.title, meta.description, meta.path, meta.image]);
}
