import React, { useEffect, useState } from "react";
import Navbar from "../Components/Layouts/Navbar";
import { Key, Wrench, X } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import {
  createNewService,
  fetchServiceById,
  updateServiceById,
} from "../api/serviceService";
import { successToast } from "../utils/toastConfig";
import { useServices } from "../context/ServiceContext";

const CreateOrEditService = () => {
  const emptyFormData = {
    title: "",
    icon: "",
    description: "",
    price: "",
    serviceTime: "",
    included: [],
    issues: [],
  };
  const [FormData, setFormData] = useState(emptyFormData);
  const { id } = useParams();
  const isEditMode = Boolean(id);

  useEffect(() => {
    const fetchServiceData = async () => {
      if (id) {
        try {
          const serviceData = await fetchServiceById(id);

          setFormData(serviceData);

          setIncluded(serviceData.included || []);
          setIssues(serviceData.issues || []);
        } catch (error) {
          console.error("Error fetching service data:", error);
        }
      }
    };

    fetchServiceData();
  }, [id]);

  const inputStyle =
    "w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-slate-200 text-sm placeholder:text-slate-600 outline-none transition-all duration-200 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10 focus:bg-white/[0.08] font-[inherit]";

  const [includedInput, setIncludedInput] = useState("");
  const [included, setIncluded] = useState([]);

  const [issueInput, setIssueInput] = useState("");
  const [issues, setIssues] = useState([]);

  const { setServices } = useServices();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const payload = {
        ...FormData,
        included,
        issues,
      };

      if (id) {
        const res = await updateServiceById(id, payload);
        console.log(res);
        successToast("Service updated successfully!");
        setServices((prev) =>
          prev.map((service) => (service._id === id ? res : service)),
        );
      } else {
        const res = await createNewService(payload);
        successToast("Service created successfully!");
        setServices((prev) => [...prev, res.service]);
      }
    } catch (error) {
      console.error("Error creating service:", error);
    }

    setFormData(emptyFormData);
    setIncluded([]);
    setIssues([]);
  };

  const addNewInluded = () => {
    const v = includedInput.trim();
    if (!v) return;
    setIncluded((prev) => [...prev, v]);
    setIncludedInput("");
  };

  const removeIncludedItem = (index) => {
    setIncluded((prev) => prev.filter((_, i) => i !== index));
  };
  const addnewIssues = () => {
    const v = issueInput.trim();
    if (!v) return;

    setIssues((prev) => [...prev, v]);
    setIssueInput("");
  };
  const removeCommonIssue = (index) => {
    setIssues((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <main className="relative flex justify-center pt-8 pb-12 px-4">
        <div className="absolute top-0 left-20"></div>
        <div className="w-full max-w-2xl ">
          <Link
            to="/services"
            className="mb-6 flex items-center justify-start gap-1 text-lg text-slate-400 hover:text-slate-200"
          >
            <IoIosArrowBack size={22} className="hover:text-black/50" /> Back to
            Services
          </Link>
          <div>
            <div className="flex items-center gap-2 bg-blue-600/5 backdrop-blur-sm border border-white/20 rounded-t-xl px-7 py-5">
              <div className="bg-[linear-gradient(135deg,_#3b82f6,_#3b82f6)] shadow-[rgba(59,230,246,0.35)_0px_4px_16px_0px] w-8 h-8 flex justify-center items-center rounded-full ">
                <Wrench size={16} />
              </div>
              <div className="flex flex-col">
                <h1 className="text-base text-slate-100 font-semibold">
                  {isEditMode ? "Edit Service" : "Create Service"}
                </h1>
                <p className="text-xs  text-[#7a8596]">
                  {isEditMode
                    ? "Update your service details"
                    : "Add a new Service"}
                </p>
              </div>
            </div>
            {/* service title and image url */}
            <form
              onSubmit={handleSubmit}
              className="bg-blue-900/10 border border-white/20 space-y-2 px-7 py-6 rounded-b-xl"
            >
              {/* title and image */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400">Service Title</label>
                  <input
                    name="title"
                    required
                    className={inputStyle}
                    type="text"
                    placeholder="AC Repair"
                    value={FormData.title}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400">Image URL</label>
                  <input
                    required
                    name="icon"
                    className={inputStyle}
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    value={FormData.icon}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* service description */}
              <div>
                <label className="text-xs text-gray-400">Description</label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  className={`${inputStyle} resize-y min-h-[82px] [&::-webkit-scrollbar]:hidden `}
                  type="text"
                  placeholder="Describe what this service covers"
                  value={FormData.description}
                  onChange={handleChange}
                />
              </div>

              {/* service price and time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400">Price</label>
                  <input
                    required
                    name="price"
                    className={inputStyle}
                    type="number"
                    placeholder="0.00"
                    value={FormData.price}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400">Service Time</label>
                  <input
                    required
                    name="serviceTime"
                    className={inputStyle}
                    type="text"
                    placeholder="e.g 2-3 hours"
                    value={FormData.serviceTime}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* service included items and common issues */}
              <div className="border-t border-t-white/10 pt-5 space-y-5">
                {/* Included Items */}
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Included Items
                  </label>

                  {included.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {included.map((item, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 border border-blue-500/25 text-blue-400"
                        >
                          {item}

                          <button
                            type="button"
                            onClick={() => removeIncludedItem(i)}
                            className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-blue-500/20 text-blue-400 border-none p-0"
                          >
                            <X size={8} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <input
                      name="included"
                      type="text"
                      value={includedInput}
                      placeholder="Add an included item — press Enter or +"
                      onChange={(e) => setIncludedInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addNewInluded();
                        }
                      }}
                      className={`${inputStyle} flex-1`}
                    />

                    <button
                      type="button"
                      onClick={addNewInluded}
                      className="flex items-center justify-center w-10 h-10 min-w-10 rounded-xl border bg-blue-500/10 border-blue-500/25 text-blue-400 hover:bg-blue-500/20 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Common Issues */}
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Common issues
                  </label>

                  {issues.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {issues.map((item, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 border border-blue-500/25 text-blue-400"
                        >
                          {item}

                          <button
                            type="button"
                            onClick={() => removeCommonIssue(i)}
                            className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-blue-500/20 text-blue-400 border-none p-0"
                          >
                            <X size={8} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <input
                      name="issues"
                      type="text"
                      value={issueInput}
                      placeholder="Add an Issues — press Enter or +"
                      onChange={(e) => setIssueInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addnewIssues();
                        }
                      }}
                      className={`${inputStyle} flex-1`}
                    />

                    <button
                      type="button"
                      onClick={addnewIssues}
                      className="flex items-center justify-center w-10 h-10 min-w-10 rounded-xl border bg-blue-500/10 border-blue-500/25 text-blue-400 hover:bg-blue-500/20 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-600 shadow-[rgba(59,230,246,0.35)_0px_4px_16px_0px] w-full py-2 rounded-lg text-sm"
              >
                {isEditMode ? "Update Service" : "Create Service"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateOrEditService;
