import type { MatchThreshold } from "../../types/hidden.types";
import type { ObjectType } from "../../types/index.types";
export declare const matchThreshold: MatchThreshold;
export declare const filterKeys: (keys: string[], propsKeys: string[]) => string[];
export declare const formatPropParams: (keys: MatchThreshold) => ObjectType<object>;
export declare const findMatchKey: (props: any) => string[];
export declare const isString: (value: any) => boolean;
export declare const isFunction: (value: any) => boolean;
export declare const isUndefined: (value: any) => boolean;
