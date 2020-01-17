<template>
    <Card>
        <Form :label-width="100" :model="formData" :rules="ruleCustom">
            <FormItem label="选择语言：">
                <LanguageSelector @on-change="langChangeHandle" style="width:300px" :disabled="isEdit" :lang="formData.lang"></LanguageSelector>
            </FormItem>
            <FormItem label="问题分类：">
                <Select v-model="formData.type" style="width:300px">
                    <Option v-for="item in category" :value="item.id" :key="item.id">{{ item.value }}</Option>
                </Select>
            </FormItem>
            <FormItem label="问题优先级：" prop="order">
                <Input v-model="formData.order" placeholder="Enter something..." style="width:300px" @on-keyup="()=> {formData.order=formData.order.replace(/[^\d]/g,'');}"></Input>
            </FormItem>
        </Form>
        <Form>
            <FormItem label="标题：">
                <Input v-model="formData.title" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem label="内容：" style="margin-bottom:0;"></FormItem>
            <Editor
                ref="editor"
                :content="formData.content"
                :path="path"
                v-model="result"></Editor>
        </Form>
        <div class="buttonGroup">
            <Button type="primary" size="large" @click="submitHandle">提交</Button>
            <Button size="large" @click="resetHandle">重置</Button>
        </div>
    </Card>
</template>

<script>
import { getCategory } from "@/api/category/category.js"
import { uploadImage, submitquestion, requestQuestionDetail } from "@/api/question/questionEdit.js"
import Editor from '_c/editor'
import LanguageSelector from "@/view/components/language-selector/language-selector.vue"
// import Editor from 'tt-vue-editor'
export default {
    name: 'questionEdit',
    components: {
        Editor,
        LanguageSelector
    },
    data () {
        const orderValidate = (rule, value, callback) => {
            if (this.formData.order<=0) {
                callback(new Error('优先级应为大于0的正整数！'));
            } else {
                callback();
            }
        }
        return {
            isEdit: false,
            category:  [],
            formData: {
                lang: 'zh',
                type: '',
                title: '',
                order: ''
            },
            ruleCustom: {
                order: [
                    { validator: orderValidate, trigger: 'blur'}
                ]
            },
            result: '',
            path: '/api/back/upload/image'
        }
    },
    methods: {
        requestCategory () {
            console.log(this.formData.lang);
            getCategory('question', this.formData.lang).then(res =>{
                if (res.data.count >0) {
                    this.category = res.data.rows;
                    this.formData.type = this.formData.type || res.data.rows[0].id
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
                // console.log(this.category)
            })
        },
        resetHandle () {
            this.formData = {
                type: this.category[0].id,
                title: '',
                order: '',
                lang: 'zh'
            }
            this.$refs.editor.reset()
        },
        submitHandle () {
            let content = this.result || this.formData.content;
            let formData = JSON.parse(JSON.stringify(this.formData));
            formData.content = content
            submitquestion(formData, this.$route.params.id).then(res => {
                if (res) {
                    if (this.$route.params.id) {
                        this.$Message.success('编辑问题成功！')
                        this.$store.commit('closeTag',this.$route)
                        this.$router.push({
                            name: 'question-list'
                        })
                    } else {
                        this.$Message.success('新建问题成功！')
                        this.resetHandle()
                    }
                }
            })
        },
        langChangeHandle (value) {
            this.formData.lang = value
            this.requestCategory()
        }
    },
    mounted () {
        let questionID = this.$route.params.id
        if (questionID) {
            this.isEdit = true
            requestQuestionDetail(questionID).then(res => {
                if (res) {
                    this.formData = res.data
                    this.requestCategory()
                }
            })
        } else {
            this.requestCategory()
        }
    }
}
</script>

<style lang="less" scoped>
.languageCard:not(:last-child) {
    margin-bottom: 24px;
}
.buttonGroup{
    margin-top: 24px;
    text-align: center;
    .ivu-btn:not(:last-child){
        margin-right: 20px;
    }
}
</style>
