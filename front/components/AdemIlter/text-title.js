import React from "react";
import cn from "classnames";

import styles from "./text-title.module.css";

function TextTitle({bold=true, children}) {
  return <h2 className={cn([styles.titleBold, bold && styles.bold])}>{children}</h2>;
}

export default TextTitle;
