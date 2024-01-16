import TagComponent from "./components/TagComponent";

const App = () => {
  return (
    <div className="bg-slate-100 w-full h-[100vh]">
      <div className="flex-row justify-center items-center ">
        <h2 className="text-center text-3xl font-bold"> Pick Users </h2>
        <TagComponent />
      </div>
    </div>
  );
};

export default App;
