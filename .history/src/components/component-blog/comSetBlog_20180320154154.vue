<template>
    <div class="zm-dialog-pageBox mCustomScrollbar" theme="minimal">
        <ul class="zm-dialog-pageList">
                <li v-for="(item,i) in list" :key="i" class="zm-dialog-pageList-one sliderDragLi clearFloat" :data-sortid="item.fId" :data-show="true" :data-time="item.fCreateTime" :data-title="item.fTitle" v-bind:class="{'onlay':i==isOnlay,'onlayclick':i===isOnlayClick}" @mouseenter.passive="addEnter(i)" @mouseleave.passive="addLeave(i)" @click.stop="addClaClick(i)">
                    <span class="zm-dialog-carousel-onePageIndex zm-dialog-serialNumber">{{i+1}}</span>
                    <input class="zm-dialog-pageList-title" :placeholder="item.fTitle" readonly>
                    <span class="zm-dialog-eye iconfont" v-bind:class="{'icon-eyeOn': item.isIconEyeOn,'showKey': item.hasError,'icon-eyeOff':item.isIconEyeOn==false?item.isIconEyeOff:(i==isKey) && item.isEyeOff,'icon-cha2':item.isIconCha}" @click.stop="addHidShow(i)"></span>
                    <span class="zm-dialog-setting iconfont" v-bind:class="{'icon-shezhi2':item.iconShezhi2,'setKey':item.hasError,'icon-duigou1':item.isIconDuigou1}" @click.stop="addSetting(i)"></span>
                </li>
        </ul>
        <div class="zm-dialog-carousel-pageSetBox" @mouseenter="pageSetEnter()" @mouseleave="pageSetLeave()" v-show="isSelect" :style="{top:top}">
            <div @click="addReName()">重命名</div>
            <div>移除</div>
        </div>
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
        isOnlayClick: "",
        isOnlay:"",
        isKey: 0,
        items:[],
        list:[],
        isSelect:false,
        top:"0px",
        num:0
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
                element.isIconEyeOn = true;
                element.iconShezhi2 = true;
                element.isIconCha = false;
                element.isIconDuigou1 = false;
                element.isEyeOff = false;
                element.hasError = true;
                element.isIconEyeOff = true;
                element.fCreateTime = date;
              });
                _this.items = data; 
                _this.list= _this.items;
            }
            

        }).catch( function(response) {
            // 这里是处理错误的回调

        });
  },
  methods:{
      pageSetEnter:function(){
          this.a=true;
      },
      pageSetLeave:function(){
          this.a = false;
          this.isSelect = false;
      },
      addClaClick:function(i){
            let _this = this;
            _this.isOnlayClick= i;
            _this.num = i;
      },
      addEnter:function(i){
            let _this = this;
            _this.isOnlay= i;
      },
      addLeave:function(i){
            let _this = this;
             _this.isOnlay=-1; 
            setTimeout(()=>{
                if(!_this.a){
                    _this.isSelect = false;
                }
             },200);
      },
      addSetting:function(index){
            let _this = this;
            _this.num = index;
            _this.iconShezhi2 = true;
            _this.top = index*41 +"px";
            _this.isOnlayClick= index;
            let ClassName = event.currentTarget.className;
            if(ClassName.indexOf("icon-duigou1")>-1){
                _this.isSelect = false;
                for(let i = 0; i < _this.list.length; i++){
                    _this.list[index].iconShezhi2 = true;
                    _this.list[index].isIconDuigou1 = false;
                    _this.list[index].isIconEyeOn = true;
                    _this.list[index].isIconCha = false;
                    _this.list[index].isEyeOff = false;
                    _this.list[index].hasError = true;
                    _this.list[index].isIconEyeOff = true;
                }
            }else{
                for(let i = 0; i < _this.list.length; i++){
                //     _this.list[index].iconShezhi2 = true;
                //     _this.list[index].isIconDuigou1 = false;
                //     _this.list[index].isIconEyeOn = true;
                //     _this.list[index].isIconCha = false;
                //     _this.list[index].isEyeOff = false;
                //     _this.list[index].hasError = true;
                //     _this.list[index].isIconEyeOff = true;
                    if(i==index){
                        if(_this.isSelect){
                            _this.isSelect = !_this.isSelect;
                        }else{
                            _this.isSelect = !_this.isSelect;
                        }
                    }
                }
            }
      },
      addHidShow:function(index){
            let _this = this;
            _this.isSelect = false;
            _this.num = index;
            for(let i = 0; i < _this.list.length; i++){
                _this.list[index].iconShezhi2 = true;
                _this.list[index].isIconDuigou1 = false;
                _this.list[index].isIconCha = false;
                _this.list[index].hasError = true;
                _this.list[index].isIconEyeOff = true;
                 if(i == index){
                        _this.list[i].isIconEyeOn = !_this.list[i].isIconEyeOn;
                        _this.isKey = index;
                        _this.list[i].isEyeOff = !_this.list[i].isIconEyeOn;
        
                    }
            }
      },
      addReName:function(){
            let _this = this;
            let num = _this.num;
            // for(let i = 0; i < _this.list.length; i++){
            //     _this.list[num].iconShezhi2 = false;
            //     _this.list[num].hasError = false;
            //     _this.list[num].isIconEyeOff = false;
            //     _this.list[num].isIconEyeOn = false;
            //     _this.list[num].isEyeOff = false;
            //     _this.list[num].isIconCha = true;
            //     _this.list[num].isIconDuigou1 =true;
            // }
      },
      addListSet:function(num){
            for(let i = 0; i < _this.list.length; i++){
            _this.list[num].iconShezhi2 = false;
            _this.list[num].hasError = false;
            _this.list[num].isIconEyeOff = false;
            _this.list[num].isIconEyeOn = false;
            _this.list[num].isEyeOff = false;
            _this.list[num].isIconCha = true;
            _this.list[num].isIconDuigou1 =true;
        }
     }
  }
}
</script>
