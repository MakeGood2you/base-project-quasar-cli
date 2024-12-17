<template>
  <q-page class="geographic-layers-tab-page" padding>
    <base-new-table
      :key="render"
      :el="GeographicLayersData"
      @onRequest="onRequest"
    >

      <template v-slot:top-right>
        <base-button :el="addButton" class="q-mr-sm"/>
        <q-input debounce="300" v-model="search" :placeholder="$t('backOffice.labels.search')" borderless dense outlined autofocus>
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name">
            <span v-if="props.props.row.id === editMode">
              <base-input :el="name"/>
            </span>
            <span v-else v-text="props.props.row.name"></span>
          </q-td>
          <q-td key="icon_url">
            <router-link to="#" @click.native="uploadIconUrl(props.props.row)">
              <img v-if="props.props.row.icon_url" :src="props.props.row.icon_url" style="max-width: 32px" alt="Icon"/>
              <span v-else-if="props.props.row.id !== editMode">Upload</span>
            </router-link>
          </q-td>
          <q-td key="createdAt">
            <span v-if="props.props.row.id !== editMode" v-text="dateFormat(props.props.row.createdAt)"></span>
          </q-td>
          <q-td key="actions">
            <div v-if="props.props.row.id === editMode" class="flex items-center justify-end">
              <router-link to="#" @click.native="onCancel" class="q-field__cancel-btn q-mr-lg">{{ $t('backOffice.labels.cancel') }}</router-link>
              <router-link to="#" @click.native="onSave" class="q-field__save-btn">{{ $t('backOffice.labels.save') }}</router-link>
            </div>
            <div v-else class="flex no-wrap items-center justify-end">
              <div class="q-mr-md">{{ props.props.row.poi_count }} POI</div>
              <router-link to="#" @click.native="uploadRow(props.props.row)" class="flex q-ml-md">
                <img src="@/assets/upload.svg" alt="Upload"/>
              </router-link>
              <router-link to="#" @click.native="updateRow(props.props.row)" class="flex q-ml-md">
                <img src="@/assets/edit.svg" alt="Edit"/>
              </router-link>
              <router-link to="#" @click.native="deleteRow(props.props.row)" class="flex q-ml-md">
                <img src="@/assets/delete.svg" alt="Delete"/>
              </router-link>
            </div>
          </q-td>
        </q-tr>
      </template>

    </base-new-table>

    <!-- ---------------------------------- -->

    <base-new-dialog :el="dialog" @hide="hideDialog">
      <template v-slot:default>
        <q-card class="q-dialog-plugin" :style="{ 'min-width': dialog.width }">

          <q-card-section class="row items-center">
            <div class="text-h6" v-text="dialog.title"></div>
            <q-space/>
            <q-btn icon="close" @click="dialog.model = false" flat round dense/>
          </q-card-section>

          <q-card-section>
            <div v-if="dialog.type === 'icon_url'">
              <base-upload-box :form="form" name="file" height="120px" text="DRAG & DROP ICON HERE"/>
              <q-separator class="q-my-md"/>
              <base-input :el="iconUrl"/>
              <q-separator class="q-my-md"/>
              <div class="text-caption q-mb-sm">
                The pushpin icon location coordinates
                <q-icon name="help_outline" size="xs" class="cursor-pointer">
                  <q-popup-proxy :offset="[10, 10]">
                    <q-banner>
                      <img src="@/assets/pushpins.png" alt=""/>
                    </q-banner>
                  </q-popup-proxy>
                </q-icon>
              </div>
              <base-input :el="anchor"/>
            </div>
            <div v-else-if="dialog.type === 'poi'">
              <label class="csv-wrapper cursor-pointer q-mt-md block">
                <input type="file" name="poi" ref="file" accept=".csv, .xlsx, .json, .txt" @change="uploadPoi($event)" style="display: none">
                <span id="file">Click here to upload file</span>
              </label>
              <div class="text-caption">Following file types are accepted: .csv, .xlsx</div>
              <div class="q-mt-md">
                <q-option-group
                  type="radio"
                  :options="poiOptions"
                  v-model="poiModel"
                  inline
                />
              </div>
              <div class="q-mt-md">
                <base-button :el="fieldsMappingButton"/>
              </div>
            </div>
            <div v-else v-html="dialog.html"></div>
          </q-card-section>

          <q-card-actions align="right">
            <div v-if="dialog.type === 'icon_url'">
              <q-btn label="Cancel" @click="dialog.model = false" flat/>
              <base-button :el="saveDialogButton"/>
            </div>
            <div v-else-if="dialog.type === 'poi'">
              <q-btn label="Cancel" @click="dialog.model = false" class="q-mr-md" flat/>
              <q-btn label="Apply" @click="onApply" :disabled="isApplyDisabled" class="q-mr-md" flat/>
              <q-btn label="Upload" @click="onUpload" :disabled="isUploadDisabled" :color="getColor('primary')" flat/>
            </div>
            <div v-else>
              <q-btn label="OK" @click="dialog.model = false" flat/>
            </div>
          </q-card-actions>

        </q-card>
      </template>
    </base-new-dialog>

  </q-page>
</template>

<script>
import BaseNewTable from '@/components/BaseNewTable'
import BaseNewDialog from '@/components/BaseNewDialog'
import BaseButton from '@/components/form/BaseButton'
import BaseInput from '@/components/form/BaseInput'
import BaseUploadBox from '@/components/BaseUploadBox'
import BaseDataMapping from '@/components/BaseDataMapping'
import { dateFormat } from '@/services/helper'
import Papa from 'papaparse'
import axios from 'axios'

export default {
  name: 'GeographicLayersTab',
  components: {
    BaseNewDialog,
    BaseNewTable,
    BaseButton,
    BaseInput,
    BaseUploadBox
  },
  data() {
    return {
      data: [],
      search: '',
      loading: false,
      pagination: {
        sortBy: 'createdAt',
        descending: true,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      },
      form: {},
      error: {},
      editMode: false,
      render: 0,

      isApplyDisabled: true,
      isUploadDisabled: true,

      fieldsMappingData: {
        type: 'button',
        buttonType: 'button',
        label: 'Fields Mapping',
        color: 'primary',
        disable: true,
        click: () => this.editMapping()
      },

      // DIALOG
      dialog: {
        model: false,
        persistent: true,
        loading: false
      },

      // POI MODAL
      poiModel: 'replace',
      poiOptions: [
        { label: 'Replace', value: 'replace' },
        { label: 'Append', value: 'append' }
      ]
    }
  },
  computed: {
    GeographicLayersData() {
      return {
        title: this.$t('backOffice.geographicLayersTab.title'),
        data: this.data,
        filter: this.search,
        columns: [
          {
            name: 'name',
            label: this.$t('backOffice.labels.name'),
            align: 'left',
            sortable: true
          },
          {
            name: 'icon_url',
            label: this.$t('backOffice.labels.icon_url'),
            align: 'left'
          },
          {
            name: 'createdAt',
            label: this.$t('backOffice.labels.date'),
            align: 'left',
            sortable: true
          },
          {
            name: 'actions'
          }
        ],
        rowKey: 'name',
        pagination: this.pagination,
        loading: this.loading,
        binaryStateSort: true
      }
    },
    addButton() {
      return {
        type: 'button',
        buttonType: 'button',
        label: this.$t('backOffice.geographicLayersTab.addLayer'),
        color: 'primary',
        style: 'height: 40px',
        icon: 'add',
        click: () => {
          this.onCancel()
          this.editMode = -1
          this.data.splice(0, 0, { id: -1 })
        }
      }
    },

    saveDialogButton() {
      return {
        type: 'button',
        buttonType: 'button',
        label: 'Save',
        color: 'primary',
        loading: this.dialog.loading,
        flat: true,
        click: () => this.saveModal()
      }
    },

    name() {
      return {
        tabindex: 0,
        type: 'input',
        inputType: 'text',
        form: this.form,
        key: 'name',
        placeholder: this.$t('backOffice.labels.name'),
        outlined: true,
        dense: true,
        error: this.error['name']
      }
    },
    iconUrl() {
      return {
        tabindex: 1,
        type: 'input',
        inputType: 'text',
        form: this.form,
        key: 'icon_url',
        placeholder: 'Direct link',
        outlined: true,
        dense: true
      }
    },
    anchor() {
      return {
        tabindex: 2,
        type: 'input',
        inputType: 'text',
        form: this.form,
        key: 'anchor',
        placeholder: this.$t('backOffice.labels.anchor'),
        outlined: true,
        dense: true,
        error: this.error['anchor'],
        errorMessage: 'Please enter a valid anchor like x,y'
      }
    },

    fieldsMappingButton() {
      return this.fieldsMappingData
    }
  },
  methods: {
    hideDialog() {
      this.dialog = {
        model: false,
        persistent: true,
        loading: false
      }
      this.isApplyDisabled = true
      this.isUploadDisabled = true
      this.fieldsMappingData.disable = true
    },
    dateFormat(date) {
      return dateFormat(date, 'DD/MM/YYYY HH:mm')
    },
    uploadIconUrl(row) {
      this.onCancel()
      this.form = { ...row }
      this.dialog.title = 'Upload icon'
      this.dialog.type = 'icon_url'
      this.dialog.model = true
    },
    async saveModal() {
      try {

        this.error = {}
        this.dialog.loading = true

        if (this.dialog.type === 'icon_url') {

          if (this.form.file) {

            const { name, type } = this.form.file
            const { data } = await this.$store.dispatch(`backOffice/put`, {
              route: `/admin/layer/${this.form.id}/icon`,
              params: {
                name: this.form.name + '_' + new Date().getTime() + '_' + name,
                type
              }
            })

            const formData = new FormData()
            Object.entries(data.fields).forEach(([key, value]) => formData.append(key, value))
            formData.append('file', this.form.file)

            await axios.post(data.signedURL, formData, {
              headers: { 'Content-Type': 'multipart/form-data' }
            })

            this.form.icon_url = data.signedURL + '/' + data.Key

          }

          const regex = new RegExp(/^\d{1,3},\d{1,3}$/g)
          if (this.form.anchor && !regex.test(this.form.anchor)) {
            this.error['anchor'] = true
          }

          if (Object.keys(this.error).length > 0) return

          await this.$store.dispatch(`backOffice/put`, {
            route: `/admin/layer/${this.form.id}`,
            params: {
              icon_url: this.form.icon_url || null,
              anchor: this.form.anchor || null
            }
          })
        } else if (this.dialog.type === 'mapping') {
          // TODO!
        }

        await this.onRequest({
          pagination: this.pagination
        })

        this.dialog.model = false

      } catch (err) {
        console.error(err)
      } finally {
        this.dialog.loading = false
      }
    },
    onCancel() {
      if (this.data.length > 0 && this.data[0].id === -1) this.data.splice(0, 1)
      this.form = {}
      this.error = {}
      this.editMode = false
    },
    async onSave() {
      try {

        const { ron_account, updatedAt, createdAt, ...form } = this.form

        this.error = {}
        this.error['name'] = !form.name || form.name.length === 0

        if (Object.values(this.error).filter(Boolean).length === 0) {

          await this.$store.dispatch(`backOffice/${form.id ? 'put' : 'post'}`, {
            route: `/admin/layer${form.id ? ('/' + form.id) : ''}`,
            params: form
          })

          await this.onRequest({
            pagination: this.pagination
          })

          this.onCancel()

        }

      } catch (err) {
        console.error(err)
      }
    },
    async onApply() {
      try {

        const { id, compiledSchema } = this.form
        this.isApplyDisabled = true

        await this.$store.dispatch(`backOffice/put`, {
          route: `/admin/layer/${id}`,
          params: {
            mapping: compiledSchema
          }
        })

      } catch (err) {
        console.error(err)
        this.isApplyDisabled = false
      }
    },
    async onUpload() {
      try {

        await this.onApply()

        const { id, inputs } = this.form

        this.isUploadDisabled = true

        await this.$store.dispatch(`backOffice/put`, {
          route: `/admin/layer/${id}/poi`,
          params: { inputs, action: this.poiModel }
        })

        this.dialog.model = false

      } catch (err) {
        console.error(err)
        this.isUploadDisabled = false
      }
    },
    editMapping() {
      this.$q.dialog({
        component: BaseDataMapping,
        parent: this,
        layer: this.form.name,
        schema: this.form.mapping || {
          "order": {
            "id": {
              "_path": ".order_no",
              "_default": "",
              "_type": "Leaf"
            },
            "order_id": {
              "_path": ".order_no",
              "_default": "",
              "_type": "Leaf"
            },
            "created_at": {
              "_path": ".creation_date",
              "_default": "",
              "_type": "Leaf"
            },
            "shipped_at": {
              "_path": ".creation_date",
              "_default": "",
              "_type": "Leaf"
            },
            "return_due_at": {
              "_path": ".creation_date",
              "_default": "",
              "_type": "Leaf"
            },
            "currency": {
              "_path": ".currency",
              "_default": "",
              "_type": "Leaf"
            },
            "basestore": {
              "_default": "Returnello",
              "_type": "Leaf"
            },
            "channel": {
              "_default": "WEB",
              "_type": "Leaf"
            },
            "order_items": {
              "_type": "Array",
              "_path": ".product_items",
              "_element": {
                "_type": "Object",
                "sku": {
                  "_path": ".product_id",
                  "_type": "Leaf"
                },
                "item_id": {
                  "_path": ".item_id",
                  "_type": "Leaf"
                },
                "id": {
                  "_path": ".product_id",
                  "_type": "Leaf"
                },
                "quantity": {
                  "_path": ".quantity",
                  "_type": "Leaf"
                },
                "full_price": {
                  "_path": ".c_otailoAttribtues.price",
                  "_type": "Leaf"
                },
                "sold_price": {
                  "_path": ".c_otailoAttribtues.price.sales.value",
                  "_type": "Leaf"
                },
                "image_url": {
                  "_path": ".c_otailoAttribtues.images.small[0].url",
                  "_default": "",
                  "_type": "Leaf"
                },
                "name": {
                  "_path": ".product_name",
                  "_type": "Leaf"

                },
                "description": {
                  "_path": ".product_name",
                  "_type": "Leaf"

                },
                "created_at": {
                  "_path": "$root.creation_date",
                  "_default": "",
                  "_type": "Leaf"

                },
                "shipped_at": {
                  "_path": "$root.creation_date",
                  "_default": "",
                  "_type": "Leaf"

                },
                "return_due_at": {
                  "_path": "$root.creation_date",
                  "_default": "",
                  "_type": "Leaf"

                },
                "is_returnable": {
                  "_default": true,
                  "_type": "Leaf"
                },
                "color": {
                  "_path": ".c_otailoAttribtues.variationAttributes",
                  "_type": "Leaf"


                },
                "size": {
                  "_path": ".c_otailoAttribtues.variationAttributes",
                  "_type": "Leaf"


                },
                "returns_info": {
                  "c_otailoTrackingID": {
                    "_path": ".c_otailoTrackingID",
                    "_type": "Leaf"


                  },
                  "c_otailoTrackingURL": {
                    "_path": ".c_otailoTrackingURL",
                    "_type": "Leaf"


                  },
                  "c_otailoReturnReason": {
                    "_path": ".c_otailoReturnReason",
                    "_type": "Leaf"


                  },
                  "c_otailoReturnType": {
                    "_path": ".c_otailoReturnType",
                    "_type": "Leaf"


                  },
                  "c_otailoStatus": {
                    "_path": ".c_otailoStatus",
                    "_type": "Leaf"
                  },
                  "_type": "Object"
                }
              }
            }
          }
        },
        inputs: this.form.inputs
      }).onOk((result) => {
        const { compiledSchema, inputs } = result

        this.form.compiledSchema = compiledSchema
        this.form.inputs = inputs
        this.isApplyDisabled = false
        this.isUploadDisabled = false
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        // console.log('Called on OK or Cancel')
      })
    },
    loadTextFromFile(file) {
      const reader = new FileReader();
      reader.onload = e => {
        return this.$emit("load", e.target.result);
      }
      // console.log(reader.readAsText(file))
      return reader.readAsText(file);
    },
    uploadPoi(event) {
      const that = this
      const file = event.target.files[0]

      document.getElementById('file').innerText = 'Filename: ' + file.name

      if (['text/csv', 'xlsx'].includes(file.type)) {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: async function ({ data }) {
            that.form.inputs = data
            that.fieldsMappingData.disable = false
          }.bind(this)
        })
      } else if (['text/plain', 'application/json'].includes(file.type)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.form.inputs = JSON.parse(e.target.result)
          this.fieldsMappingData.disable = false
          console.log(that.form.inputs, ' that.form.inputs')
          console.log(typeof that.form.inputs, ' type of')
        }
        reader.readAsBinaryString(file);
      }
      // if (file) {
      //   const that = this
      //   Papa.parse(file, {
      //     header: true,
      //     skipEmptyLines: true,
      //     complete: async function({ data }) {
      //       try {
      //
      //         await this.$store.dispatch(`backOffice/put`, {
      //           route: `/admin/layer/${row.id}/poi`,
      //           params: data
      //         })
      //
      //         await this.onRequest({
      //           pagination: this.pagination
      //         })
      //
      //         that.$toaster.success(this.$t('backOffice.geographicLayersTab.updatePoi'))
      //
      //       } catch (err) {
      //         if (err.response.data) {
      //           that.dialog.title = 'ERROR'
      //           that.dialog.model = true
      //           that.dialog.html = `${err.response.data.message}`
      //         }
      //       } finally {
      //         event.target.value = ''
      //       }
      //     }.bind(this)
      //   })
      // }
    },
    uploadRow(row) {
      this.form = { ...row }
      this.dialog.title = `Layer: ${row.name}`
      this.dialog.width = '500px'
      this.dialog.type = 'poi'
      this.dialog.model = true
    },
    updateRow(row) {
      this.onCancel()
      this.form = { ...row }
      this.editMode = row.id
    },
    async deleteRow(row) {
      const check = confirm(this.$t('backOffice.geographicLayersTab.deleteConfirmMessage'))
      if (check) {
        await this.$store.dispatch(`backOffice/remove`, {
          route: `/admin/layer/${row.id}`
        })
        await this.onRequest({
          pagination: this.pagination
        })
      }
    },
    async fetchFromServer(search, offset, limit, sortBy = 'createdAt', descending) {
      descending = descending ? 'DESC' : 'ASC'
      return await this.$store.dispatch('backOffice/get', {
        route: '/admin/layer',
        params: { search, offset, limit, sortBy, descending }
      })
    },
    async onRequest(props) {
      const { sortBy, descending, page, rowsPerPage, rowsNumber } = props.pagination

      const limit = rowsPerPage === 0 ? rowsNumber : rowsPerPage
      let offset = (page - 1) * rowsPerPage

      try {

        this.loading = true
        const { layers, count } = await this.fetchFromServer(this.search, offset, limit, sortBy, descending)
        this.data = layers

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
.q-table {

  .q-field {

    ::v-deep {

      .q-field__bottom {
        display: none;
      }
    }
  }
}

.csv-wrapper {
  padding: 10px;
  border-radius: 5px;
  border: 1px dashed rgba(0, 0, 0, 0.2);

  &:hover {
    border: 1px dashed rgba(0, 0, 0, 0.4);
  }
}
</style>
