import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { toast } from "react-toastify";
import loginBg from "../assets/login-bg.png";
import { FaTrashAlt } from "react-icons/fa";
import { HiChevronRight } from "react-icons/hi";

function AssessmentManagement() {
  const [assessments, setAssessments] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [question, setQuestion] =
    useState("");

  const [option1, setOption1] =
    useState("");

  const [option2, setOption2] =
    useState("");

  const [option3, setOption3] =
    useState("");

  const [option4, setOption4] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  useEffect(() => {
    const storedAssessments =
      JSON.parse(
        localStorage.getItem(
          "assessments"
        )
      ) || [];

    setAssessments(
      storedAssessments
    );
  }, []);

  const saveAssessment = () => {
    if (
      !title ||
      !question ||
      !option1 ||
      !option2 ||
      !option3 ||
      !option4 ||
      !answer
    ) {
      toast.error(
        "Please fill all fields"
      );
      return;
    }

    const newAssessment = {
      id: Date.now(),
      title,
      question,
      options: [
        option1,
        option2,
        option3,
        option4,
      ],
      answer,
    };

    const updatedAssessments = [
      ...assessments,
      newAssessment,
    ];

    setAssessments(
      updatedAssessments
    );

    localStorage.setItem(
      "assessments",
      JSON.stringify(
        updatedAssessments
      )
    );

    setTitle("");
    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setAnswer("");

    toast.success(
      "Assessment Created"
    );
  };

  const deleteAssessment = (
    id
  ) => {
    const updatedAssessments =
      assessments.filter(
        (assessment) =>
          assessment.id !== id
      );

    setAssessments(
      updatedAssessments
    );

    localStorage.setItem(
      "assessments",
      JSON.stringify(
        updatedAssessments
      )
    );

    toast.success(
      "Assessment Deleted"
    );
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

        {/* Header */}

        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          Assessment Management
        </h1>

        <p className="text-gray-500 text-lg mb-8">
          Create and manage assessments effortlessly.
        </p>

        {/* Create Assessment */}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-7 mb-8">

          <h2 className="text-3xl font-bold mb-6">
            Create Assessment
          </h2>

          <div className="space-y-5">

            <div>
              <label className="block font-medium mb-2">
                Assessment Name
              </label>

              <input
                type="text"
                placeholder="Enter assessment name"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Question
              </label>

              <textarea
                rows="3"
                placeholder="Enter the question"
                value={question}
                onChange={(e) =>
                  setQuestion(e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl p-4"
              />
            </div>

            <div>

              <label className="block font-medium mb-3">
                Options
              </label>

              <div className="space-y-3">

                {[
                  {
                    value: option1,
                    setter: setOption1,
                    no: 1,
                  },
                  {
                    value: option2,
                    setter: setOption2,
                    no: 2,
                  },
                  {
                    value: option3,
                    setter: setOption3,
                    no: 3,
                  },
                  {
                    value: option4,
                    setter: setOption4,
                    no: 4,
                  },
                ].map((item) => (

                  <div
                    key={item.no}
                    className="flex gap-3"
                  >

                    <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                      {item.no}
                    </div>

                    <input
                      type="text"
                      value={item.value}
                      placeholder={`Enter option ${item.no}`}
                      onChange={(e) =>
                        item.setter(
                          e.target.value
                        )
                      }
                      className="flex-1 border border-gray-300 rounded-xl px-4"
                    />

                    <button
                      type="button"
                      className="w-12 h-12 rounded-xl border border-red-200 text-red-500 flex items-center justify-center"
                    >
                      <FaTrashAlt />
                    </button>

                  </div>

                ))}

              </div>

            </div>

            <div>
              <label className="block font-medium mb-2">
                Correct Answer
              </label>

              <select
                value={answer}
                onChange={(e) =>
                  setAnswer(
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 rounded-xl p-4"
              >
                <option value="">
                  Select the correct option
                </option>

                <option value={option1}>
                  Option 1
                </option>

                <option value={option2}>
                  Option 2
                </option>

                <option value={option3}>
                  Option 3
                </option>

                <option value={option4}>
                  Option 4
                </option>

              </select>
            </div>

            <button
              onClick={saveAssessment}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-medium"
            >
              Create Assessment
            </button>

          </div>

        </div>

        </div>

      </div>
  </MainLayout>
);
}

export default AssessmentManagement;