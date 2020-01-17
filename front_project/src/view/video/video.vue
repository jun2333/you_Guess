<template>
    <Card>
        <div class="operateBar">
            <LanguageSelector @on-change="langChangeHandle" style="width:300px"></LanguageSelector>
            <!-- <Select v-model="select.model" style="width:150px" @on-change="requestList ()">
                <Option v-for="item in select.options" :value="item.id" :key="item.id">{{ item.value }}</Option>
            </Select> -->
            <Button type="primary" @click="newVideoHandle">新建视频</Button>
        </div>
        <Table  border :columns="videoColumns" :data="questionData"></Table>
        <Page :current.sync="page.page" :total="page.total" show-total show-sizer show-elevator class-name="page" @on-change="pageChangeHandle" @on-page-size-change="pageSizeChangeHandle"/>
        <Modal
            v-model="order.visible"
            title="修改优先级"
            width="400"
            @on-ok="changeOrderHandle">
            <Input v-model="order.value" @on-keyup="()=> {order.value=order.value.replace(/[^\d]/g,'');}"></Input>
        </Modal>
        <Modal v-model="checkOpModal.visible" width="360" :mask-closable="false">
            <p slot="header" style="color:#f60;text-align:left">
                <span>删除视频</span>
            </p>
            <Input v-model="checkOpModal.checkInput" placeholder="删除前输入视频标题，防止误操作">
                <span slot="prepend">视频标题:</span>
            </Input>
            <div style="margin-top: 10px;font-size: 14px;">下架后，视频将不出现在帮助中心页面！</div>
            <div slot="footer">
                <Button size="large" @click="checkOpModal.visible=false">取消</Button>
                <Button type="primary" size="large" @click="checkHandle">确定</Button>
            </div>
        </Modal>
        <Modal v-model="editVideoModal.visible" width="560" :mask-closable="false">
            <p slot="header">
                <span>{{editVideoModal.isEdit ? '编辑' : '新建视频'}}</span>
            </p>
            <Form ref="editVideo" :model="editVideoModal.formData" :label-width="100" :rules="ruleCustom">
                <FormItem prop="lang" label="选择语言：" v-if="!editVideoModal.isEdit">
                    <LanguageSelector @on-change="editVideoLangChangeHandle"></LanguageSelector>
                </FormItem>
                <FormItem prop="title" label="标题：">
                    <Input type="text" v-model="editVideoModal.formData.name" placeholder="视频中文标题"></Input>
                </FormItem>
                <!-- <FormItem prop="entitle" label="英文标题：">
                    <Input type="text" v-model="editVideoModal.formData.enname" placeholder="视频英文标题"></Input>
                </FormItem> -->
                <FormItem prop="url" label="链接：">
                    <Input type="text" v-model="editVideoModal.formData.url" placeholder="中文版视频链接"></Input>
                </FormItem>
                <!-- <FormItem prop="enurl" label="英文版链接：">
                    <Input type="text" v-model="editVideoModal.formData.enurl" placeholder="英文版视频链接"></Input>
                </FormItem> -->
                <FormItem prop="order" label="优先级：">
                    <Input type="text" v-model="editVideoModal.formData.order" placeholder="视频优先级" @on-keyup="()=> {editVideoModal.formData.order=editVideoModal.formData.order.replace(/[^\d]/g,'');}"></Input>
                </FormItem>
                <FormItem prop="des" label="备注：">
                    <Input type="textarea" v-model="editVideoModal.formData.des"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button size="large" @click="editVideoModal.visible=false">取消</Button>
                <Button type="primary" size="large" @click="submitVideoHandle">提交</Button>
            </div>
        </Modal>
    </Card>
</template>

<script>
// import { getCategory } from "@/api/category/category.js"
import { videoColumns } from "@/columns/video.js"
import { deleteQuestion } from "@/api/question/questionList.js"
import { submitVideo, getVideoList, getVideoDetail, changeStatus, editOrder } from "@/api/video/video.js"
import LanguageSelector from "@/view/components/language-selector/language-selector.vue"
export default {
    name: 'fileList',
    components: {
        LanguageSelector
    },
    data () {
        const orderValidate = (rule, value, callback) => {
            if (this.editVideoModal.formData.order<=0) {
                callback(new Error('优先级应为大于0的正整数！'));
            } else {
                callback();
            }
        }
        //   console.log(downloadColumns)
        return {
            lang: 'zh',
            videoColumns: videoColumns(this),
            questionData: [],
            select: {
                model: '',
                options: []
            },
            page: {
                page: 1,
                limit: 10,
                total: 0
            },
            order: {
                visible: false,
                value: '',
                id: ''
            },
            checkOpModal: {
                visible: false,
                checkInput: '',
                checkStr: ''
            },
            editVideoModal: {
                visible: false,
                isEdit: false,
                formData: {
                    lang: 'zh',
                    name: '',
                    // enname: '',
                    url: '',
                    // enurl: '',
                    order: '',
                    des: ''
                }
            },
            ruleCustom: {
                order: [
                    { validator: orderValidate, trigger: 'blur'}
                ]
            },
        }
    },
    methods: {
        requestList () {
            getVideoList(this.lang, this.page.page, this.page.limit).then(res => {
                if (res) {
                    this.questionData = res.data.data
                    this.page.total = res.data.total
                }
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
            let content = params.row.status === 1 ? '确认下架该问题？' : '确认上架该问题？'
            this.$Modal.confirm({
                title: '提示',
                content,
                onOk: () => {
                    changeStatus(params.row.id, params.row.status).then(res => {
                        if (res) {
                            this.requestList()
                            this.$Message.success(params.row.status === 1 ? '下架问题成功！' : '上架问题成功！')
                        }
                    })
                },
            })
        },
        checkHandle () {
            this.checkOpModal.visible = false
            console.log(this.checkOpModal.checkStr, this.checkOpModal.checkInput)
            if (this.checkOpModal.checkStr.trim() === this.checkOpModal.checkInput.trim()) {
                deleteQuestion(this.checkOpModal.id).then(res => {
                // console.log(res)
                    if (res) {
                        this.requestList()
                    }
                })
            } else {
                this.$Message.error('输入名称与实际不符！')
            }

        },
        newVideoHandle () {
            this.editVideoModal.formData = {
                lang: 'zh',
                name: '',
                // enname: '',
                url: '',
                // enurl: '',
                order: '',
                des: ''
            }
            this.editVideoModal.isEdit = false
            this.editVideoModal.visible=true
        },
        editVideo (params) {
            if (params.row.status !== 1) {
                this.editVideoModal.isEdit = true
                getVideoDetail(params.row.id).then(res => {
                    if (res) {
                        this.editVideoModal.formData = res.data
                        this.editVideoModal.visible = true
                    }
                })
            } else {
                this.$Message.error('请先下架该问题！')
            }
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
        submitVideoHandle () {
            submitVideo(this.editVideoModal.formData, this.editVideoModal.isEdit).then(res => {
                if (res) {
                    this.$Message.success('提交视频信息成功！')
                    this.editVideoModal.visible = false
                    this.requestList()
                    this.editVideoModal.isEdit = false
                    // console.log(res)
                }
            })
        },
        detailQuestion (params) {
            window.open(params.row.url)
        },
        langChangeHandle (value) {
            this.lang = value
            this.requestList()
        },
        editVideoLangChangeHandle (value) {
            this.editVideoModal.formData.lang = value
        }
    },
    mounted () {
        // let vm = this
        // let p = new Promise((resolve, reject) => {
        //     getCategory('question').then(res =>{
        //         if (res) {
        //             this.select.options = res.data
        //             this.select.model = res.data[0].id
        //             resolve()
        //         }
        //     })
        // })
        // p.then(_ => {
        this.requestList()
        // }).catch()
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
    justify-content: space-between;
    margin-bottom: 10px;
}
</style>
