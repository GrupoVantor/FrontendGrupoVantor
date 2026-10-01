<script setup lang="ts">
import ServiceLineLayout from '../components/ServiceLineLayout.vue'
import { getPortfolioByPage } from '../data/portfolio'

const line = getPortfolioByPage('logistico')
</script>

<template>
  <ServiceLineLayout v-if="line" :line="line" />
</template>
