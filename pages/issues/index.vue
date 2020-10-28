<template>
  <div v-loading.fullscreen.lock="fullscreenLoading"> 
    <Header />
    <div class="page-title">
      <Title>Issue一覧</Title>
    </div>
  </div>
</template>

<script>
import Header from "~/components/Header.vue";
import Title from "~/components/Title.vue";

export default {
  components: {
    Header,
    Title
  },

  data() {
    return {
      createDialogVisible: false,
      formLabelWidth: "140px",
      fullscreenLoading: false,
      form: {
        title: "テストissue",
        description: "テスト内容"
      }
    }
  },

  async asyncData({ $axios }) {
    const res = await $axios.$get("http://localhost:80/api/issues");
    console.log(res);
    return {
      issues: res
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

    async fetchIssues() {
      const res = await this.$axios.$get(
        "http://localhost:80/api/issues"
      );
      this.issues = res
    },

    async createIssue() {
      this.startLoading()
      try {
        const res = this.$axios.$post("http://localhost:80/api/issues", {
          title: 'テスト',
          description: '内容'
        })
        this.fetchIssues();
        this.$message({
          message: 'イシューを作成しました',
          type: 'success'
        });
      } catch(err) {
        this.$message.error('イシュー作成に失敗しました');
      } finally {
        this.closeCreateDialog()
        this.endLoading()
      }
    }
  }
}
</script>

<style scoped>

</style>