import toast from "react-hot-toast";

const toastStyle = {
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  color: "#fff",
  border: "1px solid rgba(250,250,250,0.20)",
  borderRadius: "18px",
  padding: "12px 20px",
};

export const successToast = (message, position = "top-center") => {
  toast.success(message, {
    icon: "✅",
    position: position,
    style: toastStyle,
  });
};

export const errorToast = (error, position = "top-center") => {
  toast.error(
    error?.response?.data?.message || error?.message || "Something went wrong",
    {
      icon: "⚠️",
      position: position,
      style: {
        ...toastStyle,
        boxShadow: "0 5px 32px rgba(250,250,250,0.30)",
      },
    },
  );
};
