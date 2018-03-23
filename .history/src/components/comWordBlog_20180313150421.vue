<template>
  <div :id="prop.id">
    <span :for="item in items"></span></div>
</template>

<script>
import setTitle from './setTitle'
export default {
  name: 'com-word-blog',
  props: ['prop'],
  items: [],
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
  },
  methods:{
    getData:function(){
      var _this= this;
      var data ={};
      data = this.prop.data
    }
  }
}
</script>
