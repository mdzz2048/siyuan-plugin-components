<template>
    <label
        class="fn__flex"
        :style="`min-width: ${minWidth}; margin-right: ${marginRight}`"
    >
        <slot name="icon"><span v-html="icon"></span></slot>

        <span class="fn__space" v-if="!fullWidth"/>
        <div class="fn__flex-1">
            <slot name="title"><span v-html="title"></span></slot>
        </div>
        <span class="fn__space" v-if="!fullWidth"/>
        
        <slot/>
    </label>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    title: string,              // 标题
    icon?: string,              // 图标
    minWidth?: string,          // 最小宽度
    marginRight?: string,       // 右侧外边距
    fullWidth?: boolean,        // 是否取消 (.fn__space)
}>(), {
    minWidth: "24em",
    marginRight: "2em",
    fullWidth: false,
})
</script>

<style>
label {
    width: unset;
    margin: 0.5em 0;
    align-items: center;
}
</style>