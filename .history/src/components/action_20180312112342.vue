<template>
  <div>{{prop.text}}<span v-html="prop.icon" @click="prop.callback"></span></div>
</template>

<script>
export default {
  name: 'action',
  props: ['prop']
}
</script>
