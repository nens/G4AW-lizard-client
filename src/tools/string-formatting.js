export function replaceUnderscores(str, char = " ") {
  return str.replace(/\_/g, char);
}

export function rgbaListToString(ls) {
  return `rgba(${ls[0]}, ${ls[1]}, ${ls[2]}, ${ls[3]})`;
}
