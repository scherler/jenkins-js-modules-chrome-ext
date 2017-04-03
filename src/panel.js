import Vue from 'vue';
import Panel from './Panel.vue';
import BootstrapVue from 'bootstrap-vue';
import Info from './components/Info.vue';

//
// Globally register components
//
// ***  Note that vue-play will also require these to be registered in
//      /play/index.js
//
Vue.use(BootstrapVue);
Vue.component('Info', Info);

new Vue({ // eslint-disable-line no-new
    el: '#panel',
    render: (h) => h(Panel)
});