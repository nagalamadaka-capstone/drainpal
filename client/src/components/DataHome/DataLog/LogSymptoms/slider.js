import ReactSlider from "react-slider";
import "./slider.css"
const Slider = () => {
  return (
    <ReactSlider
      className="horizontal-slider"
      thumbClassName="example-thumb"
      trackClassName="example-track"
      renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
      marks
      min = {0}
      max = {10}
      step = {1}
      defaultValue={5}
    />
  );
};
export default Slider;