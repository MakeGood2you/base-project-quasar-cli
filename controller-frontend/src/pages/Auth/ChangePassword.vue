<template>
  <q-page class="change-password-page q-pa-lg" padding>

    <q-form ref="form" @submit.prevent="onSubmit" @reset="onReset">
      <div class="q-mb-lg">
        <b>{{this.$t('changePassword.title')}}</b>
      </div>
      <div v-if="response" class="q-pb-md" :style="{ color: (response.success ? '#21BA45' : '#C10015') }">
        <b v-text="response.message"></b>
      </div>
      <base-input :el="currentPassword" class="q-mb-xs" />
      <base-input :el="newPassword" class="q-mb-xs" />
      <base-input :el="repeatPassword" class="q-mb-xs" />
      <base-button :el="saveData" />
    </q-form>

  </q-page>
</template>

<script>
import BaseInput from '../../components/form/BaseInput'
import BaseButton from '../../components/form/BaseButton'

export default {
  name: 'ChangePassword',
  components: {
    BaseInput,
    BaseButton,
  },
  data() {
    return {
      form: {},
      loading: false,
      response: null,
    }
  },
  computed: {
    currentPassword() {
      return {
        type: 'input',
        inputType: 'password',
        form: this.form,
        key: 'current_password',
        placeholder: this.$t('changePassword.currentPassword'),
        tabindex: 0,
        dense: true,
        outlined: true,
        disable: this.loading,
        readonly: this.loading,
        required: true,
        lazyRules: true,
        rules: [val => val && val.length > 0 || this.$t('errors.enterCurrentPassword')],
      }
    },
    newPassword() {
      return {
        type: 'input',
        inputType: 'password',
        form: this.form,
        key: 'new_password',
        placeholder: this.$t('changePassword.newPassword'),
        tabindex: 1,
        dense: true,
        outlined: true,
        disable: this.loading,
        readonly: this.loading,
        required: true,
        lazyRules: true,
        rules: [val => val && val.length > 0 || this.$t('errors.enterNewPassword')],
      }
    },
    repeatPassword() {
      return {
        type: 'input',
        inputType: 'password',
        form: this.form,
        key: 'repeat_password',
        placeholder: this.$t('changePassword.repeatPassword'),
        tabindex: 2,
        dense: true,
        outlined: true,
        disable: this.loading,
        readonly: this.loading,
        required: true,
        lazyRules: true,
        rules: [val => val && val.length > 0 || this.$t('errors.enterNewPassword')],
      }
    },
    saveData() {
      return {
        type: 'button',
        buttonType: 'submit',
        label: this.$t('changePassword.save'),
        color: 'primary',
        disable: this.loading,
      }
    },
  },
  methods: {
    async onSubmit() {
      try {
        const isValidate = await this.$refs.form.validate()
        if (isValidate) {
          this.loading = true
          this.response = null
          const { data } = await this.$store.dispatch('auth/changePassword', this.form)
          this.response = data
        }
      } catch (err) {
        this.response = err.response.data
      } finally {
        this.form = {}
        this.loading = false
      }
    },
    onReset() {
      this.form = {}
      this.$refs.form.resetValidation()
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
