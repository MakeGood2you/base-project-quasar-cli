<template>
  <q-dialog ref="dialog" @hide="onDialogHide" @show="isLoaded = true" class="dataMapper" maximized persistent>
    <q-card class="q-dialog-plugin overflow-hidden relative-position">

      <data-mapping v-if="isLoaded"
                    :error="error"
                    :input-json.sync="inputs[inputIndex]"
                    :object-mapper-schema.sync="compiledSchema"
                    :output-json.sync="output"
                    @mapObject="mapObject"/> <!-- $emit('mapObject', { schema, input }) -->

      <div class="actions">
        <base-icon :el="cancel" class="q-mr-lg" @click.native="onCancel"/>
      </div>

      <div class="arrows flex items-center">
        <base-icon :el="prev" @click.native="prev.click"/>
        <div class="layer" v-text="layer"></div>
        <base-icon :el="next" @click.native="next.click"/>
      </div>

    </q-card>
  </q-dialog>
</template>

<script>
import Vue from 'vue'
import BaseIcon from '@/components/BaseIcon'
import SharedComponent from '@OtailO-recommerce/shared-components-vue2'

Vue.use(SharedComponent)

export default {
  name: 'BaseDataMapping',
  props: ['layer', 'schema', 'inputs'],
  components: {
    BaseIcon
  },
  data() {
    return {
      render: 0,
      isLoaded: false,

      inputIndex: 0,
      compiledSchema: {},
      output: {},
      error: null,
      // Actions
      done: {
        name: 'done',
        size: 'xl',
        color: this.getColor('primary')
      },
      cancel: {
        name: 'cancel',
        size: 'xl'
      },
      prev: {
        name: 'west',
        size: 'xl',
        color: this.getColor('primary'),
        click: (e) => {
          e.preventDefault()
          if (this.inputIndex > 0) {
            this.inputIndex--
          }
          console.log(this.inputs[this.inputIndex])
        }
      },

      next: {
        name: 'east',
        size: 'xl',
        color: this.getColor('primary'),
        click: (e) => {
          e.preventDefault()
          if (this.inputIndex < (this.inputs.length - 1)) {
            this.inputIndex++
          }
          console.log(this.inputs[this.inputIndex])
        }
      }
    }
  },
  methods: {
    show() {
      this.$refs.dialog.show()
    },
    hide() {
      this.$refs.dialog.hide()
    },
    onDialogHide() {
      this.$emit('hide')
    },
    onCancel() {
      this.$emit('ok', {
        compiledSchema: this.compiledSchema,
        inputs: this.inputs
      })
      this.hide()
    },
    async mapObject(data) {
      try {
        const response = await this.$store.dispatch(`backOffice/post`, {
          route: `/admin/experiments/object-mapper/map`,
          params: {
            schema: data.schema,
            input: data.input
          }
        })

        if (response && response.data && response.data.is_compiled) {
          this.compiledSchema = response.data.compiled_schema
          this.output = response.data.output
        } else {
          throw new Error(resp.onse.data.message)
        }
      } catch (err) {
        this.error = err
      }
    },
  },
  async mounted() {
    console.log(this.schema)
    await this.mapObject({ schema: this.schema, input: this.inputs[this.inputIndex] || {} })
  }
}
</script>

<style lang="scss">
@import "~@OtailO-recommerce/rappid/rappid.css";

.canvas {
  width: 100vw !important;
  height: 100vh !important;

  .joint-paper {
    border: none !important;
  }
}

.dataMapper {

  .actions {
    position: fixed;
    top: 5%;
    right: 2.5%;
  }

  .q-icon {
    cursor: pointer;
    transition: all .1s;
    border-radius: 50%;
    padding: 10px;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
      transform: scale(1.1);
    }
  }

  .arrows {
    position: fixed;
    bottom: 5%;
    left: 2.5%;

    .layer {
      padding: 10px;
    }
  }

  .errorTitle {
    color: red;
  }
}
</style>
