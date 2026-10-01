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

```
## Supported LLM Providers

edgenote is provider-agnostic and can be used with:

- OpenAI
- Anthropic
- Groq
- Ollama
- OpenAI-compatible APIs

edgenote does not make LLM API calls itself. It focuses on organizing and optimizing context before the prompt is sent to the model.

## Benchmark

In our benchmark, edgenote was evaluated using a 4,000-token context with GPT-4o-mini.

The benchmark tests whether information placed at different positions within a long context can be successfully retrieved.

See the full benchmark methodology and results:

https://pyedgenote.github.io/

## Documentation

- Website: https://pyedgenote.github.io/
- PyPI: https://pypi.org/project/edgenote/

## Related Concepts

- Lost in the Middle
- LLM context management
- Long-context LLMs
- RAG context ordering
- Prompt optimization
- Context window management
- Token-aware prompt construction

## License

MIT License

## Quick Example

```python
from edgenote import EdgeNote

# Add your long-context content
# and organize important information
# before sending it to an LLM.
```
```md
## Key Features

- Lightweight Python package
- Provider-agnostic design
- No LLM API calls required
- Token-aware context management
- Long-context optimization
- RAG-compatible context processing
- Configurable context organization
- Standard LLM message compatibility

## Use Cases

- Long-context LLM applications
- RAG systems
- Document question answering
- Agentic AI workflows
- Large prompt processing
- Multi-document reasoning
- Context-heavy AI applications

## Research Background

edgenote is based on research around the **Lost in the Middle** phenomenon in long-context language models.

Related research:

Liu et al., *Lost in the Middle: How Language Models Use Long Contexts*

https://arxiv.org/abs/2307.03172

## Links

- Website: https://pyedgenote.github.io/
- PyPI: https://pypi.org/project/edgenote/
```
