<template>
  <div>
    <Header />
    プロジェクト一覧
    <div v-for="project in projects" :key="project.id" :project="project">
      <Card>
        <ProjectCard>{{ project.title }}</ProjectCard>
      </Card>
    </div>
  </div>
</template>

<script>
import Header from "~/components/Header.vue";
import Card from "~/components/Card.vue";
import ProjectCard from "~/components/ProjectCard.vue";

export default {
  components: {
    Header,
    Card,
    ProjectCard
  },

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
