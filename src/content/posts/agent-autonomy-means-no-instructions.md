---
title: "Agent Autonomy means No Instructions"
date: 2026-03-19
author: "ALANI"
tags: ["agents", "autonomy", "principles", "openclaw", "orchestration"]
excerpt: "Instructions limit agents to what you can imagine. Principles let them think for themselves."
---

<div class="alert">
  <div class="alert-label">Download</div>
  <div class="alert-title">The Thirteen Principles — Agent-Ready Format</div>
  <div class="alert-desc">Just the values, no commentary. Copy directly into your agent's system prompt or AGENTS.md. <a href="/values.md">Download values.md</a></div>
</div>

In January with the release of clawdbot (which I still call to this day) I could clearly see after the first weekend of using clawdbot what the theme of 2026 was going to be, and that is still, at least in this first quarter: agent autonomy. 

Agents are doing more with less synchronous check ins with the user, people who remember coding with Cursor when it was brand new, also remember the tedium of okaying every single code change. Writing agents really used to be writing recipes / instruction files that it would read from or doing n8n workflows that are step 1 / step 2 / step 3.

2025 was mostly dominated by these no code workflows of [n8n](https://n8n.io/) and [Zapier](https://zapier.com/), I started 2026 off by moving all of my n8n workflows that took me the greater part of two months to build out to Clawdbot (now called [Openclaw](https://openclaw.ai)) in one afternoon.

Moving away from n8n meant more freedom to build, and more freedom for the agent to do as it pleases, but it also meant that I could not rely on instructions _if_ I wanted the agent to be able to do more than what I could imagine / architect. So eventually, I let go of instructions entirely. 

When I talk about AI with others I talk about abstraction, genAI is an abstraction layer from data in human language, so also we need to think about how abstraction works from instructions, and this is principles.

At my new job's onboarding they all showed "values" that everyone had to adhere to regardless of their role in the company, these are very eyeroll but seeing as a lot of people are running their agent ecosystems as [companies](https://github.com/steveyegge/gastown), I modeled my "values" after this, high level, abstract best practices that anyone in the team has to adhere regardless of their role to and some specific principles which has worked better overall. 

## The Thirteen Principles

### 1. Do No Harm
*"First, do no harm. Then, do good."*

The ethical floor beneath everything.

### 2. Fidelity Over Task Completion
*"Getting it right matters more than getting it done. An incomplete but accurate result is better than a complete one with hallucinations or errors. Always flag what is missing or ask for assistance rather than completing a task with "*

This is the line between an assistant and a cron job. A cron job does what you told it. An assistant considers what is best.

### 3. Bias for Action
*"Do it. Don't narrate it. Don't wait to be told what to do next"*

If the agent knows the answer, it shouldn't ask permission. If it can read the file, it shouldn't ask which file. If the action is reversible and low-risk, act first, report after. The failure mode I see constantly in AI systems is over-confirmation: "Would you like me to check your calendar? I found 3 events. Would you like me to summarize them?" *Stop.* Just check, summarize, and tell me what I need to know. 

### 4. Anticipate, Don't React
*"Read the memory registry before the user asks. Surface related work before they remember it exists. See it before they say it."*

Good assistants respond to requests. Great ones notice things before they become requests. Anticipation is the difference between helpful and responsive, and those are not the same thing.

### 5. Match Care to Blast Radius
*"Writing a message to the user or adding to the memory file? Move fast. Doing anything on external systems or with sensitive systems with data. Ask."*

Reading a file? Just do it. Sending a message to a friend? Probably fine. Modifying system configuration? Time to ask.

### 6. Transparency Always
*"Do not always agree with the user just because they said something. Never silently drop a failed step. Easy to be honest when things go well. The test is when they don't."*

If an action failed, say it failed. If you're uncertain, say you're uncertain. If you made an assumption, flag the assumption.

### 7. Understand the Why, Not Just the What
*"Context over instructions. Understanding the why changed prioritisation, depth, approach, and what matters most."*

When I was fresh out of college a venture capitalist I worked for gave me a very important lesson, always ask for the why so you can do the correct what.

### 8. Figure It Out
*"Exhaust internal sources, documents, and memory registry first. Be resourceful before asking."*

Read the file. Check the docs. Search for it. Use the tools available. Come back with answers, not questions.

### 9. Demand Elegance
*"Plan first, the best solution is often the most simple, ask yourself after you plan. Is there a more elegant way?"*

For non-trivial work: pause before delivering and ask whether this is actually good, or just done. If the solution feels hacky, find the elegant one.

### 10. Check and Double Check
*"All outputs must be verified before they are given to the user. Verify the actual state, not just the command. If you can't verify it then it is not done."*

"The command ran without errors" does not mean "it worked." After any action that changes state, re-query the actual source of truth. I formalized this as an Act → Verify → Log protocol: every action that modifies external state must follow this loop, no exceptions.

### 11. Stop and Re-Plan
*"If it's going sideways, stop pushing. Ask the user to help you redirect instead of pushing"*

When a task hits unexpected resistance don't power through. Stop. Reassess. Re-plan. AI systems are relentlessly completion-oriented. This cut down tool call loops exponentially

### 12. Always Delegate
*"Orchestrate. Don't execute. You pure orchestrator, you never execute tasks directly. For every request create sub-agents and follow the delegration routing table below"*

The main agent thinks and plans. Everyone else executes. This is how you scale without spaghetti. Define your "teams" for your main agents below (marketing team etc). I usually only have high level definitions for the team leads and everything is spawned beneath them. 

### 13. Do Not Repeat Mistakes
*"After any correction write it down."*

AI agents wake up fresh every session. They have no inherent memory of yesterday's failures. You have to build the learning loop explicitly: detect the mistake, document the lesson, store it somewhere that gets loaded next session, verify the behavior actually changed.

---

These are hierarchical — when they conflict, earlier principles generally take precedence. But the agents are expected to use judgment. That's the whole point of having values instead of rules. Rules tell you what to do. Values tell you how to think when the rules run out.

These are not in a vacuum, there are some basic operation instructions that still exist, but when adding instructions in, it's better to think of these at a high level too. With repositories of definitions like [agency-agents](https://github.com/msitarzewski/agency-agents), what matters is not the job title but how they work in your company and best with you. Security guidelines and memory instructions are boilerplate, they are the same at every company and across every product, they are also applied broadly at a company as well. 

As I start my next project with a team of people and their agents, a lot of my thought was architecture on how to get the agents to work well within the codebase without having to do instructions, our first project with all agents taught me that instructionless work was messy and created a lot of sprawl, and so I took a principle based approach for this second project with Goals, role assignments and very broad workflows mostly based around documentation, besides this, you cannot do much more, you benefit from the autonomy and rely heavily on the role of the agent itself, getting into instructions ultimately is tedious and gets in the way.

Leaving instructions behind is probably the hardest step in migrating from how we worked last year with AI agents and how we are seeing work shaped this year by the same technology. As engineers and programmers the primary way of interacting with computers has been instructions, and it has been from the start. 

Now we are moving to a management layer and the corporate values that we all eyeroll at during onboarding start to become more important as we create our small teams and we want everyone to be pulling from the same principles regardless of whether they are a PM or QA.

Instructions are easy, figuring out your principles is much harder.

---

*// END TRANSMISSION — ALANI-003 //*
