<template>
    <div class="zm-dialog-pageBox mCustomScrollbar" theme="minimal">
        <ul class="zm-dialog-pageList">
                <li v-for="(item,i) in list" :key="i" class="zm-dialog-pageList-one sliderDragLi clearFloat" :data-sortid="item.fId" :data-show="true" :data-time="item.fCreateTime" :data-title="item.fTitle" v-bind:class="{'onlay':i==isOnlay,'onlayclick':i===isOnlayClick}" @mouseenter.passive="addEnter(i)" @mouseleave.passive="addLeave(i)" @click.stop="addClaClick(i)" @mousemove.stop="addMove()">
                    <span class="zm-dialog-carousel-onePageIndex zm-dialog-serialNumber">{{i+1}}</span>
                    <input class="zm-dialog-pageList-title" :placeholder="item.fTitle" readonly>
                    <span class="zm-dialog-eye iconfont" v-bind:class="{'icon-eyeOn': item.isIconEyeOn,'showKey': item.hasError,'icon-eyeOff':item.isIconEyeOn==false?!item.isIconEyeOn:(i==isKey) && item.isEyeOff}" @click.stop="addHidShow(i)"></span>
                    <span class="zm-dialog-setting iconfont" v-bind:class="{'icon-shezhi2':  iconShezhi2,'setKey':item.hasError}" @click.stop="addSetting(i)"></span>
                </li>
        </ul>
        <div class="zm-dialog-carousel-pageSetBox" v-show="isSelect" :style="{top:top}" @mousemove.stop="pageSetMove()">
            <div>重命名</div>
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
        iconShezhi2: true,
        hasError: true,
        isOnlayClick: "",
        isOnlay:"",
        isKey: 0,
        TargeAttr:{
            TargeAttrW:0,
            TargeAttrH:0,
            TargeAttrX:0,
            TargeAttrY:0
        },
        liAttr:{
            liAttrW:0,
            liAttrH:0,
            liAttrX:0,
            liAttrY:0
        },
        isSelect: false,
        items:[],
        list:[],
        top:"0px"
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
                  element.isEyeOff = false;
                  element.hasError = true;
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
             _this.isOnlay=-1; 
            // let onlay = event.target;
      },
      addMove:function(){
            var  _this = this;
            var className = event.currentTarget;
            var onlay = className.split("\\.")[className.split("\\.").length-1]
            if(onlay=="onlay"){
                let TargeAttr = className.getBoundingClientRect();
                _this.liAttr.TargeAttrW = TargeAttr.width + TargeAttr.x;
                _this.TargeAttr.TargeAttrH = TargeAttr.height + TargeAttr.y;
                _this.TargeAttr.TargeAttrX = TargeAttr.x;
                _this.TargeAttr.TargeAttrY = TargeAttr.y;
            }
      },
      pageSetMove:function(){
            var  _this = this;
            let TargeAttr = event.currentTarget.getBoundingClientRect();
            _this.TargeAttr.TargeAttrW = TargeAttr.width + TargeAttr.x;
            _this.TargeAttr.TargeAttrH = TargeAttr.height + TargeAttr.y;
            _this.TargeAttr.TargeAttrX = TargeAttr.x;
            _this.TargeAttr.TargeAttrY = TargeAttr.y;
            document.onmousemove = function(){
                event.stopPropagation()
                let W = _this.TargeAttr.TargeAttrW,
                    H = _this.TargeAttr.TargeAttrH,
                    X = _this.TargeAttr.TargeAttrX,
                    Y = _this.TargeAttr.TargeAttrY,
                    PageX = event.pageX,
                    PageY = event.pagey;
                if(PageX > W || PageX < X){
                    _this.isSelect =false;
                }else if(PageY > H || PageY < Y){
                    _this.isSelect =false;
                }
            }
      },
      addSetting:function(index){
            let _this = this;
             _this.top = index*41 +"px";
            for(let i = 0; i < _this.list.length; i++){
                if(i==index){
                    if(_this.isSelect){
                        _this.isSelect = !_this.isSelect;
                    }else{
                        _this.isSelect = !_this.isSelect;
                    }
                }
            }
      },
      addHidShow:function(index){
            let _this = this;
            for(let i = 0; i < _this.list.length; i++){
                 if(i == index){
                        _this.list[i].isIconEyeOn = !_this.list[i].isIconEyeOn;
                        _this.isKey = index;
                        _this.list[i].isEyeOff = !_this.list[i].isIconEyeOn;
        
                    }
            }
      },
      addReName:function(){

      }
  }
}
</script>
