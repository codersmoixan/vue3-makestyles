import { isEmpty } from "../helper";
import type * as Styles from "../../types/index.types";

function combinePropsClassNames(
  makeClassNames: Styles.InitialObject<string>,
  propsClassNames: Styles.InitialObject<string> = {}
): Styles.InitialObject<string> {
  if (isEmpty(propsClassNames)) {
    return makeClassNames;
  }

  const combineClassNames: Styles.InitialObject<string> = Object.assign(
    {},
    makeClassNames
  );

  for (const [key, value] of Object.entries(propsClassNames)) {
    if (combineClassNames[key]) {
      combineClassNames[key] = combineClassNames[key] += ` ${value}`;
    }
  }

  return combineClassNames;
}

export default combinePropsClassNames;
