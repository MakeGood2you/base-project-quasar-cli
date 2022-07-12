<template>
  <q-table
    :fullscreen.sync="el.fullscreen"
    :no-route-fullscreen-exit="el.noRouteFullscreenExit"
    :grid="el.grid"
    :grid-header="el.gridHeader"
    :loading="el.loading"
    :columns="el.columns"
    :visible-columns="el.visibleColumns"
    :table-colspan="el.tableColspan"
    :icon-first-page="el.iconFirstPage"
    :icon-prev-page="el.iconPrevPage"
    :icon-next-page="el.iconNextPage"
    :icon-last-page="el.iconLastPage"
    :title="el.title"
    :hide-header="el.hideHeader"
    :hide-bottom="el.hideBottom"
    :hide-selected-banner="el.hideSelectedBanner"
    :hide-no-data="el.hideNoData"
    :hide-pagination="el.hidePagination"
    :separator="el.separator"
    :wrap-cells="el.wrapCells"
    :no-data-label="el.noDataLabel"
    :no-results-label="el.noResultsLabel"
    :loading-label="el.loadingLabel"
    :expanded.sync="el.expanded"
    :filter="el.filter"
    :filter-method="el.filterMethod"
    :data="el.data"
    :row-key="el.rowKey"
    :rows-per-page-label="el.rowsPerPageLabel"
    :pagination-label="el.paginationLabel"
    :pagination.sync="el.pagination"
    :rows-per-page-options="el.rowsPerPageOptions"
    :selected-rows-label="el.selectedRowsLabel"
    :selection="el.selection"
    :selected.sync="el.selected"
    :binary-state-sort="el.binaryStateSort"
    :column-sort-order="el.columnSortOrder"
    :sort-method="el.sortMethod"
    :color="el.color"
    :dense="el.dense"
    :dark="el.dark"
    :flat="el.flat"
    :bordered="el.bordered"
    :square="el.square"
    :table-style="el.tableStyle"
    :table-class="el.tableClass"
    :table-header-style="el.tableHeaderStyle"
    :table-header-class="el.tableHeaderClass"
    :card-container-style="el.cardContainerStyle"
    :card-container-class="el.cardContainerClass"
    :card-style="el.cardStyle"
    :card-class="el.cardClass"
    :title-class="el.titleClass"
    :virtual-scroll="el.virtualScroll"
    :virtual-scroll-slice-size="el.virtualScrollSliceSize"
    :virtual-scroll-slice-ratio-before="el.virtualScrollSliceRatioBefore"
    :virtual-scroll-slice-ratio-after="el.virtualScrollSliceRatioAfter"
    :virtual-scroll-item-size="el.virtualScrollItemSize"
    :virtual-scroll-sticky-size-start="el.virtualScrollStickySizeStart"
    :virtual-scroll-sticky-size-end="el.virtualScrollStickySizeEnd"
    @request="$emit('onRequest', $event)"
  >

    <template v-slot:loading>
      <q-inner-loading showing color="primary" />
    </template>

    <template v-slot:top-right>
      <slot name="top-right" />
    </template>

    <template v-slot:body="props">
      <slot name="body" :props="props" />
    </template>

  </q-table>
</template>

<script>
export default {
  name: 'BaseNewTable',
  props: ['el']
}
</script>

<style lang="scss" scoped>
.q-table__container {

  ::v-deep {

    .q-table__middle {

      .q-table {

        tbody {

          tr {

            td {

              .text-dots {
                width: 120px;
                display: inline-block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;

                a {
                  outline: none;
                  text-decoration: none;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
