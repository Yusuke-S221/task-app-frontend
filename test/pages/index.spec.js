import { shallowMount } from "@vue/test-utils";
import Projects from "~/pages/index.vue";

const mockAxios = {
  post: jest.fn().mockResolvedValue({ status: 201 })
};

describe("Index", () => {
  it("is a vue instance", () => {
    const wrapper = shallowMount(Projects);
    expect(wrapper.vm).toBeTruthy();
  });
});

describe("Create", () => {
  const wrapper = shallowMount(Projects, {
    mocks: {
      $axios: mockAxios
    }
  });
  const input = {
    title: "テストPJ",
    description: "テスト内容"
  };
  it("calls POST http://localhost:80/api/projects", () => {
    wrapper.vm.create(input);
    expect(mockAxios.post).toHaveBeenCalledWith(
      "http://localhost:80/api/projects",
      input
    );
  });
});
