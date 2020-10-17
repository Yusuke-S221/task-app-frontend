import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import Project from "~/pages/projects/_id.vue";
import flushPromises from "flush-promises";

const project = {
  id: 1,
  title: 'テスト',
  description: '内容',
  state: 'progress',
  created_at: '2020-01-01 01:01:01',
  updated_at: '2020-01-01 01:01:01'
}

const data = {
  editDialogVisible: false,
  deleteDialogVisible: false,
  fullscreenLoading: false,
  form: {
    title: "",
    description: ""
  }
};

const asyncData = {
  project
}

const mockAxios = {
  $get: jest.fn().mockResolvedValue(project),
  $put: jest.fn().mockResolvedValue({ status: 200 }),
  $delete: jest.fn().mockResolvedValue({ status: 200 })
};

const message = {
  error: jest.fn()
}

describe("Project", () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Project, {
      data() {
        return data
      },
      data() {
        return asyncData
      },
      mocks: {
        $axios: mockAxios,
        $message: message
      },
      stubs: {
        NuxtLink: RouterLinkStub
      }
    });
  })

  it("is a vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  describe("method startLoading", () => {
    it("starts loading circle", () => {
    wrapper.vm.$data.fullscreenLoading = false
    wrapper.vm.startLoading();
    expect(wrapper.vm.$data.fullscreenLoading).toBe(true)
    })
  })

  describe("method endLoading", () => {
    it("ends loading circle", () => {
    wrapper.vm.$data.fullscreenLoading = true
    wrapper.vm.endLoading();
    expect(wrapper.vm.$data.fullscreenLoading).toBe(false)
    })
  })

  describe("method closeDialog", () => {
    it("closes dialog", () => {
    wrapper.vm.$data.editDialogVisible = true
    wrapper.vm.$data.deleteDialogVisible = true
    wrapper.vm.closeDialog();
    expect(wrapper.vm.$data.editDialogVisible).toBe(false)
    expect(wrapper.vm.$data.deleteDialogVisible).toBe(false)
    })
  })

  describe("method fetchProject", () => {
    it("calls GET http://localhost:80/api/projects/1", async () => {
      wrapper.vm.fetchProject();
      await flushPromises()
      expect(mockAxios.$get).toHaveBeenCalledWith(
        "http://localhost:80/api/projects/1"
      );
    });
  });

  describe("method editProject", () => {
    it("calls PUT http://localhost:80/api/projects/1", async () => {
      wrapper.vm.$data.form = {
        title: '変更後タイトル',
        description: '変更後内容'
      }
      wrapper.vm.editProject();
      await flushPromises()
      expect(mockAxios.$put).toHaveBeenCalledWith(
        "http://localhost:80/api/projects/1", 
        {
          title: '変更後タイトル',
          description: '変更後内容'
        }
      );
    });

    it("calls method startLoading", async () => {
      wrapper.vm.startLoading = jest.fn()
      wrapper.vm.editProject();
      await flushPromises()
      expect(wrapper.vm.startLoading).toHaveBeenCalled()
    });

    it("calls method fetchProject", async () => {
      wrapper.vm.fetchProject = jest.fn()
      wrapper.vm.editProject();
      await flushPromises()
      expect(wrapper.vm.fetchProject).toHaveBeenCalled()
    });

    it("calls method closeDialog", async () => {
      wrapper.vm.closeDialog = jest.fn()
      wrapper.vm.editProject();
      await flushPromises()
      expect(wrapper.vm.closeDialog).toHaveBeenCalled()
    });

    it("calls method endLoading", async () => {
      wrapper.vm.endLoading = jest.fn()
      wrapper.vm.editProject();
      await flushPromises()
      expect(wrapper.vm.endLoading).toHaveBeenCalled()
    });
  });

  describe("method deleteProject", () => {
    it("calls DELETE http://localhost:80/api/projects/1", async () => {
      wrapper.vm.deleteProject();
      await flushPromises()
      expect(mockAxios.$delete).toHaveBeenCalledWith(
        "http://localhost:80/api/projects/1");
    });

    it("calls method startLoading", async () => {
      wrapper.vm.startLoading = jest.fn()
      wrapper.vm.deleteProject();
      await flushPromises()
      expect(wrapper.vm.startLoading).toHaveBeenCalled()
    });

    // 失敗時テスト

    // it("calls method closeDialog", async () => {
    //   wrapper.vm.closeDialog = jest.fn()
    //   wrapper.vm.editProject();
    //   await flushPromises()
    //   expect(wrapper.vm.closeDialog).toHaveBeenCalled()
    // });

    // it("calls method endLoading", async () => {
    //   wrapper.vm.endLoading = jest.fn()
    //   wrapper.vm.editProject();
    //   await flushPromises()
    //   expect(wrapper.vm.endLoading).toHaveBeenCalled()
    // });
  });
});
