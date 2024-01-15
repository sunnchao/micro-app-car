<script setup lang="ts">
  import { onMounted, onBeforeUnmount, ref } from 'vue';
  import { useRouter } from '@shared/router';

  const router = useRouter();
  const rootCount = ref(0);
  onMounted(() => {
    console.log('__MICRO_APP_PUBLIC_PATH__', window.__MICRO_APP_PUBLIC_PATH__);
    console.log('__MICRO_APP_NAME__', window.__MICRO_APP_NAME__);
    console.log('__MICRO_APP_ENVIRONMENT__', window.__MICRO_APP_ENVIRONMENT__);

    // 基座监听下发的数据
    window.microApp?.addDataListener(
      window.__MICRO_APP_NAME__,
      (data) => {
        if (data.path) {
          router.push(data.path);
        }
      },
      true,
    );
  });

  // 基座监听全局下发的数据
  window.microApp?.addGlobalDataListener((data) => {
    console.log('全局数据', data);
    rootCount.value = data.rootCount;
  }, true);

  onBeforeUnmount(() => {
    window.microApp?.clearDataListener();
    window.microApp?.clearGlobalDataListener();
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
