<template>
    <Card>
        <div class="operateBar">
            <LanguageSelector @on-change="langChangeHandle" style="width:200px;margin-right:10px"></LanguageSelector>
            <Select v-model="select.model" style="width:150px" @on-change="cateChangeHandle">
                <Option v-for="item in select.options" :value="item.id" :key="item.id">{{ item.value }}</Option>
            </Select>
        </div>
        <Table border :columns="downloadColumns" :data="downloadData"></Table>
        <Page :current.sync="page.page" :total="page.total" show-total show-sizer show-elevator class-name="page" @on-change="pageChangeHandle" @on-page-size-change="pageSizeChangeHandle"/>
        <Modal v-model="checkOpModal.visible" width="360" :mask-closable="false">
            <p slot="header" style="color:#f60;text-align:left">
                <span>下架文件</span>
            </p>
            <Input v-model="checkOpModal.checkInput" placeholder="下架前输入文件名称，防止误操作">
                <span slot="prepend">文件名称:</span>
            </Input>
            <div style="margin-top: 10px;font-size: 14px;">下架后，套餐将不出现在帮助中心页面！</div>
            <div slot="footer">
                <Button size="large" @click="checkOpModal.visible=false">取消</Button>
                <Button type="primary" size="large" @click="checkHandle">确定</Button>
            </div>
        </Modal>
        <Modal
            v-model="order.visible"
            title="修改优先级"
            width="400"
            @on-ok="changeOrderHandle">
            <Input v-model="order.value" @on-keyup="()=> {order.value=order.value.replace(/[^\d]/g,'');}"></Input>
        </Modal>
        <Preview ref="previewModal" :visible.sync="preview.visible" @on-close="previewCloseHandle"></Preview>
    </Card>
</template>

<script>
import { getCategory } from "@/api/category/category.js"
import { downloadColumns } from "@/columns/fileList.js"
import { getFileList, changeStatus, deleteFile, editOrder } from "@/api/file/fileList.js"
import Preview from "../preview/preview.vue"
import LanguageSelector from "@/view/components/language-selector/language-selector.vue"
export default {
    name: 'fileList',
    components: {
        Preview,
        LanguageSelector
    },
    data () {
        return {
            lang: 'zh',
            downloadColumns: downloadColumns(this),
            downloadData: [],
            select: {
                model: '',
                options: []
            },
            page: {
                page: 1,
                limit: 10,
                total: 0
            },
            checkOpModal: {
                visible: false,
                checkInput: '',
                checkStr: ''
            },
            preview: {
                visible: false,
                content: {},
                category: ''
            },
            order: {
                visible: false,
                value: '',
                id: ''
            },
        }
    },
    methods: {
        requestList () {
            getFileList(this.select.model, this.page.page, this.page.limit).then(res => {
                if (res) {
                    this.downloadData = res.data.rows;
                    this.page.total = res.data.count;
                }
            })
        },
        editOrder (params) {
            this.order.visible = true
            this.order.value = params.row.order
            this.order.id = params.row.id
        },
        changeOrderHandle () {
            // console.log(this.order)
            editOrder(this.order.id, this.order.value).then(res => {
                if (res) {
                    this.requestList()
                }
            })
        },
        cateChangeHandle (id) {
            for (let i in this.select.options) {
                if (this.select.options[i].id === id) {
                    var item = this.select.options[i]
                }
            }
            console.log(item)
            this.select.item = item
            this.page.page = 1
            this.requestList()
        },
        requestCategory () {
            getCategory('downloads').then(res =>{
                if (res) {
                    this.select.options = res.data
                    this.select.model = res.data[0].id
                }
                // console.log(this.select.model)
            })
        },
        pageChangeHandle (currentPage) {
            this.page.page = currentPage
            this.requestList()
        },
        pageSizeChangeHandle (pageSize) {
            this.page.limit = pageSize
            this.requestList()
        },
        statusChangHandle (params) {
            let content = params.row.status === 1 ? '确认下架该文件？' : '确认上架该文件？'
            this.$Modal.confirm({
                title: '提示',
                content,
                onOk: () => {
                    changeStatus(params.row.id, params.row.status).then(res => {
                        if (res) {
                            this.requestList()
                        }
                        // console.log(res)
                    })
                },
            });
        },
        editFile(params) {
            if (params.row.status !== 1) {
                this.$router.replace({
                    name: 'file-edit',
                    params: {
                        id: params.row.id
                    }
                })
            } else {
                this.$Message.error('请先下架该文件！')
            }
        },
        deleteFile (params) {
            this.checkOpModal.visible = true;
            this.checkOpModal.checkStr = params.row.name;
            this.checkOpModal.checkInput = '';
            this.checkOpModal.id = params.row.id
        },
        detailQuestion (params) {
            console.log(params)
            this.preview.visible = true
            this.$refs.previewModal.init(params.row.id,this.select.item.value,this.select.item.envalue,'file')
        },
        checkHandle () {
            this.checkOpModal.visible = false
            console.log(this.checkOpModal.checkStr, this.checkOpModal.checkInput)
            if (this.checkOpModal.checkStr.trim() === this.checkOpModal.checkInput.trim()) {
                deleteFile(this.checkOpModal.id).then(res => {
                // console.log(res)
                    if (res) {
                        this.requestList()
                    }
                })
            } else {
                this.$Message.error('输入名称与实际不符！')
            }

        },
        previewCloseHandle (val) {
            this.preview.visible = val;
        },
        getCategory () {
            getCategory('downloads', this.lang).then(res =>{
                if (res.data.count > 0) {
                    this.select.options = res.data.rows
                    this.select.model = res.data.rows[0].id
                    this.select.item = res.data.rows[0]
                    this.requestList()
                } else {
                    this.$Modal.confirm({
                        title: '提示',
                        content: '<p>当前语言下暂无分类，请先创建分类！</p>',
                        onOk: () => {
                            this.$router.push({
                                name: 'category'
                            })
                        }
                    });
                }
            })
        },
        langChangeHandle (value) {
            this.lang = value
            this.getCategory()
        }
    },
    mounted () {
        let p = new Promise((resolve, reject) => {
            getCategory('downloads', this.lang).then(res =>{
                if (res.data.count > 0) {
                    this.select.options = res.data.rows;
                    this.select.model = res.data.rows[0].id;
                    this.select.item = res.data.rows[0];
                    resolve()
                } else {
                    this.$Modal.confirm({
                        title: '提示',
                        content: '<p>当前语言下暂无分类，请先创建分类！</p>',
                        onOk: () => {
                            this.$router.push({
                                name: 'category'
                            })
                        }
                    });
                }
            })
        })
        p.then(_ => {
            this.requestList()
        }).catch()
    }
}
</script>

<style lang="less" scoped>
.page{
    margin-top: 15px;
    display: flex;
    justify-content: flex-end;
}
.operateBar{
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
}
</style>
