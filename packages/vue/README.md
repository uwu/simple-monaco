# Vue simple-monaco

Please read the main readme [here](https://github.com/uwu/simple-monaco).

```vue
<script setup lang="ts">
import { ref } from "vue";
import Monaco from "@uwu/monaco-vue";

let value = ref("");
</script>

<template>
	<!--value and lang are required-->
	<Monaco
		v-model="value"
		lang="javascript"
		theme="Monokai"
		:readonly="false"
		height="30rem"
		width="20rem"
		:otherCfg="{}"
	/>
</template>
```
