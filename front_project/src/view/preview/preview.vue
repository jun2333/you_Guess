<template>
    <Modal class="preview" v-model.sync="thisVisible" fullscreen footer-hide :closable="false">
        <div slot="header">
            <span>问题详情预览</span>
            <div class="closeBtn" @click="onCloseHandle">
                <Icon type="ios-close" />
            </div>
        </div>
        <div class="header">
            <div class="headerContent">
                <img :src="logo">
                <Dropdown class="language">
                    <a href="javascript:void(0)">
                        {{isEnglish? 'English': '中文'}}
                        <Icon type="ios-arrow-down" size="24" color="#b7b7b7"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem @click.native="dropdownClick">{{isEnglish? '中文' : 'English'}}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
        <div class="banner">
            <div class="bannerContent">
                <div class="title">{{isEnglish? 'Help Center' : '帮助中心'}}</div>
                <div class="text">{{isEnglish? 'Videos and other resources are included as below to help you use Gwell products.' : '我们通过视频和其他资源帮助您顺利使用技威产品。'}}</div>
                <div class="searchBox">{{isEnglish? 'Search' : '有问题搜一下'}}<img :src="search"></div>
                <div class="menu">
                    <div :class="{'menuItem':true, 'itemAcitve':isQuestion}">{{isEnglish? 'FAQs' : '常见问题解答'}}</div>
                    <div :class="{'menuItem':true, 'itemAcitve':!isQuestion}">{{isEnglish? 'Download Center' : '下载中心'}}</div>
                    <div class="menuItem">{{isEnglish? 'Operation Video' : '操作视频'}}</div>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="mainContent" v-if="isQuestion">
                <div class="path">{{isEnglish? 'Help Center > FAQs > ' : '帮助中心 > 常见问题解答 > '}}{{isEnglish? encateName : cateName}}</div>
                <div class="line"></div>
                <div class="title">{{isEnglish? formData.entitle : formData.title}}</div>
                <div class="line"></div>
                <div class="article" v-html="isEnglish? formData.encontent : formData.content"></div>
                <div class="line"></div>
            </div>
            <div class="mainContent" v-else>
                <div class="path">{{isEnglish? 'Help Center > Download Center > ' : '帮助中心 > 下载中心 > '}}{{isEnglish? encateName : cateName}}</div>
                <div class="line"></div>
                <div class="fileDetail">
                    <div class="detailLine detailHead">
                        <div class="lineLabel">软件名</div>
                        <div class="lineText">{{isEnglish? formData.enname : formData.name}}</div>
                    </div>
                    <div class="detailLine">
                        <div class="lineLabel">版本</div>
                        <div class="lineText">{{formData.version}}</div>
                    </div>
                    <div class="detailLine">
                        <div class="lineLabel">大小</div>
                        <div class="lineText">{{formData.size}}</div>
                    </div>
                    <div class="detailLine">
                        <div class="lineLabel">发布时间</div>
                        <div class="lineText">{{formData.pubdate}}</div>
                    </div>
                    <div class="detailLine">
                        <div class="lineLabel">描述</div>
                        <div class="lineText" v-html="isEnglish? formData.enmsg : formData.msg"></div>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
</template>

<script>
// import { getCategory } from "@/api/category/category.js"
// import { questionColumns } from "@/columns/questionList.js"
// import { getQuestionList, changeStatus, deleteQuestion, editOrder } from "@/api/question/questionList.js"
import logo from "@/assets/images/logo.png"
import search from "@/assets/images/searchApp.png"
import { requestQuestionDetail } from "@/api/question/questionEdit.js"
import { requestFileDetail } from "@/api/file/fileEdit.js"

export default {
    name: 'previewModal',
    props: {
        visible: Boolean
    },
    data () {
        //   console.log(downloadColumns)
        return {
            logo,
            search,
            thisVisible: this.visible,
            isEnglish: false,
            formData: {},
            cateName: '',
            encateName: '',
            isQuestion: true
        }
    },
    methods: {
        init (id,cateName,encateName,type) {
            console.log(cateName)
            this.isEnglish = false
            this.cateName = cateName
            this.encateName = encateName
            this.isQuestion = type === 'question'
            if (this.isQuestion) {
                requestQuestionDetail(id).then(res => {
                    if (res) {
                        this.formData = res.data
                    }
                })
            } else {
                requestFileDetail(id).then(res => {
                    if (res) {
                        this.formData = res.data
                    }
                })
            }
        },
        onCloseHandle () {
            this.$emit('on-close', false)
        },
        dropdownClick () {
            console.log(12)
            this.isEnglish=!this.isEnglish
        }
    },
    watch: {
        visible (val) {
            this.thisVisible = val
        },
    },
    mounted () {

    }
}
</script>

<style lang="less">
.preview{
    .closeBtn{
        position: absolute;
        right: 2px;
        top: 2px;
        z-index: 99;
        cursor: pointer;
        font-size: 31px;
        color: #999;
        -webkit-transition: color 0.2s ease;
        transition: color 0.2s ease;
        &:hover{
            color: #444;
        }
    }
    .ivu-modal-body{
        padding: 0;
        top: 41px;
        display: flex;
        flex-direction: column;
        // justify-content: center;
        align-items: center;
    }
    .header{
        width: 100%;
        height: 80px;
        display: flex;
        z-index: 99;
        // flex-direction: column;
        justify-content: center;
        flex-shrink: 0;
        // align-items: center;
        box-shadow: 0px 8px 15px 0px rgba(0, 0, 0, 0.1);
        .headerContent{
            width: 1115px;
            height: 80px;
            padding: 0 85px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            // margin: 0 auto;
            .language{
                font-size: 16px;
                a{
                color: #999;
                    &:visited, &:active{
                        color: #008cd6;
                    }
                    &:hover{
                        color: #008cd6;
                    }
                }
                .ivu-select-dropdown{
                    border-radius: 0;
                    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                    .ivu-dropdown-menu{
                        li{
                            font-size: 16px !important;
                        }
                    }
                }
            }
        }
    }
    .banner{
        width: 100%;
        height: 380px;
        background: url('../../assets/images/banner.png') no-repeat center;
        border-bottom: 1px solid #e0e0e0;
        background-size: cover;
        display: flex;
        justify-content: center;
        flex-shrink: 0;
        .bannerContent{
            width: 1115px;
            height: 380px;
            padding: 0 85px;
            position: relative;
            .title{
                margin-top: 93px;
                padding-bottom: 13px;
                width: 310px;
                font-size: 24px;
                line-height: 100%;
                color: #008cd6;
            }
            .text{
                width: 310px;
                padding-bottom: 25px;
                font-size: 15px;
                line-height: 25px;
                color: #333333;
            }
            .searchBox{
                background: #008cd6;
                padding-left: 32px;
                width: 310px;
                height: 40px;
                border-radius: 20px;
                line-height: 40px;
                font-size: 14px;
                color: rgba(255, 255, 255, 0.8);
                position: relative;
                img{
                    // padding-right: 14px;
                    position: absolute;
                    width: 17px;
                    right: 14px;
                    top: 50%;
                    margin-top: -8px;
                }
            }
            .menu{
                position: absolute;
                bottom: 0;
                height: 40px;
                .menuItem{
                    width: 150px;
                    height: 40px;
                    font-size: 14px;
                    line-height: 40px;
                    text-align: center;
                    color: #b2b2b2;
                    background-color: #fafcfd;
                    border: 1px solid #e0e0e0;
                    border-radius: 14px 14px 0 0;
                    float: left;
                    margin-right: 6px;
                }
                .itemAcitve{
                    color:#008cd6;
                    background: #fff;
                    border-bottom: 1px solid #fff;
                }
            }
        }
    }
    .main{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
        // justify-content: center;
        .mainContent{
            width: 1115px;
            padding: 0 85px;
            .path{
                font-size: 14px;
                position: relative;
                padding: 20px;

                &::before{
                    content: ' ';
                    width: 4px;
                    height: 19px;
                    background: #008cd6;
                    position: absolute;
                    top: 20px;
                    left: 0;
                }
            }
            .line{
                height: 1px;
                background: linear-gradient(to right, #fff,#e0e0e0 , #fff);
            }
            .title{
                padding: 30px 0;
                text-align: left;
                font-size: 20px;
                color: #333333;
                font-family: "SimHei";
            }
            .article{
                padding: 30px 0 50px 0;
                width: 1030px;
                font-family: "SimHei";
                font-size: 14px;
                line-height: 1.75em;
                text-align: left;
            }
            .fileDetail{
                font-size: 14px;
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-top: 30px;
                // margin: 30px 80px;
                // justify-content: center;
                .detailLine{
                    width: 790px;
                    height: 60px;
                    padding: 20px 0;
                    .lineLabel{
                        display: inline-block;
                        width: 160px;
                    }
                    .lineText{
                        display: inline-block;
                    }
                }
                .detailHead{
                    border-bottom: solid 1px #efefef;
                }
            }
        }
    }
}
</style>
