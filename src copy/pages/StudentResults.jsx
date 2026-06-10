import MainLayout from "../layouts/MainLayout";
import loginBg from "../assets/login-bg.png";

function StudentResults() {
  const history =
    JSON.parse(
      localStorage.getItem(
        "assessmentHistory"
      )
    ) || [];

  return (
  <MainLayout>
    <div
      className="min-h-screen -m-8 p-8 bg-cover bg-center"
      style={{
        backgroundImage: `url(${loginBg})`,
      }}
    >
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          Student Results
        </h1>

        <p className="text-gray-500 mb-8">
          Review student assessment attempts and performance.
        </p>

        {history.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            No Assessment Attempts Found
          </div>
        ) : (
          <div className="space-y-6">

            {history
              .filter(
                (result) =>
                  result.studentName &&
                  result.studentEmail
              )
              .slice()
              .reverse()
              .map((result, index) => (

                <div
                  key={index}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6"
                >

                  {/* Top Section */}

                  <div className="flex justify-between items-start mb-6">

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-lg">
  {result.studentName
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()}
</div>
                      <div>

                        <h2 className="text-2xl font-bold text-slate-900">
                          {result.studentName}
                        </h2>

                        <p className="text-gray-500">
                          {result.studentEmail}
                        </p>

                      </div>

                    </div>

                    <div className="bg-blue-50 text-blue-700 px-5 py-2 rounded-2xl font-bold text-lg">
                      {result.percentage}%
                    </div>

                  </div>

                  {/* Bottom Section */}

                  <div className="grid grid-cols-3 gap-8">

                    <div>

                      <p className="text-gray-500 text-sm mb-1">
                        Category
                      </p>

                      <p className="font-bold text-xl capitalize">
                        {result.category}
                      </p>

                    </div>

                    <div className="border-l border-gray-200 pl-8">

                      <p className="text-gray-500 text-sm mb-1">
                        Difficulty
                      </p>

                      <p className="font-bold text-xl capitalize">
                        {result.difficulty}
                      </p>

                    </div>

                    <div className="border-l border-gray-200 pl-8">

                      <p className="text-gray-500 text-sm mb-1">
                        Score
                      </p>

                      <p className="font-bold text-xl">
                        {result.score}/{result.totalQuestions}
                      </p>

                    </div>

                  </div>

                </div>

              ))}

          </div>
        )}

      </div>
    </div>
  </MainLayout>
);
}

export default StudentResults;