---
title: "Connecting People & Places"
subtitle: "An AR scavenger hunt for SIGGRAPH Asia 2023"
summary: "A location-based AR game for conference delegates, and a paper submitted to SIGGRAPH Asia on telling cultural heritage stories in the gap between digital and physical."
year: 2023
month: 11
type: project
source: UNSW × ACM SIGGRAPH
flood: blue
pdf: SIGGRAPHAsia2023Poster.pdf
featured: true
pinned: 3
authorship: ai-from-source
authorshipNote: "Claude's prose, from the SIGGRAPH paper, the outcome presentation and Jason's professional reflection. Originally drafted from a pixel-recovered reading of the paper; re-checked against the source PDF on 2 Aug 2026 when it was found, and the reading held up."
---

Sydney's urban centre, broken into ten zones around iconic locations. A preliminary survey of ten of them produced **57 possible points of interest**, sorted into four categories: computer graphics, Aboriginal history, iconic Australia, arts and culture.

That was the map underneath an augmented reality scavenger hunt built for delegates arriving at **SIGGRAPH Asia 2023** in Sydney — my Masters capstone, on an industry placement with ACM SIGGRAPH led by June Kim.

It had to do two jobs at once: be a real thing conference-goers would actually use, and be a research vehicle for a question worth asking.

## The paper

<figure>
<img src="/images/capstone/the-paper.png" alt="Two pages of the SIGGRAPH Asia 2023 poster submission, titled Connecting People and Places through immersive storytelling, with wireframe screenshots of the AR application" loading="lazy" />
<figcaption>The poster submission. Wallace, Moisiadis, Kyriakaki & Kim, ACM, 2023.</figcaption>
</figure>

**Connecting People & Places through immersive storytelling.** Anthony Wallace, Jason Moisiadis, Danae-Irene Kyriakaki and June Kim. Poster submission to SIGGRAPH Asia '23, Sydney, 12–15 December 2023.

We took it through the full submission process. It wasn't accepted, so it was never published — the ACM reference on the page still carries the unfilled template placeholders, `978-x-xxxx-xxxx-x` and a DOI of `nnnnnnn.nnnnnnn`. Worth saying plainly, because writing to that standard and putting it in front of that committee is the part that was actually useful.

Three frameworks held the work up.

**Loco-Narrative Harmony** (Millard et al.) — a state where the narrative is mediated from story to place, with attention balanced between the digital and the physical. Lean too hard either way and the experience breaks: too much screen and you've made a phone game that happens to be outdoors; too little and the place carries meaning the app never earns.

**The dérive** — Guy Debord's Situationist practice, "rapid passage through varied ambiences." Participants moving through a space are steered by collective social factors, and across enough dérives, common patterns emerge. Reading those *psychogeographical contours* tells you both where the significant points of social interest sit and, more usefully, what the marginal spaces leave untold.

**Serious games.** The point of difference from something like Pokémon Go is how the intervention is phrased: give people information in a way that's genuinely fun, then challenge them to use it. Engaging and educational, rather than engaging instead of educational.

## Invisible landmarks

The best idea in the paper is a subversion of how location-based games normally work.

Traditional AR games need landmarks — fixed, identifiable, reliably there. But some stories have no objective location to attach to. Colonial assimilation practices severed them from place, and Indigenous oral histories were never tied to a single point to begin with. The **"Goanna Walking" trail** marks continuity *in moving along* different locations, not in standing at one.

So rather than forcing those stories onto a pin, we planned AR interventions that reintroduce them as nodes conducive to loco-narrative harmony — either a transient node with a chance of activating anywhere within an area, or a node deliberately placed in an unremarkable spot between two better-trafficked ones.

As a counterweight to the landmarked locations, the same mechanism could integrate fiction into the real city: **"42 Wallaby Way, Sydney"** from *Finding Nemo* has no address, and putting it somewhere is its own kind of harmony. Fiction and real life reflecting each other is one of the major sources of familiarity in storytelling.

## What I took from it

<figure>
<img src="/images/capstone/project-intro.png" alt="A presentation slide in flat orange and grey, reading: the project I joined was led by June Kim for The International Association for Computing Machinery's Special Interest Group on Computer Graphics and Interactive Techniques, or ACM SIGGRAPH for short" loading="lazy" />
<figcaption>From the outcome presentation, November 2023.</figcaption>
</figure>

**On fidelity.** We should have been agile — building out and upward toward only the level of fidelity the project actually needed. Choosing what's needed and what isn't has to be critical in immersive technology, because in theory there's a whole world of senses and technologies available, and only a tiny subset will help any given project. Selecting those and only those is the job.

**On serious games.** The strongest thing I wrote in the reflection has nothing to do with AR:

> You can't just have a tram driver overshoot their stop so they can practise realigning at that stop. Doing that will break their immersion and discredit their trust in their training. They are professionals at their jobs and they know when they do something wrong or right.
>
> For learning to be effective there needs to be mutual trust in the competence of the individuals behind the coding and behind the wheel. You can't just blame it on the user if they aren't learning what you are trying to teach them. You need to think through the fact they are a person and build backwards from there.

**On the state of the field.** Reading for the paper, I got to see us working to settle on a *why* behind the work. There are firm theoretical bases for a lot of what we do in other disciplines, yet the bridge to how they link into our content is still under construction and waiting for more hands.

**On myself.** I know that without a firm framework to move around, I can really struggle — and I did in this project. We were largely left to figure things out, and the weeks where June came in to brainstorm were the best learning of the whole placement. I needed to be more self-directed in response than I managed.

I also came out of it clearer on two things: I thrive on large teams and don't put myself in them often enough, and I need to be working on something that makes a real difference to people to stay motivated at all.
