<style lang="less" scoped>
.notice-item {
  margin-bottom: 10px;
  cursor: pointer;
  .content {
    line-height: 60px;
  }
  .operate {
    line-height: 60px;
    span {
      display: inline-block;
      width: 400px;
    }
  }
}
</style>
<template>
  <div>
    <Card class="notice-item" v-for="(item,index) in noticeList" :key="index">
      <div class="content" v-if="item.noticeType==1">{{langMap[item.lang]}}:{{item.content}}</div>
      <div class="content" v-if="item.noticeType==4">iOS升级提醒：</div>
      <div class="content" v-if="item.noticeType==3">安卓升级提醒：</div>
      <div class="content" v-if="item.noticeType==2||item.noticeType==3||item.noticeType==4">URL:{{item.url}}</div>
      <div class="operate">
        <span class="time">预发布时间：{{item.pubTime|formatDate}}</span>
        <span class="publish-status">{{item.pubStatus|formatStatus}}</span>
        <Button
          type="primary"
          :disabled="item.pubStatus==2"
          style="margin-right:100px"
          @click="toPublish(item)"
        >发布</Button>
        <Button type="primary" style="margin-right:100px" @click="toDetail(item)">详情</Button>
        <Button type="error" :disabled="item.pubStatus!=2" @click="soldOut(item)">下架</Button>
      </div>
    </Card>
  </div>
</template>

<script>
import { formatDate } from "../../../libs/tools";
export default {
  props: {
    noticeList: {
      type: Array,
      default() {
        return [];
      }
    },
    detail: {
      type: Function,
      default() {
        return () => {};
      }
    },
    handleNotice: {
      type: Function,
      default() {
        return () => {};
      }
    }
  },
  data() {
    return {
      langMap: {
        "zh-cn": "简体中文",
        "zh-hk": "繁体中文",
        en: "英文",
        vi: "越南文"
      }
    };
  },
  filters: {
    formatStatus(val) {
      let status;
      switch (val) {
        case 1:
          status = "未发布";
          break;
        case 2:
          status = "已发布";
          break;
        case 3:
          status = "已下架";
      }
      return status;
    },
    formatDate(val) {
      // val=val.replace(/-/g,'/').replace('T',' ');
      let re = formatDate(new Date(val).getTime(), "year");
      console.log(new Date(String(val)).getTime());
      return re;
    }
  },
  methods: {
    toDetail(item) {
      this.detail(item);
    },
    toPublish(item) {
      this.handleNotice(item, true);
    },
    soldOut(item) {
      this.handleNotice(item, false);
    }
  },
  mounted() {
    console.log(this.detail);
  }
};
</script>
