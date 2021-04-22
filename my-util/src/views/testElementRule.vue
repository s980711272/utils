<!--
 * @Descripttion: 测试vue+element复杂样式自定义验证
 * @version: 1.0
 * @Author: sdh
 * @Date: 2021-04-22 13:23:39
 * @LastEditors: sdh
 * @LastEditTime: 2021-04-22 14:10:48
-->
<template>
  <el-form :model="form" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item v-for="(item,index) in form.testArr" :key="index" >
      <el-form-item label="姓名" :prop="'testArr.' + index + 'name'" :rules="rules.name"><!--注意props和rules-->
        <el-input type="text" v-model="item.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="年龄" :prop="'testArr.' + index + 'age'" :rules="rules.age">
        <el-input type="text" v-model="item.age" autocomplete="off"></el-input>
      </el-form-item>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data(){
    return{
      form:{
        testArr: [
          {
            name: '',
            age: ''
          },
          {
            name: '',
            age: ''
          },
        ]
      },
      rules:{
        name:[
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        age: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ]
      }
    }
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
  mounted(){
  }
}
</script>

<style>

</style>
-->
