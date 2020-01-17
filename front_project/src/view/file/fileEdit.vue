<template>
  <Card>
    <Spin size="large" fix v-if="spinShow"></Spin>
    <Form :label-width="100" :model="formData" :rules="ruleCustom">
      <FormItem label="选择语言：">
        <LanguageSelector
          @on-change="langChangeHandle"
          style="width:300px"
          :disabled="isEdit"
          :lang="formData.lang"
        ></LanguageSelector>
        <!-- <Select v-model="formData.lang" style="width:300px">
                    <Option v-for="item in category" :value="item.id" :key="item.id">{{ item.value }}</Option>
        </Select>-->
      </FormItem>
      <Row>
        <Col :span="12">
          <FormItem label="文件分类：">
            <Select v-model="formData.type" style="width:300px">
              <Option v-for="item in category" :value="item.id" :key="item.id">{{ item.value }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="优先级：" prop="order">
            <Input
              v-model="formData.order"
              placeholder="文件优先级"
              style="width:300px"
              @on-keyup="()=> {formData.order=formData.order.replace(/[^\d]/g,'');}"
            ></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :span="12">
          <FormItem label="文件版本号：">
            <Input v-model="formData.version" placeholder="文件版本号" style="width:300px"></Input>
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="发布时间：">
            <DatePicker
              :value="formData.pubdate"
              @on-change="handleDatePicker"
              type="date"
              placeholder="YYYY-MM-DD格式日期"
              style="width: 300px"
            ></DatePicker>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col :span="12">
          <FormItem label="文件上传：">
            <Input v-model="formData.url" placeholder="文件下载链接" style="width:300px"></Input>
            <Upload
              action="http://127.0.0.1:3000/api/upload"
              style="display:inline-block;margin-left:10px;"
              :show-upload-list="false"
              :before-upload="()=> {
                                spinShow=true
                            }"
              :on-success="fileUploadSuccessHandle"
              :on-error="fileUploaderrorHandle"
            >
              <Button icon="ios-cloud-upload-outline" type="success">点击上传</Button>
            </Upload>
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="文件大小：">
            <Input v-model="formData.size" placeholder="文件大小" style="width:300px"></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Form>
      <FormItem label="标题：">
        <Input v-model="formData.name" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="文件描述：" style="margin-bottom:0;">
        <Input
          type="textarea"
          v-model="formData.msg"
          :autosize="{minRows: 10,maxRows: 30}"
          placeholder="Enter something..."
        />
      </FormItem>
    </Form>
    <div class="buttonGroup">
      <Button type="primary" size="large" @click="submitHandle">提交</Button>
      <Button size="large" @click="resetHandle">重置</Button>
    </div>
  </Card>
</template>

<script>
import { getCategory } from "@/api/category/category.js";
import { submitFileInfo, requestFileDetail } from "@/api/file/fileEdit.js";
import LanguageSelector from "@/view/components/language-selector/language-selector.vue";
export default {
  name: "fileEdit",
  components: {
    LanguageSelector
  },
  data() {
    const orderValidate = (rule, value, callback) => {
      if (this.formData.order <= 0) {
        callback(new Error("优先级应为大于0的正整数！"));
      } else {
        callback();
      }
    };
    return {
      isEdit: false,
      spinShow: false,
      category: [],
      formData: {
        lang: "zh",
        type: "",
        name: "",
        // enname: '',
        version: "",
        url: "",
        msg: "",
        // enmsg: '',
        pubdate: "",
        size: "",
        order: ""
      },
      ruleCustom: {
        order: [{ validator: orderValidate, trigger: "blur" }]
      }
    };
  },
  methods: {
    requestCategory() {
      getCategory("downloads", this.formData.lang).then(res => {
        if (res.data.count > 0) {
          this.category = res.data.rows;
          this.formData.type = res.data.rows[0].id;
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
    handleDatePicker(formatDate, date) {
      this.formData.pubdate = formatDate;
    },
    resetHandle() {
      this.formData = {
        type: this.formData.type,
        ...{
          lang: "zh",
          url: "",
          name: "",
          // enname: '',
          msg: "",
          // enmsg: '',
          version: "",
          pubdate: "",
          size: ""
        }
      };
    },
    submitHandle() {
      // console.log(this.formData.msg.replace('\n','<br>'))
      this.formData.msg = this.formData.msg.replace("\n", "<br>");
      submitFileInfo(this.formData, this.$route.params.id).then(res => {
        if (res) {
          if (this.$route.params.id) {
            this.$Message.success("编辑文件成功！");
            // this.$refs.editor.delCache()
            // this.$refs.eneditor.delCache()
            this.$store.commit("closeTag", this.$route);
            this.$router.push({
              name: "file-list"
            });
          } else {
            this.resetHandle();
            this.$Message.success("新建文件成功！");
          }
        }
      });
    },
    fileUploadSuccessHandle(res, file, fileList) {
      this.spinShow = false;
      if (res.status === 1) {
        this.$Message.success("文件上传成功！");
        this.formData.url = res.data.url;
        this.formData.size = res.data.size;
      } else if (res.status === 10012) {
        sessionStorage.clear();
        this.$Message.error("登录超时,请重新登录!");
        this.$router.push({
          name: "login"
        });
      } else {
        this.$Message.error(res.msg);
      }
    },
    fileUploaderrorHandle(error, file, fileList) {
      this.spinShow = false;
    },
    langChangeHandle(value) {
      this.formData.lang = value;
      this.requestCategory();
    }
  },
  mounted() {
    let fileID = this.$route.params.id;
    if (fileID) {
      this.isEdit = true;
      // req
      requestFileDetail(fileID).then(res => {
        if (res) {
          this.formData = res.data;
          this.requestCategory();
        }
      });
    } else {
      this.requestCategory();
    }
  }
};
</script>

<style lang="less" scoped>
.languageCard:not(:last-child) {
  margin-bottom: 24px;
}
.buttonGroup {
  margin-top: 24px;
  text-align: center;
  .ivu-btn:not(:last-child) {
    margin-right: 20px;
  }
}
</style>
