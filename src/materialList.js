// 入口js
import Vue from 'vue';
import './styles/global.scss';
import App from './materialList.vue';

var node_root = document.getElementById('app');

new Vue({
	render: (h) => h(App)
}).$mount(
	node_root
);