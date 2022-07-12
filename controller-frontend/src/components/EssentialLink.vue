<template>
  <q-item
    exact
    class="content"
    :to="item.to"
    v-show="item.show"
    v-if="!item.children"
    active-class="active"
    exact-active-class="active"
    :class="item.class"
    clickable v-ripple
  >
    <q-item-section class="content">
      <div class="icon" style="width: 35px">
        <img v-if="item.icon" :src="item.icon" :alt="item.label"/>
      </div>
      <q-item-label v-text="item.label"></q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss">
//@import '../css/backoffice';

.content {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: unset;
}

.icon {

}

</style>
