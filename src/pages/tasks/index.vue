<template>
  <div id="tasks">
    <keep-alive>
        <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'tasks'
}
</script>
