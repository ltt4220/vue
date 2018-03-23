<template>
  <div :id="prop.id" class="zm-component-main" :style="{position:unitData.position, width:unitData.width,height:unitData.height,left:unitData.x,top:unitData.y,zIndex:unitData.zIndex}">
    <div class="zm-component-blog-content wordsBlog" data-type="words" :data-num="num">
      <span v-for="(item,i) in list" :key="i">
          <div class="zm-component-blog-box" :data-sortid="item.fId" :data-show="true" :data-time="item.fCreateTime" :data-title="item.fTitle" :style="{backgroundColor:settingData.BoxBackgroundColor.value,marginBottom:settingData.BoxMarginBottom.value,paddingLeft:settingData.paddingLeftRight.value,paddingRight:settingData.paddingLeftRight.value}">
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
                  <a class="zm-component-blog-title-a" target="_blank" :href="item.Detail">
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
                <div class="zm-component-blog-word" v-html="item.fContent">
                </div>
                <div class="zm-component-blog-viewMore">
                  <a class="zm-component-details" target="_blank" :href="item.Detail">
                  查看详情
                  </a>
                </div>
              </div>
            </div>
          </div>
      </span>
    </div>
    <span v-html="style"></span>
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
      style:`<style> 
      .zm-component-blog-title-a{color:black;}
      .zm-component-blog-title-a:hover{color:red;}
      </style>`,
      setItems: [{
        'component': setTitle,
        'prop': {
          'text': '设置按钮文字',
          'attr': 'text', 
          'defaultValue': '我是个按钮'
        }
      }],
       "unitData": {
          "type":"words",
          "minWidth": "300px",
          "minHeight": "370px",
          "width": "542px",
          "height": "478px",
          "x": "0px",
          "y": "0px",
          "zIndex": "0",
          "isRotate": "false",
          "pattern": "normal",
          "position": "absolute"
        },
        "settingData":{
          "blogNum":{
            "value":"2",
            "id":"blog1-1",
            "valName":"blogNum"
          },
          "BoxBackgroundColor":{
            "value":"rgba(242,242,242,1)",
            "id":"blog1-2",
            "valName":"BoxBackgroundColor"
          },
          "BoxMarginBottom":{
            "value":"10px",
            "id":"blog1-3",
            "valName":"BoxMarginBottom"
          },
          "paddingLeftRight":{
            "value":"20px",
            "id":"blog1-4",
            "valName":"paddingLeftRight"
          },
          "controlRowAlign":{
            "value":"left",
            "id":"blog2-1",
            "valName":"controlRowAlign"
          },
          "Familyfont": {
            "value":{
              "fontFamily":"微软雅黑",
              "fontSize":"18px",
              "color":"rgba(204,51,0,1)",
              "fontWeight":"600",
              "fontStyle":"normal"
            },
            "opacity":"1",
            "id":"blog2-2",
            "valName":"Familyfont"
          },
          "hoverColor":{
            "value":"rgba(22,122,11,1)",
            "id":"blog2-3",
            "valName":"hoverColor"
          },
          "TitmarginTop":{
            "value":"0px",
            "id":"blog2-4",
            "valName":"TitmarginTop"
          },
          "TitmarginBottom":{
            "value":"0px",
            "id":"blog2-5",
            "valName":"TitmarginBottom"
          },
          "blogShow":{
            "value": true,
            "num":"block",
            "id":"blog3-1",
            "valName":"blogShow"
          },
          "blogTime":{
            "value":"2018-1-26",
            "id":"blog3-1-1",
            "valName":"blogTime"
          },
          "blogTimeFont":{
            "value":{
              "fontFamily":"微软雅黑",
              "fontSize":"14px",
              "color":"rgba(0,0,0,1)",
              "fontWeight":"normal",
              "fontStyle":"normal"
            },
            "id":"blog3-1-2",
            "valName":"blogTimeFont"
          },
          "blogTimeAlign":{
            "value":"left",
            "id":"blog3-1-3",
            "valName":"blogTimeAlign"
          },
          "blogTimeTop":{
            "value":"10px",
            "id":"blog3-1-4",
            "valName":"blogTimeTop"
          },
          "blogTimeBottom":{
            "value":"10px",
            "id":"blog3-1-5",
            "valName":"blogTimeBottom"
          },
          "lineHeightNum":{
            "value":"5px",
            "num":"100px",
            "id":"blog4-1",
            "valName":"lineHeightNum"
          },
          "blogContFont":{
            "value":{
              "fontFamily":"微软雅黑",
              "fontSize":"14px",
              "color":"rgba(0,0,0,1)",
              "fontWeight":"normal",
              "fontStyle":"normal"
            },
            "id":"blog4-2",
            "valName":"blogContFont"
          },
          "ContmarginTop":{
            "value":"0px",
            "id":"blog4-3",
            "valName":"ContmarginTop"
          },
          "ContTextIndent":{
            "value":"0px",
            "id":"blog4-4",
            "valName":"ContTextIndent"
          },
          "ContLineHeight":{
            "value":"20px",
            "id":"blog4-5",
            "valName":"ContLineHeight"
          },
          "ContmarginBottom":{
            "value":"0px",
            "id":"blog4-6",
            "valName":"ContmarginBottom"
          },
          "ContcontrolRowAlign":{
            "value":"left",
            "id":"blog4-7",
            "valName":"ContcontrolRowAlign"
          },
          "blogDetailsShow":{
            "value":true,
            "num":"block",
            "id":"blog5-1",
            "valName":"blogDetailsShow"
          },
          "blogDetails":{
            "value":{
              "text":"查看详情",
              "iconClass":""
            },
            "id":"blog5-1-1",
            "valName":"blogDetails"
          },
          "blogDetailsText":{
            "value":"查看详情",
            "id":"blog5-1-1-1",
            "valName":"blogDetailsText"
          },
          "DiscontrolRowAlign":{
            "value":"left",
            "id":"blog5-1-2",
            "valName":"DiscontrolRowAlign"
          },
          "blogScale":{
            "value":"rgba(50,137,199,1)",
            "id":"blog5-1-3",
            "valName":"blogScale"
          },
          "DishoverColor":{
            "value":"rgba(50,137,199,1)",
            "id":"blog5-1-4",
            "valName":"DishoverColor"
          },
          "DismarginTop":{
            "value":"10px",
            "id":"blog5-1-5",
            "valName":"DismarginTop"
          },
          "DismarginBottom":{
            "value":"0px",
            "id":"blog5-1-6",
            "valName":"DismarginBottom"
          }
      },
      items:[],
      list:[],
      num:2
    }
  },
  beforeCreate(){
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
                var date =new Date(element.fCreateTime).toLocaleString().replace(/:d{1,2}$/, ' ');
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
  computed:{  
        changemsg:function(){ 
          var _this = this; 
          var color= _this.settingData.hoverColor;
          var old_color = _this.settingData.Familyfont.value.color;
        return this.msg.split("").reverse().join("");  
    }
}
</script>
