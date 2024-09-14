// plugins/animationDirective.ts
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('animation', {
    mounted(el, binding) {
      el.dataset.animate = 'false';
      if (binding.arg) {
        el.dataset.animateDirection = binding.arg;
      }
      if (binding.modifiers) {
        Object.keys(binding.modifiers).forEach((item) => {
          el.dataset[item] = binding.modifiers[item];
        });
      }
    },
  });
});
