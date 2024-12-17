<template>
  <div>
    <div class="" v-for="(item, index) in menu" :key="index">
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

      <q-expansion-item v-else-if="item.show"><!-- default-opened -->
        <template v-slot:header>
          <q-item-section class="flex " style="width: 35px" avatar>
            <img :src="item.icon" :alt="item.label"/>
          </q-item-section>
          <q-item-section v-text="item.label"></q-item-section>
        </template>
        <q-item class=" q-pl-xl" v-for="(child, childIndex) in item.children" :key="childIndex" :to="child.to"
                active-class="active" exact-active-class="active" :class="child.class" clickable v-ripple>
          <q-item-section class="flex justify-end">
            <img v-if="child.icon" :src="child.icon" :alt="child.label"/>
            <q-item-label v-text="child.label"></q-item-label>
          </q-item-section>
        </q-item>
      </q-expansion-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    menu: {
      type: Array,
      required: true
    }
  }
}
</script>
<style lang="scss">
@import '../css/quasar.variables';

.content {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: unset;
}
.active{
  color:$primary;
  background-color: $green-1
}

.icon {

}

</style>
