<template>
    <div class="fn__flex-1 fn__flex config__panel">
        <!-- 面板标签列表 -->
        <ul class="b3-tab-bar b3-list b3-list--background">
            <div class="b3-form__icon" v-if="searchEnable">
                <Svg
                    icon="#iconSearch"
                    className="b3-form__icon-icon"
                ></Svg>
                <input
                    class="b3-text-field fn__block b3-form__icon-input"
                    :placeholder="props.searchPlaceholder"
                    v-model="searchValue"
                    @change="$emit('searchChanged', searchValue)"
                />
            </div>
            <li
                role="input"
                v-for="panel in props.panels"
                :data-name="panel.name"
                :value="panel.key"
                :class="['b3-list-item', {'b3-list-item--focus': panel.key === focus}]"
                @click="panelChanged(panel)"
            >
                <Svg
                    className="b3-list-item__graphic"
                    :icon="panel.icon"
                ></Svg>
                <span class="b3-list-item__text" v-html="panel.text" />
            </li>
        </ul>
        <!-- 面板主体 -->
        <div class="config__tab-wrap">
            <slot>Container</slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ITab } from '.';
import Svg from '../misc/Svg.vue';

const props = defineProps<{
    panels: ITab[],             // 面板标签列表
    searchEnable?: boolean,     // 是否启用搜索
    searchPlaceholder?: string, // 搜索提示内容
    searchValue?: string,       // 搜索框内容
}>()
const focus = ref(props.panels[0].key)
const emits = defineEmits(["searchChanged", "panelChanged"])

function panelChanged(panel: ITab) {
    focus.value = panel.key
    emits('panelChanged', panel, focus)
}
</script>

<style>
.b3-list-item__text {
    margin-right: 0.5em;
}
</style>