import { Chat } from "src/client/js/components";

describe("Chat", () => {
  it("should instantiate", () => {
    expect(Chat).toBeDefined();

    const component = new Chat();
    expect(component).toBeDefined();
  });
});
