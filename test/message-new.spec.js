import { MessageNew } from "src/client/js/components";

describe("MessageNew", () => {
  it("should instantiate", () => {
    expect(MessageNew).toBeDefined();

    const component = new MessageNew();
    expect(component).toBeDefined();
  });
});
