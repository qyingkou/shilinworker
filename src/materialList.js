// 入口js
import Vue from 'vue';
import App from './materialList.vue';
import './styles/global.scss';

var node_root = document.getElementById('app');

new Vue({
	render: (h) => h(App)
}).$mount(
	node_root
);