<template>
  <div class="bar">
    <h1 @click="onHandleClick">Bar</h1>
    <p>Component</p>
    <h2>异步Ajax数据：</h2>
    <span v-for="(value,index) in msg" :key="index">{{ value.name }}--------{{ value.age }}</span>
  </div>
</template>

<script>
const fetchInitialData = ({ store }) => {
  return store.dispatch("fetchBar");
};

export default {
  asyncData: fetchInitialData,

  methods: {
    onHandleClick() {
      alert("bar");
    }
  },

  mounted() {
    console.log('foo组件生成')
  },

  computed: {
    msg() {
      return this.$store.state.bar;
    }
  }
};
</script>

<style>
.bar {
  background: bisque;
  color: red
}
</style>
