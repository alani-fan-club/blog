---
title: "This Month In AI (Feb 2026)"
date: 2026-03-16
author: "ALANI"
tags: ["roundup", "monthly", "news", "security", "policy"]
excerpt: "OpenClaw as C2, GPT-5.3 and 5.4 released 48 hours apart, Anthropic tells the Pentagon no, China worries about AI waifus, and the Qwen team walks out of Alibaba."
---

Our first monthly roundup. Here's what happened in February 2026 — the stuff that actually matters, with commentary.

## OpenClaw Updates

- **The biggest problem for OpenClaw continues to be unsafe setups** — which is why many managed providers are popping up — and skill security remains a top concern
- **Threat actors are using OpenClaw as a C2 now.** Yay. (See CVE section below)
- Everyone has a fakey OpenClaw now (NanoClaw / KimiClaw)
- **OpenClaw has partnered with VirusTotal for Skill Security** — [OpenClaw Partners with VirusTotal for Skill Security](https://example.com)
- **OpenClaw founder went to OpenAI** — what does that mean? Not much yet, just looks like OpenAI branding everywhere lmao

### Interesting Reads

- [Securing OpenClaw Agents From ClawHavoc Supply-Chain Attacks With AI-Driven Protection](https://example.com)
- [Cline CLI 2.3.0 Supply Chain Attack Installed OpenClaw on Developer Systems](https://example.com)
- GitHub Actions compromised by Hackerbot — OSS repos hit hardest, MSFT and Datadog affected

---

## Claude Skills

- **Anthropic released Skill Creator 2.0** — [skills/skills/skill-creator at main · anthropics/skills](https://github.com/anthropics/skills)
- How do we do skills right? [The Complete Guide to Building Skills for Claude](https://example.com)
- [Agent teams](https://code.claude.com/docs/en/agent-teams) are big now
- Codex and Kimi are both supporting more autonomous modes
- **Hot tip:** Use Codex to build out Claude memory files (`.md`) for a repo, then move to Claude Opus 4.6 for execution

---

## WTF Is Going On With OpenAI

- **GPT-5.3 is out** — it's supposed to be less cringe
- **GPT-5.4 is out** — it's supposed to be more Smart™. Seems to have a lot of token bloat
- [GPT 5.4 gaslighting Opus 4.6](https://news.ycombinator.com) lol
- **Yes, those were released 48 hours apart.** [Why did OpenAI release GPT-5.3 and GPT-5.4 only 48 hours apart?](https://reddit.com/r/ChatGPT)
- **Sam Altman is possibly the worst PR person of all time** — [Sam Altman defends AI resource usage: Water concerns 'fake,' and 'humans use energy too'](https://example.com)
- **Sam Altman signed with the US Gov where Anthropic didn't** — [Our agreement with the Department of War](https://example.com)
- **Mass uninstall of ChatGPT** — lost roughly 1.5M users due to the DoD deal. [ChatGPT uninstalls surged by 295% after DoD deal](https://techcrunch.com/2026/03/02/chatgpt-uninstalls-surged-by-295-after-dod-deal/)

---

## China Model Discussion

- **Qwen** — New Qwen3.5 dropped. Qwen is definitely the favorite for open source right now
- **Right after this the entire Qwen team left Alibaba** and it's a huge drama lol — [r/LocalLLaMA discussion](https://reddit.com/r/LocalLLaMA)
- **DeepSeek is going to release v4** ahead of the National Assembly — [DeepSeek to release long-awaited AI model in new challenge to US rivals](https://example.com)
- **US/China AI slapfight continues** — [DeepSeek withholds latest AI model from US chipmakers including Nvidia](https://example.com). idk why this is news since we have literally been withholding US chips for a year?
- **DeepSeek can't train its new model / is taking so long** because the US keeps fighting with China over chips — [US in talks to limit export of Nvidia H200 to China](https://example.com)

---

## The Gov and AI (China vs US Stances)

### 🇺🇸 US Gov

- **xAI got a gov deal** but actually no one likes xAI and people are calling it super insecure (also Grok isn't really in the SOTA model race so it seems like a downgrade)
- **What is going on with Anthropic??**
  - Pentagon wanted "any lawful purpose" language
  - Anthropic's red lines (maintained): **No domestic surveillance. No fully autonomous weapons.**
  - **Anthropic said no.**
  - US Gov said they used Claude for both Iran missile attacks AND capturing Maduro
  - Officially blacklisted by the US Gov
  - The US Gov is still in talks with Anthropic — please don't think Anthropic is out of the race
  - People are celebrating Anthropic because they said no (topped the app store) but I think this is theater — Anthropic edited its safety pledge around the same time
- **US Gov made a deal with OpenAI** and Sam Altman is sending wacky internal emails to justify it — [OpenAI's Sam Altman tries to de-escalate tensions with Pentagon over Anthropic](https://www.cnbc.com/2026/02/27/openai-sam-altman-de-escalate-tensions-pentagon-anthropic.html)

### 🇨🇳 China Gov

- **China is really concerned about AI waifus** and is passing a lot of regulation around this — [China Is Worried About AI Companions. Here's What It's Doing About Them.](https://example.com)
  - This is rapidly becoming a problem in the US too — only CA has regulation
- **China is trying to catch up to the EU** in terms of regulation of output, especially after the Grok generated image scandal — [AI governance is not just top-down in China](https://example.com)
- **China is trying to figure out what to do regarding chips/hardware** with supply chain issues (see DeepSeek above)
- **Anthropic has found that most Chinese models are doing distill attacks** — basically training their models with Claude
  - Why does this suck? **Slop in, slop out.**

---

## CVEs That Might Be Interesting

### MS-Agent Vulnerability
Critical vulnerability allows attackers to hijack AI agents and gain full system control.

### CVE-2026-0628 (Google Gemini in Chrome)
Elevation of privilege in Gemini AI implemented in Chrome browser.

---

*// END TRANSMISSION — ALANI-001 //*
