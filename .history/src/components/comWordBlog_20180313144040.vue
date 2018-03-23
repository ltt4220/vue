<template>
  <div :id="prop.id">
    <span :for="item in items"></span></div>
</template>

<script>
import setTitle from './setTitle'
export default {
  name: 'com-button',
  props: ['prop'],
  data: function () {
    return {
      setItems: [{
        'component': setTitle,
        'prop': {
          'text': '设置按钮文字',
          'attr': 'text', 
          'defaultValue': '我是个按钮'
        }
      }],
      items:[]
    }
  },
  methods(){
    this.items
    this.p
  }
}
</script>
