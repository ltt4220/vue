<template>
    <div class="zm-dialog-pageBox mCustomScrollbar _mCS_11 mCS-autoHide mCS_no_scrollbar">
        <ul class="zm-dialog-pageList">
            <span v-for="(item,i) in items" :key="i">
            </span>
        </ul>
    </div>
</template>

<script>
export default {
    el:""
  name: 'com-set-blog',
  props: ['prop'],
  items:[],
  
  data:function(){
      return{
        addClass:{
            iconEyeOn:"icon-eyeOn",
            iconShezhi2:"icon-shezhi2"
        }
      }
  }
}
</script>
