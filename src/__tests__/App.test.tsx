import ReactDOM from "react-dom/client";
import renderer from "react-test-renderer";
import App from "../components/App";
import TestComponent from "../components/TestComponent";

describe("Unit test", () => {
  it("App coomponent renders without crashing", () => {
    const root = ReactDOM.createRoot(document.createElement("div"));
    root.render(<App />);
  });
});

describe("Snapshot test", () => {
  it("Test component renders correctly", () => {
    const tree = renderer.create(<TestComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
