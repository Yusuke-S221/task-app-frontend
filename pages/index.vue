<template>
  <div>
    <Header />
    <Title>プロジェクト一覧</Title>
    <el-button
      type="primary"
      class="create-button"
      @click="createDialogVisible = true"
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
    <el-dialog title="プロジェクト新規作成" :visible.sync="createDialogVisible">
      <el-form :model="form">
        <el-form-item label="プロジェクト名" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="プロジェクト概要" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createDialogVisible = false">キャンセル</el-button>
        <el-button type="primary" @click="createProject">新規作成</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Header from "~/components/Header.vue";
import Title from "~/components/Title.vue";
import Card from "~/components/Card.vue";
import ProjectCard from "~/components/ProjectCard.vue";
import Element from 'element-ui';

export default {
  components: {
    Header,
    Card,
    ProjectCard
  },

  data() {
    return {
      createDialogVisible: false,
      form: {
        title: "",
        description: ""
      },
      formLabelWidth: "140px"
    };
  },

  async asyncData({ $axios }) {
    const res = await $axios.$get("http://localhost:80/api/projects");
    return {
      projects: res
    };
  },

  methods: {
    closeCreateDialog() {
      this.form.title = "";
      this.form.description = "";
      this.createDialogVisible = false;
    },

    async fetchProjects() {
      const res = await this.$axios.$get(
        "http://localhost:80/api/projects"
      );
      this.$data.projects = res
    },

    async createProject() {
      try {
        const res = await this.$axios.$post(
          "http://localhost:80/api/projects",
          {
            title: this.form.title,
            description: this.form.description
          }
        );
      } catch (err) {
        console.log(err);
      } finally {
        await this.fetchProjects();
        this.closeCreateDialog()
      }
    }
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
