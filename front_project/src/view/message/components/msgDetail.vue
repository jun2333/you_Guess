<style lang="less" scoped>
.ivu-row {
  margin-bottom: 15px;
}
</style>

<template>
  <div>
    <Modal v-model="show" title="详细信息" @on-visible-change="showStateChange">
      <Row>
        <iCol span="12">用户ID：{{info.userId}}</iCol>
        <iCol span="12">创建时间：{{info.time}}</iCol>
      </Row>
      <Row>
        <iCol span="12">联系方式：{{info.mobile}}</iCol>
        <iCol span="12">名称：{{info.name}}</iCol>
      </Row>
      <Row>
        <iCol span="12">邮箱：{{info.email}}</iCol>
        <iCol span="12">类型：{{info.typeName}}</iCol>
      </Row>
      <Row>
        <iCol span="12">APP版本：{{info.appVersion}}</iCol>
        <iCol span="12">手机型号：{{info.phoneType==='1'?'未知':(info.phoneType==='2'?'iOS':'android')}}</iCol>
      </Row>
      <Row>
        <iCol span="12">状态：{{info.dealStatus==='0'?'未处理':(info.dealStatus==='1'?'已回复':'已解决')}}</iCol>
        <iCol span="12">附件：<a v-if="info.url" :href="info.url" target="view_window">反馈附件</a></iCol>
      </Row>
      <Row>
        <iCol span="24">反馈信息：{{info.content}}</iCol>
      </Row>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
const questionTypeMap = {
  "1": "连接问题",
  "2": "录像问题",
  "3": "离线问题",
  "4": "配网问题",
  "5": "云服务问题",
  "9": "其他问题"
};
export default {
  props: {
    mShow: Boolean,
    data: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    mShow(newV) {
      if (newV) {
        this.info = { ...this.data };
        this.info.typeName = questionTypeMap[this.info.type];
      }
      this.show = newV;
    }
  },
  data() {
    return {
      show: false,
      info: {
        id: "",
        time: "",
        mobile: "",
        name: "",
        email: "",
        typeName: "",
        appVersion: "",
        phoneType: "",
        dealStatus: "",
        des: "",
        content: ""
      }
    };
  },
  methods: {
    showStateChange(val) {
      this.$emit("detaiShowChange", val);
    }
  }
};
</script>

<style>
</style>