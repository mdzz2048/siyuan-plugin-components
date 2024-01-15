import GroupVue from "./setting/Group.vue";
import InputVue from "./setting/Input.vue";
import ItemVue from "./setting/Item.vue";
import MiniItemVue from "./setting/MiniItem.vue";
import PanelVue from "./setting/Panel.vue";
import PanelsVue from "./setting/Panels.vue";
import TabsVue from "./setting/Tabs.vue";
import SvgVue from "./misc/Svg.vue";
import TipsVue from "./dialog/Tips.vue";

import { ILimits, IOption, ITab } from "./setting";


export default {
    // setting
    GroupVue, InputVue, ItemVue, MiniItemVue, PanelVue, PanelsVue, TabsVue,
    // misc
    SvgVue,
    // dialog
    TipsVue,
}

export type {
    ILimits, IOption, ITab
}