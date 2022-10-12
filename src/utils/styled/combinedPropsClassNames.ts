import { objectMerge, isEmpty } from "../helper";
import type * as Styles from "../../types/index.types";

function combinedPropsClassNames(
  makeClassNames: Styles.InitialObject<string>,
  propsClassNames: Styles.InitialObject<string> = {}
): Styles.InitialObject<string> {
  if (isEmpty(propsClassNames)) {
    return makeClassNames;
  }

  const combinedClassNames: Styles.InitialObject<string> = objectMerge({}, makeClassNames);

  for (const [key, value] of Object.entries(propsClassNames)) {
    if (combinedClassNames[key]) {
      combinedClassNames[key] = combinedClassNames[key] += ` ${value}`;
    }
  }

  return combinedClassNames;
}

export default combinedPropsClassNames;
