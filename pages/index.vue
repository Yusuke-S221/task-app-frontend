<template>
  <div>
    プロジェクト一覧
    <div v-for="project in projects" :key="project.id">{{ project.name }}</div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const res = await $axios.$get("http://localhost:80/api/projects");
    console.log(res);
    return {
      projects: res
    };
  }
};
</script>

<style></style>
