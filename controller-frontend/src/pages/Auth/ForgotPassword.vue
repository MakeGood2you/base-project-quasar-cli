<template>
  <q-page class="backoffice backoffice-forgot-password-page">

<!--    <div class="logo">-->
<!--      <img :src="getAssets.logo.src" :alt="getAssets.title" :height="getAssets.logo.height" :width="getAssets.logo.width" />-->
<!--    </div>-->

    <div class="backoffice-title">{{ $t('header') }}</div>

    <div class="q-mx-md">
      <q-card class="login-form q-pb-xl">
        <q-card-section>
          <div class="login-form-title">{{ $t('forgotPassword.title') }}</div>

          <div v-if="message" class="text-center q-mb-md" :class="{ 'hasError': hasError, 'hasSuccess': !hasError }">
            <b v-text="message"></b>
          </div>

          <q-form ref="form" @submit.prevent="onSubmit" @reset="onReset">
            <div class="q-mb-md">{{ $t('forgotPassword.description') }}</div>
            <div class="q-mb-sm">
              <base-input :el="emailData" />
            </div>
            <div class="row flex items-center q-mb-md">
              <div class="col-8">
                <router-link class="forgot-password" :to="{ name: 'Login' }">{{ $t('forgotPassword.rememberPassword') }}</router-link>
              </div>
              <div class="col-4 text-right">
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

export default {
  name: 'ForgotPassword',
  components: {
    BaseInput,
    BaseButton
  },
  data() {
    return {
      form: {
        email: process.env.VUE_APP_ADMIN_EMAIL || ''
      },
      hasError: false,
      message: null,
      loading: false
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
    buttonData() {
      return {
        type: 'button',
        buttonType: 'submit',
        label: this.$t('forgotPassword.buttonDataLabel'),
        color: 'primary',
        disable: this.loading
      }
    }
  },
  methods: {
    async onSubmit() {
      try {
        const isValidate = await this.$refs.form.validate()
        if (isValidate) {

          this.loading = true
          await this.$store.dispatch('auth/forgotPassword', this.form)

          this.hasError = false
          this.message = this.$t('messages.emailHasBeenSent', {email: this.form.email})
          this.loading = false
        }

      } catch (err) {
        this.hasError = true
        this.message = this.$t('errors.notValidEmail')
      } finally {
        this.loading = false
        this.$refs.form.reset()
      }
    },
    onReset() {
      this.form.email = null
      this.$refs.form.resetValidation()
    }
  }
}
</script>
<style lang="scss">
@import "../../css/backoffice";

</style>
