<template>
    <div class="zm-dialog-pageBox mCustomScrollbar _mCS_11 mCS-autoHide mCS_no_scrollbar">
        <ul class="zm-dialog-pageList">
            <span v-for="(item,i) in items" :key="i">
                <li class="zm-dialog-pageList-one sliderDragLi clearFloat" :data-sortid="item.fId" :data-show="true" :data-time="item.fCreateTime" :data-title="item.fTitle">
                    <span class="zm-dialog-carousel-onePageIndex zm-dialog-serialNumber">{{i+1}}</span>
                    <input class="zm-dialog-pageList-title" placeholder="item.fTitle" readonly>
                    <span class="zm-dialog-eye showKey iconfont" v-bind:class="addClass.iconEyeOn">
                    svg.eyeOn</span>
                    <span class="zm-dialog-setting setKey iconfont" v-bind:class="addClass.iconShezhi2">
                    svg.setting</span>
                </li>
            </span>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'com-set-blog',
  props: ['prop'], 
  data:function(){
      return{
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
  }
}
</script>
