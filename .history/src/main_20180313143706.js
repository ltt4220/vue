// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import comButton from './components/comButton'
import comLogo from './components/comLogo'
import axios from 'axios'
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
    add (component, text) {
      this.items.push({
        'component': component,
        'text': text
      })
    }
  }
})
zmEditor.comp = new Vue({
  el: '#com',
  data: {
    items: []
  },
  methods: {
    getData: function(){
      var url = 'http://zuma.com/blog/webbuilder-api/shopBlog/queryByPage';
      var data={};
      this.$axios.get(url, {}, {
      	headers: {
            "Content-Type":"application/json;charset=utf-8"
       }}).then(function(response){
              let result = response.data.result;
              if (0 == result) {
                this.menulist = response.data.item.menulist;
              } else if (11 == result || 9 == result) {
                this.$router.push('/login');
              } else {
                data = response.data;
                console.log(response.data);
              }


          }).catch( function(response) {
              // 这里是处理错误的回调
              console.log(response)
          });
          var id = 'com_' + zmEditor.EditorState.getNewID()
      var m = {
        'component': comButton,
        'prop': {'id': id, 'text': text,''}
      }
      zmEditor.setItem.items = comButton.data()['setItems']
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
