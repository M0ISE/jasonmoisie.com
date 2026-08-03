/**
 * The CV as data, for anything that would rather parse than read — an ATS, a
 * scraper, a model being asked "what has this person done".
 *
 * Same records as /resume, so it cannot drift. Deliberately plain: no flood
 * colours, no layout, no markup. Just the facts with their labels attached.
 */
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { profile } from "../data/profile";
import { datelineShort, shelf } from "../lib/work";

export const GET: APIRoute = async () => {
  const order = ["lush", "organic-bread-bar", "bluebottle"];
  const experience = (await getCollection("experience"))
    .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))
    .map((e) => e.data);

  const eduOrder = ["unsw-masters", "usyd-design-computing", "uts-engineering"];
  const education = (await getCollection("education"))
    .sort((a, b) => eduOrder.indexOf(a.id) - eduOrder.indexOf(b.id))
    .map((e) => e.data);

  const work = (await getCollection("work"))
    .filter((p) => !p.data.draft)
    .sort((a, b) => shelf(b) - shelf(a));

  const body = {
    generated: new Date().toISOString().slice(0, 10),
    source: `${profile.siteUrl}/resume`,
    note: "Generated from the site's own content. Edit src/data/*.yaml, not this file.",
    person: {
      name: profile.name,
      pronouns: profile.pronouns,
      title: profile.title,
      location: profile.location,
      summary: profile.summary,
      email: profile.email,
      phone: profile.phone,
      site: profile.siteUrl,
      linkedin: profile.linkedin,
      github: profile.github,
    },
    experience: experience.map((org) => ({
      organisation: org.org,
      location: org.place,
      span: org.span,
      ...(org.tenure ? { tenure: org.tenure } : {}),
      roles: org.roles.map((r) => ({
        title: r.role,
        years: r.years,
        current: r.current,
        ...(r.place ? { location: r.place } : {}),
        summary: r.note,
        ...(r.projects?.length
          ? {
              projects: r.projects.map((p) => ({
                year: p.year,
                description: p.resumeText ?? p.text,
                ...(p.href ? { url: profile.siteUrl + p.href } : {}),
              })),
            }
          : {}),
      })),
    })),
    education: education.map((e) => ({
      award: e.award,
      institution: e.place,
      years: e.years,
    })),
    work: work.map((p) => ({
      title: p.data.title,
      type: p.data.type,
      source: p.data.source,
      date: datelineShort(p),
      url: `${profile.siteUrl}/work/${p.id}`,
      summary: p.data.summary,
    })),
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
