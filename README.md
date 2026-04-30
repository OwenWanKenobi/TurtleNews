# Turtle News

A GitHub Pages compatible Jekyll site for Turtle News.

## Add an article

Create one Markdown file in `_posts` named like:

```text
2026-05-01-your-story-slug.md
```

Use this front matter:

```yaml
---
layout: post
title: "Story headline"
date: 2026-05-01 09:00:00 -0400
author: "Turtle News Staff"
category: "Science"
tags: ["evolution", "research"]
cover_image: "/assets/images/cover-science.svg"
excerpt: "A one or two sentence summary for cards and search."
---
```

The post will automatically appear on the homepage, archive, search index, category listings, the dynamic tag index, and JSON search data.
