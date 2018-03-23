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
  methods:function(){
     var url = 'http://zuma.com/blog/webbuilder-api/shopBlog/queryByPage'
      self.$axios.get(url, {}, {
      	headers: {
            "Content-Type":"application/json;charset=utf-8"
       }}).then(function(response){
              let result = response.data.result;
              if (0 == result) {
                self.menulist = response.data.item.menulist;
              } else if (11 == result || 9 == result) {
                self.$router.push('/login');
              } else {
                console.log(response.data);
              }


          }).catch( function(response) {
              // 这里是处理错误的回调
              console.log(response)
          });
  }
}
</script>
