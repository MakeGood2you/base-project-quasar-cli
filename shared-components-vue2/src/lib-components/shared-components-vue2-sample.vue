<template>
  <div class="q-pa-md" >
    <q-list bordered>
      <q-expansion-item
          group="somegroup"
          icon="explore"
          label="First"
          default-opened
          header-class="text-primary"
      >
        <q-card>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
            commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-separator/>

      <q-expansion-item group="somegroup" icon="perm_identity" label="Second" header-class="text-teal">
        <q-card>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
            commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-separator/>

      <q-expansion-item group="somegroup" icon="shopping_cart" label="Third" header-class="text-purple">
        <q-card>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
            commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-separator/>

      <q-expansion-item
          group="somegroup"
          icon="bluetooth"
          label="Fourth"
          header-class="bg-teal text-white"
          expand-icon-class="text-white"
      >
        <q-card class="bg-teal-2">
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
            commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
  <!--  <div class="shared-components-vue2-sample">-->
  <!--    <p>The counter was {{ changedBy }} to <b>{{ counter }}</b>.</p>-->
  <!--    <button @click="increment">-->
  <!--      Click +1-->
  <!--    </button>-->
  <!--    <button @click="decrement">-->
  <!--      Click -1-->
  <!--    </button>-->
  <!--    <button @click="increment(5)">-->
  <!--      Click +5-->
  <!--    </button>-->
  <!--    <button @click="decrement(5)">-->
  <!--      Click -5-->
  <!--    </button>-->
  <!--    <button @click="reset">-->
  <!--      Reset-->
  <!--    </button>-->
  <!--  </div>-->
</template>

<script>
import Vue from 'vue'
import Quasar from 'quasar'
Vue.use(Quasar)
const {QSeparator, QCardSection, QExpansionItem, QList, QCard} = Quasar
export default /*#__PURE__*/{
  name: 'SharedComponentsVue2Sample', // vue component name
  components:{QSeparator, QCardSection, QExpansionItem, QList, QCard},
  data() {
    return {
      counter: 5,
      initCounter: 5,
      message: {
        action: null,
        amount: null,
      },
    };
  },
  computed: {
    changedBy() {
      const { message } = this;
      if (!message.action) return 'initialized';
      return `${message.action} ${message.amount || ''}`.trim();
    },
  },
  methods: {
    increment(arg) {
      const amount = (typeof arg !== 'number') ? 1 : arg;
      this.counter += amount;
      this.message.action = 'incremented by';
      this.message.amount = amount;
    },
    decrement(arg) {
      const amount = (typeof arg !== 'number') ? 1 : arg;
      this.counter -= amount;
      this.message.action = 'decremented by';
      this.message.amount = amount;
    },
    reset() {
      this.counter = this.initCounter;
      this.message.action = 'reset';
      this.message.amount = null;
    },
  },
};
</script>

<style scoped>
.shared-components-vue2-sample {
  display: block;
  width: 400px;
  margin: 25px auto;
  border: 1px solid #ccc;
  background: #eaeaea;
  text-align: center;
  padding: 25px;
}

.shared-components-vue2-sample p {
  margin: 0 0 1em;
}
</style>
