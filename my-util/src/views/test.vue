<template>
    <div>
    </div>
</template>
<script>
import Log from '@/util/log'
export default {
    name:'test',
    data(){
        return {
         a : {
            "rule_no": "ZD202009090008",//相同
            "rule_name": "中转仓查验规则33333",
            "warehous_code_list": ["USEA","MD5"],
            "rule_type": "ZD",
            head_type:0,
            ruleForm:{
                name:'张三',
                age:22,
                sex:'男',
                money:200,
                isMarry:'是',
                is_storable:0,
            },
            
        },
    b : {
        "rule_no":"ZD202009090008",
        "rule_name":"中转仓查验规则222",
        "warehous_code_list":["USEA","DMAC"],
        "rule_type":"XX",
        head_type:1,
        ruleForm:{
            name:'李四',
            age:22,
            sex:'男',
            money:500,
            isMarry:'否',
            is_storable:1
        },
        
    }
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            let temp = {
                rule_type:function(newTemp,oldTemp){
                    console.log(newTemp.rule_name,333)
                }
            }
            console.log(Log.log(this.b,this.a,null,temp))
        }
    }
}
</script>

<style>

</style>