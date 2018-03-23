<template>
  <div :id="prop.id">
    <span v-for="(,i) in items" :key="item"></span></div>
</template>

<script>
import setTitle from './setTitle'
export default {
  name: 'com-word-blog',
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
      items:this.prop.data
    }
  }
}
</script>
