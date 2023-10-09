const stringManipulator = (sentence: string, userName: string) => {
  const preText = sentence.split("@")[0];
  const newValue = preText + userName.split(" ").join("_");
  return newValue;
}

export default stringManipulator;