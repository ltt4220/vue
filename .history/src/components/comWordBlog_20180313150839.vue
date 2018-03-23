<template>
  <div :id="prop.id">
    <span :for="item in prop.data"></span></div>
</template>

<script>
import setTitle from './setTitle'
export default {
  name: 'com-word-blog',
  props: ['prop'],
  // items: this.methods.getData(),
  data: function () {
    return {
      setItems: [{
        'component': setTitle,
        'prop': {
          'text': '设置按钮文字',
          'attr': 'text', 
          'defaultValue': '我是个按钮'
        }
      }]
    }
  }
}
</script>
