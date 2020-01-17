<template>
  <Card>
    <div class="operateBar">
      <LanguageSelector @on-change="langChangeHandle" style="width:200px;margin-right:10px"></LanguageSelector>
      <Select v-model="select.model" style="width:150px" @on-change="cateChangeHandle">
        <Option v-for="item in select.options" :value="item.id" :key="item.id">{{ item.value }}</Option>
      </Select>
    </div>
    <Table border :columns="questionColumns" :data="questionData"></Table>
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
    <Modal v-model="order.visible" title="修改优先级" width="400" @on-ok="changeOrderHandle">
      <Input v-model="order.value" @on-keyup="()=> {order.value=order.value.replace(/[^\d]/g,'');}"></Input>
    </Modal>
    <Modal v-model="checkOpModal.visible" width="360" :mask-closable="false">
      <p slot="header" style="color:#f60;text-align:left">
        <span>删除问题</span>
      </p>
      <Input v-model="checkOpModal.checkInput" placeholder="删除前输入问题标题，防止误操作">
        <span slot="prepend">问题标题:</span>
      </Input>
      <div style="margin-top: 10px;font-size: 14px;">下架后，问题将不出现在帮助中心页面！</div>
      <div slot="footer">
        <Button size="large" @click="checkOpModal.visible=false">取消</Button>
        <Button type="primary" size="large" @click="checkHandle">确定</Button>
      </div>
    </Modal>
    <Preview ref="previewModal" :visible.sync="preview.visible" @on-close="previewCloseHandle"></Preview>
  </Card>
</template>

<script>
import { getCategory } from "@/api/category/category.js";
import { questionColumns } from "@/columns/questionList.js";
import {
  getQuestionList,
  changeStatus,
  deleteQuestion,
  editOrder
} from "@/api/question/questionList.js";
import { requestQuestionDetail } from "@/api/question/questionEdit.js";
import { queryQuestionCountInfo } from "@/api/question/question_count.js";
import Preview from "../preview/preview.vue";
import LanguageSelector from "@/view/components/language-selector/language-selector.vue";
export default {
  name: "fileList",
  components: {
    Preview,
    LanguageSelector
  },
  data() {
    //   console.log(downloadColumns)
    return {
      lang: "zh",
      questionColumns: questionColumns(this),
      questionData: [],
      select: {
        model: "",
        item: {},
        options: []
      },
      page: {
        page: 1,
        limit: 10,
        total: 0
      },
      order: {
        visible: false,
        value: "",
        id: ""
      },
      checkOpModal: {
        visible: false,
        checkInput: "",
        checkStr: ""
      },
      preview: {
        visible: false,
        content: {},
        category: ""
      }
    };
  },
  methods: {
    requestList() {
      getQuestionList(this.select.model, this.page.page, this.page.limit).then(
        res => {
          if (res) {
            this.questionData = res.data.rows;
            this.page.total = res.data.count;
          }
        }
      );
    },
    cateChangeHandle(id) {
      for (let i in this.select.options) {
        if (this.select.options[i].id === id) {
          var item = this.select.options[i];
        }
      }
      console.log(item);
      this.select.item = item;
      this.page.page = 1;
      this.requestList();
    },
    pageChangeHandle(currentPage) {
      this.page.page = currentPage;
      this.requestList();
    },
    pageSizeChangeHandle(pageSize) {
      this.page.limit = pageSize;
      this.requestList();
    },
    statusChangHandle(params) {
      let content =
        params.row.status === 1 ? "确认下架该问题？" : "确认上架该问题？";
      this.$Modal.confirm({
        title: "提示",
        content,
        onOk: () => {
          changeStatus(params.row.id, params.row.status).then(res => {
            if (res) {
              this.requestList();
              this.$Message.success(
                params.row.status === 1 ? "下架问题成功！" : "上架问题成功！"
              );
            }
          });
        }
      });
    },
    deleteQuestion(params) {
      this.checkOpModal.visible = true;
      this.checkOpModal.checkStr = params.row.title;
      this.checkOpModal.checkInput = "";
      this.checkOpModal.id = params.row.id;
      // this.$Modal.confirm({
      //     title: '提示',
      //     content: '删除后无法恢复，是否确定删除该问题？',
      //     onOk: () => {

      //     },
      // })
    },
    checkHandle() {
      this.checkOpModal.visible = false;
      console.log(this.checkOpModal.checkStr, this.checkOpModal.checkInput);
      if (
        this.checkOpModal.checkStr.trim() ===
        this.checkOpModal.checkInput.trim()
      ) {
        deleteQuestion(this.checkOpModal.id).then(res => {
          // console.log(res)
          if (res) {
            this.requestList();
          }
        });
      } else {
        this.$Message.error("输入名称与实际不符！");
      }
    },
    editQuestion(params) {
      // 此处为了防止nav中出现多个相同页面且只能点击一个的情况出现
      // 修改了src/util.js中判断localStorage[tagNavList]相等的逻辑  ==>routeEqual 函数
      if (params.row.status !== 1) {
        this.$router.replace({
          name: "question-edit",
          params: {
            id: params.row.id
          }
        });
      } else {
        this.$Message.error("请先下架该问题！");
      }
    },
    editOrder(params) {
      this.order.visible = true;
      this.order.value = params.row.order;
      this.order.id = params.row.id;
    },
    changeOrderHandle() {
      // console.log(this.order)
      editOrder(this.order.id, this.order.value).then(res => {
        if (res) {
          this.requestList();
        }
      });
    },
    detailQuestion(params) {
      console.log(params);
      this.preview.visible = true;
      this.$refs.previewModal.init(
        params.row.id,
        this.select.item.value,
        this.select.item.envalue,
        "question"
      );
    },
    feedback(params) {
      queryQuestionCountInfo(params.row.id).then(res => {
        if (res) {
          // this.formData = res.data
          // this.$Modal()
          this.$Modal.info({
            title: "用户反馈统计",
            content:
              "<p>觉得有用：" +
              res.data.useful +
              "人<br>觉得没用：" +
              res.data.useless +
              "人</p>"
          });
        }
      });
    },
    previewCloseHandle(val) {
      this.preview.visible = val;
    },
    getCategory() {
      getCategory("question", this.lang).then(res => {
        if (res.data.length > 0) {
          this.select.options = res.data;
          this.select.model = res.data[0].id;
          this.select.item = res.data[0];
          this.requestList();
        } else {
          this.$Modal.confirm({
            title: "提示",
            content: "<p>当前语言下暂无分类，请先创建分类！</p>",
            onOk: () => {
              this.$router.push({
                name: "category"
              });
            }
          });
        }
      });
    },
    langChangeHandle(value) {
      this.lang = value;
      this.getCategory();
    }
  },
  mounted() {
    let p = new Promise((resolve, reject) => {
      getCategory("question", "zh").then(res => {
        if (res.data.count > 0) {
          this.select.options = res.data.rows;
          this.select.model = res.data.rows[0].id;
          this.select.item = res.data.rows[0];
          resolve();
        } else {
          this.$Modal.confirm({
            title: "提示",
            content: "<p>当前语言下暂无分类，请先创建分类！</p>",
            onOk: () => {
              this.$router.push({
                name: "category"
              });
            }
          });
        }
      });
    });
    p.then(_ => {
      this.requestList();
    }).catch();
  }
};
</script>

<style lang="less" scoped>
.page {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}
.operateBar {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}
</style>
