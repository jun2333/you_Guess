<style lang="less" scoped>
</style>

<template>
  <div>
    <Modal v-model="show" title="回复" @on-visible-change="showStateChange">
      <Form :label-width="100" ref="form" label-position="left" :model="formData" :rules="rule">
        <slot name="inputLabel"></slot>
        <FormItem label="消息类型：">
          <RadioGroup v-model="formData.type">
            <Radio label="1">文本</Radio>
            <Radio label="2">URL</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="标题：" prop="title">
          <iInput type="text" v-model="formData.title" placeholder="请输入标题"></iInput>
        </FormItem>
        <FormItem v-if="formData.type=='1'" label="内容：" prop="content">
          <iInput type="textarea" placeholder="请输入内容" v-model="formData.content"></iInput>
        </FormItem>
        <FormItem v-if="formData.type=='2'" label="URL:" prop="url">
          <iInput type="url" v-model="formData.url" placeholder="请输入URL"></iInput>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="show=false">取消</Button>
        <Button type="primary" :loading="modalLoading" @click="submit">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  props: {
    mShow: Boolean,
    id: String,
    replyFn: {
      type: Function,
      default: () => {
        return () => {};
      }
    }
  },
  watch: {
    mShow(newV) {
      if (newV) {
        this.formData.feedbackId = this.id;
        this.resetFormData();
      }
      this.show = newV;
    }
  },
  data() {
    return {
      show: false,
      modalLoading: false,
      formData: {
        feedbackId: 0,
        type: "1",
        title: "",
        content: "",
        url: ""
      },
      rule: {
        title: [{ required: true, message: "请填写标题", trigger: "blur" }],
        content: [
          { required: true, message: "请填写回复内容", trigger: "blur" }
        ],
        url: [
          { required: true, message: "请填写url", trigger: "blur" },
          { type: "url", message: "请填写正确的url", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    resetFormData() {
      this.$refs["form"].resetFields();
      this.formData.type = "1";
    },
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.modalLoading = true;
          this.replyFn(this.formData).then(res => {
            this.modalLoading = false;
            if (res.code == 0) {
              this.show = false;
              this.$Message.success("回复成功!");
            }
          });
        }
      });
    },
    showStateChange(val) {
      this.$emit("replyShowChange", val);
    }
  }
};
</script>

<style>
</style>