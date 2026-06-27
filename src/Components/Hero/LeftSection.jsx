import { useEffect, useMemo, useRef, useState } from "react";
import { motion as Motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import BookRepairForm from "../BookRepairForm.jsx";
import { SERVICES } from "../../data/servicesData.js";

const LeftSection = () => {
  const [openResults, setOpenResults] = useState(false);
  const [query, setQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const normalizedQuery = query.toLowerCase();

    return SERVICES.filter(
      (service) =>
        service.title.toLowerCase().includes(normalizedQuery) ||
        service.description.toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  const onSubmit = (event) => {
    event.preventDefault();
    setOpenResults(true);
  };

  const handleSecondaryAction = () => {
    navigate("/about");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpenResults(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setOpenResults(false);
        setIsFormOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <div className="flex w-full flex-col gap-5 py-2 lg:w-1/2 lg:gap-6 lg:py-8">
      <div className="inline-flex w-fit max-w-full items-center rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs text-blue-200 sm:text-sm">
        Fast repair inquiries for appliances, gadgets, and home devices
      </div>

      <Motion.h1
        initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
        className="text-[3.45rem] font-extralight leading-[0.9] text-white [text-shadow:0_0_12px_rgba(96,165,250,0.45),0_0_32px_rgba(59,130,246,0.28),0_0_54px_rgba(99,102,241,0.18)] select-none sm:text-5xl lg:text-6xl xl:text-[80px]"
      >
        Premium <br /> Device Repair
      </Motion.h1>

      <div
        ref={wrapperRef}
        className="relative mt-0.5 w-full max-w-[620px] overflow-visible"
      >
        <form onSubmit={onSubmit} className="w-full">
          <div className="w-full rounded-2xl border border-white/10 bg-white/10 p-3 text-white shadow-lg backdrop-blur-lg sm:flex sm:h-[60px] sm:items-center sm:gap-0 sm:px-5 sm:py-0">
            <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-black/10 px-3 py-3 sm:flex-1 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
              <CiSearch size={20} className="shrink-0 text-white/80" />
              <input
                type="text"
                placeholder="Search for a service..."
                className="w-full bg-transparent text-sm outline-none placeholder:font-light placeholder:text-white/45"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setOpenResults(true);
                }}
              />
            </div>
            <button
              type="submit"
              className="mt-3 w-full rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-medium transition hover:bg-blue-800 sm:mt-0 sm:ml-4 sm:w-auto sm:py-2"
            >
              Search
            </button>
          </div>
        </form>

        {openResults && (
          <div
            id="search-results"
            key={query + results.length}
            className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-2xl border border-white/10 bg-slate-950/90 shadow-2xl backdrop-blur-xl animate-fadeIn"
          >
            {query && results.length === 0 && (
              <div className="p-4 text-sm text-white/80">
                No services found.
              </div>
            )}

            {results.map((item) => (
              <div
                key={item.id}
                className="flex cursor-pointer items-start gap-3 border-b border-white/5 p-4 last:border-b-0 hover:bg-white/10 sm:items-center sm:gap-4"
                onClick={() => {
                  setOpenResults(false);
                  navigate(`/services/${item.slug}`);
                }}
              >
                <img
                  src={item.icon}
                  alt={item.title}
                  className="h-14 w-14 rounded-md bg-white/5 object-contain"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-white">{item.title}</h4>
                  <p className="text-xs text-white/70">{item.description}</p>
                </div>
                <span className="whitespace-nowrap font-semibold text-yellow-300">
                  Rs. {item.price}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {isFormOpen && <BookRepairForm setIsFormOpen={setIsFormOpen} />}

      <div className="flex w-full flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
        <button
          onClick={() => setIsFormOpen(true)}
          className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg transition hover:bg-blue-700 sm:w-auto"
        >
          Book a Repair
        </button>
        <button
          onClick={handleSecondaryAction}
          className="w-full rounded-lg border border-white/30 bg-transparent px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10 sm:w-auto"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default LeftSection;
