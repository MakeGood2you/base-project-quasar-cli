<template>
  <q-btn
    :id="el.id"

    :loading="el.loading"
    :percentage="el.percentage"
    :dark-percentage="el.darkPercentage"
    :label="el.label"
    :icon="el.icon"
    :icon-right="el.iconRight"
    :no-caps="el.noCaps"
    :no-wrap="el.noWrap"
    :align="el.align"
    :stack="el.stack"
    :stretch="el.stretch"
    :type="el.buttonType"
    :tabindex="el.tabindex"
    :to="el.to"
    :replace="el.replace"
    :disable="el.disable"
    :size="el.size"
    :ripple="el.ripple || true"
    :outline="el.outline"
    :flat="el.flat"
    :unelevated="el.unelevated || true"
    :rounded="el.rounded"
    :push="el.push"
    :glossy="el.glossy"
    :fab="el.fab"
    :fab-mini="el.fabMini"
    :padding="el.padding"
    :color="el.color"
    :text-color="el.textColor"
    :dense="el.dense"
    :round="el.round"
    :class="el.class"
    :style="el.style"
    @click="click(el.click)"
  />
</template>

<script>
export default {
  props: ['el'],
  methods: {
    click (func) {
      if (typeof func !== 'undefined') {
        func()
      }
    }
  },
  created() {
    console.log(this.el)
  }
}
</script>

<style lang="scss">
button {

  &:focus {
    box-shadow: none !important;
  }
}
</style>
