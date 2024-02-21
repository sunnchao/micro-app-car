<script setup lang="ts">
  import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue';
  import { useRouter } from 'block-libs/dist/router';

  const router = useRouter();
  const rootCount = ref(0);
  onMounted(() => {
    console.log('__microApp__', window.microApp);
  });

  // 监听函数
  function dataListener(data) {
    console.log('下发数据 {}', data);
    if (data.path) {
      router.push(data.path);
    }
  }

  nextTick(() => {
    // 基座监听下发的数据
    window.microApp?.addDataListener(dataListener, true);
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
