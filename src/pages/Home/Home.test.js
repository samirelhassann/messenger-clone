import React from "react";
import { shallow } from "enzyme";
import Home from "./Home";

describe("Given the Home Component", () => {
  it("renders the Titles children", () => {
    const wrapper = shallow(<Home />);
  });
});
