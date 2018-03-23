<template>
  <div :id="prop.id">
    <div>
      <span v-for="(item,i) in items" :key="i">fff</span>
    </div>
  </div>
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
  },
  beforeCreate:function()
}
</script>
