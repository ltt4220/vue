<template>
  <img :id="prop.id" :src="prop.src">
</template>

<script>
import action from './action'
import setSrc from './setSrc'
export default {
  name: 'com-logo',
  props: ['prop'],
  data: function () {
    return {
      setItems: [{
        'component': setSrc,
        'prop': {
          'text': '设置图片',
          'attr': 'src',
          'defaultValue': '/static/zuma.png'
        }
      }],
      actions: [{
        'component': action,
        'prop': {
          'text': '设置',
          'icon': '<svg xmlns="http: //www.w3.org/2000/svg" xmlns: xlink="http: //www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24"> <path fill="red" d="M17,0c-1.9,0-3.7,0.8-5,2.1C10.7,0.8,8.9,0,7,0C3.1,0,0,3.1,0,7c0,6.4,10.9,15.4,11.4,15.8 c0.2,0.2,0.4,0.2,0.6,0.2s0.4-0.1,0.6-0.2C13.1,22.4,24,13.4,24,7C24,3.1,20.9,0,17,0z"></path></svg>',
          'callback': function () {
            zmEditor.action.items[0].prop.text = '设置设置'
          }
        }
      }, {
        'component': action,
        'prop': {
          'text': '样式',
          'icon': '<svg xmlns="http: //www.w3.org/2000/svg" version="1.1" x="0px" y="0px" width="24px" height="24px"><circle cx="12" cy="12" r="10" stroke="black" stroke-width="0" fill="red" /></svg>',
          'callback': function () {
            zmEditor.action.items[1].prop.text = '样式样式'
          }
        }
      }]
    }
  }
}
</script>
