import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import Projects from "~/pages/index.vue";
import flushPromises from "flush-promises";
import Element from 'element-ui';

const localVue = createLocalVue()
localVue.use(Element)

const projects = [
  {
    id: 1,
    name: 'テスト1',
    description: '内容1',
    status: 'progress',
    created_at: '2020-01-01 01:01:01',
    updated_at: '2020-01-01 01:01:01'
  },
  {
    id: 2,
    name: 'テスト2',
    description: '内容2',
    status: 'progress',
    created_at: '2020-01-01 01:01:01',
    updated_at: '2020-01-01 01:01:01'
  },
  {
    id: 3,
    name: 'テスト3',
    description: '内容3',
    status: 'progress',
    created_at: '2020-01-01 01:01:01',
    updated_at: '2020-01-01 01:01:01'
  }
]

const data = {
  createDialogVisible: false
};

const mockAxios = {
  $get: jest.fn().mockResolvedValue(projects),
  $post: jest.fn().mockResolvedValue({ status: 201 })
};

const message = {
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
    it("calls GET http://localhost:80/api/projects", async () => {
      wrapper.vm.fetchProjects();
      await flushPromises()
      expect(mockAxios.$get).toHaveBeenCalledWith(
        "http://localhost:80/api/projects"
      );
    });
  });

  describe("method createProject", () => {
    it("calls POST http://localhost:80/api/projects", async () => {
      wrapper.vm.createProject();
      await flushPromises()
      expect(mockAxios.$post).toHaveBeenCalledWith(
        "http://localhost:80/api/projects", 
        {
          title: "",
          description: ""
        }
      );
    });

    it("calls method startLoading", async () => {
      wrapper.vm.startLoading = jest.fn()
      wrapper.vm.createProject();
      await flushPromises()
      expect(wrapper.vm.startLoading).toHaveBeenCalled()
    });

    it("calls method fetchProjects", async () => {
      wrapper.vm.fetchProjects = jest.fn()
      wrapper.vm.createProject();
      await flushPromises()
      expect(wrapper.vm.fetchProjects).toHaveBeenCalled()
    });

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
  });
});
