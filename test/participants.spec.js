import { Participants } from "src/client/js/components";

describe("Participants", () => {
  it("should instantiate", () => {
    expect(Participants).toBeDefined();

    const component = new Participants();
    expect(component).toBeDefined();
  });
});
