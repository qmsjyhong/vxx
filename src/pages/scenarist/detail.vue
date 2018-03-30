<template>
  <div class="detail-info">
    <div class="detail-info-item">
      <div class="text">显示大小</div>
      <div class="text">3600X1200</div>
    </div>
    <div class="detail-info-item">
      <div class="text">窗口大小</div>
      <div class="text">1620X1180</div>
    </div>
    <div class="detail-info-item">
      <div class="text">窗口位置</div>
      <div class="text">(600，408)</div>
    </div>
  </div>
</template>

<script>
  export default {

  };
</script>

<style lang="less" scoped>
  .detail-info {
      display: flex;
      width: 100%;
      &-item {
          flex: 1;
          .text {
              color: #fff;
              font-size: 0.3rem;
              &:first-child {
                  color: #b2b2b2;
                  font-size: 0.26rem;
                  margin-bottom: .3rem;
              }
          }
      }
  }
</style>

