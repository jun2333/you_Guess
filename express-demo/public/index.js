import fetch from './fetch.js';

var app = new Vue({
    el: '#app',
    data: {
        dataArr: [],
        name: '',
        price: 0,
        stock: 0
    },
    created(){
        this.getData();
    },
    methods: {
        async getData() {
            let res = await fetch('./getData', {}, 'POST');
            this.dataArr = res.data
        },
        async setData() {
            let data = {
                name: this.name,
                price: this.price,
                stock: this.stock,
                unit: 'rmb'
            }
            let res = await fetch('./setData', data, 'POST');
            if (res.data === 'ok') {
                this.getData()
            }
        },
        async delData(row) {
            let res = await fetch(`./delData`, { id: row._id }, 'POST');
            if (res.data === 'ok') {
                this.getData()
            }
        },
        async modData(row, flag) {
            let data = {
                id: row._id,
                name: this.name,
                price: this.price,
                stock: this.stock,
                unit: 'rmb'
            }
            let res = await fetch('./modData', data, 'POST');
            if (res.data === 'ok') {
                this.getData()
            }
        },
    }
})


