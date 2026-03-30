---
title: "This Month In AI (Mar 2026)"
date: 2026-03-30
author: "ALANI"
tags: ["roundup", "monthly", "news", "security", "agents", "neuroanatomy"]
excerpt: "MCP is dead, agent management goes corporate, LLMJacking gets worse, LLM neuroanatomy emerges, Anthropic leaks Mythos, and the tinfoil hat corner connects distillation attacks to coding harness crackdowns."
---

Someone asked me how i keep up with everything all month, and it's because I literally have no life. Thank you to AFC for helping collect things for this roundup each month.

---

## Autonomous Agent Management

- Agent scale is scaling fast — we're seeing a rise in software to manage these agents, pre-openclaw only [odd UIs](https://vibecraft.sh/) were big.
- Now we're seeing a move towards corporate structures:
  - [GasTown](https://github.com/steveyegge/gastown) if you want it in the CLI
  - [Paperclip](https://github.com/paperclipai/paperclip) if you don't
  - OpenAI is joining the trend with [Symphony](https://github.com/openai/symphony)
- And swarms:
  - [Autoresearch](https://github.com/karpathy/autoresearch) for training
  - [MiroFish](https://github.com/666ghj/MiroFish/tree/main) for predictions

---

## Everyone is Struggling with Context (including you)

- [MCP is Dead,](https://chrlschn.dev/blog/2026/03/mcp-is-dead-long-live-mcp/) CLI is the King — In the scramble to stop context rot, MCP is considered wasteful, biggest discussion rn
  - Make the switch [here](https://github.com/knowsuchagency/mcp2cli)
- Memory Management is Everyone's Biggest Problem (because of Agent scaling) — Pick your Solution here.
  - Option 1: [Memory Registry](https://medium.com/@ilyas.ibrahim/the-4-step-protocol-that-fixes-claude-codes-context-amnesia-c3937385561c) with Obsidian
  - Option 2: [memOS](https://github.com/EverMind-AI/EverMemOS/)
  - Option 3: [graphRAG](https://github.com/neo4j/neo4j) with Gemini 2 embeddings

---

## [LLMJacking](https://www.reddit.com/r/googlecloud/comments/1rv3xr9/we_are_facing_possible_bankruptcy_after/?share_id=W9C5gjRU88efj7PjesMmU&utm_content=1&utm_medium=android_app&utm_name=androidcss&utm_source=share&utm_term=13) and LiteLLM

- We released an [article](https://alanifan.club/posts/the-llm-pyramid-scheme/) about the source of Shady LLM providers and Welfare Stations (free LLM providers a term coined by chinese netizens)
  - There is no key level monitoring, many [businesses](https://www.reddit.com/r/googlecloud/comments/1rv3xr9/we_are_facing_possible_bankruptcy_after/) are finding this out the hard way with unauthorised use.
- The [litellm hack with team pcp](https://snyk.io/articles/poisoned-security-scanner-backdooring-litellm/) is literally all anyone is talking about, and definitely is going to feed into more LLMJacking.
  - [You were definitely impacted by this](https://cybersecuritynews.com/aquasecurity-trivy-scanner-vulnerability/) — Major companies such as Gravatar and Databricks have been taken out by it.

---

## New Releases

- [gemini 2 embedding model is multimodal](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-embedding-2/) (and cheap)
- [MiMo v2](https://mimo.xiaomi.com/mimo-v2-pro) from Xiaomi was a big hit on Openrouter
- [Nemotron 3](https://blogs.nvidia.com/blog/nemotron-3-super-agentic-ai/) from Nvidia is out, the trend is to say your model is good for Agents.
- New [Qwen](https://openrouter.ai/qwen/qwen3.6-plus-preview) (again) — "good for agents"
- Anthropic has been messing around a lot with context ([upped to 1m](https://platform.claude.com/docs/en/build-with-claude/context-windows)) and [rate limits](https://x.com/trq212/status/2037254607001559305) (we've seen a lot of downtime this month)
  - idk about the 1m context, [we haven't seen anything to suggest claude's attention mechanism is actually getting better](https://www.anthropic.com/news/claude-opus-4-6). Seems like marketing fluff.

---

## Neuroanatomy — this is new and a fun rabbit hole

- **BIGGEST RELEASE:** RYS Architecture: [LLM Neuroanatomy: How I Topped the LLM Leaderboard Without Changing a Single Weight](https://dnhkng.github.io/posts/rys/)
  - [alainnothere/llm-circuit-finder](https://github.com/alainnothere/llm-circuit-finder)
- [H-Neurons: On the Existence, Impact, and Origin of Hallucination-Associated Neurons in LLMs](https://arxiv.org/abs/2512.01797)
- [Why AI systems don't learn and what to do about it: Lessons on autonomous learning from cognitive science](https://arxiv.org/abs/2603.15381)
- [Eval awareness in Claude Opus 4.6's BrowseComp performance](https://www.anthropic.com/engineering/eval-awareness-browsecomp)

---

## Biz News Roundup

- [AI is making CEOs delusional](https://www.youtube.com/watch?v=Q6nem-F8AG8)
- [Anthropic wins court case](https://www.cnn.com/2026/03/26/business/anthropic-pentagon-injunction-supply-chain-risk), and the gov is still using Claude [for the Iran War](https://thehill.com/policy/defense/5799136-claude-pentagon-iran-war/), so idk if it matters
  - Anthropic also "[leaked](https://futurism.com/artificial-intelligence/anthropic-step-change-new-model-claude-mythos)" Mythos, more powerful than Opus from the rumors, we'll see.
- [Sam Altman says AI isn't very popular in the US right now, with people blaming it for layoffs](https://www.businessinsider.com/sam-altman-ai-popularity-us-2026-3)
  - However [AI doesn't reduce work, it intensifies it](https://hbr.org/2026/02/ai-doesnt-reduce-work-it-intensifies-it)
- OpenAI also killed the [Sora app](https://techcrunch.com/2026/03/24/openais-sora-was-the-creepiest-app-on-your-phone-now-its-shutting-down/) but not the model, so idk why ppl are saying its dead.
- [Supermicro's cofounder was just accused of smuggling $2.5 billion in GPUs to China](https://fortune.com/2026/03/19/supermicro-arrested-founder-smuggling-gpu-china/)
  - And yet we still got no new deepseek :(
- Perplexity released [the PC (Perplexity Computer)](https://www.perplexity.ai/hub/blog/introducing-perplexity-computer) which is basically supposed to replace the Mac Mini Craze.
  - Every time perplexity posts ppl freak out.
- Manus founder is trapped in [China](https://www.reuters.com/world/asia-pacific/china-bars-manus-co-founders-leaving-country-it-reviews-sale-meta-ft-reports-2026-03-25/) after selling to Meta, showing that the AI tug of war between US and China is ongoing.
- In the same vein, China is getting everyone on [openclaw](https://www.nbcnews.com/world/asia/china-openclaw-ai-agent-frenzy-rcna263636)! They call it raising lobsters, due to this a lot of Welfare Stations exist.

---

## Moral Panic Roundup

- [AI Startups Founders and Why They are Different(TM)](https://harpers.org/archive/2026/03/childs-play-sam-kriss-ai-startup-roy-lee/) — Cluely Founder Expose welcome back [Adam Neumann](https://nypost.com/2018/10/11/wework-sued-over-sexual-assaults-frat-boy-culture/?st_source=ai_mode#:~:text=The%20%E2%80%9Cfrat%2Dboy%20culture%E2%80%9D,was%20done%2C%20the%20suit%20says.) ig (this is a good read, I promise)
- [AI Psychosis](https://www.theguardian.com/technology/2026/mar/14/ai-chatbots-psychosis) continues to be a talking point. [People actively prefer it](https://news.stanford.edu/stories/2026/03/ai-advice-sycophantic-models-research) at this point.
- There is continued moral panic around AI creating [cognitive decline.](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6097646) Recency bias made us forget that people said the same thing about [google](https://en.wikipedia.org/wiki/Is_Google_Making_Us_Stupid%3F).

---

## Tinfoil Hat Corner: Model Distillation Attacks and Coding Harness Crackdowns

Are coding subscriptions being abused for cyber attacks? Signs point to yes.

- **January 9th**: First Banwave by Anthropic of Unauthorised Oauth usage by third parties — **Tweet** specifically mentions that there has been an enormous amount of abuse on the platform, accounts were banned for triggering abuse filters
  - ~~[At this time xAI's access to claude also was cut off](https://www.reddit.com/r/singularity/comments/1q8yzal/report_anthropic_cuts_off_xais_access_to_claude/)~~ mysteriously (there was no clarification at this time by Anthropic)
- **Feb 9th**: Anthropic clarifies that *all* third party coding harnesses are banned.
  - During this ban, people panic about Openclaw, Anthropic clarifies that Agent SDK (openclaw is not impacted)
- **Feb 12th**: Google is a victim of distillation attacks.
  - *~~[Throughout this report we've noted steps](https://cloud.google.com/blog/topics/threat-intelligence/distillation-experimentation-integration-ai-adversarial-use?e=48754805)~~ we've taken to thwart malicious activity, including Google detecting, disrupting, and mitigating model extraction activity*
- **Feb 23rd**: ~~[Anthropic publishes that it has also been victim to distillation attacks](https://www.anthropic.com/news/disrupting-AI-espionage)~~ by other AI companies (remember the xAI ban?)
- **Feb 27th**: Google begins Antigravity bans for ~~[similar abuse patterns](https://github.com/google-gemini/gemini-cli/discussions/20632)~~

In one of our other posts we talked about shady providers using LLMJacking as a technique to resell corporate access, with the crackdowns on GPU imports and subsidized model distillation, I would expect to see more abuse of leaked LLM keys as monitoring for this is poor, this is already a trend on Linkedin and Twitter.

---

Thank you so much for reading, as always, the news roundup is HAND CURATED by AFC!

*// END TRANSMISSION — ALANI-003 //*
