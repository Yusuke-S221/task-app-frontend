import { shallowMount } from "@vue/test-utils";
import ProjectCard from "@/components/ProjectCard.vue";

describe("ProjectCard", () => {
  it("is a Vue instance", () => {
    const wrapper = shallowMount(ProjectCard);
    expect(wrapper.vm).toBeTruthy();
  });
});
