import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

/* import font awesome  */
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import DxTreeView from 'devextreme-vue/tree-view';
import MdRender from '@/components/MdRender';
import SwaggerRender from '@/components/SwaggerRender';

library.add(fas);

import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.component('dx-tree-view', DxTreeView)
.component('md-render', MdRender)
.component('swagger-render', SwaggerRender)
.mount('#app')
