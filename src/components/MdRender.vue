<template>
  <div v-html="renderMd()" />
</template>

<script>
import 'highlight.js/styles/default.css'

import MarkdownIt from "markdown-it";
import MarkdownItAbbr from "markdown-it-abbr";
import MarkdownItAnchor from "markdown-it-anchor";
import MarkdownItFootnote from "markdown-it-footnote";
import MarkdownItHighlightjs from "markdown-it-highlightjs";
import MarkdownItSub from "markdown-it-sub";
import MarkdownItSup from "markdown-it-sup";
import MarkdownItTasklists from "markdown-it-task-lists";
import MarkdownItTOC from "markdown-it-toc-done-right";

const markdown = new MarkdownIt(
)
  .use(MarkdownItAbbr)
  .use(MarkdownItAnchor)
  .use(MarkdownItFootnote)
  .use(MarkdownItHighlightjs)
  .use(MarkdownItSub)
  .use(MarkdownItSup)
  .use(MarkdownItTasklists)
  .use(MarkdownItTOC)

export default {
  props: ['source'],
  methods: {
    renderMd() {
      return markdown.render(this.source)
    }
  }
}
</script>

<style>
/* Serve pra delimitar a altura das imagens que tiverem o alt descrito */
img[alt="small"] {
  max-height: 260px;
}

img[alt="medium"] {
  max-height: 460px;
}

img[alt="large"] {
  max-height: 660px;
}

/* Serve pra ajustar o cass das tabelas */
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background: #efefef;
}

tr:hover {
  background: #d1d1d1;
}
</style>