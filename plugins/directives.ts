// plugins/directives.js
import { defineNuxtPlugin } from "#app";
import animationDirective from "./animation";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('animation', animationDirective);
});