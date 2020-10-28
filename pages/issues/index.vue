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
    }
  }
}
</script>

<style scoped>

</style>