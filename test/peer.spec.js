import { Peer } from "src/client/js/components";

describe("Peer", () => {
  it("should instantiate", () => {
    expect(Peer).toBeDefined();

    const component = new Peer();
    expect(component).toBeDefined();
  });
});
