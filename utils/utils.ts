const stringManipulator = (sentence: string, userName: string) => {
  const preText = sentence.split("@")[0];
  const newValue = preText +userName;
  return newValue;
}

export default stringManipulator;