---
title: "Biased Speculative Decoding"
status: "Active — Paper in progress"
order: 1
targets: "Speculative decoding pipelines, vLLM, TGI, draft model trust boundaries"
---

Biased speculative decoding as an attack vector on LLM alignment.

Speculative decoding uses a small draft model to accelerate inference from a larger target model. SpecSec investigates what happens when the draft model is intentionally biased — fine-tuned to subtly shift the target model's outputs toward misaligned behavior.

Our findings show that draft model manipulation during speculative decoding can measurably shift target model outputs within the first 15 tokens of generation, with effects propagating through the rest of the sequence.
