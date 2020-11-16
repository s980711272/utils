<template>
  <div class="app-container">
    <form-component
      :formDatas="configDatas"
      @emitformData="onSubmit"
      @emitBack="onCancel"
    ></form-component>
  </div>
</template>
<script>
import formComponent from '@/components/formComponent/form-component'
export default {
  name: 'ExampleForm',
  components: {
    formComponent
  },
  provide () {
    return {
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
      ],
      requestParam:{}
    }
  },
  data () {
    return {
      configDatas: [
        {
          label: '姓名', // 标签名
          type: 'Input' // Select,Date(不带时间),DateTime(带时间),Daterange(日期段),Datetimerange(时间段),
        },
        {
          label: '年龄',
          type: 'Input'
        },
        {
          label: '出生日期',
          type: 'DateTime'
        },
        {
          label: '爱好',
          type: 'Checkbox',
          options: [
            // Select,Radio,checkbox类型需要传递此参数
            {
              key: '1',
              val: '冰淇淋'
            },
            {
              key: '2',
              val: '蛋糕'
            },
            {
              key: '3',
              val: '饼干'
            }
          ]
        },
        {
          label: '性别',
          type: 'Select',
          options: [
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
          label: '籍贯',
          type: 'Radio',
          options: [
            {
              key: '1',
              val: '湖南'
            },
            {
              key: '2',
              val: '深圳'
            },
            {
              key: '3',
              val: '福建'
            }
          ]
        }
      ]
    }
  },
  methods: {
    /**
     * 返回一个对象
     */
    onSubmit (datas) {
      console.log(datas)
    },
    onCancel () {
      console.log('当前是取消按钮触发')
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
