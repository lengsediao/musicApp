<template>
  <div class="todo">
    <input class="todo_inp" type="text" v-model="getValue" @keyup.enter="getModel" placeholder="记录行程"/>
    <div class="todo_list">
      <div class="get_todo" v-for="(item, index) in todoList" :key="index">
        <input type="checkbox" @click="checkVal(item)" class="todo_checkbox" />
        <span class="todo_text">{{item.lable}}</span>
        <span class="todo_close" @click="del(index)" v-if="item.isFinished">X</span>
      </div>
    </div>
    <div class="todo_operation">
      <div class="todo_per">{{listLength}}条记录</div>
      <div class="todo_per">
        <button>所有</button>
        <button>未完成</button>
        <button>已完成</button>
      </div>
      <div class="todo_per">清除所有</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      getValue: '',
      todoList: [],
      listLength: 0
    }
  },
  computed: {

  },
  methods: {
    getModel () {
      this.todoList.unshift({
        lable: this.getValue,
        isFinished: false
      })
      this.listLength = this.todoList.length
    },
    checkVal (as) {
      if (!as.isFinished) {
        as.isFinished = true
      } else {
        as.isFinished = false
      }
    },
    del (idenx) {
      this.todoList.splice(idenx, 1)
      this.listLength = this.todoList.length
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .todo
    width: 90%
    margin: 0 auto
    .todo_inp
      box-sizing: border-box
      width: 100%
      height: 30px
      border: none
      background: transparent
      color: $color-text
      padding: 5px 10px
      border-bottom: 1px solid $color-dialog-background
    .todo_list
      margin: 10px 0
      box-sizing: border-box
      .get_todo
        display: flex
        margin: 10px 0
        &span
          flex: 1
        .todo_checkbox,.todo_text
          margin-right: 10px
    .todo_operation
      display: flex
      justify-content: space-between
      .todo_per
        line-height: 30px
        &&button
          border: none
          background: #000
</style>
