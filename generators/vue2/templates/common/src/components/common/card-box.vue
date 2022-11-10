<template>
  <div class="card-box">
    <p class="card-title">{{ title }}</p>
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardBox',
  props: {
    title: String // 标题
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.card-box {
  flex: 1;
  padding: 16.34px 16px;
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 15px;
  .card-title {
    font-size: 16px;
    font-weight: 700;
    color: #1b2129;
    position: relative;
    padding-left: 10px;

    &::after {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      content: '';
      width: 3px;
      height: 16px;
      background: #0091ff;
      border-radius: 5px;
    }
  }
}
</style>
