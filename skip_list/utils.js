function createArray(type, length) {
    let arr = new Array(length);
    for (let i = 0; i < length; i++) {
        arr[i] = new type;
    }
    return arr;
}

export default {
    createArray,
};
