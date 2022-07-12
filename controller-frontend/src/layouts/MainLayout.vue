<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="drawer = !drawer"/>

        <q-toolbar-title>
          {{ $t('header') }}
        </q-toolbar-title>
        <q-toolbar-title>

        </q-toolbar-title>
        <div> <BaseLanguage/> </div>

      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="drawer"
      side="left"
      bordered
      :width="250" :breakpoint="600"
      content-class="bg-grey-1"
    >
      <!-- drawer content -->
      <q-list class="flex-end">
        <EssentialLink v-for="(item, index) in topMenu" :key="index"
                       :item="item" v-show="item.show"/>
      </q-list>


      <q-list>
        <EssentialLink v-for="(item, index) in bottomMenu" :key="index"
                       :item="item" v-show="item.show"/>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

    <q-footer bordered class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import BaseLanguage from 'components/BaseLanguage';
export default {
  name: 'MainLayout',
  components: { EssentialLink, BaseLanguage },
  data() {
    return {
      drawer: false,
    }
  },
  computed: {
    topMenu() {
      // if (sessionStorage.has('accessToken')) {
      //   const decoded = jwt_decode(sessionStorage.get('accessToken'))
      return [
        {
          label: this.$t('dashBoard.users'),
          ...(this.$route.name.indexOf('UsersTab') > -1 ? {
            class: 'active',
            icon: require('../assets/menu/users_mark.svg')
          } : {
            icon: require('../assets/menu/users.svg')
          }),
          to: { name: 'UsersTab' },
          // show: decoded.user.roles.indexOf('admin') > -1
          show: true
        },
      ]
      // }
      // return []
    },
    bottomMenu() {
      return [
        {
          label: this.$t('dashBoard.changePassword'),
          ...(this.$route.name.indexOf('ChangePassword') > -1 ? {
            class: 'active',
            icon: require('../assets/menu/change_password_mark.svg')
          } : {
            icon: require('../assets/menu/change_password.svg')
          }),
          to: { name: 'ChangePassword' },
          show: true
        },
        {
          label: this.$t('dashBoard.logOut'),
          icon: require('../assets/menu/logout.svg'),
          to: { name: 'Logout' },
          show: true
        }
      ]
    }
  }
}
</script>
