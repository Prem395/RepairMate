import { useEffect, useMemo, useRef, useState } from "react";
import { motion as Motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import BookRepairForm from "../BookRepairForm";
import { SERVICES } from "../../data/servicesData.js";
import { useAuth } from "../../context/AuthContext";

const LeftSection = () => {
  const [openResults, setOpenResults] = useState(false);
  const [query, setQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

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
    <div className="flex w-full flex-col gap-6 py-4 lg:w-1/2 lg:py-8">
      <div className="inline-flex w-fit items-center rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-200">
        {currentUser
          ? `Signed in as ${currentUser.name}`
          : "New: sign in to save bookings and track requests"}
      </div>

      <Motion.h1
        initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
        className="text-4xl font-extralight leading-tight text-white [text-shadow:0_0_12px_rgba(96,165,250,0.45),0_0_32px_rgba(59,130,246,0.28),0_0_54px_rgba(99,102,241,0.18)] select-none sm:text-5xl lg:text-6xl xl:text-[80px]"
      >
        Premium <br /> Device Repair
      </Motion.h1>

      <div
        ref={wrapperRef}
        className="relative mt-2 w-full max-w-[620px] overflow-visible"
      >
        <form onSubmit={onSubmit} className="w-full">
          <div className="flex w-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-white shadow-lg backdrop-blur-lg sm:h-[60px] sm:flex-row sm:items-center sm:gap-0 sm:px-5 sm:py-0">
            <CiSearch size={22} />
            <input
              type="text"
              placeholder="Search for a service..."
              className="h-full w-full bg-transparent text-sm outline-none placeholder:font-light sm:ml-2"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setOpenResults(true);
              }}
            />
            <button
              type="submit"
              className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium transition hover:bg-blue-800 sm:ml-4"
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
                className="flex cursor-pointer items-center gap-4 border-b border-white/5 p-4 last:border-b-0 hover:bg-white/10"
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
                <div className="flex-1">
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

      <div className="flex w-full flex-wrap gap-3 pt-1">
        <button
          onClick={() => setIsFormOpen(true)}
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg transition hover:bg-blue-700"
        >
          Book a Repair
        </button>
        <button
          onClick={handleSecondaryAction}
          className="rounded-lg border border-white/30 bg-transparent px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default LeftSection;
