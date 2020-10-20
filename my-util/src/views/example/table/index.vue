<template>
  <div class="app-container">
    <middle-component
      @emitDeal="deal"
      @queryData="getFormData"
      :table-data="tableDatas"
      :page="page"
      :exten-sion="extenSion"
    ></middle-component>
  </div>
</template>

<script>
import middleComponent from './component/middle-component'
import { getList } from '@/api/table'
export default {
  components: {
    middleComponent
  },
  provide () {
    return {
      // 表头数据模板
      columns: [
        {
          label: '年龄',
          type: 'Input',
          prop: 'age' // 此数据要和tableData的数据对应
        },
        {
          label: '姓名',
          type: 'Input',
          prop: 'name'
        },
        {
          label: '性别',
          type: 'Select',
          prop: 'sex',
          options: [
            // Select类型必须要有此字段提供选择
            {
              key: '1',
              val: '男'
            },
            {
              key: '2',
              val: '女'
            }
          ]
        },
        {
          label: '婚姻状态',
          type: 'Select',
          prop: 'status',
          options: [
            // Select类型必须要有此字段提供选择
            {
              key: '1',
              val: '未婚'
            },
            {
              key: '2',
              val: '已婚'
            }
          ]
        }
      ],
      // 搜索内容模板
      formDatas: [
        {
          label: '姓名',
          key: 'name',
          type: 'Input' // 支持Select,Date(不带时间),DateTime(带时间),Daterange(日期段),Datetimerange(日期时间段)
        },
        {
          label: '年龄',
          key: 'age',
          type: 'Input'
        },
        {
          label: '出生日期',
          key: 'birthday',
          type: 'DateTime'
        },
        {
          label: '性别',
          type: 'Select',
          key: 'sex',
          options: [
            // Select类型必须要有此字段提供选择
            {
              key: '1',
              val: '男'
            },
            {
              key: '2',
              val: '女'
            }
          ]
        }
      ],
      // 请求接口数据(仅仅用于编辑)
      requestParam: {
        key: 'id', // 请和tableData的数据对应
        url: '/vue-admin-template/form/getData',
        method: 'post'
      },
      // form表单参数
      editConfigData: [
        {
          label: '序号',
          isShow: false,
          key: 'id'
        },
        {
          label: '姓名',
          key: 'name',
          rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          type: 'Input' // 支持Select,Date(不带时间),DateTime(带时间),Daterange(日期段),Datetimerange(日期时间段)
        },
        {
          label: '年龄',
          key: 'age',
          type: 'Input'
        },
        {
          label: '性别',
          type: 'Select',
          key: 'sex',
          rules: { required: true, message: '请输入性别', trigger: 'blur' },
          options: [
            // Select类型必须要有此字段提供选择
            {
              key: '1',
              val: '男'
            },
            {
              key: '2',
              val: '女'
            }
          ]
        },
        {
          label: '民族',
          type: 'Select',
          key: 'nation',
          options: [
            // Select类型必须要有此字段提供选择
            {
              key: '1',
              val: '汉族'
            },
            {
              key: '2',
              val: '满族'
            }
          ]
        },
        {
          label: '出生日期',
          key: 'birthday',
          type: 'Date'
        }
      ]
    }
  },
  data() {
    return {
      // 表格数据模板
      tableDatas: [],
      // 分页模板
      page: {
        total: 5, // 总数据，当total小于0时会不展示分页
        currentPage: 1, // 当前页
        pageSize: 10 // 每页条数
      },
      // 额外扩展项
      extenSion: {
        isNeedEditButton: true,
        isNeedDeleteButton: true
      }
    }
  },
  methods: {
    /**
     * @param row: 当前编辑行的数据
     * @param type: 当前处理类型 edit,type,add
     */
    deal (row, type) {
      console.log(row, type)
      if (type === 'edit' || type === 'add') { this.extenSion.currentType = 'table' } // 编辑或者新增后返回表格页
    },
    /**
     * @param data: configDatas + page数据集合
     * 当前例子返回
     *  data:{
     *    name : 'sdh',
     *    age : '22',
     *    birthdate: Tue Jul 14 2020 00:00:00 GMT+0800 (中国标准时间),
     *    sex: '2' //表示男
     *    currentPage: 1 //当前页
     *    pageSize: 10, //当前每页数量
     *    total:0 //总数据条数
     * }
     */
    getFormData (data) {
      console.log(data)
    }
  },
  created () {
    getList({
      limit: 10
    }).then(res => {
      this.page.total = res.total
      this.tableDatas = res.items
    })
  },
  mounted () {
    // this.getData()
  }
}
</script>
