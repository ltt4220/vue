<template>
    <div class="zm-dialog-pageBox mCustomScrollbar" theme="minimal">
        <ul class="zm-dialog-pageList">
                <li v-for="(item,i) in list" :key="i" class="zm-dialog-pageList-one sliderDragLi clearFloat" :data-sortid="item.fId" :data-show="true" :data-time="item.fCreateTime" :data-title="item.fTitle" v-bind:class="{'onlay':i==isOnlay,'onlayclick':i===isOnlayClick}" @mouseenter.stop="addEnter(i)" @mouseleave.stop="addLeave(i)" @click.stop="addClaClick(i)">
                    <span class="zm-dialog-carousel-onePageIndex zm-dialog-serialNumber">{{i+1}}</span>
                    <input class="zm-dialog-pageList-title" :placeholder="item.fTitle" readonly>
                    <span class="zm-dialog-eye iconfont" v-bind:class="{'icon-eyeOn': item.isIconEyeOn,'showKey': hasError,'icon-eyeOff':(i==isKey) && item.isEyeOff}" @click.stop="addHidShow(i)"></span>
                    <span class="zm-dialog-setting iconfont" v-bind:class="{'icon-shezhi2':  iconShezhi2,'setKey':hasError}"></span>
                </li>
        </ul>
    </div>
</template>
<style>
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
        isIconEyeOn: true,
        iconShezhi2: true,
        hasError: true,
        isEyeOff: false,
        isOnlayClick: "",
        isKey: 0,
        items:[],
        list:[],
        isOnlay:"",
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
                  element.isSelect = true;
                  element.isIconEyeOn = true;
                  element.isEyeOff = false;
                  element.fCreateTime = date;
              });
                _this.items = data; 
                _this.list= _this.items;
              console.log(response.data);
            }
            

        }).catch( function(response) {
            // 这里是处理错误的回调
            console.log(response)
        });
  },
  methods:{
      addClaClick:function(i){
            let _this = this;
            _this.isOnlayClick= i;
      },
      addEnter:function(i){
          let _this = this;
            _this.isOnlay= i;
      },
      addLeave:function(i){
            let _this = this;
            _this.isOnlay= i+1;
      },
      addSetting:function(){

      },
      addHidShow:function(index){
            let _this = this;
            for(let i=0;i<_this.list.length;i++){
                 if(i == index){
                        _this.list[i].isSelect = !_this.list[i].isSelect;
                        _this.isKey = index;
                        console.log( _this.isKey)
                        
                        // _this.isEyeOff = !_this.list[i].isSelect;
                        _this.list[i].isEyeOff = !_this.list[i].isSelect;
                        // _this.list[i].isEyeOff = _this.list[i].isSelect;
                        console.log(_this.isEyeOff)
        
                    }
            }
      },
      addReName:function(){

      }
  }
}
</script>
