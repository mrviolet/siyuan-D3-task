<!--
 * @Author: yl_li
 * @Date: 2024-08-23
 * @LastEditors: yl_li
 * @LastEditTime: 2024-11-27
 * @description: 任务管理主页面
-->
<template>
  <div class="d3-mt h-full w-full flex ">
    <div class="bg-[#eee9dc] flex basis-full gap-x-2 p-2 mt-manage-base">
      <!-- 左侧导航栏 -->
      <div class="flex-none w-44 flex flex-col">
        <!-- 导航栏上行固定部分 -->
        <div class="grid gap-y-1">
          <D3MenuItem lable="今天" id="today" :icon=CheckCorrect @clickNav="openWorkspeace" />
          <D3MenuItem lable="明天" id="tomorrow" :icon=Plan @clickNav="openWorkspeace" />
          <D3MenuItem lable="收集箱" id="collect" :icon=AllApplication @clickNav="openWorkspeace" />
        </div>
        <!-- 导航栏下行, 笔记列表部分 -->
        <!-- 标题 -->
        <div class="font-bold border-t border-slate-400 mx-3 pt-4 mt-4 mb-2">文档树</div>
        <!-- 导航组 -->
        <div class="overflow-y-auto mb-4">
          <D3MenuGroup class="grid border-t" :navs="navList" :level=0 @clickNav="openWorkspeace" />
        </div>
      </div>
      <!-- 中间工作区 -->
      <div class="flex-1 w-64 p-4 pr-2 bg-white rounded-lg">
        <!-- 文档标题 -->
        <div class="h-[44px]">
          <div class="font-bold mb-2 text-xl">
            <span v-for="title in todoTitle">
              <span>{{ title }}</span>
              <span v-if="title !== todoTitle[todoTitle.length - 1]" class="text-slate-300"> > </span>
            </span>
          </div>
        </div>
        <!-- 待办列表 -->
        <TodoList style="height: calc(100% - 44px)" class="w-full flex flex-col overflow-y-auto" :list="todoList"
          @pick="pickTodo" />
      </div>
      <!-- 右侧编辑区 -->
      <div class="flex-1 w-22 flex flex-col">
        <!-- 任务内容编辑 -->
        <div class="bg-white rounded-lg p-4 pb-2 flex-grow max-h-[90%]">
          <TodoEdit :todo="editTodo" />
        </div>
        <!-- 任务时间线 -->
        <div class="bg-white rounded-lg mt-2 max-h-[50%] p-4 pr-2">
          <TimeLine class="h-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import D3MenuItem from '../components/menu/D3MenuItem.vue';
  import D3MenuGroup from '../components/menu/D3MenuGroup.vue';
  import TodoList from './TodoList.vue';
  import TodoEdit from './TodoEdit.vue';
  import TimeLine from '../components/todo/TimeLine.vue';

  import { useTodoStore } from '../stores/mtask';
  import { useNavStore } from '../stores/mtask';
  import { AllApplication, CheckCorrect, Plan } from '@icon-park/vue-next'
  import { getOpenNotebookList } from '../api/MtaskApi';
  import { getTodosByBoxid, getTodosByDocid } from '../api/QueryTodoApi';
  import { ref, computed } from 'vue';

  const navList = ref<Nav[]>([])
  const todoList = ref<Todo[]>([])
  const editTodo = ref<Todo>({ blockId: '', hpath: '', content: '', isFinished: false })
  const navTitle = ref<string>('今天')
  const navSelected = useNavStore();
  const todoSelected = useTodoStore();

  const todoTitle = computed(() => {
    // 根据 / 分割字符串
    return navTitle.value.split('/')
  });

  // 获取笔记本列表
  getOpenNotebookList().then(res => {
    navList.value = res.map((item: { name: string; id: string; closed: boolean }): Nav => {
      return {
        label: item.name,
        id: item.id,
        child: [],
        notebook: item.id,
        path: '/'
      }
    })
  })

  function openWorkspeace(param: { navid: string, level: number, label: string }) {
    navSelected.change(param.navid)
    navTitle.value = param.label
    if (param.level === 0) {
      // 获取笔记本下所有 todo
      getTodosByBoxid(param.navid).then(res => {
        todoList.value = res
      })
    } else if (param.level === -1) {
      todoList.value = []
    } else {
      // 获取文档下所有 todo
      getTodosByDocid(param.navid).then(res => {
        todoList.value = res
      })
    }
  }

  /**
   * 当 todo list 中的 item 被点击时
   * 1、将 todo id 传递给 store, 作为被选中的 todo
   * 2、根据 block id 遍历 todo list, 设置 editTodo 为当前被选中的 todo
   * @param blockId todo id
   */
  function pickTodo(blockId: string) {
    todoSelected.change(blockId)
    for (let todo of todoList.value) {
      if (todo.blockId === blockId) {
        editTodo.value = todo
        break
      }
    }
  }
</script>

<style lang="css">
  .mt-manage-base svg {
    fill: none;
  }
</style>
