export interface ITab {
    key: string;        // 页签唯一标识
    text: string;       // 页签标头
    name?: string;      // 页签名称 (data-name)
    icon?: string;      // 页签图标 (svg)
}

export interface IOption {
    key: string,
    text: string,
}

export interface ILimits { 
    min: number,
    max: number,
    step: number
}
