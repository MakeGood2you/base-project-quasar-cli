<template>
  <q-select
    v-model="el.form[el.key]"
    :name="el.name"
    :options="el.options"
    :options-dense="el.optionsDense"
    :label="el.label"
    :dense="el.dense"
    :filled="el.filled"
    :outlined="el.outlined"
    :use-input="el.useInput"
    :use-chips="el.useChips"
    :multiple="el.multiple"
    :menu-anchor="el.menuAnchor"
    :borderless="el.borderless"
    :input-debounce="el.inputDebounce"
    :option-label="el.optionLabel"
    :option-value="el.optionValue"
    :lazy-rules="el.lazyRules"
    :reactive-rules="el.reactiveRules"
    :rules="el.rules"
    :error="el.error"
    :options-cover="el.optionsCover"
    :stack-label="el.stackLabel"
    :map-options="el.mapOptions"
    :emit-value="el.emitValue"
    :color="el.color"
    :readonly="el.readonly"
    :disable="el.disable"
    :autofocus="el.autofocus"
    :required="el.required"
    @input="$emit('input', $event)"
  />
</template>

<script>
export default {
  name: 'BaseSelect',
  props: ['el']
}
</script>
