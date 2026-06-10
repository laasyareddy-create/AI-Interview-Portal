import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

      <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md w-full">

        <h1 className="text-7xl font-bold text-blue-600 mb-4">
          404
        </h1>

        <h2 className="text-2xl font-bold mb-3">
          Page Not Found
        </h2>

        <p className="text-gray-600 mb-8">
          The page you are looking for does not exist
          or may have been moved.
        </p>

        <Link
          to="/dashboard"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </Link>

      </div>

    </div>
  );
}

export default NotFound;