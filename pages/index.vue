<template>
  <div v-loading.fullscreen.lock="fullscreenLoading"> 
    <Header />
    <div class="page-title">
      <Title>プロジェクト一覧</Title>
      <el-button
        type="primary"
        class="create-button"
        @click="createDialogVisible = true"
        >新規作成</el-button
      >
    </div>
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
                <nuxt-link :to="`/projects/${project.id}`">
                  <div class="project-id">
                    <h3>{{ project.id }}</h3>
                  </div>
                  <div class="project-state">
                    <h3>{{ project.state }}</h3>
                  </div>
                  <div class="project-title">
                    <h3>{{ project.title }}</h3>
                  </div>
                  <div class="project-description">
                    {{ project.description }}
                  </div>
                </nuxt-link>
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
        <el-button type="primary" class="create-button" @click="createProject">新規作成</el-button>
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
    Title,
    Card,
    ProjectCard
  },

  data() {
    return {
      createDialogVisible: false,
      formLabelWidth: "140px",
      fullscreenLoading: false,
      form: {
        title: "",
        description: ""
      }
    };
  },

  async asyncData({ $axios }) {
    const res = await $axios.$get("http://localhost:80/api/projects");
    return {
      projects: res
    };
  },

  methods: {
    startLoading() {
      this.fullscreenLoading = true;
    },

    endLoading() {
      this.fullscreenLoading = false;
    },

    closeCreateDialog() {
      this.form.title = "";
      this.form.description = "";
      this.createDialogVisible = false;
    },

    async fetchProjects() {
      const res = await this.$axios.$get(
        "http://localhost:80/api/projects"
      );
      this.projects = res
    },

    async createProject() {
      this.startLoading()
      try {
        const res = await this.$axios.$post(
          "http://localhost:80/api/projects",
          {
            title: this.form.title,
            description: this.form.description
          }
        );
        await this.fetchProjects();
        this.$message({
          message: 'プロジェクトを作成しました',
          type: 'success'
        });
      } catch (err) {
        this.$message.error('プロジェクト作成に失敗しました');
      } finally {
        this.closeCreateDialog()
        this.endLoading()
      }
    }
  }
};
</script>

<style scoped>
.page-title {
  margin: 50px;
}
.create-button {
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

.project-id,
.project-title,
.project-state,
.project-description {
  text-decoration: none;
  text-decoration: none;
  color: black;
}
</style>
