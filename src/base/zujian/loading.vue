<template>
  <div>
    <div v-for="(item,indexs) in cons" :key="indexs" class="content content-mod">
        <p style="color: #ccc">12</p>
        <ul>
          <li
            v-for="(it,index) in item.items"
            :class="{contentModLiNow:index===cons.Index}"
            @click="con_hover_on(indexs,index)"
            :key="index"
          >
            <a>{{it.num}}</a>
          </li>
        </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: ['cons'],
  data () {
    return {
      doc: [],
      contentModLiNow: false
    }
  },
  methods: {
    con_hover_on: function(abc, we) {
      this.abc = we
      alert(abc)
    }
  }
}
</script>
<style scoped >
  .wrap {
    width: 1180px;
    margin: 0 auto;
    min-height: 500px;
    background: #fff;
    overflow: hidden;
  }
  .content {
    width: 49%;
    min-height: 300px;
    background: #fff;
    margin-bottom: 20px;
    box-sizing: border-box;
  }
  .content:nth-child(odd) {

  }
  .content:nth-child(even) {

  }
  .content-mod {
    position: relative;
  }
  .content-mod p {
    font-size: 30px;
    font-family: 微软雅黑;
    font-weight: bolder;
  }
  .content-mod ul {
    width: 100%;
    min-height: 222px;
    box-sizing: border-box;
    border: 1px solid #e4e4e4;
    margin-top: 30px;
  }
  .content-mod li {
    width: 100%;
    height: 35px;
    line-height: 35px;
    box-sizing: border-box;
    padding: 0 10px;
    font-size: 14px;
  }
  .content-mod li a {
    color: #000;
  }
  .contentModLiNow {
    background: rgb(85, 194, 194);
  }
  .contentModLiNow a {
    color: #fff !important;
  }
</style>
