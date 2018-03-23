<template>
    <div class="zm-dialog-pageBox mCustomScrollbar" theme="minimal">
        <ul class="zm-dialog-pageList">
                <li v-for="(item,i) in list" :key="i" class="zm-dialog-pageList-one sliderDragLi clearFloat" :data-sortid="item.fId" :data-show="true" :data-time="item.fCreateTime" :data-title="item.fTitle">
                    <span class="zm-dialog-carousel-onePageIndex zm-dialog-serialNumber">{{i+1}}</span>
                    <input class="zm-dialog-pageList-title" :placeholder="item.fTitle" readonly>
                    <span class="zm-dialog-eye iconfont" v-bind:class="{'icon-eyeOn': isActive,'showKey': hasError,'icon-eyeOff':isEyeOff}"></span>
                    <span class="zm-dialog-setting iconfont" v-bind:class="{'icon-shezhi2':  isActive,'setKey':hasError}"></span>
                </li>
        </ul>
    </div>
</template>
<style scoped>
    @import '../../style/component-blog/blog.css';
</style>
<script>
export default {
  name: 'com-set-blog',
  props: ['prop'], 
  data:function(){
      return{
        addClass:{
              iconEyeOn:"icon-eyeOn",
              iconShezhi2:"icon-shezhi2"
        },
        isActive: true,
        hasError: true,
        isEyeOff: false,
        items:[],
        list:[],
        num:2
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
              var data = response.data.data;
              data.forEach(element => {
                const paten = /style\s*=\s*["'][^"']+["']/g;
                var date =new Date(element.fCreateTime).toLocaleString().replace(/:d{1,2}$/, ' ');
                  element.fContent = element.fContent.replace(paten,"");
                  element.fCreateTime = date;
              });
                _this.items = data; 
                _this.list= _this.items.slice(0,_this.num)
              console.log(response.data);
            }
            

        }).catch( function(response) {
            // 这里是处理错误的回调
            console.log(response)
        });
  },
  methods:{
      addEnter:function(){
          let _this=this;
      },
      addLeave:function(){

      },
      addSetting:function(){

      },
      addHidShow:function(){

      },
      addReName:function(){

      }
  }
}
</script>
