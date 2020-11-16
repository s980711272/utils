<!--  -->
<template>
  <div>
    <div v-for="(item,index) in arr" :key="index">
      <el-row>
        <el-col :span="4"><div class="dis-inline">label:<el-input v-model="item.label" size="mini" /></div></el-col>
        <el-col :span="4"><div class="dis-inline">value:<el-input v-model="item.value" size="mini"/></div></el-col>
        <el-col :span="4"><div class="dis-inline">type:<el-select v-model="item.type" size="mini">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select></div></el-col>
        <el-col :span="8"><div class="dis-inline">下拉框绑定的参数名:<el-input v-model="item.options" size="mini"/></div></el-col>
        <el-col :span="4"><div class="dis-inline">
          <el-button type="primary" @click="handleClick('condition')" size="mini">增加</el-button>
          <el-button @click="handleDeleteTable(index,'form')" size="mini">删除</el-button>
        </div></el-col>
      </el-row>
    </div>
    <div>是否需要中间的按钮？需要请打勾<el-checkbox v-model="isNeedButton">备选项</el-checkbox></div>
    <div v-if="isNeedButton">
      <el-row v-for="(item,index) in buttonList" :key="index">
        <el-col :span="8">名字:<el-input v-model="item.label" /></el-col>
        <el-col :span="8">调用方法:<el-input v-model="item.method" placeholder="请以handleXXX命名"/></el-col>
        <el-col :span="8"><div class="dis-inline">
          <el-button type="primary" @click="handleClick('btn')" size="mini">增加</el-button>
          <el-button @click="handleDeleteTable(index,'form')" size="mini">删除</el-button>
        </div></el-col>
      </el-row>
    </div>
    <div style="margin:20px 0">表格数据配置</div>
    <div v-for="(item,index) in tableData" :key="index">
      <el-row>
        <el-col :span="8">
          key:<el-input type="text" v-model="item.label" size="mini" />
        </el-col>
        <el-col :span="8">
          value: <el-input type="text" v-model="item.value" size="mini" />
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="handleAddTable" size="mini">增加</el-button>
          <el-button @click="handleDeleteTable(index,'table')" size="mini">删除</el-button>
        </el-col>

      </el-row>
    </div>
    <div style="margin-top:30px"><el-button @click="geneRate" size="mini">生成代码</el-button></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      labelNum:0,
      isHasGrounpButton: false,
      isNeedButton: false,
      options: [], //下拉框值
      arr:[
        {
          label: '',
          value: '',
          type: '',
          options:'',
        }
      ],
      buttonList:[
        {
          label :'', //名称
          method: '' //默认调用方法
        }
      ],
      tableData:[
        {
          label: '',
          value: ''
        }
      ],
      typeOptions:[
        {
          label: '下拉框',
          value: 'select'
        },
        {
          label: '日期框',
          value: 'date'
        },
        {
          label: '输入框',
          value: 'input'
        },
        {
          label: '按钮组',
          value: 'groupBtn'
        }
      ]
    };
  },
  mounted(){},

  methods: {
    handleClick(type){
      if(type == 'condition'){
        this.arr.push({
            label: '',
            value: '',
            type: 'input'
        })
      }else if(type == 'btn'){
        this.buttonList.push({
          label: '',
          methods: ''
        })
      }
    },
    handleAddTable(){
      this.tableData.push({
          label: '',
          value: '',
        })
    },
    handleDeleteTable(index,type){
      if(type == 'table'){
        this.tableData.splice(index, 1)
      }else{
        this.arr.splice(index, 1)
      }
    },
    addCol(){
      return '\n        <el-col :span="span">'
    },
    geneRate(){
      let str = '<template>\n  <div>\n    <el-form label-position="right" label-width="120px" :model="searchData" size="mini">\n';
      let isInit = false
      let n = this.labelNum
      for(let temp of this.arr){
        if(temp.type != 'groupBtn'){
          isInit = true
          n = this.labelNum + 1;
        }
        if(this.labelNum == 0 || (this.labelNum %n === 1 && this.labelNum != 1) && temp.type != 'groupBtn'){
          str += '      <el-row>'
        }
        if(this.labelNum != 0 && this.labelNum /n === 0){
          str += '      </el-row>'
        }
        switch(temp.type){
          case 'groupBtn':
            this.isHasGrounpButton = true
            this.options.push(temp.options) 
            str += '\n         <el-form-item label="'+temp.label+'：">\n           <group-button v-model="searchData.'+ temp.value +'" :button-array="'+temp.options+'" />\n         </el-form-item>\n'
            break;
          case 'input':
            str += this.addCol()
            this.labelNum++;
            if(!isInit){
              str += '      <el-row>'
            }
            str += '\n          <el-form-item label="'+temp.label+'：">\n           <el-input v-model="searchData.'+temp.value+'" size="mini"/>\n          </el-form-item>\n        </el-col>'
            break
          case 'select':
            str += this.addCol()
            this.options.push(temp.options)
            this.labelNum++;
            str += '\n          <el-form-item label="'+temp.label+'：">\n           <select options="'+temp.options+'" v-model="searchData.'+temp.value+'" size="mini"/>\n          </el-form-item>\n        </el-col>'
            break
          case 'date':
            str += this.addCol()
            this.labelNum++;
            if(!isInit){
              str += '      <el-row>'
              isInit = true
            }
            str += '\n          <el-form-item label="'+temp.label+'：">\n           <el-date-picker v-model="searchData'+temp.value+'" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini"></el-date-picker>\n        </el-form-item>\n        </el-col>'
            break
        }
      }
      str += '\n      </el-row>'
      str += '\n      <el-form-item>'
      str += '\n        <el-button type="primary" :loading="loading" @click="handleSearch" size="mini">查询</el-button>'
      str += '\n        <el-button type="default" @click="handleResetSearch"  size="mini">重置</el-button>'
      str += '\n      <el-form-item>'
      str += '\n    </el-form>\n'
      str += this.addBtn()
      str += this.addTable()
      str += this.addScript()
      console.log(str)
    },
    addScript(){
      let str = ''
      str += '<script>\n'
      str += 'export default {\n'
      str += '  data() {\n'
      str += '    return {\n'
      str += '      span: 6,\n'
      str += '      tableData: [],\n'
      for(let i in this.options){
        str += '      '+this.options[i] + ': [],\n'
      }
      str += '      searchData: {\n'
      for(let temp of this.arr){
        str += "        "+temp.value+": '',\n"
      }
      str += '        page_index: 1,'
      str += '        page_size: 10,'
      str += '      },\n'
      str += '    };\n'
      str += '  },\n'
      str += '  methods:{\n'
      str += '    handleSearch() {\n'
      str += '    },\n'
      str += '    handleResetSearch() {'
      str += '      this.$refs[formName].resetFields();\n'
      str += '      this.searchData.page_index = 1\n'
      str += '      this.handleSearch()\n'
      str += '    },\n'
      if(this.isNeedButton){
        for(let temp of this.buttonList){
          str += '    '+temp.method+'(){\n'
          str += '    },\n'
        }
      }
      str += '  },\n'
      str += '};\n'
      str += '\<\/script\>\n'
      str += '<style scoped>\n'
      str += '</style>'
      return str
    },
    addTable(){
      let str = ''
      //添加表格
      if(this.tableData.length > 1){
        str += '    <el-table :data="tableData" border style="width: 100%" size="mini">\n'
        for(let temp of this.tableData){
          str += '      <el-table-column prop="' + temp.value + '" label="' + temp.label + '" />\n'
        }
        str += '      <el-table-column label="操作"  width="100">\n'
        str += '        <template slot-scope="scope">\n'
        str += '          <el-button @click="handleSearch(scope.row)" type="text" size="small">查看</el-button>\n'
        str += '        </template>\n'
        str += '      </el-table-column>\n'
        str += '    </el-table>'
      }
      return str += '\n  </div>\n</template>\n'
    },
    addBtn(){
      let str = ""
      if(this.isNeedButton){
        str += '    <div class="page-tools">\n'
        for(let temp of this.buttonList){
          str += '      <el-button type="primary" size="mini" @click="'+temp.method+'">'+temp.label+'</el-button>\n'
        }
        str += '    </div>\n'
      }
      return str
    }
  }
}

</script>
<style scoped>
.el-input{
  width:200px;
  height:32px;
}
</style>