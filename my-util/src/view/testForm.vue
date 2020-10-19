<!--  -->
<template>
  <div>
    <div v-for="(item,index) in arr" :key="index">
      <el-row>
        <el-col :span="6"><div class="dis-inline">label:<el-input v-model="item.label"/></div></el-col>
        <el-col :span="6"><div class="dis-inline">value:<el-input v-model="item.value" /></div></el-col>
        <el-col :span="6"><div class="dis-inline">type:<el-select v-model="item.type">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select></div></el-col>
        <el-col :span="6"><div class="dis-inline">下拉框绑定的参数名:<el-input v-model="item.options"/></div></el-col>
        <el-col :span="6"><div class="dis-inline">
          <el-button type="primary" @click="handleClick">增加</el-button>
          <el-button @click="handleDeleteTable(index,'form')" >删除</el-button>
        </div></el-col>
      </el-row>
    </div>
    <div style="margin-top:30px">表格数据配置</div>
    <div v-for="(item,index) in tableData" :key="index">
      <el-row>
        <el-col :span="8">
          key:<el-input type="text" v-model="item.label" />
        </el-col>
        <el-col :span="8">
          value: <el-input type="text" v-model="item.value" />
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="handleAddTable">增加</el-button>
          <el-button @click="handleDeleteTable(index,'table')" >删除</el-button>
        </el-col>

      </el-row>
    </div>
    <div style="margin-top:30px"><el-button @click="geneRate">生成代码</el-button></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      labelNum:0,
      options: [], //下拉框值
      arr:[
        {
          label: '',
          value: '',
          type: 'input',
          options:'',
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
    handleClick(){
      this.arr.push({
          label: '',
          value: '',
          type: 'input'
        })
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
    geneRate(){
      let str = '<template>\n  <div>\n    <el-form label-position="right" label-width="120px" :model="searchData" size="mini">\n';
      for(let temp of this.arr){
        if(this.labelNum == 0 || (this.labelNum %4 === 1 && this.labelNum != 1)){
          str += '      <el-row>'
        }
        if(this.labelNum != 0 && this.labelNum /4 === 0){
          str += '      </el-row>'
        }
        str += '\n        <el-col :span="span">'
        switch(temp.type){
          case 'groupBtn':
            break;
          case 'input':
            this.labelNum++;
            str += '\n          <el-form-item label="'+temp.label+'">\n           <el-input v-model="searchData.'+temp.value+'" size="mini"/>\n           </el-form-item>\n        </el-col>'
            break
          case 'select':
            this.options.push(temp.options)
            this.labelNum++;
            str += '\n          <el-form-item label="'+temp.label+'">\n           <select options="'+temp.options+'" v-model="searchData.'+temp.value+'" size="mini"/>\n          </el-form-item>\n        </el-col>'
            break
          case 'date':
            this.labelNum++;
            str += '\n          <el-form-item label="'+temp.label+'">\n           <el-date-picker v-model="searchData'+temp.value+'" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini"></el-date-picker>\n        </el-form-item>\n        </el-col>'
            break
        }
      }
      str += '\n      </el-row>'
      str += '\n    </el-form>\n'
      //添加表格
      if(this.tableData.length > 1){
        str += '    <el-table :data="tableData" border style="width: 100%" size="mini">\n'
        for(let temp of this.tableData){
          str += '    <el-table-column prop="' + temp.value + '" label="' + temp.label + '" />\n'
        }
        str += '      <el-table-column label="操作"  width="100">\n'
        str += '        <template slot-scope="scope">\n'
        str += '          <el-button @click="handleSearch(scope.row)" type="text" size="small">查看</el-button>\n'
        str += '        </template>\n'
        str += '      </el-table-column>\n'
        str += '     </el-table>'
      }
      str += '\n  </div>\n</template>\n'
      //下面是添加script
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
      str += '        },\n'
      str += '    };'
      str += '  },\n'
      str += '  methods:{},\n'
      str += '};\n'
      str += '\<\/script\>\n'
      str += '<style scoped>\n'
      str += '</style>'

      
      console.log(str)
    }
  }
}

</script>
<style scoped>
.el-input{
  width:250px
}
</style>