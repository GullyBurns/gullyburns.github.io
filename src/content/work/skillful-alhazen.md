---
title: "Skillful-Alhazen: AI-Powered Knowledge Curation"
description: "A TypeDB-powered scientific knowledge notebook built on Claude Skills, embodying the critical reading philosophy of the medieval scholar Ibn al-Haytham."
pubDate: 2026-03-22
organization: "Personal Project"
tags: ["ai", "knowledge-engineering", "typedb", "claude-code", "scientific-curation"]
featured: true
---

> *"The duty of the man who investigates the writings of scientists, if learning the truth is his goal, is to make himself an enemy of all that he reads, and, applying his mind to the core and margins of its content, attack it from every side."*
>
> — Ibn al-Haytham (Alhazen), 965-1039 AD

**A thousand years ago** a scholar named Ibn al-Haytham (later known as 'Alhazen' to the west) rashly promised the Caliph of Egypt that he could regulate the flooding of the Nile. When fieldwork proved the scheme impossible, he had to tell the notoriously volatile ruler that his grand plan would fail. Fearing for his life, he pretended to go insane and was placed under house arrest for ten years. 

According to legend, it was during this time, in the dark of his confinement, a small hole in the wall projected a perfect inverted image of the outside scene onto a bare white wall. He realized in a flash how the eye worked and invented the 'camera lucida' as an optical instrument. Such is the story.  

Stories nonwithstanding, we know that Ibn al-Haythem discovered how the eye works and wrote the masterful *Book of Optics* around the years 1011-1021 CE. This work was so foundational that it shaped the understanding of light and vision for six centuries. He was arguably the first authentic scientist who principally derived his worldview from experimentation and observation. He also articulated a philosophy of critical reading. The duty of anyone who investigates the writings of scientists, he argued, is to make themselves an *enemy* of all they read—to attack it from every side, suspect every conclusion, and distrust even their own judgment.

That adversarial stance toward information provides a useful framing for AI-enabled online research. When we're inundated with information, Let us interrogate the things we see, hear, and read with caution and a careful mindset. Finding truth is challenging, hard, work. The goal of this project is to use AI to make that goal easier.  

In his book *Where Good Ideas Come From*, Steven Johnson wrote about the 'commonplace book' - a form of personal notebook where thinkers would note down passages, observations, and ideas organized by thematic headings. Johnson described his own use of this underlying idea in his work as an author, and then took the idea one-stage further: he worked with Google to create NotebookLM, an AI agent that analyzes users' collections of online resources to provide explanations, analysis, and understanding over their content.   

Inspired by that idea, I coded [Skillful-Alhazen](https://github.com/GullyBurns/skillful-alhazen), an AI research assistant powered by an underlying '*ontological notebook*'. Rather than relying only on AI's raw ability with natural language to define the semantics of content, the system uses a powerful new knowledge graph technology \([TypeDB](https://typedb.com/)\) that is ideally suited to support AI-agents generally \([blog post](https://typedb.com/blog/why-agents-need-ontologies)\). 


**What makes Alhazen 'skillful'?**

Here, we combine Claude's innovative idea of **agent skills** (a compartmentalized agentic capability packaged in the most flexible, lightweight way possible) with an ontologically-powered knowledge graph to represent the universe of discourse needed for that capability. 

This is a powerful modeling distinction - if each skill represents a well-defined domain where everything we want to say about that domain must be defined explicitly then we face a trade off between semantic complexity and tractability. The more complex the underlying reasoning is, the harder it is to encode and query. AI's current success is driven by machine learning, neural networks, and probabilistic reasoning - so why fall back to logic representations that notoriously failed to deliver in past epochs of AI devleopment? 

There are advantages to concrete, closed world reasoning: it is deterministic, it is inherently explainable, it scales well. As a commercial-grade database, TypeDB supports this functionality at scale with enough logical richness to permit genuine utility.  

Moreover, modern frontier models (and their coding agents) are powerful enough to be able to translate everyday human instructions into code that execute effectively over these databases. Claude can build and edit schema; it can write code to execute queries; it can write ad-hoc queries on-the-fly; it can catch its own mistakes and correct them; it can format data appropriately. Moreover, (and most impressively) because TypeDB is a declarative formulation that is robust to schema changes without corrupting the entire database, Claude can follow instructuions to *redesign the TypeDB knowledge graph on-the-fly*. 

If each skill represents a specific domain, so that the domain's conceptual model (entities, relations, artifacts, inferences, etc.) can be generated by the agent itself as part of an automated *domain modeling* meta-skill. Moreover, we can instrument the Claude to track its failings and performance gaps in the use of the skill over time (storing these gaps in a KG dedicated to the model of that particular domain) to create an agent loop where it iteratively improves the implementation of the skill over time. 

As someone who has worked in the field of scientific knowledge engineering for decades, the combination of LLM + Logic unlocks a real superpower. The intrinsic challenge of developing a rich, accurate, well-designed knowledge representation for any given domain becomes tractable. 

**Curation Design Patterns - The Importance of Provenance**

The project has grown out of work I did previously to help researchers make sense of scientific literature at scale. The key to that work is being able to track the provenance of information. In Alhazen, research work is defined as following the following process: 

1. **Discover** - where you find information that is relevant for your domain
2. **Ingest** - where you make a copy of that information in the context of your study
3. **Sensemaking** - where you read the content and interpret it according to some underlying conceptual model
4. **Analysis** - where you synthesize the information you compiled from each source into a whole for some purpose
5. **Report** - where you generate output for your user community.  

This relatively simple design pattern is applicable to a wide range of curation tasks and is supported in our case by the following high-level object types (with examples from two domains Job Hunting and Literature Review):

| Alhazen Type | Your Domain | Example (Job Hunt) | Example (Lit Review) |
|--------------|-------------|-------------------|---------------------|
| **Task** | The goal framing the curation | "Find a senior ML role" | "Understand CRISPR off-target effects" |
| **Thing** | Primary items you track | Company, Position | Paper, Author |
| **Artifact** | Raw captured content | Job Description | PDF, Abstract |
| **Fragment** | Extracted pieces | Requirement | Claim, Method |
| **Note** | Claude's analysis | Fit Analysis | Critique, Summary |

Here, we explicitly define classes of entities that model information artifacts that pertain to the things under study. Papers may describe scientific phenomena; online postings describe job opportunities. Tracking the relationship between your research's end product about a 'thing' requires you to track how you came to derive that end product from existing sources. 

---

**Worked Examples**

We describe two examples of the system's use: 

The first is job hunting. Not the most glamorous use case, but a genuinely painful information problem (and a relatively simple use case): too many postings, too little signal, and the cognitive burden of tracking everything across spreadsheets and browser tabs while also trying to prepare for interviews and maintain morale. The system ingests job postings from URLs you share with it, extracts the requirements, maps them against your profile, identifies gaps, and tracks where you are in each process. Run overnight, it can forage for new postings matching a set of criteria and bring you a morning briefing. The knowledge graph means it can answer questions across your entire search—"what skills keep appearing in the jobs I'm most excited about?"—not just about individual postings in isolation. This [YouTube Video](https://www.youtube.com/watch?v=AwxpI7Svtbk) provides a walk-through provides a demonstration of the system performing a mock job search for Albert Einstein in the Bay Area in March 2026. 

The second is the meta-skill of domain modeling. This is the key to the entire approach since it provides a framework for developing prompts, TypeDB schema, scripts, dashboards, and documentation for Claude skills based on source documents. This is developed as a curation task based on design specification artifacts (either supplied by a user or inferred by Claude from descriptions - such as Matt Might's incredibly insightful ['Algorithm for Precision Medicine'](https://bertrand.might.net/articles/algorithm-for-precision-medicine/)). The objects that are generated by this process are the source files of a skill whilst the information that informs the design choices in creating that skill are recorded in the TypeDB knowledge graph. If a design gap or error is noted as the skill is being used, a note can be recorded in the domain-modeling KG, which then can be retrieved and used as context to modify any of the skill's components. This virtuous cycle could be used to automatically improve Alhazen Notebook skills' performance over time.   

Ibn al-Haytham produced his greatest work under constraint. There's something in that worth sitting with. The conditions that force you to be methodical, to slow down, to build rather than browse—they tend to produce something more durable than the frantic pace of open-ended exploration.

That's what I'm trying to build here: a system that is methodical by design, that accumulates rather than forgets, that interrogates rather than collects. An enemy of what it reads, in the best sense - with the truth as it's goal. 

**Repository**: [github.com/GullyBurns/skillful-alhazen](https://github.com/GullyBurns/skillful-alhazen) · Forked from [chanzuckerberg/alhazen](https://github.com/chanzuckerberg/alhazen)