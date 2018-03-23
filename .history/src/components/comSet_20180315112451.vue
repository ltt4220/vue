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
  name: 'com-set-blog',
  props: [','data'],
  items:["<span>1</sapan","<span>2</sapan","<span>3</sapan"],
  
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
