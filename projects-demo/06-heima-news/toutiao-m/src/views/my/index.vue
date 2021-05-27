<template>
  <div class="my-container">
    <van-cell-group class="my-info">
      <van-cell class="base-info" title="单元格" value="内容" center :border="false">
        <van-image class="avatar" slot="icon" round fit="cover" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
        <div class="name" slot="title">昵称</div>
        <van-button class="update-btn" size="small" round>编辑资料</van-button>
      </van-cell>
      <van-grid class="data-info" :border="false">
        <van-grid-item class="data-info-item">
          <span class="text-wrap" slot="text">
            <div class="count">123</div>
            <div class="text">头条</div>
          </span>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <span class="text-wrap" slot="text">
            <div class="count">123</div>
            <div class="text">关注</div>
          </span>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <span class="text-wrap" slot="text">
            <div class="count">123</div>
            <div class="text">粉丝</div>
          </span>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <span class="text-wrap" slot="text">
            <div class="count">123</div>
            <div class="text">获赞</div>
          </span>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <van-grid class="nav-grid" :column-num="2">
      <van-grid-item class="nav-grid-item" icon-prefix="icon" icon="shoucang" text="收藏" />
      <van-grid-item class="nav-grid-item" icon-prefix="icon" icon="lishi" text="历史" />
    </van-grid>
    <van-cell title="消息通知" is-link to="" />
    <van-cell title="小智同学" is-link to="" />
    <van-cell title="退出登录" />
  </div>
</template>

<script>
export default {
  name: 'MyIndex'
}
</script>

<style lang="less" scoped>
.my-container {
  .my-info {
    background: url('./banner.png') no-repeat;
    background-size: cover;
    .base-info {
      box-sizing: border-box;
      height: 115px;
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name {
        font-size: 15px;
        color: #fff;
      }
      .update-btn {
        // width: 58px;
        height: 16px;
        font-size: 10px;
        color: #666666;
      }
    }
    .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }
    /deep/ .van-grid-item__content {
      background-color: unset;
    }
  }
   /deep/ .nav-grid {
    .nav-grid-item {
      height: 70px;
     .icon {
        font-size: 22px;
      }
      .icon-shoucang {
        color: #eb5253;
      }
      .icon-lishi {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333;
      }
    }
  }
}
</style>
