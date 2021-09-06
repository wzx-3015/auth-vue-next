<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-05-06 17:47:26
 * @LastEditTime: 2021-05-14 15:26:42
 * @LastEditors: @Xin (834529118@qq.com)
-->
<template>
  <div class="home-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" @select="handleMenuSelect">
          <el-menu-item :index="String(item.meta.id)" v-for="item in menus" :key="item.meta.id">
            <i class="el-icon-menu"></i>
            <template #title>{{ item.meta.title }}</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        ==============
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import useStoreAuxiliary from '@/plugins/useStoreAuxiliary'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'HomeLayout',
  setup() {
    const { getStoreState } = useStoreAuxiliary()

    const Router = useRouter()
    const route = useRoute()

    console.log('route', route)

    const state = getStoreState('user')

    const defaultActive = computed(() => String(route.meta.id))

    console.log(state.menus)

    const handleMenuSelect = index => {
      console.log(index)
      const findMenu = state.menus.find(v => v.meta.id === Number(index))

      if (findMenu) {
        Router.push({ name: findMenu.name })
      }
    }

    return {
      menus: state.menus,
      handleMenuSelect,
      defaultActive,
    }
  },
}
</script>

<style></style>
