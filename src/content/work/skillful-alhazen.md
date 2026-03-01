---
title: "Skillful-Alhazen: AI-Powered Knowledge Curation"
description: "A TypeDB-powered scientific knowledge notebook built on Claude Code and OpenClaw, embodying the critical reading philosophy of the medieval scholar Ibn al-Haytham."
pubDate: 2026-02-28
organization: "Personal Project"
tags: ["ai", "knowledge-engineering", "typedb", "claude-code", "scientific-curation"]
featured: true
---

> *"The duty of the man who investigates the writings of scientists, if learning the truth is his goal, is to make himself an enemy of all that he reads, and, applying his mind to the core and margins of its content, attack it from every side."*
>
> — Ibn al-Haytham (Alhazen), 965-1039 AD

In the eleventh century, so the story goes, a scholar in Cairo had made some rash promises to the Caliph of Egypt. He had said that he could regulate the flooding of the Nile. When fieldwork proved the scheme impossible, he had to tell the notoriously volatile ruler that his grand plan would fail. Fearing for his life, Ibn al-Haytham, pretended to go insane and was placed under house arrest for ten years. 

According to legend, it was during this time, in the dark of his confinement, a small hole in the wall projected a perfect inverted image of the outside scene onto a bare white wall. The man (later known as 'Alhazen' to the west) realized in a flash how the eye worked and invented the 'camera lucida' as an optical instrument.  

Legends and myths always surround the lives of great figures. They embellish and serve to create mystique but rarely serve to illuminate the truth of what happened.   

The one thing we can be sure of is that a millenia ago, in the 11th century, Ibn al-Haythem wrote the *Book of Optics*, a work so foundational that it shaped the understanding of light and vision for six centuries. He also articulated something more durable than any single discovery: a philosophy of critical reading. The duty of anyone who investigates the writings of scientists, he argued, is to make themselves an *enemy* of all they read—to attack it from every side, suspect every conclusion, and distrust even their own judgment.

I named this project after him because that adversarial stance toward information feels like exactly the right posture for AI-assisted research. We're in a moment where it's very easy to use AI to accumulate—to summarize, collect, store. What's harder, and more valuable, is to use it to *interrogate*.

---

[Skillful-Alhazen](https://github.com/GullyBurns/skillful-alhazen) is a personal AI research assistant built around that idea. You talk to it in plain language, and it then goes off and does the work: reading sources, extracting what matters, storing it in a structured knowledge graph, and surfacing connections across everything it's learned. Unlike a chat window, it doesn't forget between sessions. And unlike a search engine, it doesn't just find things—it builds up an understanding of a domain over time.

The system runs in two modes. On your laptop, interactively, through Claude Code. Or—and this is where it gets interesting—persistently on a dedicated machine that runs overnight, sends you Telegram messages when it discovers something worth your attention, and picks up exactly where it left off when you check in the next morning. You go to sleep; it keeps working.

The knowledge it accumulates is stored in a graph database ([TypeDB](https://github.com/typedb/typedb)) that tracks not just facts but their provenance—where something came from, what was inferred versus captured verbatim, how pieces of evidence connect to each other. When you ask "where did this come from?", the system can actually answer. When you ask "what's the common thread across these findings?", it has the structure to reason across them rather than just keyword-matching.

---

The project has grown out of work I did previously to help researchers make sense of scientific literature at scale. That work convinced me of something that seems simple but has significant implications: the bottleneck in research isn't finding information. It's *making sense* of it. Finding is something search engines do reasonably well. Sense-making—reading carefully, extracting what matters, holding many sources in tension with each other, noticing when something doesn't add up—is something humans do, slowly and expensively, and that AI is now genuinely good at.

Biocuration is the formal discipline that sits at this intersection. Biocurators read scientific papers and transform their contents into structured database entries—the kind that power drug discovery pipelines, clinical decision support systems, and rare disease databases. It's painstaking work, done by specialists, and there's never enough of it. The backlog of unread literature in any given field grows faster than the community of people who could curate it.

The promise of AI-assisted curation isn't just automation—it's scale. A system that can read a thousand papers overnight and surface the ones that matter, extract the specific facts a researcher needs, and flag the ones that seem to contradict each other, changes what's possible. Not by replacing expert judgment but by making sure that judgment gets applied to the things that most need it.

---

The two research workflows I've built so far sit at opposite ends of the urgency spectrum.

The first is job hunting. Not the most glamorous use case, but a genuinely painful information problem (and a relatively simple use case): too many postings, too little signal, and the cognitive burden of tracking everything across spreadsheets and browser tabs while also trying to prepare for interviews and maintain morale. The system ingests job postings from URLs you share with it, extracts the requirements, maps them against your profile, identifies gaps, and tracks where you are in each process. Run overnight, it can forage for new postings matching a set of criteria and bring you a morning briefing. The knowledge graph means it can answer questions across your entire search—"what skills keep appearing in the jobs I'm most excited about?"—not just about individual postings in isolation.

The second is rare disease investigation—and this one matters in a different way. Rare disease patients wait an average of four to seven years for a correct diagnosis. They typically see eight or more physicians. Their conditions are described across scattered case reports, orphan disease databases, and specialist literature that no single clinician can hold in their head. The system works through a structured investigative process: starting from a set of symptoms, it queries clinical databases and genomic resources, generates candidate diagnoses ranked by evidence, traces the genetic and phenotypic connections between them, and surfaces the literature that most directly bears on the case. It's not replacing a geneticist's judgment—it's giving that judgment the breadth of information it needs to work with.

Both workflows share the same underlying architecture: a knowledge graph that accumulates understanding over time, an AI that reads and reasons rather than just retrieves, and a persistent deployment that does the slow work of information gathering so that human attention can be reserved for the questions that most require it.

---

There's a design principle baked into all of this: the [bitter lesson](http://www.incompleteideas.net/IncIdeas/BitterLesson.html). Richard Sutton's observation—that general methods leveraging computation reliably beat hand-engineered approaches in the long run—applies here. I don't write extraction rules for job requirements or hand-code entity recognizers for rare disease phenotypes. I let Alhazen read, comprehend, and extract, and I build the structure that stores what it finds. As Alhazen gets better, the system gets better, without any changes on my end.

The schema isn't just storage. It's the conceptual vocabulary for a domain—the set of things Alhazen thinks *with* when it reasons about a job search or a diagnostic puzzle. Defining that schema carefully is where the real intellectual work happens. Everything else follows.

---

Ibn al-Haytham produced his greatest work under constraint. There's something in that worth sitting with. The conditions that force you to be methodical, to slow down, to build rather than browse—they tend to produce something more durable than the frantic pace of open-ended exploration.

That's what I'm trying to build here: a system that is methodical by design, that accumulates rather than forgets, that interrogates rather than collects. An enemy of what it reads, in the best sense.

**Repository**: [github.com/GullyBurns/skillful-alhazen](https://github.com/GullyBurns/skillful-alhazen) · Forked from [chanzuckerberg/alhazen](https://github.com/chanzuckerberg/alhazen)