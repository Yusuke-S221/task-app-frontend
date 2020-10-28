import { shallowMount } from "@vue/test-utils";
import IssueCard from "@/components/IssueCard.vue";

describe("IssueCard", () => {
  it("is a Vue instance", () => {
    const wrapper = shallowMount(IssueCard);
    expect(wrapper.vm).toBeTruthy();
  });
});
