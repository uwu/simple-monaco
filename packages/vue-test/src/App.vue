<script setup lang="ts">
import { ref } from "vue";
import Monaco from "../..";

let value = ref("");
let lang = ref("javascript");
let theme = ref("Monokai");
let ro = ref(false);
</script>

<template>
  <h1>Monaco vue test</h1>
  <Monaco v-model="value" :lang="lang" :theme="theme" :readonly="ro" />
  <pre><code>{{ value }}</code></pre>

  <button @click="() => (value = '')">clear</button>
  <input type="text" @change="(e) => (lang = e.target.value)" />
  <input type="text" @change="(e) => (theme = e.target.value)" />
  <input id="ro" type="checkbox" @change="(e) => (ro = e.target.checked)" />
  <label for="ro">readonly</label>
</template>
