<style lang="less" scoped>
.operateBar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.tip {
  color: #bbbec4;
  margin-left: 16px;
}
.tip,
.required {
  &::before {
    content: "*";
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
    font-family: SimSun;
    font-size: 12px;
    color: #ed3f14;
  }
}
.uploadList {
  display: inline-block;
  width: 102px;
  height: 102px;
  text-align: center;
  line-height: 100px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
  &:hover .uploadCover {
    display: block;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .uploadCover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    i {
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      margin: 0 2px;
    }
  }
}
</style>

<template>
  <Card class="categoryCard">
    <div class="operateBar">
      <div class="operateBarLeft">
        <Select
          v-model="select.model"
          style="width:150px;margin-right:10px"
          @on-change="selectChange"
        >
          <Option
            v-for="item in select.options"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
        <LanguageSelector @on-change="languageSelectorChangeHandle" style="width:200px"></LanguageSelector>
      </div>
      <Button type="primary" @click="newCategory">新建分类</Button>
    </div>
    <Table border :columns="categoryColumns" :data="categoryData"></Table>
    <Modal v-model="editModal.visible" width="560" :mask-closable="false">
      <p slot="header">{{editModal.title}}</p>
      <div class="editModalContent">
        <Form ref="editModal" :model="editModal.formData" :label-width="100" :rules="ruleCustom">
          <FormItem label="选择语言：" prop="lang">
            <LanguageSelector @on-change="editLangChangeHandle" :lang="language"></LanguageSelector>
          </FormItem>
          <FormItem label="分类名称：" prop="value">
            <Input v-model="editModal.formData.value" placeholder="输入分类名称"></Input>
          </FormItem>
          <FormItem label="分类优先级：" prop="order">
            <Input
              v-model="editModal.formData.order"
              placeholder="输入分类英文名称"
              @on-keyup="()=> {editModal.formData.order=editModal.formData.order.replace(/[^\d]/g,'');}"
            ></Input>
          </FormItem>
          <FormItem prop="iconfocus">
            <div slot="label">
              <span class="required">点击图标：</span>
            </div>
            <div style="display:flex;align-items: center;">
              <div class="uploadList" v-for="item in focusIconList">
                <template v-if="item.status === 'finished'">
                  <img :src="item.url" />
                  <div class="uploadCover">
                    <Icon
                      type="ios-trash-outline"
                      size="40"
                      @click.native="handleRemove(item, 'uploadFocusIcon')"
                    ></Icon>
                  </div>
                </template>
                <template v-else>
                  <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </template>
              </div>
              <Upload
                v-show="focusIconList.length===0"
                ref="uploadFocusIcon"
                type="drag"
                :show-upload-list="false"
                :format="['jpg','jpeg','png']"
                :max-size="500"
                :before-upload="handleCheckSize"
                :default-file-list="defaultFocusIconList"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :on-success="handleSuccess('defaultFocusIconList', 'iconfocus')"
                style="display: inline-block;width:100px;height:100px"
                :action="uploadUrl"
              >
                <div
                  style="width:100px;height:100px;display:flex;justify-content: center;align-items:center"
                >
                  <Icon type="ios-cloud-upload" size="42" style="color: #3399ff"></Icon>
                </div>
              </Upload>
              <span
                class="tip"
                style="margin-left: 20px;font-size:12px;text-align:center"
                v-if="blurIconList.length===0"
              >
                支持jpg、jpeg、png格式，宽高比限制为1:1
                <br />点击或拖拽进行上传
              </span>
              <span class="tip" style="margin-left: 20px;font-size:12px;" v-else>更改图片请先删除原图，再行上传</span>
            </div>
          </FormItem>
          <FormItem prop="iconblur">
            <div slot="label">
              <span class="required">失焦图标：</span>
            </div>
            <div style="display:flex;align-items: center;">
              <div class="uploadList" v-for="item in blurIconList">
                <template v-if="item.status === 'finished'">
                  <img :src="item.url" />
                  <div class="uploadCover">
                    <Icon
                      type="ios-trash-outline"
                      size="40"
                      @click.native="handleRemove(item, 'uploadBlurIcon')"
                    ></Icon>
                  </div>
                </template>
                <template v-else>
                  <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </template>
              </div>
              <Upload
                v-show="blurIconList.length===0"
                ref="uploadBlurIcon"
                type="drag"
                :show-upload-list="false"
                :format="['jpg','jpeg','png']"
                :max-size="500"
                :before-upload="handleCheckSize"
                :default-file-list="defaultBlurIconList"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :on-success="handleSuccess('defaultBlurIconList', 'iconblur')"
                style="display: inline-block;width:100px;height:100px"
                :action="uploadUrl"
              >
                <div
                  style="width:100px;height:100px;display:flex;justify-content: center;align-items:center"
                >
                  <Icon type="ios-cloud-upload" size="42" style="color: #3399ff"></Icon>
                </div>
              </Upload>
              <span
                class="tip"
                style="margin-left: 20px;font-size:12px;text-align:center"
                v-if="blurIconList.length===0"
              >
                支持jpg、jpeg、png格式，宽高比限制为1:1
                <br />点击或拖拽进行上传
              </span>
              <span class="tip" style="margin-left: 20px;font-size:12px;" v-else>更改图片请先删除原图，再行上传</span>
            </div>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button
          type="primary"
          size="large"
          long
          :loading="editModal.loading"
          @click="handleSubmit"
        >提交</Button>
      </div>
    </Modal>
    <Modal v-model="checkIconModal.visible" width="460" :mask-closable="false">
      <p slot="header">查看图标</p>
      <Form :label-width="80" style="display:flex;justify-content: space-between;">
        <FormItem label="点击图标：">
          <div class="uploadList">
            <img :src="checkIconModal.iconfocus" />
          </div>
        </FormItem>
        <FormItem label="失焦图标：">
          <div class="uploadList">
            <img :src="checkIconModal.iconblur" />
          </div>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" size="large" long @click="checkIconModal.visible=false">确认</Button>
      </div>
    </Modal>
    <Modal v-model="checkOpModal.visible" width="360" :mask-closable="false">
      <p slot="header" style="color:#f60;text-align:left">
        <span>删除分类</span>
      </p>
      <Input v-model="checkOpModal.checkInput" placeholder="删除前输入分类名称，防止误操作">
        <span slot="prepend">分类名称:</span>
      </Input>
      <div style="margin-top: 10px;font-size: 14px;">下架后，该分类及其下问题将不出现在帮助中心页面！</div>
      <div slot="footer">
        <Button size="large" @click="checkOpModal.visible=false">取消</Button>
        <Button type="primary" size="large" @click="checkHandle">确定</Button>
      </div>
    </Modal>
    <Modal v-model="order.visible" title="修改优先级" width="400" @on-ok="changeOrderHandle">
      <Input v-model="order.value" @on-keyup="()=> {order.value=order.value.replace(/[^\d]/g,'');}"></Input>
    </Modal>
  </Card>
</template>

<script>
import { categoryColumns } from "@/columns/category.js";
import {
  getCategory,
  deleteCategory,
  submitCategory,
  editOrder
} from "@/api/category/category.js";
import LanguageSelector from "@/view/components/language-selector/language-selector.vue";
export default {
  name: "category",
  components: {
    LanguageSelector
  },
  data() {
    const iconfocusValidate = (rule, value, callback) => {
      if (this.editModal.formData.iconfocus.length === 0) {
        callback(new Error("分类点击图不可为空！"));
      } else {
        callback();
      }
    };
    const iconblurValidate = (rule, value, callback) => {
      if (this.editModal.formData.iconblur.length === 0) {
        callback(new Error("分类失焦图不可为空！"));
      } else {
        callback();
      }
    };
    const orderValidate = (rule, value, callback) => {
      console.log(this.editModal.formData.order);
      if (this.editModal.formData.order <= 0) {
        callback(new Error("优先级应为大于0的正整数！"));
      } else {
        callback();
      }
    };
    return {
      language: "zh",
      uploadUrl: "/api/upload",
      categoryColumns: categoryColumns(this),
      categoryData: [],
      select: {
        model: "question",
        options: [
          {
            label: "问题分类",
            value: "question"
          },
          {
            label: "文件分类",
            value: "downloads"
          }
        ]
      },
      editModal: {
        visible: false,
        title: "",
        loading: false,
        isEdit: false,
        formData: {
          lang: "zh",
          value: "",
          // envalue: '',
          order: "",
          iconfocus: "",
          iconblur: ""
        }
      },
      ruleCustom: {
        value: [
          { required: true, message: "分类名称不可为空", trigger: "blur" }
        ],
        lang: [{ required: true, message: "语言不可为空", trigger: "change" }],
        order: [{ validator: orderValidate, trigger: "blur" }],
        iconfocus: [{ validator: iconfocusValidate, trigger: "blur" }],
        iconblur: [{ validator: iconblurValidate, trigger: "blur" }]
      },
      checkIconModal: {
        visible: false,
        iconfocus: "",
        iconblur: ""
      },
      icons: {
        focusIcon: {},
        blurIcon: {}
      },
      defaultFocusIconList: [],
      focusIconList: [],
      defaultBlurIconList: [],
      blurIconList: [],
      checkOpModal: {
        visible: false,
        checkInput: "",
        checkStr: ""
      },
      type: "question",
      order: {
        visible: false,
        value: "",
        id: ""
      }
    };
  },
  methods: {
    requestList(type = "question") {
      getCategory(type, this.language).then(res => {
        if (res) {
          this.categoryData = res.data.rows;
        }
      });
    },
    newCategory() {
      this.editModal.title = "新建分类";
      this.editModal.visible = true;
      this.editModal.isEdit = false;
      this.editModal.formData = {
        lang: this.editModal.formData.lang || "zh",
        value: "",
        // envalue: '',
        order: "",
        iconfocus: "",
        iconblur: ""
      };
      this.defaultFocusIconList = [];
      this.defaultBlurIconList = [];
      this.focusIconList = [];
      this.blurIconList = [];
    },
    showIcon(params) {
      // console.log(params.row)
      this.checkIconModal.iconfocus = params.row.iconfocus;
      this.checkIconModal.iconblur = params.row.iconblur;
      this.checkIconModal.visible = true;
    },
    editCategory(params) {
      // console.log(params.row)
      this.editModal.formData = params.row;
      this.defaultFocusIconList = [
        {
          url: params.row.iconfocus
        }
      ];
      this.defaultBlurIconList = [
        {
          url: params.row.iconblur
        }
      ];
      this.$nextTick(() => {
        this.focusIconList = this.$refs.uploadFocusIcon.fileList;
        this.blurIconList = this.$refs.uploadBlurIcon.fileList;
      });
      this.editModal.title = "编辑分类";
      this.editModal.visible = true;
      this.editModal.isEdit = true;
    },
    deleteCategory(params) {
      this.checkOpModal.visible = true;
      this.checkOpModal.checkStr = params.row.value;
      this.checkOpModal.checkInput = "";
      this.checkOpModal.id = params.row.id;
    },
    checkHandle() {
      this.checkOpModal.visible = false;
      console.log(this.checkOpModal.checkStr, this.checkOpModal.checkInput);
      if (
        this.checkOpModal.checkStr.trim() ===
        this.checkOpModal.checkInput.trim()
      ) {
        deleteCategory(this.checkOpModal.id, this.type).then(res => {
          if (res) {
            this.requestList(this.type);
            this.$Message.success("删除分类成功！");
          }
        });
      } else {
        this.$Message.error("输入名称与实际不符！");
      }
    },
    selectChange(value) {
      this.type = value;
      this.requestList(value);
    },
    handleFormatError() {
      this.$Message.error("不支持上传该图片格式，请选择jpg,jpeg或png。");
    },
    handleMaxSize() {
      this.$Message.error("图片大小超出限制，请上传不超过500KB的图片。");
    },
    handleCheckSize(file) {
      let vm = this;
      let ifMatch = false;
      return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onload = function(e) {
          var data = e.target.result;
          // console.log(e)
          //加载图片获取图片真实宽度和高度
          var image = new Image();
          image.onload = function() {
            var width = image.width;
            var height = image.height;
            vm.ifMatch = true;
            if (width === height) {
              ifMatch = true;
              resolve();
            } else {
              ifMatch = false;
              reject();
            }
          };
          image.src = data;
        };
        reader.readAsDataURL(file);
      })
        .then(_ => {
          console.log("match");
        })
        .catch()
        .finally(_ => {
          if (!ifMatch) {
            vm.$Message.error("请上传正确宽高比的图片！");
          }
        });
    },
    handleRemove(file, refName) {
      let formDataName = "";
      if (refName === "uploadFocusIcon") {
        formDataName = "iconfocus";
      } else if (refName === "uploadBlurIcon") {
        formDataName = "iconblur";
      }
      const fileList = this.$refs[refName].fileList;
      let formDataUrl = this.editModal.formData[formDataName];

      fileList.splice(fileList.indexOf(file), 1);
      formDataUrl = "";
    },
    handleSuccess(defaultFileListName, urlName) {
      return (res, file) => {
        file.url = location.origin + res.data.url;
        this[defaultFileListName] = [file];
        this.editModal.formData[urlName] = location.origin + res.data.url;
        this.$nextTick(() => {
          this.focusIconList = this.$refs.uploadFocusIcon.fileList;
          this.blurIconList = this.$refs.uploadBlurIcon.fileList;
        });
      };
    },
    handleSubmit() {
      console.log(this.editModal.formData.lang);
      this.$refs.editModal.validate(valid => {
        if (valid) {
          this.editModal.loading = true;
          submitCategory(
            this.editModal.formData,
            this.type,
            this.editModal.isEdit
          ).then(res => {
            if (res) {
              this.$Message.success(
                this.editModal.isEdit ? "编辑分类成功！" : "新建分类成功！"
              );
              this.requestList(this.type);
            }
            this.editModal.visible = false;
            this.editModal.loading = false;
          });
        }
      });
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
          this.requestList(this.type);
        }
      });
    },
    languageSelectorChangeHandle(value) {
      this.language = value;
      this.requestList(this.type);
      // console.log(1)
    },
    editLangChangeHandle(value) {
      this.editModal.formData.lang = value;
      console.log(value, this.editModal.formData.lang);
    }
  },
  mounted() {
    this.requestList();
    this.focusIconList = this.$refs.uploadFocusIcon.fileList;
    this.blurIconList = this.$refs.uploadBlurIcon.fileList;
  }
};
</script>
