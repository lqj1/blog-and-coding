<template>
  <div class="app">
    <h2>Vue实现TodoList</h2>
    <div class="todolist">
      <input type="text" v-model="todo" @keyup.enter="addData()" />
      <span>{{todo}}</span>
      <h3>正在进行</h3>
      <ul>
        <li v-for="(item, index) in list" :key="index" v-show="!item.checked">
          <input type="checkbox" v-model="item.checked" @change="setTodolist" />
          {{item.title}}----
          <button @click="deleteTodo(index)">删除</button>
        </li>
      </ul>
      <pre>{{list}}</pre>
      <h3>已经完成</h3>
      <ul>
        <li v-for="(item, index) in list" :key="index" v-show="item.checked">
          <input type="checkbox" v-model="item.checked" @change="setTodolist" />
          {{item.title}}----
          <button @click="deleteTodo(index)">删除</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import storage from './models/storage'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      todo: "",
      list: []
    }
  },
  methods: {
    addData () {
      this.list.push({
        title: this.todo,
        checked: false
      })
      this.todo = ""
      storage.set('todolist', this.list)
    },
    deleteTodo (index) {
      this.list.splice(index, 1)
      storage.set('todolist', this.list)
    },
    setTodolist () {
      storage.set('todolist', this.list)
    }
  },
  mounted () {
    let todolist = storage.get('todolist')
    if (todolist) {
      this.list = todolist
    }
  }
}
</script>
<style lang="scss" scoped>
.app {
  width: 500px;
  height: 500px;
  margin: 0 auto;
}
</style>
