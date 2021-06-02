import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import { error, defaultStack } from "@pnotify/core";

import getRefs from "./refs";
const refs = getRefs();

function alertSearchError(message) {
  clearOutput();
  defaultStack.close();
  error({
    title: "Ошибка поискового запроса!",
    text: message,
    delay: 3000,
  });
}

export function alertNoMatches() {
  refs.output.classList.add("empty");
  alertSearchError("Ничего не найдено");
}

export function alertTooManyMatches() {
  refs.output.classList.add("empty");
  alertSearchError(
    "Найдено слишком много совпадений. Пожалуйста, введите более конкретный запрос"
  );
}

export function clearOutput() {
  refs.output.innerHTML = "Пожалуйста введите запрос на Английском языке...";
}
