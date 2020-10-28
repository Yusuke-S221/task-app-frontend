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

describe('Issues', () => {
  let wrapper 
  beforeEach(() => {
    wrapper = shallowMount(Issues, {
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
})