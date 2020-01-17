<template>
  <Modal title="发布公告" v-model="modalShow" @on-visible-change="visibleChange" width="800">
    <Form :label-width="100" ref="publishForm" label-position="left">
      <slot name="inputLabel"></slot>
      <FormItem label="1.发布时间：">
        <RadioGroup v-model="publishType" @on-change="publishTypeChange">
          <Radio label="1">立即发布</Radio>
          <Radio label="2">定时发布</Radio>
        </RadioGroup>
      </FormItem>
      <div style="margin-left:100px" v-if="publishType=='2'">
        <FormItem label="发布时间" :label-width="120">
          <DatePicker
            type="datetime"
            v-model="formData.pubTime"
            format="yyyy-MM-dd HH:mm"
            placeholder="请选择发布时间"
            style="width: 200px"
          ></DatePicker>
        </FormItem>
        <FormItem label="(非必填)下架时间" :label-width="120">
          <DatePicker
            type="datetime"
            v-model="formData.offTime"
            format="yyyy-MM-dd HH:mm"
            placeholder="请选择下架时间"
            style="width: 200px"
          ></DatePicker>
        </FormItem>
      </div>

      <FormItem label="2.发布范围：">
        <Transfer
          :data="data"
          :target-keys="targetKeys"
          :titles="['APP平台','发布对象']"
          @on-change="osChange"
          :operations="['删除','添加']"
        ></Transfer>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button @click="modalShow=false">取消</Button>
      <Button type="primary" :loading="modalLoading" @click="submit">发布</Button>
    </div>
  </Modal>
</template>
<script>
export default {
  props: {
    id: Number,
    show: Boolean
  },
  data() {
    return {
      data: [
        { key: "3", label: "iOS", disabled: false },
        { key: "2", label: "Android", disabled: false }
      ],
      targetKeys: [],
      formData: {
        noticeId: 0,
        pubTime: "",
        offTime: ""
      },
      publishType: "1",
      modalShow: false,
      modalLoading: false
    };
  },
  methods: {
    reset() {
      this.publishType = "1";
      this.targetKeys = [];
    },
    publishTypeChange(val) {
      console.log(val);
    },
    osChange(item) {
      this.targetKeys = item;
      if (this.targetKeys.length == 2) this.formData.osType = 1;
      else this.formData.osType = Number(this.targetKeys[0]);
    },
    visibleChange(val) {
      this.$emit("on-toggle", val);
    },

    submit() {
      let params = JSON.parse(JSON.stringify(this.formData));
      [params.pubTime, params.offTime, params.noticeId] = [
        this.pubTime,
        this.offTime,
        this.id
      ];
      this.$emit("on-publish", params);
    }
  },
  computed: {
    pubTime() {
      return this.formData.pubTime
        ? new Date(this.formData.pubTime).getTime()
        : new Date().getTime();
    },
    offTime() {
      return this.formData.offTime
        ? new Date(this.formData.offTime).getTime()
        : "";
    }
  },
  watch: {
    show(val) {
      this.modalShow = val;
      console.log(typeof this.id,this.id);
      if (!val) {
        this.reset();
      }
    }
  }
};
</script>

