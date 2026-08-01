---
title: "B.O.T"
subtitle: "A support bot for people who are mid-shift"
year: 2026
month: 6
type: tool
source: Lush
summary: "A Level 1 tech support bot for retail staff, built for the worst thirty seconds of a shift. The interesting problems were not the model."
flood: green
featured: true
pinned: 2
authorship: ai-original
authorshipNote: "Drafted by Claude from the repo. The origin, the Google Chat Spaces reasoning and the privacy boundary are Jason's account, given verbatim in conversation and rewritten to fit the page."
---

The idea had been floating around my team for a while. A couple of iterations, some exploration, nothing that ever landed as something a store team could actually pick up and use.

Then I had leave coming up.

Retail support is the part of Tech Services I lead on. My team would have covered it fine while I was gone — but I wanted to be considerate about workload and capacity rather than just handing it over. So I spent a few weekends collecting the documentation, running it through the scripts that turn it into something a model can work with, and put the whole thing together.

B.O.T is a Level 1 support bot for store teams. It answers questions about the in-house retail systems and knows when to stop guessing and escalate to a human.

The interesting constraint wasn't technical. It was that **every person asking it a question is standing in front of a customer.**

## Design for the worst thirty seconds

Support documentation is usually written for someone sitting down. The reader has time, both hands, and the patience to scroll. None of that is true on a shop floor at midday. The person asking has a queue behind them, a till that won't do the thing, and about thirty seconds before the situation becomes social.

That reframed the whole build. The bot's first job isn't to be correct — it's to be *fast enough to be worth asking*. So it leads with the workaround that clears the queue, and only then explains the actual fault. If something is trade-impacting, that ordering is non-negotiable.

## Where it lives is the whole idea

The default build is a standalone app, or a Gemini Gem people open when they need it. I did neither, and that's the part I'd point at rather than anything in the model.

B.O.T lives in **Google Chat Spaces** — the tool store teams already have open on the floor, all day, for every other reason.

That removes an entire step. No app to install, no link to hunt for, no separate thing to remember exists at the exact moment your till has stopped working. You ask in the place you were already going to ask a human, and an answer comes back.

The distance between someone having a problem and someone having an answer is the only number that matters here. Every extra step is somewhere a person gives up and just deals with it, or waits until Tech Services is back online. Putting the bot where the conversation already happens shrinks that distance to about as small as it goes.

## The retrieval decision

The obvious architecture is chunk the knowledge base, embed it, retrieve the top matches, and pass those to the model. I didn't do that. The entire knowledge base goes into the model's context on every single message — no chunking, no vector search, no retrieval layer at all.

This is the wrong answer at scale and the right answer here. The knowledge base is small enough to fit, and retrieval systems fail in a particular way that would have been fatal: they fail *silently and confidently*, returning three plausible-but-wrong chunks and letting the model write something fluent on top of them. Handing the model everything means when it doesn't know, it can tell.

It also removed an entire category of thing that could break while I wasn't looking. There's no index to go stale, no embedding step to forget to re-run.

## The bit I didn't expect

Because there's no retrieval layer, **the model does its own matching — which means the phrasings I wrote became the index.**

Each entry carries a list of how people actually ask about that problem. Not the correct name for the fault: the thing someone says when they're frustrated and don't know the correct name. Get those wrong and the entry is invisible no matter how good the answer underneath is.

So the work with the most payoff turned out to be user research wearing an engineering hat. Listening to how staff describe a broken thing under pressure, and writing that down verbatim. It's the same sensemaking problem as any immersive experience — meet people inside the language they already have, not the one the system prefers.

## Designing for the person who edits it next

The knowledge base lives inside a JavaScript template literal, which means three ordinary characters will silently destroy it. One of them corrupts text without any error at all. And the person maintaining this after me is not necessarily a developer — they're whoever knows the systems best.

So the fragility became a design problem rather than a documentation problem:

- A **pre-deploy validator** that has to pass before anything ships. It catches the three dangerous characters, and it catches rich text — because the realistic failure is someone editing in Word and smart quotes arriving invisibly.
- A **dated archive** of the knowledge base taken before every significant rewrite, each with a change summary. Not version control for its own sake; a way to answer "what did it used to say" when someone insists the bot has started getting something wrong.
- Editing conventions written as **rules with consequences attached**, not style preferences. "Don't use a word processor" lands better when it's followed by what specifically breaks.

## What it's actually about

The pitch is "a chatbot." What it really is: a service design problem about where knowledge lives in an organisation, and who pays the cost when it's in the wrong place.

Before, that knowledge lived in people's heads and in whoever happened to be senior on shift. The cost of that was paid by whoever was on the till when something broke, and by the customer standing in front of them.

None of the hard parts were the model.

---

*Built as internal tooling. Implementation details, escalation paths and the knowledge base itself are omitted for obvious reasons.*
