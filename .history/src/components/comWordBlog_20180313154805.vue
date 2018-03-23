<template>
  <div :id="prop.id">
    <div>
      <span v-for="(item,i) in items" :key="i">
          <div class="zm-component-blog-box" :data-sortid="item.fId" :data-show="true" :data-time="fCreateTime.date" zm-data-title="item.fTitle">
            <div class="zm-component-blog-mediaBox medialBoxOne">
              <div class="zm-component-blog-bgImg">
              </div>
              <div class="zm-component-blog-bgVideo">
                <span class="zm-component-videoControls">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100px" height="100px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve"><g><g class="st0"><path class="st1" d="M50,99.5C22.7,99.5,0.5,77.3,0.5,50S22.7,0.5,50,0.5S99.5,22.7,99.5,50S77.3,99.5,50,99.5z"/><path class="st1" d="M50,1c27,0,49,22,49,49S77,99,50,99S1,77,1,50S23,1,50,1 M50,0C22.4,0,0,22.4,0,50c0,27.6,22.4,50,50,50s50-22.4,50-50C100,22.4,77.6,0,50,0L50,0z"/></g><g><path class="st1" d="M50,1c27,0,49,22,49,49S77,99,50,99S1,77,1,50S23,1,50,1 M50,0C22.4,0,0,22.4,0,50c0,27.6,22.4,50,50,50s50-22.4,50-50C100,22.4,77.6,0,50,0L50,0z"/></g></g><g class="st2"><path class="st1" d="M71.2,52c1.9-1.1,1.9-2.9,0-3.9l-31-17.6c-1.9-1.1-3.5-0.2-3.5,2v35c0,2.2,1.6,3.1,3.5,2L71.2,52z"/></g>	
                  </svg>
                </span>
                <video></video>
              </div>
            </div>
            <div class="zm-component-blog-detail">
              <div class="zm-component-blog-upcont">
                <div class="zm-component-blog-title">
                  <a class="zm-component-blog-title-a" target="_blank" zm-href="item.Detail">
                    {{item.fTitle}}
                  </a>
                </div>
                <div class="zm-component-blog-date">{{item.fCreateTime}}
                </div>
                <div class="zm-component-blog-mediaBox mediaBoxTwo">
                  <div class="zm-component-blog-bgImg">
                    
                  </div>
                  <div class="zm-component-blog-bgVideo">
                    <span class="zm-component-videoControls">
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100px" height="100px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve"><g><g class="st0"><path class="st1" d="M50,99.5C22.7,99.5,0.5,77.3,0.5,50S22.7,0.5,50,0.5S99.5,22.7,99.5,50S77.3,99.5,50,99.5z"/><path class="st1" d="M50,1c27,0,49,22,49,49S77,99,50,99S1,77,1,50S23,1,50,1 M50,0C22.4,0,0,22.4,0,50c0,27.6,22.4,50,50,50s50-22.4,50-50C100,22.4,77.6,0,50,0L50,0z"/></g><g><path class="st1" d="M50,1c27,0,49,22,49,49S77,99,50,99S1,77,1,50S23,1,50,1 M50,0C22.4,0,0,22.4,0,50c0,27.6,22.4,50,50,50s50-22.4,50-50C100,22.4,77.6,0,50,0L50,0z"/></g></g><g class="st2"><path class="st1" d="M71.2,52c1.9-1.1,1.9-2.9,0-3.9l-31-17.6c-1.9-1.1-3.5-0.2-3.5,2v35c0,2.2,1.6,3.1,3.5,2L71.2,52z"/></g>
                        
                      </svg>
                    </span>
                    <video></video>
                  </div>
                </div>
                <div class="zm-component-blog-word}">
                  {{item.fContent}}
                </div>
                <div class="zm-component-blog-viewMore" zm-style="{display:settingData.blogDetailsShow.num,text-align:settingData.DiscontrolRowAlign.value,margin-top:settingData.DismarginTop.value,margin-bottom:settingData.DismarginBottom.value}">
                  <a class="zm-component-details" target="_blank" zm-href="item.datail" zm-data-type-hovercolor="settingData.DishoverColor.value" zm-data-old-color="settingData.blogScale.value" zm-style="{color:settingData.blogScale.value}">
                  {{settingData.blogDetailsText.value}}
                  </a>
                </div>
              </div>
            </div>
          </div>
      </span>
    </div>
  </div>
</template>
<style scoped>
    @import './css/components.Blog.PC.Edit.css';
</style>
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
