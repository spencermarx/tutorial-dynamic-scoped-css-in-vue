<template>
  <div class="container">
    <form class="texteditor">
      <section>
        <h2>Content Editor</h2>
        <textarea
          id="markdown-text"
          v-model="content"
          name="markdown-content"
          cols="30"
          rows="10"
        ></textarea>
      </section>
      <section>
        <h2>Style Editor</h2>
        <textarea
          id="markdown-text"
          v-model="css"
          name="markdown-content"
          cols="30"
          rows="10"
        ></textarea>
      </section>
    </form>
    <div class="markdown-section">
      <h2>Resulting Markdown</h2>
      <Markdown :content="content" :raw-css="css" />
    </div>
  </div>
</template>

<script>
import Markdown from '~/components/Markdown.js'
export default {
  components: {
    Markdown,
  },
  data() {
    return {
      content: '',
      css: '',
    }
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
}

.container:only-child {
  padding: 0 10px;
}

.texteditor {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 5px;
}

.texteditor textarea {
  height: 100%;
  width: 100%;
  border: 2px solid rgba(230, 230, 230, 1);
  padding: 5px;
  outline: none;
}
</style>
