"use client";
import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../contexts/AuthContext.js";
import Likert from "react-likert-scale";

const Page = () => {
  let [quizzes, setQuizzes] = useState([]);
  let [questions, setQuestions] = useState([]);
  let [persons, setPersons] = useState([]);
  let [answer, setAnswer] = useState([]);
  let [quizNumber, setQuizNumber] = useState();
  let [loading, setLoading] = useState(true);
  let [localCurrentUser, setLocalCurrentUser] = useState();
  let { currentUser } = useAuth();

  let currentURL = "https://backend-psy.herokuapp.com";

  let foundUser;
  let quiz;

  useEffect(() => {
    setLocalCurrentUser(currentUser);
  }, [currentUser]);

  if (persons && localCurrentUser && quizzes) {
    foundUser = persons.find(
      (user) => user.user_email == localCurrentUser.email
    );
    // console.log("foundUser", foundUser);
    //console.log("questions", questions);
  }

  useEffect(() => {
    quiz = quizzes.find((quiz) => quiz.person == foundUser?.id);
    setQuizNumber(quiz?.id);
    console.log("quizNumber  " + quizNumber);
  }, [foundUser]);

  useEffect(() => {
    setLoading(false);
  }, [quizNumber]);

  useEffect(() => {
    getQuizzes();
    getQuestionLikert();
    getPersons();
    getAnswer();
  }, []);

  let getPersons = async () => {
    let response = await fetch(`${currentURL}/api/persons/`);
    let data = await response.json();
    setPersons(data);
  };

  let getQuizzes = async () => {
    let response = await fetch(`${currentURL}/api/quizzes/`);
    let data = await response.json();
    setQuizzes(data);
  };

  let getAnswer = async () => {
    let response = await fetch(`${currentURL}/api/answer/`);
    let data = await response.json();
    setAnswer(data);
  };

  let createAnswer = async (answer) => {
    fetch(`${currentURL}/api/answer/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answer),
    });
  };

  let updateAnswer = async (answer) => {
    fetch(`${currentURL}/api/answer/${answer.id}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answer),
    });
  };

  const handleSubmit = () => {
    answer.map((a) => (a.id ? updateAnswer(a) : createAnswer(a)));
  };

  let getQuestionLikert = async () => {
    let response = await fetch(`${currentURL}/api/questionlikert/`);
    let data = await response.json();
    setQuestions(data);
  };

  const getFilteredQuestions = () => {
    if (!loading)
      return questions.filter((q) => {
        console.log("filtered" + quizNumber);
        if (q.quiz == quizNumber) {
          return q;
        }
      });
  };
  // console.log(getFilteredQuestions());
  //persons && persons.length && console.log(persons);

  return (
    <>
      <div className="w-2/4 ml-auto mr-auto">
        {questions &&
          questions.length &&
          quizzes.length &&
          answer &&
          quizNumber &&
          getFilteredQuestions().map((q) => {
            const likertOptions = {
              question: q.question,
              responses: [
                { value: 1, text: "Abysmal" },
                { value: 2, text: "Poor" },
                { value: 3, text: "Average" },
                { value: 4, text: "Good" },
                { value: 5, text: "Excellent" },
              ],
              onChange: (val) => {
                console.log(val.value);
                //console.log(q);

                answer.find((a) => a.question == q.id) == undefined
                  ? setAnswer((prevState) => [
                      ...prevState,
                      {
                        answer: val.value,
                        question: q.id,
                        person: 1,
                      },
                    ])
                  : setAnswer((prevState) =>
                      prevState.map((el) =>
                        el.question == q.id
                          ? { ...el, answer: val.value }
                          : { ...el }
                      )
                    );
                console.log(quizzes);
              },
            };

            return <Likert key={q.id} {...likertOptions} />;
          })}
        {
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto mr-auto"
            onClick={handleSubmit}
          >
            SUBMIT
          </button>
        }
      </div>
    </>
  );
};

export default Page;
