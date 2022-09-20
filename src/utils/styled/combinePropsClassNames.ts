import {isEmpty} from "../helper";
import type { InitialObject } from "../../types/index.types";

function combinePropsClassNames(
  makeClassNames: InitialObject<string>,
  propsClassNames: InitialObject<string> = {}
): InitialObject<string> {
  if (isEmpty(propsClassNames)) {
    return makeClassNames;
  }

  const combineClassNames: InitialObject<string> = Object.assign(
    {},
    makeClassNames
  );

  for (const key in propsClassNames) {
    if (combineClassNames[key]) {
      combineClassNames[key] = combineClassNames[
        key
        ] += ` ${propsClassNames[key]}`;
    }
  }

  return combineClassNames;
}

export default combinePropsClassNames;
