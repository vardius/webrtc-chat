import { Message } from "src/client/js/components";

describe("Message", () => {
  it("should instantiate", () => {
    expect(Message).toBeDefined();

    const component = new Message();
    expect(component).toBeDefined();
  });
});
