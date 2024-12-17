<template>
  <q-layout >

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="drawer = !drawer"/>

        <q-toolbar-title>
          {{ $t('header') }}
        </q-toolbar-title>

        <div>
          <BaseLanguage/>
        </div>

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
      <q-list>
        <EssentialLink :menu="topMenu"/>
      </q-list>

      <q-list>
        <EssentialLink :menu="bottomMenu"/>
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
import jwt_decode from 'jwt-decode';

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
      if (sessionStorage.has('accessToken')) {
        const decoded = jwt_decode(sessionStorage.get('accessToken'))
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
            show: decoded.user.roles.indexOf('admin') > -1
          },
          {
            label: this.$t('dashBoard.settings'),
            ...(this.$route.name.indexOf('SettingsTab') > -1 ? {
              class: 'active',
              icon: require('../assets/menu/settings_mark.svg')
            } : {
              icon: require('../assets/menu/settings.svg')
            }),
            to: { name: 'SettingsTab' },
            show: decoded.user.roles.indexOf('settings') > -1,
            children: [
              // {
              //   label: this.$t('geographicLayersTab.title'),
              //   ...(this.$route.name.indexOf('GeographicLayersTab') > -1 ? {
              //     class: 'active',
              //     icon: require('../assets/menu/settings_mark.svg')
              //   } : {
              //     icon: require('../assets/menu/settings.svg')
              //   }),
              //   to: { name: 'GeographicLayersTab' },
              //   show: decoded.user.roles.indexOf('settings') > -1
              // }
            ]
          }
        ]
      }
      return []
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
