<template>
  <div>
    <!-- <el-form label-position="right" label-width="120px" :model="searchData" size="mini">
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
     </el-table> -->
    <button @click="onChange">按钮</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modelDefault: [],
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
  mounted(){
    // this.init()
    this.test();
  },
  methods:{
  test(){
    let obj = {id:1}
    this.test2(obj)
    console.log(obj)
  },
  test2(obj){
    obj.id=3
  },
  init() {
    let self = this
    let arr = [
      		{
        calculateDescription: "（【首次采购距今天数】）≥【${order_30d_sum_1}】且（【连续未下单天数】=【【${fst_ordr_present_days_1}，${fst_ordr_present_days_2}）】）,（【首次采购距今天数】）≥【${order_30d_sum_1}】且（【连续未下单天数】=【【${fst_ordr_present_days_1}，${fst_ordr_present_days_2}）】）",
        calculateExpression: "order_30d_sum>=${order_30d_sum_1}&&fst_ordr_present_days>=${fst_ordr_present_days_1}&&fst_ordr_present_days<${fst_ordr_present_days_2}",
        createTime: 1616581280000,
        createUser: "test",
        id: 33,
        modelId: 28,
        name: "休眠用户",
        suggestedStrategy: "休眠用户1",
        updateTime: 1616736448000,
        updateUser: "test"
      },
      {
        calculateDescription: "（【首次采购距今天数】）≥【${order_30d_sum_1}】且（【连续未下单天数】≥【【${fst_ordr_present_days_2}】）,（【首次采购距今天数】）≥【${order_30d_sum_1}】且（【连续未下单天数】≥【【${fst_ordr_present_days_2}】）",
        calculateExpression: "order_30d_sum>=${order_30d_sum_1}&&fst_ordr_present_days>=${fst_ordr_present_days_2}",
        createTime: 1616581280000,
        createUser: "test",
        id: 34,
        modelId: 28,
        name: "流失用户",
        suggestedStrategy: "流失用户1",
        updateTime: 1616736448000,
        updateUser: "test"
      }
    ]

    self.modelDefault = self.deepCopy(arr);
    arr[0].id = 5
    console.log(this.modelDefault)
  },
  copy(modelDetail) {
        var obj = {};
        obj = JSON.parse(JSON.stringify(modelDetail));
        return obj
    },
    deepCopy(target){ 
      let copyed_objs = [];//此数组解决了循环引用和相同引用的问题，它存放已经递归到的目标对象 
          function _deepCopy(target){ 
              if((typeof target !== 'object')||!target){return target;}
              for(let i= 0 ;i<copyed_objs.length;i++){
                  if(copyed_objs[i].target === target){
                      return copyed_objs[i].copyTarget;
                  }
              }
              let obj = {};
              if(Array.isArray(target)){
                  obj = [];//处理target是数组的情况 
              }
              copyed_objs.push({target:target,copyTarget:obj}) 
              Object.keys(target).forEach(key=>{ 
                  if(obj[key]){ return;} 
                  obj[key] = _deepCopy(target[key]);
              }); 
              return obj;
          } 
          return _deepCopy(target);
      }
  }
};
</script>
<style scoped>
</style>