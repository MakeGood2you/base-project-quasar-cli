<template>
  <q-page class="backoffice backoffice-login-page">

    <div class="backoffice-title">{{ $t('header') }}</div>

    <div class="q-mx-md">
      <q-card class="login-form q-pb-xl">
        <q-card-section>
          <div class="login-form-title">{{ $t('login.title') }}</div>

          <div v-if="errorMessage" class="error-message text-center text-negative q-mb-md">
            <b v-text="errorMessage"></b>
          </div>

          <q-form ref="form" @submit.prevent="onSubmit" @reset="onReset">
            <div class="q-mb-sm">
              <base-input :el="emailData" />
            </div>
            <div class="q-mb-sm">
              <base-input :el="passwordData" />
            </div>
            <div class="row flex items-center q-mb-md">
              <div class="col">
                <router-link class="forgot-password" :to="{ name: 'ForgotPassword' }">{{ $t('login.forgotPassword') }}</router-link>
              </div>
              <div class="col text-right">
                <base-button :el="buttonData" />
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>

  </q-page>
</template>

<script>
import BaseInput from '../../components/form/BaseInput'
import BaseButton from '../../components/form/BaseButton'

import jwt_decode from 'jwt-decode'
import {mapActions} from 'vuex'
export default {
  name: 'otailo',
  components: {
    BaseInput,
    BaseButton
  },
  data() {
    return {
      form: {
        email: process.env.VUE_APP_ADMIN_EMAIL || '',
        password: process.env.VUE_APP_ADMIN_PASSWORD || ''
      },
      loading: false,
      errorMessage: null
    }
  },
  computed: {
    emailData() {
      return {
        type: 'input',
        inputType: 'text',
        form: this.form,
        key: 'email',
        placeholder: 'Email Address',
        tabindex: 0,
        dense: true,
        outlined: true,
        disable: this.loading,
        readonly: this.loading,
        lazyRules: true,
        rules: [ val => val && val.length > 0 || this.$t('errors.noEmailData')]
      }
    },
    passwordData() {
      return {
        type: 'input',
        inputType: 'password',
        form: this.form,
        key: 'password',
        placeholder: 'Password',
        tabindex: 1,
        dense: true,
        outlined: true,
        disable: this.loading,
        readonly: this.loading,
        lazyRules: true,
        rules: [ val => val && val.length > 0 || this.$t('errors.noPasswordData')]
      }
    },
    buttonData() {
      return {
        type: 'button',
        buttonType: 'submit',
        label: this.$t('login.buttonDataLabel'),
        color: 'primary',
        disable: this.loading
      }
    }
  },
  methods: {
    ...mapActions('auth',['loginAdmin']),
    ...mapActions('app',['showLoading', 'hideLoading']),
    async onSubmit() {
      try {
        const isValidate = await this.$refs.form.validate()
        if (isValidate) {
          this.loading = true
          this.showLoading()
          this.errorMessage = null
          const response = await this.loginAdmin(this.form)


          if (!response.success) {
            this.$refs.form.reset()
            this.errorMessage = response.message
          } else {
            sessionStorage.set('accessToken', response.accessToken)
            const decoded = jwt_decode(response.accessToken)
            // if (decoded.user.roles.length > 0) {
            //   return await this.$router.push({ name: pages[decoded.user.roles[0]], params: this.$route.params })
            // }
            return await this.$router.push({ name: 'Dashboard', params: this.$route.params })
          }
        }
      } catch (err) {
        console.log('[ERROR]:', err)
      } finally {
        this.loading = false
        this.hideLoading()
      }
    },
    onReset() {
      this.form.password = null
      this.$refs.form.resetValidation()
    }
  }
}
</script>
<style scoped lang="scss" >
//@import "../css/backoffice";
</style>
