import { Room } from "src/client/js/components";

describe("Room", () => {
  it("should instantiate", () => {
    expect(Room).toBeDefined();

    const component = new Room();
    expect(component).toBeDefined();
  });
});
