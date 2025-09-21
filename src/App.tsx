import Footer from "./components/Footer";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import NovelsContainer from "./components/novels/NovelsContainer";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <NavBar />
      <Hero />
      <NovelsContainer />
      <Footer />
    </div>
  );
};

export default App;
