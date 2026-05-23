---
title: "ChronicleDB"
status: "Open beta — v0.3.1"
order: 0
targets: "SillyTavern memory, graph+vector hybrid retrieval, trait canonicalization, Louvain-derived story arcs"
url: "/projects/chronicledb/"
---

Persistent graph-plus-vector memory for SillyTavern roleplays.

A small extraction LLM reads each new batch of messages and writes structured memory — characters, traits, events, relationships, plot threads — into a Postgres graph with pgvector embeddings. On every turn, a six-bucket hybrid retrieval (dense + lexical across memories, events, dialogue, and scene snapshots) is fused via Reciprocal Rank Fusion and injected into the chat as a focused memory block, so the model writes with long-term grounding in addition to recent context.

Built around four research-adjacent pipelines: a three-layer trait dedup (lexicon gate → fuzzy pre-check → contextual-embedding kNN with LLM verifier), RRF hybrid retrieval with optional HyDE query rewriting, three-pass Louvain community detection for a super-arc / arc / episode hierarchy, and per-chat character scoping to prevent alias and trait bleed across stories.
