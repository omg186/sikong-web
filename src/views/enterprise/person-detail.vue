<template>
  <div>{{ routeQuery }}</div>
</template>

<script lang="ts" setup>
import { useRouteQueryObject } from '@/hooks/web/use-page'

const { routeQuery } = useRouteQueryObject('org')
</script>
