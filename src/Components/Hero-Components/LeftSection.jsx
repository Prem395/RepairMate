import { useEffect, useMemo, useRef, useState } from "react";

import { CiSearch } from "react-icons/ci";
import BookRepairForm from "../BookRepairForm";
import { Navigate, useNavigate } from "react-router-dom";
import { SERVICES } from "../../data/servicesData.js";

const LeftSection = () => {
  const [openResults, setOpenResults] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  const [IsFormOpen, setIsFormOpen] = useState(false);

  const FormOpenToggle = () => {
    setIsFormOpen(() => !IsFormOpen);
    console.log(IsFormOpen);
  };

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return SERVICES.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    );
  }, [query]);

  const onSubmit = (e) => {
    e.preventDefault();
    setOpenResults(true);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpenResults(false);
      }
    }

    function handleEscapeKey(event) {
      if (event.key === "Escape") {
        setOpenResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key == "Escape") setIsFormOpen(false);
      // if(e.key == "Escape")
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="w-full lg:w-1/2 flex flex-col gap-6 p-6 lg:p-16">
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight leading-tight text-white drop-shadow-[0_0_15px_rgba(99,102,241,0.8)] select-none animate-fadeIn text-nowrap">
        Premium <br /> Device Repair
      </h1>

      {/* Search Bar + Results */}
      <div
        ref={wrapperRef}
        className="relative w-full max-w-full sm:max-w-[620px] overflow-visible"
      >
        <form onSubmit={onSubmit} className="w-full mt-4">
          <div className="flex items-center border-2 border-white/10 h-[60px] w-[580px] bg-white/10 backdrop-blur-lg rounded-lg px-4 sm:px-6 shadow-lg text-white">
            <CiSearch size={22} />
            <input
              type="text"
              placeholder="Search for a service..."
              className="bg-transparent outline-none placeholder:font-light w-full text-sm h-full ml-2"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpenResults(true);
              }}
            />
            <button
              type="submit"
              className="ml-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg text-sm font-medium"
            >
              Search
            </button>
          </div>
        </form>

        {/* Results dropdown */}
        {openResults && (
          <div
            id="search-results"
            key={query + results.length} // ✅ dynamic key triggers re-render
            className="absolute z-50 mt-2 w-[580px] max-w-full sm:max-w-[620px] bg-white/10 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl max-h-60 overflow-y-auto animate-fadeIn"
          >
            {query && results.length === 0 && (
              <div className="p-4 text-sm text-white/80">
                No services found.
              </div>
            )}

            {results.map((item) => {
              console.log(item);
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 hover:bg-white/10 cursor-pointer border-b border-white/5 last:border-b-0"
                  onClick={() => {
                    setOpenResults(false);
                  }}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-14 h-14 object-contain rounded-md bg-white/5"
                  />
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">{item.title}</h4>
                    <p className="text-xs text-white/70">{item.description}</p>
                  </div>
                  <span className="text-yellow-300 font-semibold whitespace-nowrap">
                    ₹{item.price}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {IsFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <BookRepairForm
            setIsFormOpen={setIsFormOpen}
            onClose={() => setIsFormOpen(false)}
          />
        </div>
      )}

      {/* CTAs */}
      <div className="flex gap-4 ">
        <button
          onClick={FormOpenToggle}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white shadow-lg"
        >
          Book a Repair
        </button>
        <button
          onClick={() => navigate("/about")}
          className="px-6 py-3 bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-xl"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default LeftSection;
