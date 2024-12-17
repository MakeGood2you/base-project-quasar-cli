<template>
  <q-page class="users-tab-page" padding>
    <base-new-table
      :key="render"
      :el="usersData"
      @onRequest="onRequest">

      <template v-slot:top-right>
        <base-button :el="addNewUser" class="q-mr-sm"/>
        <q-input v-model="filter" :placeholder="$t('labels.search')" borderless dense outlined autofocus>
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="first_name">
            <span v-if="props.props.row.uuid === editMode">
              <base-input :el="firstName"/>
            </span>
            <span v-else v-text="props.props.row.first_name"></span>
          </q-td>
          <q-td key="last_name">
            <span v-if="props.props.row.uuid === editMode">
              <base-input :el="lastName"/>
            </span>
            <span v-else v-text="props.props.row.last_name"></span>
          </q-td>
          <q-td key="email">
            <span v-if="props.props.row.uuid === editMode">
              <base-input :el="email"/>
            </span>
            <span v-else v-text="props.props.row.email"></span>
          </q-td>
          <q-td key="role">
            <span v-if="props.props.row.uuid === editMode">
              <base-select :el="roles"/>
            </span>
            <span v-else v-text="props.props.row.roles.join(', ')"></span>
          </q-td>
          <q-td key="password">
            <span v-if="props.props.row.uuid === editMode">
              <base-input :el="password"/>
            </span>
          </q-td>
          <q-td key="actions" class="text-right">

            <div v-if="props.props.row.uuid === editMode">
              <router-link to="#" @click.native="onCancel" class="q-field__cancel-btn q-mr-lg">Cancel</router-link>
              <router-link to="#" @click.native="onSave" class="q-field__save-btn">Save</router-link>
            </div>

            <div v-else class="flex justify-end">
              <router-link :to="{}" class="flex q-mr-lg">
                <router-link to="#" @click.native="editUser(props.props.row)" class="flex">
                  <img src="../../assets/edit.svg" alt="Edit"/>
                </router-link>
              </router-link>
              <router-link to="#" @click.native="deleteUser(props.props.row.uuid)" class="flex">
                <img src="../../assets/delete.svg" alt="Delete"/>
              </router-link>
            </div>

          </q-td>
        </q-tr>
      </template>

    </base-new-table>
  </q-page>
</template>

<script>
import BaseNewTable from '../../components/BaseNewTable'
import BaseButton from '../../components/form/BaseButton'
import BaseInput from '../../components/form/BaseInput'
import BaseSelect from '../../components/form/BaseSelect'
import { mapState } from 'vuex'
import { extend } from 'quasar'

const email_pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/

export default {
  components: {
    BaseNewTable,
    BaseButton,
    BaseInput,
    BaseSelect
  },
  data() {
    return {
      form: {},
      data: [],
      filter: '',
      loading: false,
      editMode: false,
      isSubmit: false,

      pagination: {
        sortBy: 'first_name',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      },
      render: 0
    }
  },
  computed: {
    ...mapState('users', ['users']),
    usersData() {
      return {
        name: 'users',
        title: this.$t('usersTab.title'),
        filter: this.filter,
        data: this.data,
        columns: [
          {
            name: 'first_name',
            label: this.$t('usersTab.firstName'),
            align: 'left',
            required: true,
            field: row => row.first_name,
            sortable: true
          },
          {
            name: 'last_name',
            label: this.$t('usersTab.lastName'),
            align: 'left',
            required: true,
            field: row => row.last_name,
            sortable: true
          },
          {
            name: 'email',
            label: this.$t('usersTab.email'),
            align: 'left',
            required: true,
            field: row => row.email,
            sortable: true
          },
          {
            name: 'roles',
            label: this.$t('usersTab.role'),
            align: 'left',
            required: true,
            field: row => row.roles,
            sortable: true
          },
          {
            name: 'password'
          },
          {
            name: 'actions'
          }
        ],
        rowKey: 'uuid',
        pagination: this.pagination,
        loading: this.loading,
        binaryStateSort: true
      }
    },
    addNewUser() {
      return {
        type: 'button',
        buttonType: 'button',
        label: 'ADD USER',
        color: 'primary',
        style: 'height: 40px',
        icon: 'add',
        click: () => {
          if (this.editMode !== -1) {
            this.form = {}
            this.editMode = -1
            this.data.splice(0, 0, {
              uuid: -1,
              first_name: '',
              last_name: '',
              email: '',
              roles: []
            })
          }
        }
      }
    },

    firstName() {
      return {
        type: 'input',
        inputType: 'text',
        form: this.form,
        key: 'first_name',
        placeholder: 'First Name',
        tabindex: 0,
        dense: true,
        outlined: true,
        loading: this.loading,
        disable: this.loading,
        readonly: this.loading,
        error: this.isSubmit && !(this.form.first_name && this.form.first_name.length > 0)
      }
    },
    lastName() {
      return {
        type: 'input',
        inputType: 'text',
        form: this.form,
        key: 'last_name',
        placeholder: 'Last Name',
        tabindex: 1,
        dense: true,
        outlined: true,
        loading: this.loading,
        disable: this.loading,
        readonly: this.loading,
        error: this.isSubmit && !(this.form.last_name && this.form.last_name.length > 0)
      }
    },
    email() {
      return {
        type: 'input',
        inputType: 'email',
        form: this.form,
        key: 'email',
        placeholder: 'E-mail',
        tabindex: 2,
        dense: true,
        outlined: true,
        loading: this.loading,
        disable: this.loading,
        readonly: this.loading,
        error: this.isSubmit && !(this.form.email && email_pattern.test(this.form.email))
      }
    },
    roles() {
      return {
        form: this.form,
        key: 'roles',
        options: ['admin', 'customer-care', 'analytics', 'inspection', 'settings'],
        tabindex: 3,
        dense: true,
        outlined: true,
        useChips: true,
        multiple: true,
        menuAnchor: 'bottom start'
      }
    },
    password() {
      return {
        type: 'input',
        inputType: 'password',
        form: this.form,
        key: 'password',
        placeholder: 'Password',
        tabindex: 4,
        dense: true,
        outlined: true,
        loading: this.loading,
        disable: this.loading,
        readonly: this.loading,
        error: this.isSubmit && !(this.form.password && this.form.password.length > 0) && !this.form.uuid
      }
    }
  },
  methods: {
    async fetchFromServer(search, offset, limit, sortBy = 'createdAt', descending) {
      descending = descending ? 'ASC' : 'DESC'

      const authorization = sessionStorage.get('accessToken')
      return await this.$store.dispatch('users/getUsers', {
        search,
        offset,
        limit,
        sort_by: sortBy,
        descending,
        authorization
      })
    },
    async onRequest(props) {
      const { sortBy, descending, page, rowsPerPage, rowsNumber } = props.pagination

      const limit = rowsPerPage === 0 ? rowsNumber : rowsPerPage
      let offset = (page - 1) * rowsPerPage

      this.onCancel()

      try {

        this.loading = true
        const { users, count } = await this.fetchFromServer(this.filter, offset, limit, sortBy, descending)

        this.data = extend(true, [], this.users)

        this.pagination.sortBy = sortBy
        this.pagination.descending = descending
        this.pagination.page = page
        this.pagination.rowsPerPage = rowsPerPage
        this.pagination.rowsNumber = count
        this.render++

      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    },
    checkValidate(form) {
      try {

        const firstName = form.first_name && form.first_name.length > 0
        const lastName = form.last_name && form.last_name.length > 0
        const email = form.email && email_pattern.test(form.email)
        const roles = form.roles && form.roles.length > 0
        const password = form.password && form.password.length > 0

        if (this.editMode === -1) {
          return firstName && lastName && email && roles && password
        }

        return firstName && lastName && email && roles

      } catch {
        return false
      }
    },
    editUser(user) {
      if (this.editMode === -1) this.data.splice(0, 1)
      this.editMode = user.uuid
      this.form = { ...user }
    },
    async deleteUser(uuid) {
      const check = confirm(this.$t('usersTab.deleteUserMessage'))
      if (check) {
        await this.$store.dispatch('users/deleteUser', uuid)
        await this.onRequest({
          pagination: this.pagination
        })
      }
    },
    onCancel(start = 0) {
      if (this.editMode === -1) this.data.splice(start, 1)
      this.isSubmit = false
      this.editMode = false
      this.form = {}
    },
    async onSave() {
      try {

        this.isSubmit = true
        const { ron_account, ...form } = this.form

        const isValidate = this.checkValidate(form)
        if (isValidate) {
          let type = 'updateUser'
          if (this.editMode === -1) {
            type = 'createUser'
            delete form.uuid
          }
          await this.$store.dispatch('users/' + type, form)

          await this.onRequest({
            pagination: this.pagination
          })
          this.onCancel(1)
        }

      } catch (err) {
        console.error(err)
      }
    }
  },
  async mounted() {
    await this.onRequest({
      pagination: this.pagination
    })
  }
}
</script>

<style lang="scss" scoped>
.q-field {

  ::v-deep {

    .q-field__bottom {
      display: none;
    }
  }
}
</style>
