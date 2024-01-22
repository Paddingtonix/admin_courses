import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import './components/index.sass';
import store from './store/store'
import onScrollAnimate from './unilities/scrollAnimate';
import VueCookies from 'vue-cookies'
import vClickOutside from 'click-outside-vue3'

import routes from './router';

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
          return {
            selector: to.hash,
          };
        } else if (savedPosition) {
          return savedPosition;
        } else {
          return { top: 0 };
        }
      },
    routes,
});

const app = createApp(App);

app.directive('animation', {
    // Когда привязанный элемент вставлен в DOM...
    mounted(el, binding) {
        el.dataset.animate = false;
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




router.afterEach(() => {
    setTimeout(() => {
        onScrollAnimate();
        window.addEventListener('scroll', onScrollAnimate);
    }, 1000);
});

router.beforeEach(() => {
    window.removeEventListener('scroll', onScrollAnimate);
});

app.use(store).use(router).use(vClickOutside).use(VueCookies).mount('#app');
