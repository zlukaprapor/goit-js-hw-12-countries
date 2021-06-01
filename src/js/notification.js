import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import { error, defaultStack } from "@pnotify/core";

import getRefs from "./refs";
const refs = getRefs();

function alertSearchError(message) {
  clearOutput();
  defaultStack.close();
  error({
    title: "Search query error!",
    text: message,
    delay: 3000,
  });
}

export function alertNoMatches() {
  refs.output.classList.add("empty");
  alertSearchError("Nothing matches the search");
}

export function alertTooManyMatches() {
  refs.output.classList.add("empty");
  alertSearchError(
    "Too many matches found. Please enter a more specific query"
  );
}

export function clearOutput() {
  refs.output.innerHTML =
    "[EMPTY]: please enter the query in the search field...";
}
