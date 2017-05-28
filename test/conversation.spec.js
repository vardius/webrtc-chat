import { Conversation } from "src/client/js/components";

describe("Conversation", () => {
  it("should instantiate", () => {
    expect(Conversation).toBeDefined();

    const component = new Conversation();
    expect(component).toBeDefined();
  });
});
