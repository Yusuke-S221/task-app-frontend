import { shallowMount } from "@vue/test-utils";
import Card from "@/components/Card.vue";

describe("Card", () => {
  it("is a Vue instance", () => {
    const wrapper = shallowMount(Card);
    expect(wrapper.vm).toBeTruthy();
  });
});
