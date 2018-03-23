<template>
  <div><input v-model="prop.defaultValue" type="text" /><input type="button" @click="setTitle" :value="prop.text" /></div>
</template>
<script>

export default {
  name: 'set-title',
  props: ['prop'],
  methods: {
    setTitle: function () {
      var self = this
      zmEditor.selectComponentList.forEach(function (item) {
        if (item.component.name === 'com-button') item.prop[self.prop.attr] = self.prop.defaultValue
      })
    }
  }
}
</script>
