<script setup lang="ts">
import { ref, computed, reactive, onMounted } from "vue";

const newTodo = ref("");
let todos = reactive([]);
const doneCount = ref(0);
const total = ref(0);
const cacheName = ref("");
const cacheId = ref("");
const filterType = ref("all");
const checkAllTodo = ref(false);

const filterTodos = computed(() => {
  switch (filterType.value) {
    case "undone":
      return todos.filter((item) => !item.done);
    case "done":
      return todos.filter((item) => item.done);
    default:
      return todos;
  }
});

const getHistory = () => {
  if (localStorage.getItem("todo_list_history")) {
    todos = JSON.parse(localStorage.getItem("todo_list_history"));
  }
};

const pushHistory = () => {
  const localHistory = JSON.stringify(todos);
  // 存入 localStorage
  localStorage.setItem("todo_list_history", localHistory);
};

const addTodo = () => {
  if (!newTodo.value.trim()) {
    alert("请输入待办事项");
    return;
  }

  const item = { id: Date.now(), name: newTodo.value, done: false };
  todos = [item, ...todos];
  newTodo.value = "";
  pushHistory();
};

const deleteTodo = (id) => {
  if (window.confirm("确认删除？")) {
    const index = todos.findIndex((item) => item.id === id);
    todos.splice(index, 1);
  }
};

const toggleDone = (id, done) => {
  const index = todos.findIndex((item) => item.id === id);
  todos[index].done = !done;
  pushHistory();
};

const editTodo = (id, name) => {
  cacheName.value = name;
  cacheId.value = id;
};

const doneEdit = (item) => {
  if (cacheName.value.trim()) {
    alert("编辑事项不能为空");
    return;
  }

  const index = todos.findIndex((item) => item.id === cacheId.value);
  todos[index].name = cacheName.value;
  cacheName.value = "";
  cacheId.value = "";
  pushHistory();
};

const cancelEdit = () => {
  cacheName.value = "";
  cacheId.value = "";
};

const toggleAllTodo = () => {
  checkAllTodo.value = !checkAllTodo.value;
  todos = todos.map((item) => {
    return { ...item, done: checkAllTodo.value };
  });
  pushHistory();
};

const clearAllDone = () => {
  if (window.confirm("确定删除已完成任务？")) {
    todos = todos.filter((item) => !item.done);
    filterType.value = "all";
  }
  pushHistory();
};

onMounted(() => {
  getHistory();
});
</script>
<template>
  <div class="container">
    <!-- todolist header -->
    <div class="input-group bg-white box-shadow rounded-1 overflow-hidden mb-3">
      <!-- add todo -->
      <input
        type="text"
        class="form-control flex-fill"
        @keyup.enter="addTodo"
        v-model="newTodo"
        placeholder="新增待办"
      />
      <button
        type="button"
        class="btn btn-size-lg btn-dark rounded-1 m-1"
        @click="addTodo"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"
          />
        </svg>
      </button>
    </div>

    <div class="bg-white box-shadow rounded-1 overflow-hidden mb-3">
      <!-- todolist nav -->
      <ul class="btn-group">
        <!-- filter todo -->
        <li class="col" :class="filterType === 'all' ? 'active' : ''">
          <button class="btn" @click.prevent="filterType = 'all'">全部</button>
        </li>
        <li class="col" :class="filterType === 'undone' ? 'active' : ''">
          <button class="btn" @click.prevent="filterType = 'undone'">
            待完成
          </button>
        </li>
        <li class="col" :class="filterType === 'done' ? 'active' : ''">
          <button class="btn" @click.prevent="filterType = 'done'">
            已完成
          </button>
        </li>
      </ul>

      <!-- todolist list -->
      <div class="list-frame vh-50">
        <ul class="list-group">
          <div>
            <!-- todolist item -->
            <li v-for="item in filterTodos" :key="item.id" class="input-group">
              <!-- edit todo -->
              <input
                v-if="cacheId === item.id"
                @keyup.enter="doneEdit(item)"
                @keyup.esc="cancelEdit"
                v-model="cacheName"
                class="form-edit flex-fill"
                type="text"
              />
              <!-- toggle todo -->
              <div v-else class="input-group">
                <input
                  type="checkbox"
                  :id="item.id"
                  @click="toggleDone(item.id, item.done)"
                  :checked="item.done"
                  class="form-check m-4"
                />
                <label
                  :for="item.id"
                  v-text="item.name"
                  @dblclick="editTodo(item.id, item.name)"
                  :class="item.done ? 'del' : ''"
                  class="flex-fill lh-1 py-4 ms-1"
                >
                </label>
              </div>
              <!-- delete todo -->
              <button
                type="button"
                @click="deleteTodo(item.id)"
                class="btn btn-size-base list-btn-warning m-3"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29l-4.3 4.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4.29-4.3l4.29 4.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"
                  />
                </svg>
              </button>
            </li>
          </div>
        </ul>
      </div>

      <!-- todolist footer -->
      <div class="d-flex justify-content-between mb-2">
        <div class="d-flex align-items-center">
          <!-- toggle all todo -->
          <input
            type="checkbox"
            @click="toggleAllTodo"
            :checked="
              (checkAllTodo = doneCount === total && total !== 0 ? true : false)
            "
            class="form-check m-4"
          />
          <!-- todos scoreboard -->
          <h3 class="text-dark-gray">
            已完成
            <span
              v-text="
                (doneCount = todos.reduce(
                  (pre, cur) => pre + (cur.done ? 1 : 0),
                  0
                ))
              "
            ></span>
            / 全部 <span v-text="(total = todos.length)"></span>
          </h3>
        </div>
        <!-- clear all done todo -->
        <button
          type="button"
          @click="clearAllDone"
          class="btn btn-text-warning m-4 me-8"
        >
          清除已完成項目
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Noto+Sans&family=Baloo+2&display=swap');
@import url('https://pro.fontawesome.com/releases/v5.10.0/css/all.css'); */
.activity_title {
  padding: 4px;
  display: flex;
  justify-content: center;
}
.activity_title a {
  display: flex;
  align-items: center;
  font-size: 40px;
  font-weight: bold;
}
@media (max-width: 768px) {
  .activity_title a {
    font-size: 24px;
  }
  .activity_title a span {
    display: none;
  }
}
.nav-custom {
  display: flex;
  margin-left: 4px;
  font-size: 32px;
}
.nav-custom a {
  display: flex;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
  transition: all 0.2s;
}
.nav-custom a:hover {
  background: rgba(255, 255, 255, 0.2);
}
.container-box {
  height: 60vh;
  width: 100%;
  overflow: hidden;
  position: relative;
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  font-size: 16px;
  padding: 8px;
}
body {
  font-family: "Noto Sans", "Baloo 2";
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  background: no-repeat
    linear-gradient(174deg, #ffd370 0%, #ffd370 56%, #fff 56%, #fff 100%);
}
footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 8px;
}
ul {
  margin-block-end: 0;
  margin-block-start: 0;
  padding-inline-start: 0px;
}
a {
  text-decoration: none;
  color: #a37100;
}
a:hover {
  color: #8a5f00;
}
.del {
  color: #cfccc7;
  text-decoration: line-through;
  text-decoration-color: #b7b3ac;
}
.lh-1 {
  line-height: 1;
}
.text-primary {
  color: #f0a600;
}
.text-primary a {
  color: #bd8300;
}
.container {
  max-width: 500px;
  margin: 0px auto;
}
.col {
  flex: 1 0 0%;
}
.input-group {
  display: flex;
  align-items: center;
  width: 100%;
}
.form-control {
  border: 2px solid transparent;
  padding: 12.8px 10px;
  font-size: 16px;
}
.form-control:focus {
  border: 2px solid #ffe3a3;
  border-radius: 10px 0 0 10px;
  outline: none;
}
.form-edit {
  border: 2px solid #ffe3a3;
  border-radius: 4px;
  padding: 12.8px 2px;
  font-size: 16px;
  margin-left: 60px;
}
.form-edit:focus {
  border: 2px solid #ffd370;
  outline: none;
}
.form-check {
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  cursor: pointer;
}
.form-check:checked:before {
  position: absolute;
  content: "";
  top: -5%;
  left: -5%;
  width: 110%;
  height: 110%;
  background: #fff;
  z-index: 1;
}
#container.dark .form-check:checked:before {
  background: #333;
}
#container.dark input {
  background-color: #333;
}
input {
  background-color: #f3f3f3;
}
.form-check:checked:after {
  position: absolute;
  content: "";
  top: 50%;
  left: 50%;
  width: 40%;
  height: 80%;
  border: 1px solid #ffd370;
  border-width: 0 3.2px 3px 0;
  transform: translate(-50%, -60%) rotate3d(0, 0.8, 0.8, 60deg);
  z-index: 2;
}
.list-frame {
  width: 100%;
  overflow: hidden;
}
.list-group {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.list-group li .list-btn-warning {
  color: #0000005c;
}
.list-group li:hover {
  background: #f2f2f2;
}
#container.dark .list-group li:hover {
  background: #2e2e2e;
}
#container.dark li:hover .form-check:checked:before {
  background: #2e2e2e;
}
.list-group li:hover .form-check:checked:before {
  background: #f2f2f2;
}
.list-group li:hover .list-btn-warning {
  color: #333;
}
.list-group li:hover .list-btn-warning:hover {
  color: #fff;
  background: #f55;
}
.list-group label {
  border-bottom: 1px solid #cbc2c249;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.btn {
  padding: 3px;
  background: transparent;
  color: #333;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  text-align: center;
  vertical-align: middle;
  line-height: 1;
  cursor: pointer;
  transition: 0.2s;
}
.btn-size-base {
  padding: 6px 8.5px;
}
.btn-size-base i {
  transform: translateY(1.5px);
}
.btn-size-lg {
}
.btn-dark {
  color: #fff;
  background: #333;
  border: 1px solid #333;
}
.btn-dark:hover {
  background: #fff;
  border-color: #fff;
  color: #333;
}
.btn-text-warning {
  padding: 4px;
  color: #9f9a91;
}
.btn-text-warning:hover {
  color: #fff;
  background: #f55;
}
#container.dark .btn-text-warning:hover {
  color: #2c2c2c;
  background: #f55;
}
.btn-group {
  display: flex;
}
.btn-group button {
  padding: 16px;
  display: inline-block;
  text-decoration: none;
  width: 100%;
  color: #9f9a91;
  text-align: center;
  vertical-align: middle;
  border-bottom: 2px solid #efefef66;
  border-radius: 0;
}
.btn-group button:hover {
  background: #f2f2f2;
}

#container.dark .btn-group button:hover {
  background: #2e2e2e;
}
.btn-group .active button {
  color: #adadad;
  font-weight: bold;
  border-color: #333;
}
#container.dark .btn-group .active button {
  border-color: #a9a7a7;
}
#container.dark .btn-group button {
  border-color: #636363;
}
.bg-white {
  background: #fff;
}
#container.dark .bg-white {
  background: #333;
}
.box-shadow {
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.15);
}
.border-0 {
  border: 0;
}
.rounded-1 {
  border-radius: 10px;
}
.vh-50 {
  min-height: 10vh;
}
.text-dark-gray {
  color: #9f9a91;
  font-size: min(16px, 4.5vw);
}
.d-flex {
  display: flex;
}
.justify-content-between {
  justify-content: space-between;
}
.justify-content-center {
  justify-content: center;
}
.align-items-center {
  align-items: center;
}
.flex-fill {
  flex: 1 1 auto;
}
.overflow-hidden {
  overflow: hidden;
}
.m-1 {
  margin: 4px;
}
.ms-1 {
  margin-left: 4px;
}
.m-3 {
  margin: 16px;
}
.mb-3 {
  margin-bottom: 16px;
}
.m-4 {
  margin: 20px;
}
.me-8 {
  margin-right: 60px;
}
.p-0 {
  padding: 0;
}
.py-2 {
  padding-top: 8px;
  padding-bottom: 8px;
}
.px-3 {
  padding-left: 16px;
  padding-right: 16px;
}
</style>
