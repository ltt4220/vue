<template>
    <div class="zm-dialog-pageBox mCustomScrollbar _mCS_11 mCS-autoHide mCS_no_scrollbar">
        <ul class="zm-dialog-pageList">
            <span v-for="(item,i) in items" :key="">
                <li></li>
            </span>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'action',
  props: ['prop']
}
</script>
