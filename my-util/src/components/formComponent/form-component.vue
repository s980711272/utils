<!-- 表单组件 -->
<template>
  <div class="app-container-form">
    <el-form ref="formItem" label-width="120px" :model="formItem">
      <div v-for="(item, index) in datas" :key="index">
        <el-form-item
          :label="item.label"
          :prop="item.key"
          v-if="item.type === 'Input'"
          :rules="item.rules"
        >
          <el-input v-model="formItem[item.key]" />
        </el-form-item>
        <el-form-item
          :label="item.label"
          v-if="item.type === 'Select'"
          :rules="item.rules"
        >
          <el-select
            v-model="formItem[item.key]"
            :prop="item.key"
            :placeholder="`请选择${item.label}`"
          >
            <el-option
              v-for="item2 in item.options"
              :key="item2.key"
              :label="item2.val"
              :value="item2.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="item.label"
          v-show="item.type === 'Date'"
          :rules="item.rules"
        >
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="formItem[item.key]"
            :prop="item.key"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          :label="item.label"
          v-if="item.type === 'DateTime'"
          :rules="item.rules"
        >
          <el-date-picker
            type="datetime"
            placeholder="选择日期"
            v-model="formItem[item.key]"
            :prop="item.key"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          :label="item.label"
          v-if="item.type === 'Daterange'"
          :rules="item.rules"
        >
          <el-date-picker
            v-model="formItem[item.key]"
            :prop="item.key"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          :label="item.label"
          v-if="item.type === 'Datetimerange'"
          :rules="item.rules"
        >
          <el-date-picker
            v-model="formItem[item.key]"
            :prop="item.key"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          :label="item.label"
          v-if="item.type === 'Radio'"
          :rules="item.rules"
        >
          <el-radio-group v-model="formItem[item.key]" :prop="item.key">
            <el-radio
              v-for="item2 in item.options"
              :key="item2.key"
              :label="item2.key"
              >{{ item2.val }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item
          :label="item.label"
          v-if="item.type === 'Checkbox'"
          :rules="item.rules"
        >
          <el-checkbox-group v-model="formItem[item.key]" :prop="item.key">
            <el-checkbox
              v-for="item2 in item.options"
              @change="changeData(item, index)"
              :label="`` + item2.key"
              :key="item2.key"
              >{{ item2.val }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          :label="item.label"
          v-if="item.type === 'Textarea'"
          :rules="item.rules"
        >
          <el-input
            type="textarea"
            v-model="formItem[item.key]"
            :prop="item.key"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="item.label"
          v-if="item.type === 'Upload'"
          :rules="item.rules"
        >
          <el-upload
            :action="item.url"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('formItem')">{{
          buttonText
        }}</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { getDetail } from '@/api/table'
export default {
  data () {
    return {
      datas: [],
      formItem: {}
    }
  },
  inject: ['editConfigData', 'requestParam'],
  props: {
    currentId: {
      type: String
    }
  },
  computed: {
    buttonText () {
      return this.currentId ? '修改' : '立即创建'
    }
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit(
            'emitformData',
            this.formItem,
            this.currentId ? 'edit' : 'add'
          )
        } else {
          console.log('error submit!!')
        }
      })
    },
    goBack () {
      this.$emit('emitBack')
    },
    changeData (item, index) {
      item.checked = true
      this.datas.splice(index, 1, item)
    },
    initData () {
      this.datas = JSON.parse(JSON.stringify(this.editConfigData))
      for (const temp of this.datas) {
        if (temp.type === 'Checkbox') {
          temp.value = []
          for (const temp2 of temp.options) {
            temp2.checked = false
          }
        }
      }
      for (const temp of this.datas) {
        this.$set(this.formItem, temp.key, '')
      }

      if (this.currentId) {
        const key = this.requestParam.key
        const param = {}
        param[key] = this.currentId
        getDetail(this.requestParam.url, this.requestParam.method, param).then(
          res => {
            for (const temp of this.datas) {
              for (const i in res.data) {
                if (i === temp.key) {
                  this.$set(this.formItem, i, res.data[i])
                }
              }
            }
          }
        )
      }
    }
  },
  mounted () {
    this.initData()
  }
}
</script>
<style scoped>
.app-container-form {
  .el-input {
    width: 400px;
  }
  .el-select {
    width: 400px;
  }
}
</style>
