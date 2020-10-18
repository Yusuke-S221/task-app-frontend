<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
  <Header />
    <Title>プロジェクト詳細</Title>
    <div class="content">
      <Card>
        <ProjectCard>
          <div class="project-content">
            <div class="project-state">
              <h3>{{ project.state }}</h3>
            </div>
            <div class="project-title">
              <h3>{{ project.title }}</h3>
            </div>
            <div class="project-description">
              {{ project.description }}
            </div>
            <div class="button">
              <el-button
                type="success"
                class="edit-button"
                @click="editDialogVisible = true"
                >編集</el-button
              >
              <el-button
                type="danger"
                class="delete-button"
                @click="deleteDialogVisible = true"
                >削除</el-button
              >
            </div>
          </div>
        </ProjectCard>
      </Card>
    </div>
    <el-dialog title="プロジェクト編集" :visible.sync="editDialogVisible">
      <el-form :model="form">
        <el-form-item label="プロジェクト名" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="プロジェクト概要" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">キャンセル</el-button>
        <el-button type="success" class="edit-button" @click="editProject">編集</el-button>
      </span>
    </el-dialog>
    <el-dialog title="プロジェクト削除" :visible.sync="deleteDialogVisible">
      <p>プロジェクト『 {{ project.title }} 』を削除します。よろしいですか？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">キャンセル</el-button>
        <el-button type="danger" class="delete-button" @click="deleteProject">削除</el-button>
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
      editDialogVisible: false,
      deleteDialogVisible: false,
      formLabelWidth: "140px",
      fullscreenLoading: false,
      form: {
        title: "",
        description: ""
      }
    }
  },

  async asyncData({ $axios,params }) {
    const res = await $axios.$get(`http://localhost:80/api/projects/${params.id}`);
    return {
      project: res,
      form: {
        title: res.title,
        description: res.description
      }
    };
  },

  methods: {
    startLoading() {
      this.fullscreenLoading = true;
    },

    endLoading() {
      this.fullscreenLoading = false;
    },

    closeDialog() {
      this.editDialogVisible = false;
      this.deleteDialogVisible = false;
    },

    async fetchProject() {
      const res = await this.$axios.$get(
        `http://localhost:80/api/projects/${this.project.id}`
      );
      this.project = res
    },

    async editProject() {
      this.startLoading()
      try {
        const res = await this.$axios.$put(
          `http://localhost:80/api/projects/${this.project.id}`,
          {
            title: this.form.title,
            description: this.form.description
          }
        );
        await this.fetchProject();
        this.$message({
          message: 'プロジェクトを更新しました',
          type: 'success'
        });
      } catch (err) {
        this.$message.error('プロジェクト更新に失敗しました');
      } finally {
        this.closeDialog()
        this.endLoading()
      }
    },

    async deleteProject() {
      this.startLoading()
      try {
        const res = await this.$axios.$delete(
          `http://localhost:80/api/projects/${this.project.id}`);
        this.$router.push('/')
        this.$message({
          message: 'プロジェクトを削除しました',
          type: 'success'
        });
      } catch (err) {
        this.$message.error('プロジェクト削除に失敗しました');
        this.closeDialog()
        this.endLoading()
      } 
    }
  }
}
</script>

<style scoped>
.create-button {
  margin-left: 60px;
  font-size: 16px;
  font-weight: bold;
}

.content {
  margin: 60px;
}

.project-cards {
  width: 48%;
  margin: 10px;
  box-sizing: border-box;
}

.button {
  text-align: right;
}

.edit-button {
  font-size: 16px;
  font-weight: bold;
}

.delete-button {
  font-size: 16px;
  font-weight: bold;
}
</style>
