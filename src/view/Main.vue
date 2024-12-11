<!--
 * @Author: yl_li
 * @Date: 2024-08-23
 * @LastEditors: yl_li
 * @LastEditTime: 2024-12-11
 * @description: 任务管理主页面
-->
<template>
  <div class="d3-mt h-full w-full flex ">
    <div class="bg-[#eee9dc] flex basis-full gap-x-2 p-2 mt-manage-base">
      <!-- 左侧导航栏 -->
      <div class="flex-none w-44 flex flex-col">
        <!-- 导航栏上行固定部分 -->
        <div class="grid gap-y-1">
          <D3MenuItem lable="今天" id="today" :icon=CheckCorrect @clickNav="navClicked" />
          <D3MenuItem lable="明天" id="tomorrow" :icon=Plan @clickNav="navClicked" />
          <D3MenuItem lable="收集箱" id="collect" :icon=AllApplication @clickNav="navClicked" />
        </div>
        <!-- 导航栏下行, 笔记列表部分 -->
        <!-- 标题 -->
        <div class="font-bold border-t border-slate-400 mx-3 pt-4 mt-4 mb-2">文档树</div>
        <!-- 导航组 -->
        <div class="overflow-y-auto mb-4">
          <D3MenuGroup class="grid border-t" :navs="navList" :level=0 @clickNav="navClicked" />
        </div>
      </div>
      <!-- 中间工作区 -->
      <div class="flex-1 w-64 p-4 pt-2 pr-2 bg-white rounded-lg">
        <!-- 文档标题 -->
        <div>
          <div class="min-h-4 flex">
            <!-- 头部标题部分 -->
            <div style="width: calc(100% - 44px)" class="mb-2 text-gray-400 text-xs break-all ">
              <box class="pr-1" theme="outline" size="12" fill="#6b7280" />
              <span v-for="(title, index) in todoTitle.titleList">
                <bookshelf v-if="index > 0" theme="outline" class="pr-1" size="12" fill="#6b7280" />
                <span class="break-all">{{ title }}</span>
                <span v-if="index < todoTitle.titleList.length - 1"> / </span>
              </span>
            </div>
            <!-- 工具栏部分 -->
            <div class="w-[60px]">
              <!-- 隐藏已完成 or 展示已完成 -->
              <checklist class="p-1 rounded bg-gray-200 mr-1 cursor-pointer ariaLabel" theme="outline" size="16"
                fill="#000" aria-label="隐藏已完成" v-show="todoListParam.showFinished"
                @click="changeFinishedFlag(false)" />
              <checklist class="p-1 rounded mr-1 cursor-pointer ariaLabel" theme="outline" size="16" fill="#d1d5db"
                aria-label="展示已完成" v-show="!todoListParam.showFinished"
                @click="changeFinishedFlag(true)" />
              <!-- 隐藏倒计时 or 展示倒计时 -->
              <timer class="p-1 rounded bg-gray-200 mr-1 cursor-pointer ariaLabel" theme="outline" size="16" fill="#000"
                aria-label="隐藏倒计时" v-show="todoListParam.showTimer" @click="todoListParam.changeShowTimer(false)" />
              <timer class="p-1 rounded mr-1 cursor-pointer ariaLabel" theme="outline" size="16" fill="#d1d5db"
                v-show="!todoListParam.showTimer" aria-label="展示倒计时" @click="todoListParam.changeShowTimer(true)" />
            </div>
          </div>
          <!-- 主标题 -->
          <div class="font-bold mb-2 text-xl break-all">
            <span>{{ todoTitle.mainTitle }}</span>
          </div>
        </div>
        <!-- 待办列表 -->
        <TodoList style="height: calc(100% - 44px)" class="w-full flex flex-col overflow-y-auto" :list="todoList"
          @pick="pickTodo" @changed="changeTodo" />
      </div>
      <!-- 右侧编辑区 -->
      <div class="flex-1 w-22 flex flex-col">
        <!-- 任务内容编辑 -->
        <div class="bg-white rounded-lg p-4 pb-2 flex-grow max-h-[80%]">
          <TodoEdit :todo="editTodo" @changed="changeTodo" />
        </div>
        <!-- 任务时间线 -->
        <div class="bg-white rounded-lg mt-2 min-h-[20px] max-h-[50%] p-4 pr-2">
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

  import { debounce } from 'vue-debounce'
  import { useTodoStore, useNavStore, useTodoListParamStore } from '../stores/mtask';
  import { AllApplication, CheckCorrect, Plan, Box, Bookshelf, Checklist, Timer } from '@icon-park/vue-next'
  import { getOpenNotebookList, editBlockMkByBlockId, editPlanTime, getBlockByBlockid } from '../api/MtaskApi';
  import { getTodosByBoxid, getTodosByDocid } from '../api/QueryTodoApi';
  import { ref, computed } from 'vue';

  const navList = ref<Nav[]>([])
  const todoList = ref<Todo[]>([])
  const editTodo = ref<Todo>({ blockId: '', hpath: '', mk: '', dom: '', isFinished: false, pid: '', docId: '', pMarkdown: '' })
  // 待办事项标题, 默认为"今天"
  const navTitle = ref<string>('今天')

  // 使用存储在 store 中的内容
  const navSelected = useNavStore();
  const todoSelected = useTodoStore();
  const todoListParam = useTodoListParamStore();

  // 标题部分
  const todoTitle = computed(() => {
    const titleList = navTitle.value.split('/')
    const mainTitle = titleList.pop()
    // 根据 / 分割字符串
    return { mainTitle, titleList }
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

  /**
   * 当侧边导航栏被点击时
   * 1、判断被点击的导航栏是否是当前激活的导航栏，若是则无操作
   * 2、加载 todo list
   * 3、置空 edit todo
   */
  function navClicked(param: { navid: string, level: number, label: string }) {
    if (param.navid !== navSelected.navid) {
      loadTodoList(param)
      pickTodo(null)
    }
  }

  /**
   * 获取 todo list
   * 根据 level 判断调用方法
   * level = -1, 今天、明天、收集箱中的一种
   * level = 0, 获取笔记本下所有 todo
   * level > 0, 获取文档下所有 todo
   */
  function loadTodoList(param: { navid: string, level: number, label: string }) {
    navSelected.change(param)
    navTitle.value = param.label
    let filterParam: TodoFilter = { state: 'unfinished' }
    if (todoListParam.showFinished) {
      filterParam.state = 'all'
    }
    if (param.level === -1) {
      todoList.value = []
    } else if (param.level === 0) {
      getTodosByBoxid(param.navid, filterParam).then(res => {
        todoList.value = res
      })
    } else {
      getTodosByDocid(param.navid, filterParam).then(res => {
        todoList.value = res
      })
    }
  }


  /**
   * 获取 todo list 的防抖函数
   */
  const loadTodoListDebounce = debounce((param: any) => { loadTodoList(param) }, 100)

  /**
   * 当 todo list 中的 item 被点击时
   * 1、将 todo id 传递给 store, 作为被选中的 todo
   * 2、根据 block id 遍历 todo list, 设置 editTodo 为当前被选中的 todo
   */
  function pickTodo(blockId: string | null) {
    if (blockId === null) {
      todoSelected.change("")
      editTodo.value = { blockId: '', hpath: '', mk: '', dom: '', isFinished: false, pid: '', docId: '',pMarkdown: '' }
    } else {
      todoSelected.change(blockId)
      for (let todo of todoList.value) {
        if (todo.blockId === blockId) {
          editTodo.value = todo
          break
        }
      }
    }
  }

  /**
   * 修改 todo 的内容
   * param.type = state 修改任务状态, 修改 pid
   * param.type = content 修改任务内容, 修改 blockId
   * param.type = time 修改任务时间, 修改 pid 
   * @param param todo 编辑内容
   */
  function changeTodo(param: { type: 'state' | 'content' | 'time', blockId: '', pid: '', val: string }) {
    switch (param.type) {
      case 'state':
        if (param.val.toString() == "true") {
          editTodo.value.isFinished = true
          getBlockByBlockid(param.pid).then(b => {
            const mk = b.markdown.replace(/^\* \[\s*\]/, '* [X]')
            editBlockMkByBlockId(param.pid, mk).then(() => {
              loadTodoListDebounce(navSelected)
            })
          })
        } else if (param.val.toString() == "false") {
          editTodo.value.isFinished = false
          getBlockByBlockid(param.pid).then(b => {
            const mk = b.markdown.replace(/^\* \[x\]/i, '* [ ]')
            editBlockMkByBlockId(param.pid, mk).then(() => {
              loadTodoListDebounce(navSelected)
            })
          })
        }
        break
      case 'content':
        editTodo.value.mk = param.val.toString()
        editBlockMkByBlockId(param.blockId, param.val.toString()).then(() => {
          loadTodoListDebounce(navSelected)
        })
        break
      case 'time':
        editTodo.value.planTime = new Date(param.val)
        editPlanTime(param.pid, param.val.toString()).then(() => {
          loadTodoListDebounce(navSelected)
        })
        break
    }

  }

  /**
   * 
   * @param flag 完成/未完成
   */
  function changeFinishedFlag(flag: boolean) {
    todoListParam.changeShowFinished(flag)
    loadTodoListDebounce(navSelected)
  }
</script>

<style lang="css">
  .mt-manage-base svg {
    fill: none;
  }
</style>
