import Config from './logConfig'
const enumObj = {
    head_type:[
    { label: '谷仓头程', value: 0 },
    { label: '卖家直发', value: 1 },
  ],
  is_storable:[
    { label: '是', value: 1 },
    { label: '否', value: 0 },
  ],} //全部都给一个属性值,与enumArr位置匹配

  export default {
    lexicon: {}, //词库配置对象
    diffObj: {},//差异对象
    logText: '', //日志文本
    custom: {},//自定义对象
    /**
     * @param {*} newTemp 新对象
     * @param {*} oldTemp 旧对象
     * @param {*} lexicon 词库 Object
     * @param {*} custom 自定义对象
     */
    log(newTemp, oldTemp, lexicon, custom){
        this.logText = ''
        this.custom = custom ? custom : {}
        this.lexicon = lexicon ? lexicon : Config;
        //批量处理
        if(newTemp instanceof Array){
            this.getBatchLog(newTemp)
        }else{
            this.getDiff(newTemp,oldTemp,this.diffObj)
            this.formatDiffObj();
            console.log(this.diffObj)
            this.getLog(newTemp,this.diffObj)
        }
        console.log(this.logText)
        return this.logText
    },
    //批量处理
    getBatchLog(arr){
        Object.keys(arr[0]).filter(k => {
            if(typeof arr[0].key !== 'object') this.getBatchTextLog(k,arr[0])
        })
    },
    getBatchTextLog(key,newTemp){
        for(let i in this.lexicon){
            if(i === key) {
                if(enumObj[i]){
                    let startFlag = false,endFlag = false; //父子都有值
                    let num = enumObj[i].length
                    let tempLogStr = this.lexicon[i] //日志字符
                    while((!startFlag || !endFlag) && num>0){
                        if(newTemp[i] === enumObj[i][num-1].value){
                            endFlag = '修改为' + enumObj[i][num-1].label + ','
                        }
                        num--
                    }
                    this.logText += tempLogStr + startFlag + endFlag
                    return
                }
                this.logText += this.lexicon[i] + '修改为' + newTemp[i] +','
            }
        }
    },
    /**
     * 
     * @param {*} newTemp 新对象
     * @param {*} oldTemp 旧对象
     * @param {*} k 当前执行的value
     */
    exeCustom(newTemp, oldTemp, k){
        let customText = this.custom[k](newTemp, oldTemp)
        if(customText instanceof Array){
            for(let temp of customText){
                this.logText += temp.name + '由' + temp.before + '变为' + temp.after + '</br/>'
            }
        }else{
            console.error('客户自定义返回异常') 
        } 
    },
    /**
     * 获取差别对象
     * @param {*} newTemp 新对象
     * @param {*} oldTemp 旧对象
     */
    getDiff(newTemp,oldTemp,diffObj){
        Object.keys(newTemp).filter(k => {
            if(this.custom[k]){
                this.exeCustom(newTemp, oldTemp, k); //执行客户自定义函数
            }else if(typeof newTemp[k] !== 'object' || !newTemp[k] || !oldTemp[k] ){
                if(newTemp[k] != oldTemp[k]) diffObj[k] = oldTemp[k];
            }else if(newTemp[k] instanceof Array){
                //如果数组不相等，直接进行赋值
                if((newTemp[k].length>0 && typeof newTemp[k][0] !== 'object') || (oldTemp[k].length>0 && typeof oldTemp[k][0] !== 'object')){
                  if(JSON.stringify(newTemp[k]) !== JSON.stringify(oldTemp[k])) diffObj[k] = oldTemp[k]
                }
                else console.error('数据过于复杂')
            }else if(typeof newTemp[k] === 'object'){
                diffObj[k]={}
                this.getDiff(newTemp[k],oldTemp[k],diffObj[k])
            }
        })
    },
    /**
     * 清楚diffObj属性中对象为空的
     */
    formatDiffObj(){
        for(let i in this.diffObj){
            if(typeof this.diffObj[i] === 'object' && JSON.stringify(this.diffObj[i]) === '{}') {
                delete this.diffObj[i]
            }
        }
    },
    //获取日志
    /**
     *
     * @param {*} newTemp 新对象
     * @param {*} diffObj 差异对象
     */
    getLog(newTemp,diffObj){
        Object.keys(diffObj).filter(k => {
            if(typeof diffObj[k] !== 'object' || !diffObj[k]) this.getTextLog(k,'string',newTemp,diffObj)
            else if(diffObj[k] instanceof Array) this.getTextLog(k, 'Array', newTemp,diffObj)
            else{
                this.getTextLog(k, 'object', newTemp)
                this.getLog(newTemp[k], diffObj[k])
                this.logText += '}'
            }
        })
    },
    /**
     * 优化文字显示
     * @param {*} oldValue 旧值 
     * @param {*} newValue 新值
     */
    getText(oldValue, newValue){
        if(typeof oldValue === 'object' && oldValue  instanceof Array){
            return this.getArrayText(oldValue, newValue)
        }
        return "由" + (oldValue ? JSON.stringify(oldValue) : emptyText) + "修改为" + (newValue ? JSON.stringify(newValue) : emptyText) + '<br/>'
    },
    /**
     * 优化数组文字显示
     */
    getArrayText(oldValue,newValue){
      let index = 0
      while(index < oldValue.length){
          let value = oldValue[index]
          if(newValue.indexOf(value) !== -1){
              oldValue.splice(index,1)
              index--
              newValue.splice(newValue.indexOf(value),1)
          }
          index++
      }
      return "移除"+ ([...oldValue]) + "<br/>新增" + ([...newValue]) +"<br/>"
    },
    //获取文字描述
    getTextLog(key,type,newTemp,oldTemp){
        let diffObj = oldTemp ? oldTemp : this.diffObj
        //不在词库的数据
        if(!this.lexicon[key]){
            this.logText += key + this.getText(diffObj[key],newTemp[key])
            return
        }
        //在词库的数据
        if(type === 'object'){
            this.logText += '修改'+ this.lexicon[key]+'{'
        }else if(type === 'Array'){
            this.logText += this.lexicon[key] + this.getText(diffObj[key], newTemp[key])
        }
        else{
            if(enumObj[key]){
                let startFlag = false,endFlag = false; //父子都有值
                let num = enumObj[key].length
                let tempLogStr = this.lexicon[key] //日志字符
                while((!startFlag || !endFlag) && num>0){
                    if(diffObj[key] === enumObj[key][num-1].value){
                        startFlag = '由' + enumObj[key][num-1].label
                    }else if(newTemp[key] === enumObj[key][num-1].value){
                        endFlag = '修改为' + enumObj[key][num-1].label + '<br/>'
                    }
                    num--
                }
                this.logText += tempLogStr + startFlag + endFlag
                return
            }
            this.logText += this.lexicon[key] + this.getText(diffObj[key],newTemp[key])
        }
    },
}