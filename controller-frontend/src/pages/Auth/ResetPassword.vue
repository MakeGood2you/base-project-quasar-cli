<template>
  <q-page class="backoffice backoffice-reset-password-page">

<!--    <div class="logo">-->
<!--      <img :src="getAssets.logo.src" :alt="getAssets.title" :height="getAssets.logo.height" :width="getAssets.logo.width" />-->
<!--    </div>-->

    <div class="backoffice-title">Back Office</div>

    <div class="q-mx-md">
      <q-card class="login-form q-pb-xl">
        <q-card-section>
          <div class="login-form-title">Reset Password</div>

          <div v-if="message" class="text-center q-mb-md" :class="{ 'hasError': hasError }">
            <b v-text="message"></b>
          </div>

          <q-form ref="form" @submit.prevent="onSubmit" @reset="onReset">
            <div class="q-mb-sm">
              <base-input :el="passwordData" />
            </div>
            <div class="q-mb-sm">
              <base-input :el="confirmPasswordData" />
            </div>
            <div class="row flex items-center q-mb-md">
              <div class="col text-center">
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
  name: 'ResetPassword',
  components: {
    BaseInput,
    BaseButton
  },
  data() {
    return {
      form: {
        password: '',
        confirm_password: ''
      },
      hasError: false,
      message: null,
      loading: false
    }
  },
  computed: {
    passwordData() {
      return {
        type: 'input',
        inputType: 'password',
        form: this.form,
        key: 'password',
        placeholder: 'New Password',
        tabindex: 0,
        dense: true,
        outlined: true,
        disable: this.loading,
        readonly: this.loading,
        lazyRules: true,
        required: true,
        rules: [
          val => val && val.length > 0 || this.$t('errors.passwordData'),
          val => val && val.length > 5 || this.$t('errors.notValidPasswordLength')
        ]
      }
    },
    confirmPasswordData() {
      return {
        type: 'input',
        inputType: 'password',
        form: this.form,
        key: 'confirm_password',
        placeholder: 'Confirm Password',
        tabindex: 1,
        dense: true,
        outlined: true,
        disable: this.loading,
        readonly: this.loading,
        lazyRules: true,
        required: true,
        rules: [
          val => val && this.form.password === val || 'The passwords does not match'
        ]
      }
    },
    buttonData() {
      return {
        type: 'button',
        buttonType: 'submit',
        label: 'Reset your password',
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

          const { confirm_password, ...form } = this.form
          form.token = this.$route.params.token

          this.loading = true
          await this.$store.dispatch('auth/resetPassword', { ...form })

          this.$refs.form.reset()
          await this.$router.push({ name: 'Login' })
          this.loading = false

        }

      } catch (err) {
        this.hasError = true
        this.message = err.response.data.message || `An error occurred.`
      } finally {
        this.loading = false
      }
    },
    onReset() {
      this.$refs.form.resetValidation()
    }
  }
}
</script>
