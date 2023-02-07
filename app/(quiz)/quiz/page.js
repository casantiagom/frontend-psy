"use client";
import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../../contexts/AuthContext.js";
import Likert from "react-likert-scale";
import Link from "next/link.js";

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
    setQuizNumber(foundUser?.quizzes[0]);
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
    <div className="">
      <div className="flex flex-col justify-center items-center">
        {questions &&
          questions.length &&
          quizzes.length &&
          answer &&
          quizNumber &&
          getFilteredQuestions().map((q) => {
            console.log(getFilteredQuestions());
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
                console.log("user id ", foundUser.id);

                answer.find((a) => a.question == q.id) == undefined
                  ? setAnswer((prevState) => [
                      ...prevState,
                      {
                        answer: val.value,
                        question: q.id,
                        person: foundUser.id,
                      },
                    ])
                  : setAnswer((prevState) =>
                      prevState.map((el) =>
                        el.question == q.id
                          ? { ...el, answer: val.value, person: foundUser.id }
                          : { ...el }
                      )
                    );
                console.log(answer);
              },
            };

            return (
              <Likert
                className="w-5/6 items-center"
                key={q.id}
                {...likertOptions}
              />
            );
          })}
        {
          <Link
            className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 w-2/5 self-center text-center mt-10 mb-10"
            onClick={handleSubmit}
            href="/thanks"
          >
            Enviar
          </Link>
        }
      </div>
    </div>
  );
};

export default Page;
