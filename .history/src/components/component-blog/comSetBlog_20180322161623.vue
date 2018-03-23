<template>
    <div class="zm-dialog-pageBox mCustomScrollbar" theme="minimal" @click="addClick()">
        <ul class="zm-dialog-pageList">
                <li v-for="(item,i) in list" :key="i" class="zm-dialog-pageList-one sliderDragLi clearFloat" :data-fid="item.fId" :data-show="true" :data-time="item.fCreateTime" :data-title="item.fInitName" v-bind:class="{'onlay':i==isOnlay,'onlayclick':i===isOnlayClick,'wrong':i===isWrong}" @mouseenter.passive="addMouseEnter(i)" @mouseleave.passive="addMouseLeave(i)" @click.stop="addClaClick(i)">
                    <span class="zm-dialog-carousel-onePageIndex zm-dialog-serialNumber">{{i+1}}</span>
                    <input class="zm-dialog-pageList-title" readonly :value="item.fTitle" v-bind:class="{ 'onFocus': i===isOnFocus}" @dblclick.stop="addAbClick(i)" @input.stop.prevent="addInput(item,i)" @keyup.enter="addEnter(i)"> 
                    <span class="zm-dialog-eye iconfont" v-bind:class="{'icon-eyeOn': item.isIconEyeOn,'showKey': item.hasError,'icon-eyeOff':item.isIconEyeOn==false?item.isIconEyeOff:(i==isKey) && item.isEyeOff,'icon-cha2':item.isIconCha}" @click.stop="addHidShow(i)"></span>
                    <span class="zm-dialog-setting iconfont" v-bind:class="{'icon-shezhi2':item.iconShezhi2,'setKey':item.hasError,'icon-duigou1':item.isIconDuigou1}" @click.stop="addSetting(i)"></span>
                </li>
        </ul>
        <div class="zm-dialog-carousel-pageSetBox" @mouseenter="pageSetEnter()" @mouseleave="pageSetLeave()" v-show="isSelect" :style="{top:top}">
            <div @click.stop.prevent="addReName()">重命名</div>
            <div @click.stop.prevent="addReMove()">移除</div>
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
        isOnlayClick: "",
        isOnlay:"",
        isWrong:"",
        isOnFocus:"",
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
                element.fInitName = element.fTitle;
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
    addReMove:function(){
        let _this =  this;
        let parClass = event.currentTarget.parentElement.previousElementSibling;
        let chiClass = parClass.children[_this.num];
        parClass.removeChild(chiClass);
        _this.list.splice(_this.num,0);//移除list 数据;
        this.isSelect = false;//小弹出框隐藏;
    },
    addInputInit:function(currentTarget){
        let _this = this;
        let Target = null;
        _this.list.forEach((item,i) => {
            if(currentTarget.className.indexOf("icon-cha2")>-1){
            Target = currentTarget.parentElement.parentElement.children[i].getAttribute("data-title");
            }else{
            Target = currentTarget.firstChild.children[i].getAttribute("data-title");
            }
            item.fTitle = Target
        });//input value 初始化;
    },
    addChangeName:function(){
        let _this = this;
        var targName = null;
        let ClassName = event.currentTarget.className;
        let url = 'http://zuma.com/blog/webbuilder-api/shopBlog/updateTitle';
        _this.isWrong = -1;
        _this.isOnFocus = -1;
        if(ClassName.indexOf("icon-duigou1")>-1){
            targName = event.currentTarget.parentElement.children[1];
        }else{
            targName = event.currentTarget;
        }
        let liFath = targName.parentElement;
        let fid = liFath.getAttribute("data-fid");
        let fname = targName.value;
        targName.setAttribute("readonly",true);
        targName.setAttribute("value",fname)
        _this.$axios.get(url,{
            params: {
                "fId" : fid,
                "fBlogTitle" :fname}
            },{
            headers: {
          "Content-Type":"application/json;charset=utf-8"
        }}).then(function(response){
            let result = response.data.result;
            if (0 == result) {
                console.log("数据异常!")
            }else{
                console.log("数据OK!")
            }
          }).catch(error=>{
                        console.log(error);
            })
    },
    addClick:function(){
        let _this = this;
        _this.addInputInit(event.currentTarget);//input value 初始化;
        _this.addListinit(_this.list,_this.num);//list图标数据类初始化;
        _this.isWrong = -1;
        _this.isOnFocus = -1;
        event.currentTarget.children[_this.num].children[1].setAttribute("readonly",true);//input设置只读;
    },
    addEnter:function(){
        let _this = this;
        _this.addChangeName();
    },
    addInput:function(item,i){
        let _this = this;
        item.fTitle = event.currentTarget.value;
    },
    addAbClick:function(index){
        let _this = this;
        let targName = event.currentTarget;
        targName.removeAttribute("readonly");
        _this.isOnFocus = index;
        targName.select();
        _this.addListSet(index)
        _this.isOnlayClick= -1;
        _this.isWrong = index;
    },
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
        _this.addListinit(_this.list,i);//list图标数据类初始化;
        _this.isWrong = -1;
        _this.isOnFocus = -1;
        event.currentTarget.children[1].setAttribute("readonly",true);//input设置只读;
    },
    addMouseEnter:function(i){
        let _this = this;
        _this.isOnlay = i;
    },
    addMouseLeave:function(i){
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
            _this.addListinit(_this.list,_this.num);//list图标数据类初始化;
            _this.isOnlayClick= -1;
            _this.isWrong = -1;
            _this.isOnFocus = -1;
            event.currentTarget.parentElement.children[1].setAttribute("readonly",true);//input设置只读;
            _this.addChangeName();//input重命名；
        }else{
            for(let i = 0; i < _this.list.length; i++){
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
        let ClassName = event.currentTarget.className;
        if(ClassName.indexOf("icon-cha2")>-1){//数据重命名叉
            _this.isWrong = -1;
            _this.isOnFocus = -1;
            event.currentTarget.parentElement.children[1].setAttribute("readonly",true);//input设置只读;
             _this.addInputInit(event.currentTarget)//input value 初始化；
        }else if(ClassName.indexOf("icon-eyeOff")>-1){//数据隐藏;
            console.log("********")
        }else if(ClassName.indexOf("icon-eyeOn")>-1){//数据显示;
            console.log("////////////")
        }
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
        let parClass = event.currentTarget.parentElement.previousElementSibling.children[_this.num];
        let targName = parClass.children[1];
        targName.removeAttribute("readonly");
        targName.focus();
        targName.select();
        _this.addListSet(_this.num);//list图标数据设置;
        _this.isOnlayClick= -1;
        _this.isWrong = _this.num;
        _this.isOnFocus = _this.num;
    },
    addListinit:function(list,index){
        for(let i = 0; i <list.length; i++){
            list[index].iconShezhi2 = true;
            list[index].isIconDuigou1 = false;
            list[index].isIconEyeOn = true;
            list[index].isIconCha = false;
            list[index].isEyeOff = false;
            list[index].hasError = true;
            list[index].isIconEyeOff = true;
        }
    },
    addListSet:function(num){
        let _this = this;
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
