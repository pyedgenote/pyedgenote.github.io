# edgenote

**An open-source Python package for mitigating the Lost in the Middle problem in LLM context.**

edgenote helps developers organize long LLM prompts so important information is positioned where transformer-based language models are more likely to attend to it.

## The Problem

Large language models can show a "Lost in the Middle" effect, where information placed in the middle of a long context may receive less attention than information near the beginning or end.

This can affect applications that work with:

- Long prompts
- RAG pipelines
- Retrieved documents
- Large context windows
- Multi-document question answering
- Long instruction chains

## What edgenote Does

edgenote is a Python package that restructures and organizes context before it is sent to an LLM.

It provides mechanisms such as:

- Edge pinning
- U-shaped context interleaving
- Context eviction
- Token-aware context management
- BM25 and CrossEncoder reranking
- Semantic chunking

## Installation

```bash
pip install edgenote
