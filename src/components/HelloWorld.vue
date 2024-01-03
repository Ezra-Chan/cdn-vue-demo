<script setup>
import { useDateFormat, useNow } from "@vueuse/core";
const { ref } = Vue;

defineProps({
  msg: String,
});

const count = ref(0);
const formatted = useDateFormat(useNow(), "YYYY-MM-DD HH:mm:ss");
</script>

<template>
  <h1>{{ msg }}</h1>
  <h1>{{ formatted }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
</template>
