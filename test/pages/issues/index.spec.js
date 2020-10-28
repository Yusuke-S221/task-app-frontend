import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import Issues from "~/pages/issues/index.vue";
import flushPromises from "flush-promises";

const issues = [
  {
    id: 1,
    ordering: 1,
    title: 'テスト1',
    description: '内容1',
    state: 'wip',
    project_id: 1,
    created_at: '2020-01-01 01:01:01',
    updated_at: '2020-01-01 01:01:01'
  },
  {
    id: 2,
    ordering: 2,
    title: 'テスト2',
    description: '内容2',
    state: 'wip',
    project_id: 2,
    created_at: '2020-01-01 01:01:01',
    updated_at: '2020-01-01 01:01:01'
  },
  {
    id: 3,
    ordering: 3,
    title: 'テスト3',
    description: '内容3',
    state: 'wip',
    project_id: 3,
    created_at: '2020-01-01 01:01:01',
    updated_at: '2020-01-01 01:01:01'
  }
]

const data = {
  createDialogVisible: false,
  fullscreenLoading: false
};

const mockAxios = {
  $get: jest.fn().mockResolvedValue(issues),
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

describe('Issues', () => {
  let wrapper 
  beforeEach(() => {
    wrapper = shallowMount(Issues, {
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
    })
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

  describe("method fetchIssues", () => {
    it("calls GET http://localhost:80/api/issues", async () => {
      wrapper.vm.fetchIssues();
      await flushPromises()
      expect(mockAxios.$get).toHaveBeenCalledWith(
        "http://localhost:80/api/issues"
      )
    })
  })

  describe("method createIssue", () => {
    describe("success response", () => {
      it("calls method startLoading", async () => {
        wrapper.vm.startLoading = jest.fn()
        wrapper.vm.createIssue();
        await flushPromises()
        expect(wrapper.vm.startLoading).toHaveBeenCalled()
      });

      it("calls POST http://localhost:80/api/issues", async () => {
        wrapper.vm.$data.form = {
          title: 'テスト',
          description: '内容'
        }
        wrapper.vm.createIssue();
        await flushPromises()
        expect(mockAxios.$post).toHaveBeenCalledWith(
          "http://localhost:80/api/issues", 
          {
            title: 'テスト',
            description: '内容'
          }
        );
      });

      it("calls method fetchIssues", async () => {
        wrapper.vm.fetchIssues = jest.fn()
        wrapper.vm.createIssue();
        await flushPromises()
        expect(wrapper.vm.fetchIssues).toHaveBeenCalled()
      });

      it("calls message success", async () => {
        wrapper.vm.createIssue();
        await flushPromises()
        expect(message).toHaveBeenCalled();
      })

      it("calls method closeCreateDialog", async () => {
        wrapper.vm.closeCreateDialog = jest.fn()
        wrapper.vm.createIssue();
        await flushPromises()
        expect(wrapper.vm.closeCreateDialog).toHaveBeenCalled()
      });
  
      it("calls method endLoading", async () => {
        wrapper.vm.endLoading = jest.fn()
        wrapper.vm.createIssue();
        await flushPromises()
        expect(wrapper.vm.endLoading).toHaveBeenCalled()
      });
    })

    describe("error response", () => {
      let errorWrapper
      beforeEach(() => {
        errorWrapper = shallowMount(Issues, {
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
        errorWrapper.vm.createIssue();
        await flushPromises()
        expect(errorWrapper.vm.startLoading).toHaveBeenCalled()
      });

      it("calls POST http://localhost:80/api/issues", async () => {
        errorWrapper.vm.$data.form = {
          title: 'テスト',
          description: '内容'
        }
        errorWrapper.vm.createIssue();
        await flushPromises()
        expect(errorMockAxios.$post).toHaveBeenCalledWith(
          "http://localhost:80/api/issues", 
          {
            title: 'テスト',
            description: '内容'
          }
        );
      });

      it("calls message error", async () => {
        errorWrapper.vm.createIssue();
        await flushPromises()
        expect(errorMessage.error).toHaveBeenCalled();
      })

      it("calls method closeCreateDialog", async () => {
        errorWrapper.vm.closeCreateDialog = jest.fn()
        errorWrapper.vm.createIssue();
        await flushPromises()
        expect(errorWrapper.vm.closeCreateDialog).toHaveBeenCalled()
      });
  
      it("calls method endLoading", async () => {
        errorWrapper.vm.endLoading = jest.fn()
        errorWrapper.vm.createIssue();
        await flushPromises()
        expect(errorWrapper.vm.endLoading).toHaveBeenCalled()
      });
    });
  });
})