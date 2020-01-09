function formatTime(timestampOrGMT, split, showHMS) { //可传入时间戳或者GMT时间
    let dateTime = timestampOrGMT * 1 || new Date() * 1;
    split = split || "."; //默认以 . 分割
    let add0 = function (m) {
        return m < 10 ? '0' + m : m;
    };
    let time = new Date(dateTime);
    let date = {
        y: time.getFullYear(),
        m: time.getMonth() + 1,
        d: time.getDate(),
        h: time.getHours(),
        mm: time.getMinutes(),
        s: time.getSeconds()
    }
    return date.y + split + add0(date.m) + split + add0(date.d) + (showHMS ? (" " + add0(date.h) + ':' + add0(date.mm) + ":" + add0(date.s)) : "");
}

module.exports = { formatTime };