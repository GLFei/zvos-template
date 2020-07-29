import moment from 'moment'

export default function(value, format = 'YYYY-MM-DD HH:mm:ss') {

    let dateTime = value;

    if (!value || value == '') {
        return '--'
    }

    return moment(dateTime).format(format);
}
/**
 * @desc 日期转换函数
 * @param {string} fmt
 * 
 * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2017-07-02 08:09:04.423
 * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2017-7-2 8:9:4.18
 */
export const formatDate = function (fmt) {
    let o = {
        'M+': this.getMonth() + 1,                    // 月份
        'd+': this.getDate(),                         // 日
        'h+': this.getHours(),                        // 小时
        'm+': this.getMinutes(),                      // 分
        's+': this.getSeconds(),                      // 秒
        'q+': Math.floor((this.getMonth() + 3) / 3),  // 季度
        'S': this.getMilliseconds()                   // 毫秒
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (`${this.getFullYear()}`).substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)))
        }
    }
    return fmt
}