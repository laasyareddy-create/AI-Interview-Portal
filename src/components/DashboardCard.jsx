import {
  FaTrophy,
  FaChartLine,
  FaClipboardCheck,
  FaUsers,
} from "react-icons/fa";

const DashboardCard = ({
  title,
  value,
}) => {

  const getIcon = () => {
    switch (title) {
      case "Highest Score":
        return (
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
            <FaTrophy className="text-purple-600" />
          </div>
        );

      case "Average Score":
        return (
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
            <FaChartLine className="text-blue-600" />
          </div>
        );

      case "Assessments":
        return (
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
            <FaClipboardCheck className="text-green-600" />
          </div>
        );

      default:
        return (
          <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
            <FaUsers className="text-orange-500" />
          </div>
        );
    }
  };

  const getColor = () => {
    switch (title) {
      case "Highest Score":
        return "text-purple-600";
      case "Average Score":
        return "text-blue-600";
      case "Assessments":
        return "text-green-600";
      default:
        return "text-orange-500";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

      {getIcon()}

      <h3 className="text-gray-600 mt-4">
        {title}
      </h3>

      <p
        className={`text-4xl font-bold mt-2 ${getColor()}`}
      >
        {value}
      </p>

    </div>
  );
};

export default DashboardCard;