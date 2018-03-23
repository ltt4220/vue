<template>
    <div class="zm-dialog-pageBox mCustomScrollbar _mCS_11 mCS-autoHide mCS_no_scrollbar">
        <ul class="zm-dialog-pageList">
            <span v-for="(item,i) in items" :key="i">
                <li class="zm-dialog-pageList-one sliderDragLi clearFloat" data-show="true" data-name="name" data-time="time" data-sortid="id">
                    <span class="zm-dialog-carousel-onePageIndex zm-dialog-serialNumber">{{i+1}}</span>
                    <input class="zm-dialog-pageList-title" placeholder="name" readonly>
                    <span class="zm-dialog-eye showKey iconfont" v-bind:class="icon-eyeOn">
                    svg.eyeOn</span>
                    <span class="zm-dialog-setting setKey iconfont" v-bind:class="icon-shezhi2">
                    svg.setting</span>
                </li>
            </span>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'action',
  props: ['prop'],
  items:[],
  data:function(){
      addClass:{
          
      }
  }
}
</script>
