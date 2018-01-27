import Vue from 'vue';

import Root from './components/Root.vue';
import Admin from './components/Admin.vue';
import Counter from './components/Counter.vue';

const router = {
    '/': Root,
    '/admin.html': Admin,
    '/counter.html': Counter
}

new Vue({
    el: document.getElementById('root'),
    data: {
        currentRouter: window.location.pathname
    },
    computed: {
        ViewComponent() {
            return router[this.currentRouter] || NotFound
        }
    },
    render(h){
        return h(this.ViewComponent);
    }
});
