<template>
  <div><input v-model="prop.defaultValue" type="text" /><input type="button" @click="setTitle" :value="prop.text" /></div>
</template>
<script>

export default {
  name: 'set-title',
  props: ['prop'],
  methods: {
    setTitle: function () {
      var self = this
      zmEditor.selectComponentList.forEach(function (item) {
        if (item.component.name === 'com-button') item.prop[self.prop.attr] = self.prop.defaultValue
      })
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
}
</script>
