<template>
  <div>
    <Card :dis-hover="true">
      <Form ref="search-form" inline>
        <FormItem label="公告内容" :label-width="80">
          <Input type="text" v-model="searchForm.keyword" placeholder="请输入关键字"></Input>
        </FormItem>
        <FormItem label="公告状态" :label-width="80">
          <Select v-model="searchForm.pubStatus" style="width:150px">
            <Option value="0">全部</Option>
            <Option value="2">已发布</Option>
            <Option value="1">未发布</Option>
            <Option value="3">已下架</Option>
          </Select>
        </FormItem>
        <FormItem label="发布时间" :label-width="80">
          <DatePicker
            type="daterange"
            v-model="timeArr"
            placeholder="查询时间范围"
            @on-change="dateRangeChange"
          ></DatePicker>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="queryNoticeList">搜索</Button>
          <Button style="margin-left: 8px" @click="reset">清空</Button>
        </FormItem>
        <FormItem style="float:right">
          <Button type="primary" @click="newNotice">新建公告</Button>
        </FormItem>
      </Form>
      <noticeItem :noticeList="list" :detail="queryDetail" :handleNotice="handleNotice"></noticeItem>
      <div style="margin-top:50px;text-align:right">
        <Page
          :current.sync="curPage"
          :total="total"
          show-total
          show-sizer
          show-elevator
          class-name="page"
          v-if="total"
          @on-change="pageChangeHandle"
          @on-page-size-change="pageSizeChangeHandle"
        />
      </div>
      <editModal
        :show="editShow"
        :modalTitle="editTitle"
        :data="editData"
        @on-toggle="editShowChange"
        @on-save="handleNoticeInfo"
      ></editModal>
      <publishNotice
        :show="publishShow"
        :id="publishData"
        @on-toggle="publishShowChange"
        @on-publish="submitPublishNotice"
      ></publishNotice>
    </Card>
  </div>
</template>

<script>
import {
  getNoticeList,
  getNoticeDetail,
  addNotice,
  modNotice,
  pubNotice,
  offNotice
} from "@/api/notice/notice";
import noticeItem from "./components/noticeItem";
import editModal from "./components/edit-modal";
import publishNotice from "./components/publishNotice";
export default {
  name: "app_notice",
  data() {
    return {
      searchForm: {
        keyword: "",
        pubStatus: "0",
        startTime: 0,
        endTime: 0,
        page: 1,
        size: 10
      },
      timeArr: [],
      editShow: false,
      editTitle: "",
      editData: {},
      publishShow: false,
      publishData: 0,
      curPage: 1,
      total: 0,
      newNoticeTpl: {
        noticeList: [],
        noticeType: "1"
      },
      list: []
    };
  },
  components: {
    noticeItem,
    editModal,
    publishNotice
  },
  mounted() {
    this.queryNoticeList();
  },
  methods: {
    queryNoticeList() {
      let params = JSON.parse(JSON.stringify(this.searchForm));
      params.pubStatus = Number(params.pubStatus);
      getNoticeList(params).then(res => {
        console.log(res);
        this.list = res.data.list;
        this.total = res.data.total;
      });
    },
    handleNoticeInfo(val) {
      let params = val[0];
      params.contentJson = JSON.stringify(params.noticeList);
      if (val[1] === "add") {
        addNotice(params).then(res => {
          if (res.code == 0) {
            this.$Message.success("新建成功!");
            this.queryNoticeList();
            this.editShow = false;
          }
        });
      } else {
        params.noticeId = params.noticePub.noticeId;
        modNotice(params).then(res => {
          if (res.code == 0) {
            this.$Message.success("修改成功!");
            this.queryNoticeList();
            this.editShow = false;
          }
        });
      }
    },
    dateRangeChange(val) {
      console.log(val);
      console.log(this.timeArr);
      [this.searchForm.startTime, this.searchForm.endTime] = [
        val[0]?new Date(val[0]).getTime():0,
        val[1]?new Date(val[1]).getTime():0
      ];
      console.log(this.searchForm)
    },
    reset() {
      this.searchForm.keyword = "";
      this.searchForm.pubStatus = "0";
      this.queryNoticeList()
    },
    newNotice() {
      this.editTitle = "新建公告";
      this.editData = this.newNoticeTpl;
      this.editShow = true;
    },
    submitPublishNotice(val) {
      pubNotice(val).then(res => {
        console.log(res);
        if (res.code == 0) {
          this.$Message.success("公告发布成功!");
          this.publishShow = false;
          this.queryNoticeList();
        }
      });
    },
    handleNotice(val, type) {
      if (type) {
        this.publishShow = true;
        this.publishData = val.noticeId;
      } else {
        this.$Modal.confirm({
          title: "下架公告",
          content: "<p>下架后用户将不再看到该APP公告。确定要现在下架吗？</p>",
          loading: true,
          onOk: () => {
            offNotice(val.noticeId).then(res => {
              if (res.code == 0) {
                this.$Modal.remove();
                this.$Message.success("公告已成功下架!");
                this.queryNoticeList();
              }
            });
          }
        });
      }
    },
    queryDetail(val) {
      getNoticeDetail(val.noticeId).then(res => {
        if (res.code == 0) {
          this.editTitle = "编辑公告";
          this.editShow = true;
          this.editData = res.data;
        }
      });
    },
    editShowChange(val) {
      this.editShow = val;
    },
    publishShowChange(val) {
      this.publishShow = val;
    },
    update(val) {
      this.editData = val;
      console.log("updateData", this.editData);
    },
    pageChangeHandle(val) {
      this.searchForm.page = val;
      this.queryNoticeList();
    },
    pageSizeChangeHandle(val) {
      this.searchForm.size = val;
      this.queryNoticeList();
    }
  }
};
</script>
