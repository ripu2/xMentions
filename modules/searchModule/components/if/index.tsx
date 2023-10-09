import { IfProps } from "../../types";
import React from "react";

const If = (props: IfProps) => {
  if (props.condition && props.children) return props.children;
  return null;
};

export default React.memo(If);
