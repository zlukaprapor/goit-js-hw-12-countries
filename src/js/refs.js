export default function getRefs() {
  return {
    input: document.querySelector('[data-value="input"]'),
    output: document.querySelector('[data-value="output"]'),
    outputLabel: document.querySelector('[data-value="output-label"]'),
  };
}
