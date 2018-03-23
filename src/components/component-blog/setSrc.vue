<template>
  <div><input v-model="prop.defaultValue" type="text" /><input type="button" @click="setSrc" :value="prop.text" /></div>
</template>
<script>
export default {
  name: 'set-src',
  props: ['prop'],
  methods: {
    setSrc: function () {
      var self = this
      zmEditor.selectComponentList.forEach(function (item) {
        if (item.component.name === 'com-logo')item.prop[self.prop.attr] = self.prop.defaultValue
      })
    }
  }
}
</script>
