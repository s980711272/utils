<template>
  <div>
    <el-form label-position="right" label-width="120px" :model="searchData" size="mini">
      <el-row>
        <el-col :span="span">
          <el-form-item label="姓名">
           <el-input v-model="searchData.name" size="mini"/>
           </el-form-item>
        </el-col>
        <el-col :span="span">
          <el-form-item label="国家">
           <select options="countryList" v-model="searchData.country" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :span="span">
          <el-form-item label="区域">
           <select options="areaList" v-model="searchData.area" size="mini"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" border style="width: 100%" size="mini">
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="age" label="年龄" />
    <el-table-column prop="birthday" label="生日" />
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
      countryList: [],
      areaList: [],
      searchData: {
        name: '',
        country: '',
        area: '',
        },
    };  },
  methods:{},
};
</script>
<style scoped>
</style>