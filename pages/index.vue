<template>
  <div>
    <Header />
    <Title>プロジェクト一覧</Title>
    <el-button type="primary" class="create-button" @click="createProject"
      >新規作成</el-button
    >
    <div class="contents">
      <div
        v-for="project in projects"
        :key="project.id"
        :project="project"
        class="project-cards"
      >
        <Card>
          <ProjectCard>
            <div class="project-content">
              <div class="project-title">
                <h3>{{ project.title }}</h3>
              </div>
              <div class="project-description">
                {{ project.description }}
              </div>
            </div>
          </ProjectCard>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "~/components/Header.vue";
import Title from "~/components/Title.vue";
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

<style scoped>
.create-button {
  margin-left: 60px;
  font-size: 16px;
  font-weight: bold;
}

.contents {
  margin: 30px;
  display: flex;
  flex-wrap: wrap;
}

.project-cards {
  width: 48%;
  margin: 10px;
  box-sizing: border-box;
}
</style>
