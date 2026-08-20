import MainLayout from "../layouts/MainLayout";
import loginBg from "../assets/login-bg.png";
import { FaChartBar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getAllResults } from "../services/resultService";
import { getAllMockInterviewResults } from "../services/MockInterviewService";

function PerformanceReports() {
  const [history, setHistory] = useState([]);
const [mockHistory, setMockHistory] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {

  const loadPerformanceData = async () => {

    try {

      const [assessmentResults, mockResults] =
        await Promise.all([
          getAllResults(),
          getAllMockInterviewResults(),
        ]);

      setHistory(assessmentResults);
      setMockHistory(mockResults);

    } catch (error) {

      console.error(
        "Failed to load performance data:",
        error
      );

    } finally {

      setLoading(false);

    }

  };

  loadPerformanceData();

}, []);

  const validResults =
    history.filter(
      (result) =>
        result.studentName &&
        result.studentEmail
    );

  const groupedStudents = {};

  validResults.forEach(
    (result) => {
      const key =
        result.studentEmail;

      if (
        !groupedStudents[key]
      ) {
        groupedStudents[key] = [];
      }

      groupedStudents[key].push(
        result
      );
    }
  );

  const students =
    Object.values(
      groupedStudents
    );

  const getPerformanceLevel =
    (average) => {
      if (average >= 90)
        return "Outstanding";

      if (average >= 80)
        return "Excellent";

      if (average >= 70)
        return "Good";

      if (average >= 50)
        return "Average";

      return "Needs Improvement";
    };

  return (
  <MainLayout>
    <div
      className="min-h-screen -m-8 p-8 bg-cover bg-center"
      style={{
        backgroundImage: `url(${loginBg})`,
      }}
    >
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          Performance Reports
        </h1>

        <p className="text-gray-500 mb-8 text-lg">
          Student performance summary and analysis.
        </p>

        {loading ? (

  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 text-center">
    Loading performance reports...
  </div>

) : students.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            No Performance Data Found
          </div>
        ) : (
          <div className="space-y-8">

            {students.map((studentResults, index) => {
              const student = studentResults[0];

              const scores = studentResults.map(
                (item) => item.percentage
              );

              const average = Math.round(
                scores.reduce(
                  (sum, score) =>
                    sum + score,
                  0
                ) / scores.length
              );

              const highest = Math.max(
                ...scores
              );

              const lowest = Math.min(
                ...scores
              );

              const categoryScores = {};

              studentResults.forEach(
                (item) => {
                  if (
                    !categoryScores[
                      item.category
                    ]
                  ) {
                    categoryScores[
                      item.category
                    ] = [];
                  }

                  categoryScores[
                    item.category
                  ].push(
                    item.percentage
                  );
                }
              );

              const bestCategory =
                Object.keys(
                  categoryScores
                ).reduce(
                  (best, current) => {
                    const bestAvg =
                      categoryScores[
                        best
                      ].reduce(
                        (
                          sum,
                          score
                        ) =>
                          sum + score,
                        0
                      ) /
                      categoryScores[
                        best
                      ].length;

                    const currentAvg =
                      categoryScores[
                        current
                      ].reduce(
                        (
                          sum,
                          score
                        ) =>
                          sum + score,
                        0
                      ) /
                      categoryScores[
                        current
                      ].length;

                    return currentAvg >
                      bestAvg
                      ? current
                      : best;
                  }
                );

              const studentMocks =
                mockHistory.filter(
                  (mock) =>
                    mock.studentName ===
                    student.studentName
                );

              const avgMockScore =
                studentMocks.length > 0
                  ? Math.round(
                      studentMocks.reduce(
                        (
                          sum,
                          mock
                        ) =>
                          sum +
                          mock.percentage,
                        0
                      ) /
                        studentMocks.length
                    )
                  : 0;

              const bestMock =
                studentMocks.length > 0
                  ? Math.max(
                      ...studentMocks.map(
                        (mock) =>
                          mock.percentage
                      )
                    )
                  : 0;

              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-sm border border-gray-100 p-7"
                >

                  {/* Top */}

                  <div className="flex justify-between items-start mb-8">

                    <div className="flex items-center gap-5">

                      <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-3xl">

                        {student.studentName
                          ?.split(" ")
                          .map(
                            (word) =>
                              word[0]
                          )
                          .join("")
                          .toUpperCase()}

                      </div>

                      <div>

                        <h2 className="text-3xl font-bold">
                          {
                            student.studentName
                          }
                        </h2>

                        <p className="text-gray-500">
                          {
                            student.studentEmail
                          }
                        </p>

                      </div>

                    </div>

                    <div className="bg-blue-50 rounded-2xl px-6 py-3 text-center">

                      <p className="text-blue-600 text-sm font-medium">
                        Overall Performance
                      </p>

                      <p className="text-blue-600 text-4xl font-bold">
                        {average}%
                      </p>

                    </div>

                  </div>

                  {/* Stats */}

                  <div className="grid grid-cols-4 gap-6 border-b pb-8">

                    <div>
                      <p className="text-gray-500">
                        Average Score
                      </p>

                      <p className="text-3xl font-bold text-blue-600">
                        {average}%
                      </p>
                    </div>

                    <div className="border-l pl-6">
                      <p className="text-gray-500">
                        Highest Score
                      </p>

                      <p className="text-3xl font-bold text-green-600">
                        {highest}%
                      </p>
                    </div>

                    <div className="border-l pl-6">
                      <p className="text-gray-500">
                        Lowest Score
                      </p>

                      <p className="text-3xl font-bold text-red-600">
                        {lowest}%
                      </p>
                    </div>

                    <div className="border-l pl-6">
                      <p className="text-gray-500">
                        Total Attempts
                      </p>

                      <p className="text-3xl font-bold">
                        {
                          studentResults.length
                        }
                      </p>
                    </div>

                  </div>

                  {/* Bottom */}

                  <div className="grid md:grid-cols-2 gap-8 pt-8">

                    <div className="flex gap-8">

                      <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
  <FaChartBar className="text-blue-600 text-2xl" />
</div>

                        <div>

                          <p className="text-gray-500">
                            Performance Level
                          </p>

                          <p className="font-bold text-2xl">
                            {getPerformanceLevel(
                              average
                            )}
                          </p>

                        </div>

                      </div>

                      <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
  <FaRegStar className="text-green-600 text-2xl" />
</div>

                        <div>

                          <p className="text-gray-500">
                            Best Category
                          </p>

                          <p className="font-bold text-2xl capitalize">
                            {
                              bestCategory
                            }
                          </p>

                        </div>

                      </div>

                    </div>

                    <div className="border-l pl-8">

                      <h3 className="font-bold text-blue-600 text-xl mb-4">
                        Mock Interview Performance
                      </h3>

                      <div className="grid grid-cols-3 gap-4">

                        <div>

                          <p className="text-gray-500 text-sm">
                            Interviews Taken
                          </p>

                          <p className="text-2xl font-bold">
                            {
                              studentMocks.length
                            }
                          </p>

                        </div>

                        <div>

                          <p className="text-gray-500 text-sm">
                            Average Interview Score
                          </p>

                          <p className="text-2xl font-bold">
                            {avgMockScore}%
                          </p>

                        </div>

                        <div>

                          <p className="text-gray-500 text-sm">
                            Best Interview Score
                          </p>

                          <p className="text-2xl font-bold">
                            {bestMock}%
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  </MainLayout>
);
}

export default PerformanceReports;