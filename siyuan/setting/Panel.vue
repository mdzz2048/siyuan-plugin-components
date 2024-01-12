<template>
    <div
        :data-name="name"
        :class="[
            'config__tab-container', 
            {'config__tab-container--top': top, 'fn__none': !display}]"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    name: string,               // 面板名称
    top?: boolean,              // 是否移除面板上下边距
    display?: boolean,          // 是否显示面板
}>(), {
    display: false,
    top: false,
})
</script>