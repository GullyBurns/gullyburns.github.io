---
title: "Skillful-Alhazen: AI-Powered Knowledge Curation"
description: "A TypeDB-powered scientific knowledge notebook built on Claude Code, embodying the critical reading philosophy of the medieval scholar Ibn al-Haytham."
pubDate: 2026-02-05
organization: "Personal Project"
tags: ["ai", "knowledge-engineering", "typedb", "claude-code", "scientific-curation"]
featured: true
---

> *"The duty of the man who investigates the writings of scientists, if learning the truth is his goal, is to make himself an enemy of all that he reads, and, applying his mind to the core and margins of its content, attack it from every side."*
>
> — Ibn al-Haytham (Alhazen), 965-1039 AD

[Skillful-Alhazen](https://github.com/GullyBurns/skillful-alhazen) is a **curation system** that helps researchers make sense of information—not just store it. You interact with Claude through natural language, and Claude handles all the complexity of storing, querying, and reasoning over your knowledge graph.

The system combines:
- **Claude Code** as the agentic interface—you talk to Claude, Claude does the work
- **TypeDB** as the knowledge graph backend (you never touch it directly)
- **Skills** for domain-specific workflows (literature review, job hunting, etc.)

The system embodies Alhazen's philosophy: be an enemy of all you read. Don't passively collect—actively interrogate, extract meaning, and build understanding.

Biocuration is the process by which structured content for biomedical databases is generated from external sources. Its a thankless, difficult task, requiring patience, hard work, a certain crazy sense of heroism (in my view), and deep expertise. I feel also that this is a challenge that is effectively solved using modern AI. 

The design pattern of this work consists of five stages:

1. **Foraging** - Discover sources (URLs, APIs, feeds)
2. **Ingestion** - Capture raw content with provenance
3. **Sensemaking** - Claude reads and extracts entities, relationships, insights
4. **Analysis** - Reason over many notes to find patterns and gaps
5. **Reporting** - Dashboard views and synthesized answers

Skillful Alhazen is a lightweight, simplified approach to this by using Claude's skill system coupled with an underlying [TypeDB](https://github.com/typedb/typedb) database to manage the logic of the data generated at each step. The key insight: scripts handle I/O (fetching, storing, querying), while Claude handles comprehension (reading, extracting meaning, synthesizing). This separation minimizes token usage while maximizing Claude's capabilities. This work is forked from CZI's [alhazen](https://github.com/chanzuckerberg/alhazen) project, which I created while at the Chan Zuckerberg Initiative to help researchers understand scientific literature at scale. The original system used LangChain, PostgreSQL, and various LLM providers.

At the heart of Skillful Alhazen is a five-entity data model designed to capture knowledge with full provenance:

| Entity | Purpose | Examples |
|--------|---------|----------|
| **Collection** | Named groupings for organization | "CRISPR Literature Review", "Q1 Job Applications" |
| **Thing** | Any item being tracked | A paper, a company, a job position, a dataset |
| **Artifact** | Raw captured content with provenance | The full text of a job posting, a PDF, an API response |
| **Fragment** | Extracted portions of artifacts | A specific requirement, a key quote, a figure |
| **Note** | Claude's (or your) annotations | Fit analysis, research findings, strategy notes |

This design serves several purposes:

**Provenance preservation.** Every piece of knowledge traces back to its source. When Claude extracts a skill requirement from a job posting, that fragment links to the original artifact (the raw job description), which links to the thing (the position), which may belong to collections (e.g., "High Priority Jobs"). You can always ask: "Where did this come from?"

**Separation of raw and interpreted.** Artifacts store exactly what was captured—no interpretation. Fragments and notes represent Claude's (or your) understanding of that content. This separation means you can re-analyze the same artifact with different prompts or as Claude's capabilities improve.

**Flexible domain extension.** The base model is domain-agnostic. Domain-specific skills (like `/jobhunt` or `/epmc-search`) extend it with specialized entity types. A job position is a Thing; a requirement is a Fragment; a fit analysis is a Note. The pattern remains consistent across domains.

**Query-friendly structure.** TypeDB's pattern matching lets you ask questions like: "Show me all notes about things in my 'High Priority' collection where the note type is 'skill-gap' and the gap is 'required'." The relational structure makes these queries natural.

Part of the initial setup of any use case is to configure the system to some semantic principles over the different Entities shown.

As a practical starting use case, I set this up to support job-hunting. The goal is to use Claude Code as the interface, simply interacting through natural conversation:

```
You: I found an interesting job posting at https://example.com/senior-ml-engineer
Claude: [Uses /jobhunt to ingest and analyze the posting, extracts requirements,
        compares to your profile, identifies skill gaps]

You: What skill gaps do I have across my top job prospects?
Claude: [Queries the knowledge graph, synthesizes across positions,
        recommends learning priorities]
```

You never write queries, call APIs, or manage data directly.

We provide a technical innovation by using TypeDB as a logic-driven 'notebook memory' where:
- **Schema defines concepts** Claude thinks with (entities, relations, attributes)
- **Queries are logical** (pattern matching, inference rules)
- **Provenance is preserved** (artifacts → fragments → notes chain)

The schema isn't just storage—it's the conceptual vocabulary for reasoning about a domain.

Following [Richard Sutton's insight](http://www.incompleteideas.net/IncIdeas/BitterLesson.html): general methods that leverage computation win in the long run. We don't over-engineer extraction pipelines or hand-code entity recognizers. Instead:

- Let Claude read and comprehend
- Store what Claude extracts
- Query and synthesize

The system improves as Claude improves, without brittle extraction rules.

The name originates from Ibn al-Haytham (965-1039 AD), latinized as **Alhazen**. He was an Arab mathematician, astronomer, and physicist who pioneered the scientific method through rigorous experimentation—five centuries before Renaissance scientists followed the same paradigm.

His *Book of Optics* fundamentally shaped understanding of vision and light. But it's his philosophy of critical reading that inspires this project: make yourself an *enemy* of what you read, attack it from every side, and suspect even yourself.

According to historical accounts, Ibn al-Haytham's critical method emerged from extraordinary circumstances. Invited by the Caliph of Egypt to regulate the Nile's flooding, he proposed a dam south of Aswan. When fieldwork revealed the scheme was impractical, he had to tell the notoriously volatile Caliph his plan would fail. To escape punishment, Ibn al-Haytham feigned madness and was placed under house arrest for roughly ten years.

During this confinement, he produced his greatest works. Sometimes the most productive work happens under constraint.

## Links

- **Repository**: [github.com/GullyBurns/skillful-alhazen](https://github.com/GullyBurns/skillful-alhazen)
- **Original CZI Project**: [github.com/chanzuckerberg/alhazen](https://github.com/chanzuckerberg/alhazen)

## Technical Stack

- **Agent Framework**: Claude Code with Skills pattern
- **Knowledge Graph**: TypeDB 2.x
- **Dashboard**: Next.js 16 + Tailwind CSS + shadcn/ui
- **Python**: uv for dependency management
- **Infrastructure**: Docker Compose for TypeDB