/**
 * 格式化时期
 * @date  输入日期 时间戳或字符串
 * @fmt 需要返回日期格式
 * yyyy-MM-dd hh:mm:ss
 * yyyy-MM-dd hh:mm:ss
 * yyyy年MM月dd日 hh时mm分ss秒
 * yyyy年MM月dd日
 */
export function formatDate(date, fmt) {
    if (typeof date == "string" || typeof date == "number") {
        if (typeof date == "string") date = date.replace(/-/g, "/");
        date = new Date(date);
    }

    if (!(date instanceof Date)) {
        console.warn("非法日期格式", date);
        return date;
    }
    var o = {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "h+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        "S": date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) :
                (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
