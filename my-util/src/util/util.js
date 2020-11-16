const words = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'k', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'K', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
]
export default {
    /**
     * 增加防抖参数
     * @param fn  函数
     * @param delay  延时时长
     */
    debounce: function (fn, delay) {
        var timer = null;
        return function() {
          let context = this;
          let args    = arguments;
          if(!timer){
            timer = setTimeout(function(){
                fn.apply(context, args);
                timer = null;
            }, delay);
          }
          console.log(timer + '22')
        }

    },

    /**
     * 生成十六位密钥
     */
    createKey(n = 16) {
        let key = '';
        for (let i = 0; i < n; i++) {
            let index = Math.floor(Math.random() * 62);
            key += words[index];
        }
        return key;
    },
    //沉睡等待10s
    *sleep(time){
        console.log(1)
        yield 1
        console.log('我醒来了')
        return 2
    }
}