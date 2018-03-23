// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import comButton from './components/component-blog/comButton'
import comLogo from './components/component-blog/comLogo'
import axios from 'axios'
import comWordBlog from './components/component-blog/comWordBlog'
import comSetBlog from './components/component-blog/comSetBlog.vue'
Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.withCredentials=true

/* eslint-disable no-new */
zmEditor.setItem = new Vue({
  el: '#setpanel',
  data: {
    items: []
  },
  methods: {
    add (component, text) {
      this.items.push({
        'component': component,
        'text': text
      })
    }
  }
})
zmEditor.action = new Vue({
  el: '#actionpanel',
  data: {
    items: []
  },
  methods: {
    add:function (component, text) {
      this.items.push({
        'component': component,
        'text': text
      })
    },
    addSet:function(){
      this.items.push({
        'component': comSetBlog
      })console.log
    }
  }
})
zmEditor.comp = new Vue({
  el: '#com',
  data: {
    items: []
  },
  methods: {
    addBlog: function(){
      var id = 'com_' + zmEditor.EditorState.getNewID()
      var m = {
        'component': comWordBlog,
        'prop': {'id': id}
      }
      zmEditor.setItem.items = comWordBlog.data()['setItems']
      this.items.push(m)
      zmEditor.selectComponentList.push(m)
      
    },
    addButton: function (text) {
      var id = 'com_' + zmEditor.EditorState.getNewID()
      var m = {
        'component': comButton,
        'prop': {'id': id, 'text': text}
      }
      zmEditor.setItem.items = comButton.data()['setItems']
      this.items.push(m)
      zmEditor.selectComponentList.push(m)
    },
    addLogo: function (text) {
      var id = 'com_' + zmEditor.EditorState.getNewID()
      var m = {
        'component': comLogo,
        'prop': {'id': id, 'src': text}
      }
      zmEditor.setItem.items = comLogo.data()['setItems']
      zmEditor.action.items = comLogo.data()['actions']
      this.items.push(m)
      zmEditor.selectComponentList.push(m)
    },
    removeCom: function () {
      this.items.pop()
      zmEditor.selectComponentList.pop()
    }
  }
})
