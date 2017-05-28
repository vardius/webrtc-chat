import { Popup } from "src/client/js/components";

describe("Popup", () => {
  it("should instantiate", () => {
    expect(Popup).toBeDefined();

    const component = new Popup();
    expect(component).toBeDefined();
  });
});
