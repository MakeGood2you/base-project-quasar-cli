<script>
import Vue from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
import { SharedComponentsVue2Sample } from '@/entry.esm';


export default Vue.extend({
  name: 'ServeDev',
  data: () => ({

  }),
  components: {
   // BaseUploadFile,
   //  test2,
    SharedComponentsVue2Sample,
  }
});
</script>

<template>
  <div id="app">

<SharedComponentsVue2Sample/>
<!--    <test2/>-->
<!--    <BaseUploadFile/>-->
<!--    <DataMapping :objectMapperSchema="schema" :inputJson="inputJson" :outputJson="outputJson"/>-->
<!--        <shared-components-vue2-sample />-->
  </div>
</template>
