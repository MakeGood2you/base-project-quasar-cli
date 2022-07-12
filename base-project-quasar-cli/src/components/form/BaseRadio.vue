<template>
  <q-radio
    v-model="el.model"
    :name="el.name"
    :keep-color="el.keepColor"
    :tabindex="el.tabindex"
    :label="el.label"
    :left-label="el.leftLabel"
    :val="el.val"
    :disable="el.disable"
    :size="el.size"
    :color="el.color"
    :dark="el.dark"
    :dense="el.dense"
  />
</template>

<script>
export default {
  name: 'BaseRadio',
  props: ['el']
}
</script>
