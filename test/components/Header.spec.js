import { shallowMount } from "@vue/test-utils";
import Header from "@/components/Header.vue";

describe("Header", () => {
  it("is a Vue instance", () => {
    const wrapper = shallowMount(Header);
    expect(wrapper.vm).toBeTruthy();
  });
});
