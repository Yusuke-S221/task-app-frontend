import { shallowMount } from "@vue/test-utils";
import Index from "~/pages/index.vue";

describe("Index", () => {
  it("is a vue instance", () => {
    const wrapper = shallowMount(Index);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
