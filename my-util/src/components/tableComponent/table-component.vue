<!-- 表格组件 -->
<template>
  <div class="table-component">
    <div class="form-header">
      <div v-for="(item, index) in tableFormDatas" :key="index">
        <el-input
          v-model="item.value"
          v-if="item.type === 'Input'"
          :placeholder="`请输入${item.label}`"
          class="filter-item"
        />
        <el-select
          v-model="item.value"
          :placeholder="`请选择${item.label}`"
          v-if="item.type === 'Select'"
          class="filter-item"
        >
          <el-option
            v-for="item2 in item.options"
            :key="item2.key"
            :label="item2.val"
            :value="item2.key"
          ></el-option>
        </el-select>
        <el-date-picker
          type="date"
          :placeholder="`选择${item.label}`"
          v-model="item.value"
          v-show="item.type === 'Date'"
          class="filter-item"
        ></el-date-picker>
        <el-date-picker
          type="datetime"
          :placeholder="`选择${item.label}`"
          v-model="item.value"
          v-if="item.type === 'DateTime'"
          class="filter-item"
        ></el-date-picker>
        <el-date-picker
          v-model="item.value"
          v-if="item.type === 'Daterange'"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="filter-item"
        >
        </el-date-picker>
        <el-date-picker
          v-if="item.type === 'Datetimerange'"
          v-model="item.value"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="filter-item"
        >
        </el-date-picker>
      </div>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="queryData"
      >
        查找
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-plus"
        @click="addForm"
      >
        新增
      </el-button>
    </div>
    <div class="content">
      <el-table :data="tableData" border highlight-current-row>
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column
          v-for="(item, index) in columns"
          :key="index"
          :property="item.prop"
          :label="item.label"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)"
              v-if="extenSion.isNeedEditButton"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              v-if="extenSion.isNeedDeleteButton"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        v-show="page.total > 0"
        :total="page.total"
        :page.sync="page.currentPage"
        :limit="page.pageSize"
        @pagination="getPage"
      ></Pagination>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import Msg from '@/utils/msg'
export default {
  components: { Pagination },
  data () {
    return {
      formItem: {},
      tableFormDatas: [],
      innerPage: {}
    }
  },
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
  inject: ['formDatas', 'columns'],
  methods: {
    handleEdit (row) {
      this.$emit('emitDeal', row, 'edit')
    },
    addForm () {
      this.$emit('emitDeal', [], 'add')
    },
    handleDelete (row) {
      Msg.confirm({
        msg: '你确定删除这条记录吗?'
      })
        .then(res => {
          this.$emit('emitDeal', row, 'delete')
          // eslint-disable-next-line handle-callback-err
        })
        .catch(err => {
          console.log('用户取消删除', err)
        })
    },
    queryData () {
      for (const temp of this.tableFormDatas) {
        this.formItem[temp.key] = temp.value ? temp.value : ''
      }
      Object.assign(this.formItem, this.innerPage)
      this.$emit('queryData', this.formItem)
    },
    getPage (page) {
      this.innerPage.currentPage = page.page
      this.innerPage.pageSize = page.limit
      this.queryData()
    }
  },
  mounted () {
    this.tableFormDatas = JSON.parse(JSON.stringify(this.formDatas))
    Object.assign(this.innerPage, this.page)
  }
}
</script>
<style lang="scss" scoped>
.table-component {
  .form-header {
    & > div {
      display: inline-block;
      margin: 0 10px;
    }
    & > div:nth-child(1) {
      margin-left: 0px;
    }
    .el-input {
      width: 200px;
    }
    .filter-item {
      display: inline-block;
    }
  }
  .content {
    margin-top: 10px;
  }
}
</style>
