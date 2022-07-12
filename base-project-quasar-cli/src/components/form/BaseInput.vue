<template>
  <q-input
    v-model="el.form[el.key]"
    :id="el.id"
    :placeholder="el.placeholder"

    :name="el.name"
    :mask="el.mask"
    :fill-mask="el.fillMask"
    :reverse-fill-mask="el.reverseFillMask"
    :unmasked-value="el.unmaskedValue"
    :error="el.error"
    :rules="el.rules"
    :reactive-rules="el.reactiveRules"
    :lazy-rules="el.lazyRules"
    :loading="el.loading"
    :clearable="el.clearable"
    :autofocus="el.autofocus"
    :for="el.for"
    :error-message="el.errorMessage"
    :no-error-icon="el.noErrorIcon"
    :label="el.label"
    :stack-label="el.stackLabel"
    :hint="el.hint"
    :hide-hint="el.hideHint"
    :prefix="el.prefix"
    :suffix="el.suffix"
    :clear-icon="el.clearIcon"
    :label-slot="el.labelSlot"
    :bottom-slots="el.bottomSlots"
    :counter="el.counter"
    :shadow-text="el.shadowText"
    :autogrow="el.autogrow"
    :type="el.inputType"
    :value="el.value"
    :debounce="el.debounce"
    :maxlength="el.maxlength"
    :disable="el.disable"
    :readonly="el.readonly"
    :label-color="el.labelColor"
    :color="el.color"
    :bg-color="el.bgColor"
    :dark="el.dark"
    :filled="el.filled"
    :outlined="el.outlined"
    :borderless="el.borderless"
    :standout="el.standout"
    :hide-bottom-space="el.hideBottomSpace"
    :rounded="el.rounded"
    :square="el.square"
    :dense="el.dense"
    :item-aligned="el.itemAligned"
    :input-class="el.inputClass"
    :input-style="el.inputStyle"
    :required="el.required"
    @input="$emit('input', $event)"
  >

    <template v-if="['from_date', 'to_date'].includes(el.key)" v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
          <q-date v-model="el.form[el.key]" mask="DD/MM/YYYY" @input="$emit('input', $event)">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" :color="getColor('primary')" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>

  </q-input>
</template>

<script>
export default {
  props: ['el']
}
</script>
