<template>
    <div class="b3-label">
        <span v-html="props.title"></span>
        <div class="config-query">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: string,              // 标题
}>()
</script>