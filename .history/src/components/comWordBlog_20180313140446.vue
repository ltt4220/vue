<template>
  <!-- <button :id="prop.id">{{prop.text}}</button> -->
  <div :id="prop.id" > 
    <li v-for="item in items"></li>
  </div>
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
  }
}
</script>
