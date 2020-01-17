<style lang="less" scoped>
.page {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}
</style>
<template>
  <div>
    <Card :dis-hover="true">
      <Form ref="search-form" inline>
        <FormItem>
          <Input type="text" v-model="formData.keyword" placeholder="请输入关键字">
            <Select slot="prepend" v-model="formData.keywordType" style="width:80px">
              <Option value="1">用户ID</Option>
              <Option value="3">手机号</Option>
              <Option value="4">邮箱</Option>
              <Option value="5">反馈内容</Option>
            </Select>
          </Input>
        </FormItem>
        <FormItem label="时间范围" :label-width="80">
          <DatePicker
            type="daterange"
            v-model="timeRange"
            placeholder="查询时间范围"
            @on-change="dateRangeChange"
          ></DatePicker>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="queryMessageList">搜索</Button>
          <Button style="margin-left: 8px" @click="reset">清空</Button>
        </FormItem>
      </Form>
      <Table border :columns="messageColumns" :data="messageData"></Table>
      <Page
        :current.sync="page.page"
        :total="page.total"
        show-total
        show-sizer
        show-elevator
        class-name="page"
        @on-change="pageChangeHandle"
        @on-page-size-change="pageSizeChangeHandle"
      />
    </Card>
    <detail :mShow="detailShow" :data="detailData" @detaiShowChange="detailShowChange"></detail>
    <reply :mShow="replyShow" :id="replyId" :replyFn="replyFn" @replyShowChange="replyShowChange"></reply>
  </div>
</template>

<script>
import { getMessageList, modDealStatus, addReply } from "@/api/message/message";
import { messageColumns } from "@/columns/message.js";
import { formatDate } from "@/libs/tools";
import detail from "./components/msgDetail";
import reply from "./components/msgReply";
export default {
  data() {
    return {
      messageColumns: messageColumns(this),
      messageData: [],
      timeRange: [],
      page: {
        page: 1,
        total: 0
      },
      formData: {
        keywordType: "1",
        keyword: "",
        startTime: null,
        endTime: null,
        page: 1,
        size: 10
      },
      detailShow: false,
      detailData: {},
      replyShow: false,
      replyId: ""
    };
  },
  components: {
    detail,
    reply
  },
  created() {
    this.queryMessageList();
  },
  methods: {
    queryMessageList() {
      getMessageList(this.formData).then(res => {
        if (res.code === 0) {
          this.messageData = res.data.list.map(v => {
            v.time = formatDate(v.createTime, "year");
            return v;
          });
          this.page.total = res.data.total;
        }
      });
    },
    reset() {
      this.timeRange = [];
      this.formData.keywordType = "1";
      this.formData.keyword = "";
      this.formData.startTime = null;
      this.formData.endTime = null;
      this.queryMessageList();
    },
    dateRangeChange(timeRange) {
      console.log(this.timeRange);
      [this.formData.startTime, this.formData.endTime] = [
        new Date(`${timeRange[0]} 00:00:00`).getTime(),
        new Date(`${timeRange[1]} 23:59:59`).getTime()
      ];
    },
    messageDetail(params) {
      this.detailData = params;
      this.detailShow = true;
    },
    detailShowChange(val) {
      this.detailShow = val;
    },
    messageHandler(params) {
      console.log(params);
      let vm = this;
      this.$Modal.confirm({
        title: "提示",
        content: "确认已解决？",
        loading: true,
        onOk() {
          modDealStatus(params.id).then(res => {
            vm.$Modal.remove();
            vm.queryMessageList();
          });
        },
        onCancel() {}
      });
    },
    messageReply(params) {
      this.replyId = params.id;
      this.replyShow = true;
    },
    replyShowChange(val) {
      this.replyShow = val;
    },
    async replyFn(data) {
      let res = await addReply(data);
      this.queryMessageList();
      return res;
    },
    pageChangeHandle(page) {
      this.formData.page = page;
      this.queryMessageList();
    },
    pageSizeChangeHandle(size) {
      this.formData.size = size;
      this.queryMessageList();
    }
  }
};
</script>

<style>
</style>