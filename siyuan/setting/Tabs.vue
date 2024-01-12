<template>
    <div class="fn__flex-column" style="height: 100%;">
        <!-- 页签列表 -->
        <div class="layout-tab-bar fn__flex">
            <div
                role="button"
                v-for="tab in tabs"
                :data-type="tab.name"
                :class="['item item--full', {'item--focus': tab.key === focus}]"
                @click="tabChanged(tab)"
            >
                <span class="fn__flex-1" />

                <Svg className="b3-list-item__graphic" :icon="tab.icon"></Svg>
                <span class="item__text" v-html="tab.text"></span>
                
                <span class="fn__flex-1" />
            </div>
        </div>
        <!-- 页签内容主体 -->
        <div class="fn__flex-1">
            <slot>Container</slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ITab } from '.'
import Svg from '../misc/Svg.vue';

const props = defineProps<{
    tabs: ITab[],
}>()
const focus = ref(props.tabs[0].key)
const emits = defineEmits(['tabChanged'])

function tabChanged(tab: ITab) {
    focus.value = tab.key
    emits('tabChanged', tab, 'tab')
}
</script>