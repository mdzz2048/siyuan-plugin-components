<template>
    <!-- button -->
    <button 
        v-if="props.type === 'button'"
        :disabled="disabled"
        :readonly="props.readonly"
        :class="[
            'b3-button b3-button--outline', 
            {'fn__block': block, 'fn__flex-center': !block, 'fn__size200': !block && normal}]"
        :style="style"
        @click="$emit('clicked', settingKey, value)"
    >{{ value }}</button>

    <!-- checkbox -->
    <input 
        v-if="props.type === 'checkbox'"
        type="checkbox"
        :disabled="disabled"
        :readonly="props.readonly"
        :class="['b3-switch', {'fn__block': block, 'fn__flex-center': !block}]"
        :style="style"
        v-model="value"
        @change="$emit('changed', settingKey, value)"
    />

    <!-- number -->
    <input 
        v-if="props.type === 'number'"
        type="number"
        :disabled="disabled"
        :readonly="props.readonly"
        :class="[
            'b3-text-field', 
            {'fn__block': block, 'fn__flex-center': !block, 'fn__size200': !block && normal}]"
        :min="limit.min"
        :max="limit.max"
        :step="limit.step"
        :style="style"
        v-model="value"
        @change="$emit('changed', settingKey, value)"
    />

    <!-- password -->
    <template v-if="props.type === 'password'">
        <input 
            type="password"
            :disabled="disabled"
            :readonly="props.readonly"
            :class="[
                'b3-text-field', 
                {'fn__block': block, 'fn__flex-center': !block, 'fn__size200': !block && normal}]"
            :placeholder="placeholder"
            :style="style"
            v-model="value"
            @change="$emit('changed', settingKey, value)"
        />
        <span class="custom-password-preview">
            <Svg icon="#iconPreview" class="b3-list-item__graphic" @click="showPassword"></Svg>
        </span>
    </template>

    <!-- select -->
    <select 
        v-if="props.type === 'select'"
        :disabled="disabled"
        :readonly="props.readonly"
        :class="[
            'b3-select', 
            {'fn__block': block, 'fn__flex-center': !block, 'fn__size200': !block && normal}]"
        :style="style"
        v-model="value"
        @change="$emit('changed', settingKey, value)"
    >
        <option v-for="option in props.options" :value="option.key">
            {{ option.text }}
        </option>
    </select>

    <!-- slider -->
    <input 
        v-if="props.type === 'slider'"
        type="range"
        :disabled="disabled"
        :readonly="props.readonly"
        :class="['b3-slider', {'fn__block': block, 'fn__size200': !block && normal}]"
        :min="limit.min"
        :max="limit.max"
        :step="limit.step"
        :style="style"
        v-model="value"
        @change="$emit('changed', settingKey, value)"
    />

    <!-- text -->
    <input 
        v-if="props.type === 'text'"
        type="text"
        :disabled="disabled"
        :readonly="props.readonly"
        :class="[
            'b3-text-field', 
            {'fn__block': block, 'fn__flex-center': !block, 'fn__size200': !block && normal}]"
        :placeholder="placeholder"
        :style="style"
        v-model="value"
        @change="$emit('changed', settingKey, value)"
    />

    <!-- textarea -->
    <textarea 
        v-if="props.type === 'textarea'"
        type="text"
        :disabled="disabled"
        :readonly="props.readonly"
        :class="[
            'b3-text-field', 
            {'fn__block': block, 'fn__flex-center': !block, 'fn__size200': !block && normal}]"
        :placeholder="placeholder"
        :style="style"
        v-model="value"
        @change="$emit('changed', settingKey, value)"
    />

    <template v-if="props.type === 'search'">
        <div class="b3-form__icon">
            <Svg icon="#iconSearch" class="b3-form__icon-icon"></Svg>
            <input
                type="text"
                :disabled="disabled"
                :readonly="props.readonly"
                :class="[
                    'b3-text-field', 'b3-form__icon-input', 
                    { 'fn__block ': block }]"
                :placeholder="placeholder"
                :style="style"
                v-model="value"
                @change="$emit('changed', settingKey, value)"
            />
        </div>
    </template>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { IOption, ILimits } from '.';
import Svg from '../misc/Svg.vue';

type IInputType = "button" | "checkbox" | "number" | "password" 
    | "select" | "slider" | "text" | "textarea" | "search"
const props = withDefaults(defineProps<{
    type: IInputType,               // 类型
    settingKey: string,             // 标识符
    settingValue: string,           // 绑定的值
    style?: string,                 // 绑定样式
    limit?: ILimits,                // 可选范围 ({ min: 0, max: 100, step: 1 }) | slider, number
    options?: IOption[],            // 可选列表 ({ key: string, text: string }[]) | select
    placeholder?: string,           // 占位文本 | text, textarea
    block?: boolean,                // 使用 fn__block (width: 100%;)
    normal?: boolean,               // 使用 fn__size200 (width: 200px)
    readonly?: boolean,             // 只读
    disabled?: boolean,             // 禁用交互
    alterable?: boolean,            // 数据是否可变
}>(), {
    block: false,
    normal: true,
    alterable: true,
    disabled: false,
    readonly: false,
    style: "",
    limit: () => { return { min: 0, max: 100, step: 1 } as ILimits },
    placeholder: "",
});
defineEmits(["clicked", "changed"])
const dynamicValue = ref(props.settingValue)
const value = computed({
    get() {
        return props.alterable ? dynamicValue.value : props.settingValue
    },
    set(newValue) {
        dynamicValue.value = newValue
    }
})

function showPassword(event: Event) {
    const targetElement = event.target as HTMLElement
    const parentElement = targetElement.parentElement
    const previousElement = parentElement.previousElementSibling as HTMLInputElement
    previousElement.type = previousElement.type === "password" ? "text" : "password"
}
</script>

<style>
.custom-password-preview {
    position: absolute;
    right: 30px;
}

.custom-password-preview > svg{
    display: flex;
}
</style>