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
                data = response.data.data;
                console.log(response.data);
              }
              var id = 'com_' + zmEditor.EditorState.getNewID()
              var m = {
                'component': comWordBlog,
                'prop': {'id': id,'data': data}
              }
              // zmEditor.setItem.items = comWordBlog.data()['setItems']
              _this.items.push(m)
              zmEditor.selectComponentList.push(m)

          }).catch( function(response) {
              // 这里是处理错误的回调
              console.log(response)
          });
  }
}
</script>
