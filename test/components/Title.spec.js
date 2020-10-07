import { shallowMount } from "@vue/test-utils";
import Title from "@/components/Title.vue";

describe("Title", () => {
  it("is a Vue instance", () => {
    const wrapper = shallowMount(Title);
    expect(wrapper.vm).toBeTruthy();
  });
});
