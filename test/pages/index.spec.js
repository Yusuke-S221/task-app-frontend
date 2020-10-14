import { shallowMount, createLocalVue } from "@vue/test-utils";
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

describe("Projects", () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Projects, {
      data() {
        return data
      },
      mocks: {
        $axios: mockAxios
      }
    });
  })

  it("is a vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  describe("Close create dialog", () => {
    it("closes create dialog", () => {
    console.log(wrapper);
    wrapper.vm.$data.createDialogVisible = true
    wrapper.vm.closeCreateDialog();
    expect(wrapper.vm.$data.createDialogVisible).toBe(false)
    })
  })

  describe("Fetch project", () => {
    it("calls GET http://localhost:80/api/projects", async () => {
      wrapper.vm.fetchProjects();
      await flushPromises()
      expect(mockAxios.$get).toHaveBeenCalledWith(
        "http://localhost:80/api/projects"
      );
    });
  });

  describe("Create project", () => {
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
  });
});
