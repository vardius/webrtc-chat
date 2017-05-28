import { App } from "src/client/js/components";

describe("App", () => {
  it("should instantiate", () => {
    expect(App).toBeDefined();

    const component = new App();
    expect(component).toBeDefined();
  });
});
