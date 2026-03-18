---
title: "The LLM Pyramid Scheme"
date: 2026-03-17
author: "ALANI"
tags: ["llmjacking", "reverse-proxy", "api", "infrastructure"]
excerpt: "Cheap AI access has to come from somewhere. Here is where."
---

Third-party AI providers are not AI companies. They do not run models. They do not own infrastructure. They are middlemen selling access they got from somewhere else. This is how.

<div class="section-index">
  <div class="section-index-label">Sections</div>
  <ol>
    <li><a href="#there-are-two-keys-you-only-have-one">There Are Two Keys</a></li>
    <li><a href="#where-does-that-real-key-come-from">Where the Real Key Comes From</a></li>
    <li><a href="#method-1-stolen-keys-llmjacking">Method 1: Stolen Keys</a></li>
    <li><a href="#method-2-enterprise-key-reselling">Method 2: Enterprise Reselling</a></li>
    <li><a href="#method-3-coding-harness-abuse">Method 3: Coding Harness Abuse</a></li>
    <li><a href="#so-who-is-actually-paying-for-it">Who Is Actually Paying</a></li>
    <li><a href="#but-the-providers-tos-says">"But the Provider's ToS Says..."</a></li>
  </ol>
</div>

Models like Claude, GPT, and Gemini are closed-weight. You cannot run them on your own hardware. The only way to reach these models is through the companies that made them or their authorized cloud partners (AWS Bedrock, Azure, etc)

There is no alternative. So when they offer you access, they are forwarding your messages to the official provider using credentials they got from somewhere.

## There are two keys. You only have one.

These third-party providers are proxies. That is what they are.

When you sign up with one of these providers, they give you an API key. You might think this is the key that connects you to Claude or Gemini.

It is not.

That key is just your login to the **proxy's** system. It is how they track and charge you.

Behind the scenes, the proxy has a **separate key:** the one that actually talks to Anthropic, Google, or OpenAI. That is the real key.

1. You send your prompt to the proxy using the key **they** gave you
2. The proxy forwards it to the real provider using a **different key**
3. The response comes back through the proxy to you

<div class="callout">
<p><strong>Two different keys.</strong> The one you have is for the proxy. The one that matters is the one you never see.</p>
</div>

That is the how. Where that second key came from is more interesting.

## Where does that "real key" come from?

<div class="callout">
<p><strong>Three places. None of them legitimate.</strong></p>
</div>

---

### Method 1: Stolen Keys (LLMJacking)

Attackers find vulnerable systems, steal credentials from cloud accounts that have AI services attached, and plug those keys into a proxy. This is called [LLMjacking](https://sysdig.com/learn-cloud-native/what-is-llmjacking), a term coined by the Sysdig Threat Research Team in May 2024. The victim has no idea their credentials are being used. They just see the bill go up. [4chan and Discord are the main distribution channels](https://cybersecuritynews.com/llm-hijackers-deepseek-v3-model/). Keys get tested with automated scripts first. Then listed. Access sells for as little as $30 a month.

<div class="alert">
  <div class="alert-label">Documented Impact</div>
  <div class="alert-title">$40,000 in Claude 3 Opus charges — one week</div>
  <div class="alert-desc">A single proxy on stolen credentials. The account owner had no idea. <a href="https://sysdig.com/blog/llmjacking-stolen-cloud-credentials-used-in-new-ai-attack/">Sysdig report</a></div>
</div>

In February 2025, Microsoft named [four individuals](https://blogs.microsoft.com/on-the-issues/2025/02/27/disrupting-cybercrime-abusing-gen-ai/) running one of these networks (Storm-2139).

Read more: [Sysdig - LLMjacking](https://www.sysdig.com/blog/llmjacking-stolen-cloud-credentials-used-in-new-ai-attack) | [Sysdig - What is LLMjacking?](https://www.sysdig.com/learn-cloud-native/what-is-llmjacking) | [Wiz - LLM Jacking](https://www.wiz.io/academy/ai-security/llm-jacking)

---

### Method 2: Enterprise Key Reselling

Why enterprise keys? When you use the official API directly, you pay per token. For example, Claude Opus 4.6 runs $5/M input tokens and $25/M output tokens at the standard rate.

Enterprise and high-volume buyers negotiate custom pricing with the provider. They get lower per-token rates and higher rate limits than what is available to individual users on the standard API.

So, someone buys an enterprise-tier key, then resells access to individual users. They charge you less than what you would pay on the official API, but more than what they are paying on their negotiated rate. The difference is their profit.

You get cheaper access. The reseller profits off the margin. But the provider's contract, privacy policy, and data protections are with the enterprise key holder. **Not you.** The AI provider never agreed to serve you.

<div class="schematic">
  <div class="schematic-label">Relay Chain</div>
  <div class="schematic-node schematic-node--source">
    <span class="schematic-node-name">Anthropic / Google / OpenAI</span>
  </div>
  <div class="schematic-flow">│<br/>▼</div>
  <div class="schematic-node schematic-node--mid">
    <span class="schematic-node-name">Enterprise Key Holder</span>
    <span class="schematic-node-meta">negotiated rate, lower cost</span>
  </div>
  <div class="schematic-flow">│<br/>▼</div>
  <div class="schematic-node schematic-node--mid">
    <span class="schematic-node-name">Third-Party Proxy</span>
    <span class="schematic-node-meta">sells access, takes margin</span>
  </div>
  <div class="schematic-flow">│<br/>▼</div>
  <div class="schematic-node schematic-node--end">
    <span class="schematic-node-name">You</span>
    <span class="schematic-node-meta">paying most per token, knowing least</span>
  </div>
</div>

---

### Method 3: Coding Harness Abuse

Coding harnesses are subscription-based developer tools that give you access to AI models. Think Claude Code, Cursor, or Antigravity. They are priced **differently** from the regular API.

**Why are these cheaper than the regular API?**

Because they are heavily subsidized. Antigravity gives free access to Claude Opus during its public preview. For paid tools, the gap is just as skewed.

<div class="alert">
  <div class="alert-label">The Subsidy Gap</div>
  <div class="alert-title">$200/month subscription → $5,000 at retail API pricing</div>
  <div class="alert-desc">Anthropic is covering that $4,800 gap. That gap is the attack surface. <a href="https://www.forbes.com/sites/annatong/2026/03/05/cursor-goes-to-war-for-ai-coding-dominance/">Forbes / Cursor analysis</a></div>
</div>

Remember the two-key setup from earlier: you get a key from the provider, and behind the scenes they use a different key to actually reach the model.

In this case, that "different key" comes from a coding tool like Antigravity. The third-party provider creates accounts on these platforms, takes the credentials from those accounts, and uses them to fulfill your requests. You sign up with the provider, send your prompts, and get responses. You might not even know that your messages are being routed through a coding tool.

**Eventually, providers catch on:**

<div class="alert">
  <div class="alert-label">Enforcement</div>
  <div class="alert-title">Anthropic — Overnight Ban (Jan 9, 2026)</div>
  <div class="alert-desc">Blocked third-party tools and banned accounts without warning. <a href="https://www.theregister.com/2026/02/20/anthropic_clarifies_ban_third_party_claude_access/">The Register</a></div>
</div>

<div class="alert">
  <div class="alert-label">Enforcement</div>
  <div class="alert-title">Google — Antigravity Proxy Bans (Feb 2026)</div>
  <div class="alert-desc">Banned accounts connected to reverse proxies. Reversed bans but made position explicit: second violation is permanent. No refunds. <a href="https://indianexpress.com/article/technology/artificial-intelligence/google-bans-antigravity-users-openclaw-10547187/">Indian Express</a> | <a href="https://github.com/google-gemini/gemini-cli/discussions/20632">Google statement</a></div>
</div>

---

## So who is actually paying for it?

LLM infrastructure is expensive. The hardware alone costs millions. When access is cheap, someone is covering that gap.

In Method 1, it is the victim. Their account is being drained and they do not know. In Method 2, it is the enterprise account holder whose contract is being violated. In Method 3, it is the coding platform. They did not sign up to serve you.

If a provider is offering you access to Claude, GPT, or Gemini, and they are not the official provider nor one of their authorized cloud partners, there is no legitimate way for them to have that access.

This is not a case of some providers being shadier than others. The entire model is built on unauthorized access.

<div class="callout">
<p><strong>If everyone else is paying and you are not, there is a reason.</strong></p>
</div>

---

## "But the provider's ToS says..."

The proxy operator can write whatever they want in their ToS. Encryption, zero logging, full privacy compliance. They can promise all of it.

<div class="callout">
<p><strong>None of that matters.</strong> A ToS written by someone operating outside the rules has no real weight. And nothing in that ToS stops them from reading everything that passes through their server.</p>
</div>

The legal situation is a separate question, and it depends on the method.

- **Method 1:** LLMJacking is a criminal offense. Using stolen credentials violates the [Computer Fraud and Abuse Act (CFAA)](https://www.justice.gov/jm/jm-9-48000-computer-fraud) in the US and equivalent laws in most jurisdictions.
- **Method 2:** Enterprise key reselling is primarily a ToS violation. The exposure is civil: breach of contract, account termination, and potentially fraud claims. ([Van Buren v. United States, 2021](https://www.supremecourt.gov/opinions/20pdf/19-783_k53l.pdf) narrowed criminal CFAA liability for ToS-only violations.)
- **Method 3:** Coding harness abuse is a ToS violation. Both [Anthropic](https://www.theregister.com/2026/02/20/anthropic_clarifies_ban_third_party_claude_access/) and [Google](https://indianexpress.com/article/technology/artificial-intelligence/google-bans-antigravity-users-openclaw-10547187/) enforced this. Accounts terminated. In Google's case, no refunds for paying subscribers, no advance warning.

There is also nothing stopping them from logging your prompts. Your request goes through their server before it reaches the model. They can read it. Whether they do is entirely up to them. No legal agreement, no oversight, no accountability.

---

*// END TRANSMISSION — ALANI-002 //*
