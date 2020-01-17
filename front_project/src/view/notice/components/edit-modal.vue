<template>
  <Modal :title="modalTitle" v-model="modalShow" @on-visible-change="visibleChange" width="800">
    <Form :label-width="100" ref="editForm" label-position="left">
      <slot name="inputLabel"></slot>
      <FormItem label="1.公告内容：">
        <RadioGroup v-model="noticeType">
          <Radio label="1">纯文本</Radio>
          <Radio label="2">URL</Radio>         
          <Radio label="3">安卓升级提醒</Radio>
          <Radio label="4">iOS升级提醒</Radio>
        </RadioGroup>
      </FormItem>
      <div v-if="noticeType=='1'">
        <FormItem
          v-for="(item, index) in formData.noticeList"
          :prop="'noticeList.' + index + '.editValue'"
          :key="index"
        >
          <Row>
            <Col span="3">
              <Label v-if="!item.editFlag || item.savedFlag">{{languageMap[item.lang]}}</Label>
              <Select v-model="item.lang" v-if="item.editFlag && !item.savedFlag">
                <Option v-for="(value, key,index) in language" :value="key" :key="index">{{value}}</Option>
              </Select>
            </Col>
            <Col span="16" offset="1">
              <Input
                type="textarea"
                placeholder="请输入更新内容"
                v-model="item.content"
                v-show="item.editFlag"
                :autosize="true"
              ></Input>
              <ul v-show="!item.editFlag" style="list-style-type:none">
                <li
                  v-for="(val,idx) in item.saveValue"
                  :key="idx"
                  :title="val"
                  style="overflow: hidden;"
                >{{val}}</li>
              </ul>
            </Col>
            <Col span="2" offset="1">
              <Button @click="item.editFlag=!item.editFlag" v-if="!item.editFlag">编辑</Button>
              <Button @click="saveFn(item)" v-else>保存</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Row>
            <Col span="20">
              <Button type="dashed" long @click="addInpItem" icon="md-add">新增更新内容</Button>
            </Col>
          </Row>
        </FormItem>
      </div>
      <FormItem v-if="noticeType=='3'||noticeType=='4'" label="版本号:">
        <Input type="text" v-model="formData.version" placeholder="请输入版本号(格式如：00.05.02.01)"></Input>
      </FormItem>
      <FormItem v-if="noticeType=='2'||noticeType=='3'||noticeType=='4'" label="URL:">
        <Input type="text" v-model="formData.url" placeholder="请输入URL"></Input>
      </FormItem>
      <FormItem label="2.备注信息：">
        <Row>
          <Col span="20">
            <Input type="textarea" v-model="formData.des"></Input>
          </Col>
        </Row>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button @click="modalShow=false">取消</Button>
      <Button type="primary" :loading="modalLoading" @click="submit">提交</Button>
    </div>
  </Modal>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    },
    show: Boolean,
    modalTitle: String
  },
  data() {
    return {
      routePath: this.$route.path,
      noticeType: "",
      modalLoading: false,
      modalShow: false,
      modalData: {},
      formData: {},
      remarkInfo: "",
      languageMap: {
        "zh-cn": "简体中文：",
        "zh-hk": "繁体中文：",
        en: "英文：",
        vi: "越南文："
      },
      language: {
        "zh-cn": "简体中文",
        "zh-hk": "繁体中文",
        en: "英文",
        vi: "越南文"
      }
    };
  },
  methods: {
    saveFn(item) {
      console.log(item);
      if (!item.content.replace(/^\s*|\s*$/g, "")) {
        return this.$Message.warning({ content: "更新内容不能为空！" });
      }
      if (!item.lang) {
        return this.$Message.warning({ content: "请选择语言！" });
      }
      item.content = item.content.replace(/\n/g, "|");
      this.saveSuccessFn(item);
    },
    saveSuccessFn(item) {
      item.editFlag = false;
      item.savedFlag = true;
      let arr = item.content.replace(/\n/g, ",").split(",");
      item.saveValue = arr.filter(function(s) {
        return s && s.replace(/^\s*|\s*$/g, ""); // 注：清除左右空白字符
      });
      console.log(item);
      this.$parent.$parent.update(this.formData);
      this.$Message.success({ content: "保存成功!" });
    },
    visibleChange(val) {
      if(!val) this.noticeType='';
      this.$emit("on-toggle", val);
    },
    addInpItem() {
      this.formData.noticeList.forEach(item => {
        delete this.language[item.lang];
      });
      if (Object.keys(this.language).length == 0) {
        return this.$Message.warning({
          content: "更新内容只限如上四种语言！"
        });
      }
      let addFlag = true;
      const length = this.formData.noticeList.length;
      this.formData.noticeList.forEach(item => {
        if (item.editFlag == true) {
          addFlag = false;
        }
      });
      if (addFlag) {
        let o = {
          content: "",
          editFlag: true,
          lang: "",
          savedFlag: false
        };
        this.formData.noticeList.push(o);
      } else {
        this.$Message.warning({
          content: "请先保存正在编辑的项目！"
        });
      }
    },
    submit() {
      console.log("提交前的值", this.formData);
      this.formData.noticeType = Number(this.noticeType);
      let reg = /^[0-9]{2}\.[0-9]{2}\.[0-9]{2}\.[0-9]{2}$/;
      if(!reg.test(this.formData.version)) return this.$Message.warning('请输入正确的版本格式！');
      let params = [
        this.formData,
        this.modalTitle == "新建公告" ? "add" : "edit"
      ];
      this.$emit("on-save", params);
    }
  },
  computed: {},
  watch: {
    show(val) {
      this.modalShow = val;
      console.log(this.data);
    },
    data(val) {
      //初始化language
      this.language = {
        "zh-cn": "简体中文",
        "zh-hk": "繁体中文",
        en: "英文",
        vi: "越南文"
      };
      const data = JSON.parse(JSON.stringify(val));
      console.log("传进的值", data);
      if (data.noticeList) {
        if (!data.noticeList.length) {
          this.formData = data;
          let params = {
            lang: "zh-cn",
            content: "",
            editFlag: true,
            savedFlag: false
          };
          this.formData.noticeList.push(params);
          this.formData.des = data.des ? data.des : "";
          this.noticeType = String(this.formData.noticeType);
        } else {
          data.noticeList = data.noticeList.map((item, index) => {
            let o = {};
            o.editFlag = false;
            o.savedFlag = true;
            o.lang = item.lang;
            o.saveValue = item.content.split("|");
            o.content = item.content.replace(/\|/g, "\n");
            return o;
          });
          this.formData = data;
          this.formData.des = data.noticePub.des ? data.noticePub.des : "";
          this.noticeType = this.noticeType
          ? this.noticeType
          : String(this.formData.noticePub.noticeType);
          console.log("hahhahahhaha", this.formData);
        }
      } else {
        this.formData = data;
        this.formData.des = data.noticePub.des ? data.noticePub.des : "";
        this.formData.url = data.noticePub.url ? data.noticePub.url : "";
        this.formData.version = data.noticePub.version ? data.noticePub.version : "";
        this.noticeType = this.noticeType
          ? this.noticeType
          : String(this.formData.noticePub.noticeType);
        let params = [
          {
            lang: "zh-cn",
            content: "",
            editFlag: true,
            savedFlag: false
          }
        ];
        this.formData.noticeList = params;
      }
      console.log("处理后的obj", this.formData);
    }
  }
};
</script>

