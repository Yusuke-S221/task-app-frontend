import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import Projects from "~/pages/index.vue";
import flushPromises from "flush-promises";

const projects = [
  {
    id: 1,
    title: 'テスト1',
    description: '内容1',
    state: 'progress',
    created_at: '2020-01-01 01:01:01',
    updated_at: '2020-01-01 01:01:01'
  },
  {
    id: 2,
    title: 'テスト2',
    description: '内容2',
    state: 'progress',
    created_at: '2020-01-01 01:01:01',
    updated_at: '2020-01-01 01:01:01'
  },
  {
    id: 3,
    title: 'テスト3',
    description: '内容3',
    state: 'progress',
    created_at: '2020-01-01 01:01:01',
    updated_at: '2020-01-01 01:01:01'
  }
]

const data = {
  createDialogVisible: false,
  fullscreenLoading: false
};

const mockAxios = {
  $get: jest.fn().mockResolvedValue(projects),
  $post: jest.fn().mockResolvedValue({ status: 201 })
};

const errorMockAxios = {
  $get: jest.fn().mockResolvedValue(new Error('Error')),
  $post: jest.fn().mockResolvedValue(new Error('Error'))
}

const message = jest.fn()

const errorMessage = {
  error: jest.fn()
}

describe("Projects", () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Projects, {
      data() {
        return data
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

  describe("method closeCreateDialog", () => {
    it("closes create dialog", () => {
    wrapper.vm.$data.createDialogVisible = true
    wrapper.vm.closeCreateDialog();
    expect(wrapper.vm.$data.createDialogVisible).toBe(false)
    })
  })

  describe("method fetchProjects", () => {
    describe("success response", () => {
      it("calls GET http://localhost:80/api/projects", async () => {
        wrapper.vm.fetchProjects();
        await flushPromises()
        expect(mockAxios.$get).toHaveBeenCalledWith(
          "http://localhost:80/api/projects"
        );
      });
    })

    describe("error response", () => {
      let errorWrapper
      beforeEach(() => {
        errorWrapper = shallowMount(Projects, {
          data() {
            return data
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

      it("calls GET http://localhost:80/api/projects", async () => {
        errorWrapper.vm.fetchProjects();
        await flushPromises()
        expect(errorMockAxios.$get).toHaveBeenCalledWith(
          "http://localhost:80/api/projects"
        );
      });

      it("calls message error", async () => {
        errorWrapper.vm.createProject();
        await flushPromises()
        expect(errorMessage.error).toHaveBeenCalled();
      })      
    })
  });

  describe("method createProject", () => {
    describe("success response", () => {
      it("calls method startLoading", async () => {
        wrapper.vm.startLoading = jest.fn()
        wrapper.vm.createProject();
        await flushPromises()
        expect(wrapper.vm.startLoading).toHaveBeenCalled()
      });

      it("calls POST http://localhost:80/api/projects", async () => {
        wrapper.vm.$data.form = {
          title: 'テスト',
          description: '内容'
        }
        wrapper.vm.createProject();
        await flushPromises()
        expect(mockAxios.$post).toHaveBeenCalledWith(
          "http://localhost:80/api/projects", 
          {
            title: 'テスト',
            description: '内容'
          }
        );
      });

      it("calls method fetchProjects", async () => {
        wrapper.vm.fetchProjects = jest.fn()
        wrapper.vm.createProject();
        await flushPromises()
        expect(wrapper.vm.fetchProjects).toHaveBeenCalled()
      });

      it("calls message success", async () => {
        wrapper.vm.createProject();
        await flushPromises()
        expect(message).toHaveBeenCalled();
      })

      it("calls method closeCreateDialog", async () => {
        wrapper.vm.closeCreateDialog = jest.fn()
        wrapper.vm.createProject();
        await flushPromises()
        expect(wrapper.vm.closeCreateDialog).toHaveBeenCalled()
      });
  
      it("calls method endLoading", async () => {
        wrapper.vm.endLoading = jest.fn()
        wrapper.vm.createProject();
        await flushPromises()
        expect(wrapper.vm.endLoading).toHaveBeenCalled()
      });
    })

    describe("error response", () => {
      let errorWrapper
      beforeEach(() => {
        errorWrapper = shallowMount(Projects, {
          data() {
            return data
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
        errorWrapper.vm.createProject();
        await flushPromises()
        expect(errorWrapper.vm.startLoading).toHaveBeenCalled()
      });

      it("calls POST http://localhost:80/api/projects", async () => {
        errorWrapper.vm.$data.form = {
          title: 'テスト',
          description: '内容'
        }
        errorWrapper.vm.createProject();
        await flushPromises()
        expect(errorMockAxios.$post).toHaveBeenCalledWith(
          "http://localhost:80/api/projects", 
          {
            title: 'テスト',
            description: '内容'
          }
        );
      });

      it("calls message error", async () => {
        errorWrapper.vm.createProject();
        await flushPromises()
        expect(errorMessage.error).toHaveBeenCalled();
      })

      it("calls method closeCreateDialog", async () => {
        errorWrapper.vm.closeCreateDialog = jest.fn()
        errorWrapper.vm.createProject();
        await flushPromises()
        expect(errorWrapper.vm.closeCreateDialog).toHaveBeenCalled()
      });
  
      it("calls method endLoading", async () => {
        errorWrapper.vm.endLoading = jest.fn()
        errorWrapper.vm.createProject();
        await flushPromises()
        expect(errorWrapper.vm.endLoading).toHaveBeenCalled()
      });
    });
  });
});
