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
    }
  }
}
</script>

<style scoped>

</style>