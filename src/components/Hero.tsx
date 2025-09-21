import { FaArrowRight } from "react-icons/fa";
const Hero = () => {
  return (
    <>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100 pu-16 pb-8 text-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center">
          <h1 className="flex flex-col gap-1 mb-4 text-5xl tracking-tight font-extrabold lg:text-7xl text-gray-200">
            My Novel Tracking
            <span>Dashboard</span>
          </h1>

          <p className="mu-4 mb-5 text-lg font-normal text-slate-300 lg:text-xl sm:px-16 lg:px-48">
            Keep track of your reading journey with a personalized novel
            collection tracker. Organize, explore, and manage your books
            effortlessly.
          </p>
          <a
            href="#"
            className="inline-flex justify-center gap-1 items-center mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-md transition"
          >
            Get started <FaArrowRight />
          </a>
        </div>
      </section>
    </>
  );
};

export default Hero;
