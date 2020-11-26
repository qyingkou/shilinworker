// 入口
import Vue from 'vue';
import App from './materialUltraExcel.vue';
import './styles/global.scss';

var node_root = document.getElementById('app');

new Vue({
	render: (h) => h(App)
}).$mount(
	node_root
);