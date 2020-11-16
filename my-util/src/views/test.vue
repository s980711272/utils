<template>
  <div>
    <el-form label-position="right" label-width="120px" :model="searchData" size="mini">
      <el-row>
         <el-form-item label="审核状态：">
           <group-button v-model="searchData.auditStatus" :button-array="statusList" />
         </el-form-item>
      <el-row>
         <el-form-item label="审核标识：">
           <group-button v-model="searchData.auditFlag" :button-array="flagList" />
         </el-form-item>
      <el-row>
        <el-col :span="span">
          <el-form-item label="客户代码：">
           <el-input v-model="searchData.custome_code" size="mini"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="handleSearch" size="mini">查询</el-button>
        <el-button type="default" @click="handleResetSearch"  size="mini">重置</el-button>
      <el-form-item>
    </el-form>
    <div class="page-tools">
      <el-button type="primary" size="mini" @click="handleExport">导出</el-button>
      <el-button type="primary" size="mini" @click="handleBatchConfirm">批量确认</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%" size="mini">
      <el-table-column prop="product_brand" label="商品条码" />
      <el-table-column prop="declare_name_cn" label="中文申报品名" />
      <el-table-column prop="risk_level" label="产品风险等级" />
      <el-table-column label="操作"  width="100">
        <template slot-scope="scope">
          <el-button @click="handleSearch(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
     </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      span: 6,
      tableData: [],
      statusList: [],
      flagList: [],
      searchData: {
        auditStatus: '',
        auditFlag: '',
        custome_code: '',
       },
    };
  },
  methods:{
    handleSearch() {
    },
    handleResetSearch() {      
      this.$refs[formName].resetFields();      
      this.searchData.page_index = 1      
      this.handleSearch()    
    },    
    handleExport(){
    },
    handleBatchConfirm(){
    }
  },
};
</script>
<style scoped>
</style>