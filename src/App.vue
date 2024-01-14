<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRouter } from '@shared/router';

  const router = useRouter();
  const rootCount = ref(0);
  onMounted(() => {
    console.log('__MICRO_APP_BASE_ROUTE__', window.__MICRO_APP_BASE_ROUTE__);
    console.log('__MICRO_APP_BASE_ROUTE__', window.__MICRO_APP_BASE_APPLICATION__);
    console.log('__MICRO_APP_BASE_ROUTE__', window.__MICRO_APP_PUBLIC_PATH__);
    console.log('__MICRO_APP_BASE_ROUTE__', window.__MICRO_APP_NAME__);
    console.log('__MICRO_APP_BASE_ROUTE__', window.__MICRO_APP_ENVIRONMENT__);
  });

  // 监听基座下发的数据变化
  window.microApp.addDataListener((data) => {
    console.log('基座下发的数据变化', data);
    // 当基座下发跳转指令时进行跳转
    if (data.path) {
      router.push(data.path);
    }
  });

  window.microApp.addGlobalDataListener((data) => {
    console.log('全局数据', data);
    rootCount.value = data.rootCount;
  });
</script>

<template>
  <div style="width: 100%; height: 100%; display: flex">
    <!--左侧菜单-->
    <div style="width: 50px; height: 100%; background-color: #fff; border-right: 1px solid #ccc">
      <div>
        <button @click="() => router.push('/home')">首页</button>
      </div>
      <div>
        <button @click="() => router.push('/about')">关于</button>
      </div>
    </div>
    <!--右侧-->
    <div style="flex: 1; height: 100%; background-color: #fff">
      rootCount: {{ rootCount }}
      <router-view />
    </div>
  </div>
</template>

<style scoped>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
</style>
