export function addSeparatorySpaces(str) {
  return str
    .split("")
    .reverse()
    .map((dgt, idx) => dgt + (idx % 3 ? "" : "\u00A0"))
    .reverse()
    .join("");
}
