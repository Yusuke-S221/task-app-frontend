<template>
  <div v-loading.fullscreen.lock="fullscreenLoading"> 
    <Header />
    <div class="page-title">
      <Title>Issue一覧</Title>
    </div>
        <div class="contents">
      <div
        v-for="issue in issues"
        :key="issue.id"
        :issue="issue"
        class="issue-cards"
      >
          <Card>
            <IssueCard>
              <div class="issue-content">
                <nuxt-link :to="`/issues/${issue.id}`">
                  <div class="issue-id">
                    <h3>{{ issue.id }}</h3>
                  </div>
                  <div class="issue-state">
                    <h3>{{ issue.state }}</h3>
                  </div>
                  <div class="issue-title">
                    <h3>{{ issue.title }}</h3>
                  </div>
                  <div class="issue-description">
                    {{ issue.description }}
                  </div>
                </nuxt-link>
              </div>
            </IssueCard>
          </Card>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "~/components/Header.vue";
import Title from "~/components/Title.vue";
import Card from "~/components/Card.vue";
import IssueCard from "~/components/IssueCard.vue";

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
.page-title {
  margin: 50px;
}

.contents {
  margin: 30px;
}

.issue-cards {
  width: 48%;
  margin: 10px;
  box-sizing: border-box;
}

.issue-id,
.issue-title,
.issue-state,
.issue-description {
  text-decoration: none;
  text-decoration: none;
  color: black;
}
</style>