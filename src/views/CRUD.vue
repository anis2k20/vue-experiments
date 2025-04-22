<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
const baseUrl = "https://crudcrud.com/api/615a4bdd9e1e4508b6aeca9dac67656e";

const todo = ref({
  title: "",
  completed: false,
});

const todos = ref([]);
const editedTitle = ref("");
const editingId = ref(null);

const loading = ref(true);

// add todo
async function addTodo() {
  loading.value = true;
  try {
    const response = await axios.post(`${baseUrl}/todos`, todo.value);
    todo.value.title = "";
    getTodos();
  } catch (e) {
    console.error(e);
  }
}
// delete todo
async function removeTodo(id) {
  loading.value = true;
  await axios.delete(`${baseUrl}/todos/${id}`);
  todos.value = todos.value.filter((todo) => {
    todo._id !== id;
  });
  getTodos();
}
// complete or not
async function toggleTodo(todo) {
  const updateTodo = ref({
    title: todo.title,
    completed: true,
  });
  try {
    const response = await axios.put(
      `${baseUrl}/todos/${todo._id}`,
      updateTodo.value
    );
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}
// get todos
async function getTodos() {
  try {
    const response = await axios.get(`${baseUrl}/todos`);
    todos.value = response.data;
    loading.value = false;
  } catch (e) {
    console.error(e);
  }
}

// edit todo
function editTodo(todo) {
  editingId.value = todo._id;
  editedTitle.value = todo.title;
}

function saveTodo(todo) {
  const updateTodo = {
    title: editedTitle.value,
    completed: todo.completed,
  };

  try {
    axios.put(`${baseUrl}/todos/${todo._id}`, updateTodo);
    todo.title = editedTitle.value;
    editingId.value = null;
  } catch (e) {
    console.error(e);
  }
}

async function resetAllTodos() {
  try {
    for (const todo of todos.value) {
      await axios.delete(`${baseUrl}/todos/${todo._id}`);
    }
    todos.value = [];
  } catch (e) {
    console.error(e);
  }
}

async function removeCompletedTask() {
  try {
    const deletedId = ref(null);
    for (const todo of todos.value) {
      if (todo.completed) {
        deletedId.value = todo._id;
        await axios.delete(`${baseUrl}/todos/${deletedId.value}`);
      }
    }
    getTodos();
  } catch (e) {
    console.error(e);
  }
}

onMounted(() => {
  getTodos();
});
</script>

<template>
  <div class="w-full h-screen bg-gray-100 pt-8">
    <div class="bg-white p-6 max-w-lg mx-auto">
      <form @submit.prevent="addTodo" class="w-full text-center">
        <h1 class="text-3xl text-black font-bold">ToDo App</h1>
        <div class="pt-2 flex w-full">
          <input
            class="w-full border-b-2 outline-none border-gray-500 text-black"
            type="text"
            placeholder="Enter your task here"
            v-model="todo.title"
          />
          <button
            type="submit"
            class="ml-2 border-2 border-green-500 p-2 text-green-500 hover:text-white hover:bg-green-500 rounded-lg flex"
          >
            <svg
              class="h-6 w-6"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <circle cx="12" cy="12" r="9" />
              <line x1="9" y1="12" x2="15" y2="12" />
              <line x1="12" y1="9" x2="12" y2="15" />
            </svg>
            <span>Add</span>
          </button>
        </div>
      </form>
      <div class="mt-8">
        <div v-if="loading">
          <div class="bg-white p-6 space-y-4">
            <!-- List Item Skeletons -->
            <div class="space-y-4">
              <div v-for="_ in 4" class="flex items-center space-x-4">
                <div class="w-8 h-8 rounded animate-shimmer"></div>
                <div class="flex-1 h-6 animate-shimmer rounded"></div>
                <div class="w-20 h-8 rounded animate-shimmer"></div>
              </div>
            </div>
          </div>
        </div>

        <ul v-else>
          <li v-for="todo in todos" :key="todo._id" class="p-2 rounded-lg">
            <div class="flex flex-row items-center justify-between">
              <div class="flex gap-2 items-center">
                <input
                  type="checkbox"
                  class="h-5 w-5"
                  @change="toggleTodo(todo)"
                  v-model="todo.completed"
                  :checked="todo?.completed"
                />
                <template v-if="editingId === todo._id">
                  <input
                    type="text"
                    v-model="editedTitle"
                    class="w-full border-b-2 outline-none border-gray-500 text-black"
                  />
                </template>

                <template v-else>
                  <p
                    class="text-lg text-left"
                    :class="
                      todo.completed
                        ? 'line-through text-gray-400'
                        : 'text-lg text-black'
                    "
                  >
                    {{ todo.title }}
                  </p>
                </template>
              </div>
              <div class="flex gap-2 items-center">
                <button
                  @click="removeTodo(todo._id)"
                  class="flex gap-1 text-red-500 hover:bg-red-500 hover:text-white duration-300 border border-red-500 p-2 rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
                    />
                  </svg>
                  <span>Remove</span>
                </button>
                <!-- edit button -->
                <template v-if="editingId === todo._id">
                  <button
                    @click="saveTodo(todo)"
                    class="flex gap-1 text-green-500 hover:bg-green-500 hover:text-white duration-200 border border-green-500 p-2 rounded-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20 6L9 17l-5-5"
                      />
                    </svg>
                    <span>Save</span>
                  </button>
                </template>

                <template v-else>
                  <button
                    @click="editTodo(todo)"
                    class="flex gap-1 text-yellow-500 border hover:bg-yellow-500 hover:text-white duration-200 border-yellow-500 p-2 rounded-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M15.748 2.947a2 2 0 0 1 2.828 0l2.475 2.475a2 2 0 0 1 0 2.829L9.158 20.144l-6.38 1.076l1.077-6.38zm-.229 3.057l2.475 2.475l1.643-1.643l-2.475-2.474zm1.06 3.89l-2.474-2.475l-8.384 8.384l-.503 2.977l2.977-.502z"
                      />
                    </svg>
                    <span>Edit</span>
                  </button>
                </template>
              </div>
            </div>
            <hr class="mt-2" />
          </li>
        </ul>
      </div>
      <div class="mt-8">
        <button
          @click="removeCompletedTask"
          class="border-2 border-red-500 p-2 text-red-500"
        >
          Clear Completed Task
        </button>
        <button
          @click="resetAllTodos"
          class="border-2 border-indigo-500 p-2 text-indigo-500 ml-4"
        >
          Reset Todo List
        </button>
      </div>
    </div>
  </div>
</template>

<style>
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite linear;
  background: linear-gradient(to right, #f6f7f8 4%, #edeef1 25%, #f6f7f8 36%);
  background-size: 1000px 100%;
}
</style>
