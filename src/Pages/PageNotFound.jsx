import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-7xl font-bold text-blue-400">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>

      <p className="mt-2 text-slate-400 text-center max-w-md">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <Link
        to="/"
        className="mt-8 rounded-xl bg-blue-600 px-6 py-3 hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
