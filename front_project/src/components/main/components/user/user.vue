<template>
    <div class="user-avator-dropdown">
        <Dropdown @on-click="handleClick">
            <Badge :dot="!!messageUnreadCount">
                <Avatar :src="avatar"/>
                {{userName}}
            </Badge>
            <Icon :size="18" type="md-arrow-dropdown"></Icon>
            <DropdownMenu slot="list">
                <!-- <DropdownItem name="message">
                消息中心<Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
                </DropdownItem> -->
                <DropdownItem name="modify">修改密码</DropdownItem>
                <DropdownItem name="logout">退出登录</DropdownItem>
            </DropdownMenu>
        </Dropdown>

        <Modal v-model="modifyModal.visible" width="360" :mask-closable="false">
            <p slot="header">
                <span>修改密码</span>
            </p>
            <Form ref="changePwdForm" :label-width="100" :model="modifyModal" :rules="ruleValidate">
                <FormItem label="旧密码：" prop="oldPwd">
                    <Input v-model="modifyModal.oldPwd" type="password"></Input>
                </FormItem>
                <FormItem label="新密码：" prop="newPwd">
                    <Input v-model="modifyModal.newPwd" type="password" @on-keyup="pwdLevelCheckHandle"></Input>
                </FormItem>
                <FormItem label="确认新密码：" prop="againNewPwd">
                    <Input v-model="modifyModal.againNewPwd" type="password"></Input>
                </FormItem>
                <FormItem label="密码强度：" style="margin-bottom:0" prop="level">
                    <div class="pwdBoxContent">
                        <div :class="{'pwdBox':true, 'week':modifyModal.pwdLevel===1, 'middle':modifyModal.pwdLevel===2, 'strong':modifyModal.pwdLevel===3}">弱</div>
                        <div :class="{'pwdBox':true, 'middle':modifyModal.pwdLevel===2, 'strong':modifyModal.pwdLevel===3}">中</div>
                        <div :class="{'pwdBox':true, 'strong':modifyModal.pwdLevel===3}">强</div>
                    </div>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button size="large" @click="modifyModal.visible=false">取消</Button>
                <Button type="primary" size="large" @click="changePwdHandle">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import './user.less'
import { mapActions } from 'vuex'
import avatar from '@/assets/images/avator.png'
import { modifyPwd } from "@/api/user.js"
export default {
    name: 'User',
    props: {
        messageUnreadCount: {
            type: Number,
            default: 0
        }
    },
    data () {
        const validatePwd = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入新密码'))
            } else {
                if (this.modifyModal.newPwd !== value) {
                    // 对第二个密码框单独验证
                    callback(new Error('两次输入的密码不一致'))
                }
                callback()
            }
        }
        const validateNewPwd = (rule, value, callback) => {
            if (value.length < 6) {
                // 对第二个密码框单独验证
                callback(new Error('密码长度应不小于六位'))
            }
            callback()
        }
        const validateLevel = (rule, value, callback) => {
            if (this.modifyModal.pwdLevel < 2) {
                // 对第二个密码框单独验证
                callback(new Error('密码强度不足'))
            }
            callback()
        }
        return {
            userName: '',
            avatar,
            modifyModal: {
                visible: false,
                pwdLevel: 0,
                oldPwd: '',
                newPwd: '',
                againNewPwd: ''
            },
            ruleValidate: {
                oldPwd: [
                    { required: true, message: '旧密码不可为空', trigger: 'blur' }
                ],
                newPwd: [
                    { required: true, message: '新密码不可为空', trigger: 'blur' },
                    { validator: validateNewPwd, trigger: 'blur' }
                ],
                againNewPwd: [
                    { required: true, message: '请再次输入新密码', trigger: 'blur' },
                    { validator: validatePwd, trigger: 'blur' }
                ],
                level: [
                    { validator: validateLevel, trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        ...mapActions([
            'handleLogOut'
        ]),
        logout () {
            this.handleLogOut().then(() => {
                this.$router.push({
                    name: 'login'
                })
            })
        },
        message () {
            this.$router.push({
                name: 'message_page'
            })
        },
        modify () {
            this.modifyModal.visible = true
        },
        handleClick (name) {
            switch (name) {
                case 'logout': this.logout()
                    break
                case 'message': this.message()
                    break
                case 'modify': this.modify()
                    break
            }
        },
        changePwdHandle () {
            this.$refs.changePwdForm.validate((valid) => {
                if (valid) {
                    let data = {
                        name: this.userName,
                        oldpwd: this.modifyModal.oldPwd,
						newpwd: this.modifyModal.newPwd,
                    }
                    modifyPwd(data).then(res => {
                        if (res) {
                            this.modifyModal.visible = false
                            this.$refs.changePwdForm.resetFields()
                            this.$Message.success('修改密码成功！')
                        }
                    })
                }
            })
        },
        pwdLevelCheckHandle () {
            var pwd = this.modifyModal.newPwd
            if (pwd.length > 0) {
                this.modifyModal.pwdLevel = this.getPswLevel(pwd)
            } else {
                this.modifyModal.pwdLevel = 0
            }
            console.log(this.modifyModal.pwdLevel)
        },
        getPswLevel (txt) {
            // 默认级别是0
            var level = 0
            // 判断这个字符串中有没有数字
            if (/[0-9]/.test(txt)) {
                level++
            }
            // 判断字符串中有没有字母
            if (/[a-zA-Z]/.test(txt)) {
                level++
            }
            // 判断字符串中有没有特殊符号
            if (/[^0-9a-zA-Z_]/.test(txt)) {
                level++
            }
            return level
        }
    },
    mounted () {
        this.userName = this.$store.state.user.token
    }
}
</script>

<style lang="less">
.pwdBoxContent{
    display: flex;
    align-items: center;
    justify-content: center;
    .pwdBox{
        height: 32px;
        width: 68px;
        border: solid 1px #dcdee2;
        text-align: center;
        &:not(:last-child){
            margin-right: 10px;
        }
    }
    .week{
        background: #ed4014;
        color: #fff;
        border: none;
    }
    .middle{
        background: #ff9900;
        color: #fff;
        border: none;
    }
    .strong{
        background: #19be6b;
        color: #fff;
        border: none;
    }
}

</style>
