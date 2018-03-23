<template>
  <div :id="prop.id">
    <div>
      <span v-for="(item,i) in items" :key="i">fff</span>
    </div>
  </div>
</template>
<style></style>
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
      items:[]
    }
  },
  beforeCreate:function(){
    var _this= this;
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
                 _this.items = response.data.data;
                console.log(response.data);
              }
             

          }).catch( function(response) {
              // 这里是处理错误的回调
              console.log(response)
          });
  }
}
</script>
