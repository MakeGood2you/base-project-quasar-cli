<template>
  <q-btn-toggle
    v-model="el.form[el.key]"
    :name="el.name"
    :spread="el.spread"
    :no-caps="el.noCaps"
    :no-wrap="el.noWrap"
    :stack="el.stack"
    :stretch="el.stretch"
    :model-value="el.modelValue"
    :options="el.options"
    :clearable="el.clearable"
    :readonly="el.readonly"
    :disable="el.disable"
    :color="el.color"
    :text-color="el.textColor"
    :toggle-color="el.toggleColor"
    :toggle-text-color="el.toggleTextColor"
    :outline="el.outline"
    :flat="el.flat"
    :unelevated="el.unelevated"
    :rounded="el.rounded"
    :push="el.push"
    :glossy="el.glossy"
    :size="el.size"
    :padding="el.padding"
    :ripple="el.ripple"
    :dense="el.dense"
    @input="$emit('onChange')"
  />
</template>

<script>
export default {
  name: 'BaseBtnToggle',
  props: ['el']
}
</script>

<style lang="scss" scoped>
.q-btn-group {
  width: 100%;
  //border: 1px solid #8CC23D;

  ::v-deep {

    button {
      width: 100%;
    }
  }
}
</style>
