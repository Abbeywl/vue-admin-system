import Vue from 'vue'
import App from './App.vue'
import './assets/style.css'
import Node from './components/Generator/node'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.component('Node', Node)

Vue.config.productionTip = false
Vue.use(Antd)

new Vue({
  render: h => h(App)
}).$mount('#app')
