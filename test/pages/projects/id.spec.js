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
}

const asyncData = {
  project
}

const mockAxios = {
  $get: jest.fn().mockResolvedValue(project),
  $put: jest.fn().mockResolvedValue({ status: 200 }),
  $delete: jest.fn().mockResolvedValue({ status: 200 })
}

const errorMockAxios = {
  $put: jest.fn().mockResolvedValue(new Error('Error')),
  $delete: jest.fn().mockResolvedValue(new Error('Error'))
}

const message = jest.fn()

const errorMessage = {
  error: jest.fn()
}

const router = {
  push: jest.fn()
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
        $message: message,
        $router: router
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
    describe("success response", () => {
      it("calls method startLoading", async () => {
        wrapper.vm.startLoading = jest.fn()
        wrapper.vm.editProject();
        await flushPromises()
        expect(wrapper.vm.startLoading).toHaveBeenCalled()
      });

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

      it("calls method fetchProject", async () => {
        wrapper.vm.fetchProject = jest.fn()
        wrapper.vm.editProject();
        await flushPromises()
        expect(wrapper.vm.fetchProject).toHaveBeenCalled()
      });

      it("calls message success", async () => {
        wrapper.vm.editProject();
        await flushPromises()
        expect(message).toHaveBeenCalled();
      })

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
    })

    describe("error response", () => {
      let errorWrapper
      beforeEach(() => {
        errorWrapper = shallowMount(Project, {
          data() {
            return data
          },
          data() {
            return asyncData
          },
          mocks: {
            $axios: errorMockAxios,
            $message: errorMessage
          },
          stubs: {
            NuxtLink: RouterLinkStub
          }
        });
      })

      it("calls method startLoading", async () => {
        errorWrapper.vm.startLoading = jest.fn()
        errorWrapper.vm.editProject();
        await flushPromises()
        expect(errorWrapper.vm.startLoading).toHaveBeenCalled()
      });

      it("calls PUT http://localhost:80/api/projects/1", async () => {
        errorWrapper.vm.$data.form = {
          title: '',
          description: ''
        }
        errorWrapper.vm.editProject();
        await flushPromises()
        expect(errorMockAxios.$put).toHaveBeenCalledWith(
          "http://localhost:80/api/projects/1", 
          {
            title: '',
            description: ''
          }
        );
      });

      it("calls message error", async () => {
        errorWrapper.vm.editProject();
        await flushPromises()
        expect(errorMessage.error).toHaveBeenCalled();
      })

      it("calls method closeDialog", async () => {
        errorWrapper.vm.closeDialog = jest.fn()
        errorWrapper.vm.editProject();
        await flushPromises()
        expect(errorWrapper.vm.closeDialog).toHaveBeenCalled()
      });
  
      it("calls method endLoading", async () => {
        errorWrapper.vm.endLoading = jest.fn()
        errorWrapper.vm.editProject();
        await flushPromises()
        expect(errorWrapper.vm.endLoading).toHaveBeenCalled()
      });
    });
  });

  describe("method deleteProject", () => {
    describe("success response", () => {
      it("calls method startLoading", async () => {
        wrapper.vm.startLoading = jest.fn()
        wrapper.vm.deleteProject();
        await flushPromises()
        expect(wrapper.vm.startLoading).toHaveBeenCalled()
      });

      it("calls DELETE http://localhost:80/api/projects/1", async () => {
        wrapper.vm.deleteProject();
        await flushPromises()
        expect(mockAxios.$delete).toHaveBeenCalledWith("http://localhost:80/api/projects/1");
      });

      it("calls router push", async () => {
        wrapper.vm.deleteProject();
        await flushPromises()
        expect(router.push).toHaveBeenCalled()
      })

      it("calls message success", async () => {
        wrapper.vm.deleteProject();
        await flushPromises()
        expect(message).toHaveBeenCalled();
      });
    });

    describe("error response", () => {
      let errorWrapper
      beforeEach(() => {
        errorWrapper = shallowMount(Project, {
          data() {
            return data
          },
          data() {
            return asyncData
          },
          mocks: {
            $axios: errorMockAxios,
            $message: errorMessage
          },
          stubs: {
            NuxtLink: RouterLinkStub
          }
        });
      })

      it("calls method startLoading", async () => {
        errorWrapper.vm.startLoading = jest.fn()
        errorWrapper.vm.deleteProject();
        await flushPromises()
        expect(errorWrapper.vm.startLoading).toHaveBeenCalled()
      });

      it("calls PUT http://localhost:80/api/projects/1", async () => {
        errorWrapper.vm.editProject();
        await flushPromises()
        expect(errorMockAxios.$delete).toHaveBeenCalledWith("http://localhost:80/api/projects/1");
      });

      it("calls message error", async () => {
        errorWrapper.vm.deleteProject();
        await flushPromises()
        expect(errorMessage.error).toHaveBeenCalled();
      })

      it("calls method closeDialog", async () => {
        errorWrapper.vm.closeDialog = jest.fn()
        errorWrapper.vm.editProject();
        await flushPromises()
        expect(errorWrapper.vm.closeDialog).toHaveBeenCalled()
      });
  
      it("calls method endLoading", async () => {
        errorWrapper.vm.endLoading = jest.fn()
        errorWrapper.vm.editProject();
        await flushPromises()
        expect(errorWrapper.vm.endLoading).toHaveBeenCalled()
      });
    });
  });
});
