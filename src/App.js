import logo from "./logo.svg";
import "./App.css";
import ChipComponent from "./ChipComponent";

const App = () => {
  const handleSelectedTags = (tags) => {
    console.log(tags);
  };

  return (
    <div>
      <div className="flex-row justify-center items-center">
        <h2 className="text-center"> Pick Users </h2>
        <ChipComponent selectedTags={handleSelectedTags} />
      </div>
    </div>
  );
};

export default App;
