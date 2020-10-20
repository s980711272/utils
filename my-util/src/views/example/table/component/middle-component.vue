<template>
  <div class="app-container">
    <table-component
      @emitDeal="deal"
      @queryData="getFormData"
      v-if="currentType === 'table'"
      :tableData="tableData"
      :page="page"
      :extenSion="extenSion"
    ></table-component>
    <form-component
      @emitformData="onSubmit"
      @emitBack="onCancel"
      v-if="currentType !== 'table'"
      :current-id="currentId"
    ></form-component>
  </div>
</template>

<script>
import tableComponent from '@/components/tableComponent/table-component'
import formComponent from '@/components/formComponent/form-component'
export default {
  components: {
    tableComponent,
    formComponent
  },
  data () {
    return {
      currentType: 'table',
      currentId: ''
    }
  },
  inject: ['requestParam'],
  props: {
    tableData: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    },
    page: {
      type: Object,
      required: true
    },
    extenSion: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  methods: {
    /**
     * @param data 表格组件传进来的参数，当前处理行
     * @param type 分为delete,add,edit
     */
    deal (data, type) {
      this.currentType = type === 'delete' ? 'table' : type
      if (type === 'delete') {
        this.$emit('emitDeal', data, 'delete')
      } else if (type === 'edit') {
        this.currentId = data[this.requestParam.key]
      }
    },
    getFormData (data) {
      this.$emit('queryData', data)
    },
    /**
     * 返回一个form数据对象
     */
    onSubmit (obj) {
      this.currentId = ''
      this.$emit('emitDeal', obj, this.currentType)
    },
    onCancel () {
      this.currentId = ''
      this.currentType = 'table'
    }
  },
  mounted () {}
}
</script>
