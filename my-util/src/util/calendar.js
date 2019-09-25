export default {
    /**
     * @param {*} date 日期
     * @param char 分隔格式,默认为/
     */
    formateDate(date,char='/'){
        return date.getFullYear() + char + this.getMonth(date) + char + this.getDay(date);
    },

    getMonth(date){
        return date.getMonth() < 10 ? '0' + (date.getMonth()+1) : date.getMonth();
    },

    getDay(date){
        return date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    }


}