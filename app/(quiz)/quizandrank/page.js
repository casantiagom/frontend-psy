"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link.js";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import Loading from "../loading";
import "survey-core/defaultV2.min.css";
import "../../global.css";
StylesManager.applyTheme("defaultV2");
import { useAuth } from "../../contexts/AuthContext";

const Page = () => {
  let currentURL = "https://backend-psy.herokuapp.com";
  const [quizzes, setQuizzes] = useState([]);
  let [answer, setAnswer] = useState([]);
  const [rankForJson, setRankForJson] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [choices, setChoices] = useState([]);
  const [persons, setPersons] = useState([]);
  const [quizNumber, setQuizNumber] = useState();
  const [loading, setLoading] = useState(true);
  const [rankingNames, setRankingNames] = useState([]);
  const [localCurrentUser, setLocalCurrentUser] = useState();
  const [foundUserId, setFoundUserId] = useState();
  const [rankingAnswer, setRankingAnswer] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  let { currentUser } = useAuth();
  let foundUser;
  let rankingNamesArr;
  let quiz;
  let [flag, setFlag] = useState(false);

  useEffect(() => {
    getChoices();
    getPersons();
    getRankingAnswers();
    getQuizzes();
    getQuestionLikert();
    getPersons();
    getAnswer();
  }, []);

  useEffect(() => {
    setLocalCurrentUser(currentUser);
  }, [currentUser]);

  useEffect(() => {
    foundUser = persons.find(
      (user) => user.user_email == localCurrentUser?.email
    );
    setFoundUserId(foundUser?.id);
    rankingNamesArr = foundUser?.rankingName;
    setRankingNames(rankingNamesArr);
    setQuizNumber(foundUser?.quizzes[0]);
  }, [persons]);

  useEffect(() => {
    //  quiz = quizzes.find((quiz) => quiz.person == foundUser?.id);
    setQuizNumber(foundUser?.quizzes[0]);
  }, [foundUser]);

  // GET FROM API
  let getChoices = async () => {
    let response = await fetch(`${currentURL}/api/rankingname/`);
    let data = await response.json();
    setChoices(data);
  };

  let getRankingAnswers = async () => {
    let response = await fetch(`${currentURL}/api/rankinganswer/`);
    let data = await response.json();
    setRankingAnswer(data);
  };

  let getPersons = async () => {
    let response = await fetch(`${currentURL}/api/persons/`);
    let data = await response.json();
    setPersons(data);
  };

  let postRankingAnswer = async (answer) => {
    fetch(`${currentURL}/api/rankinganswer/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answer),
    });
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

  let updateRankingAnswer = async (answer) => {
    // console.log(answer);
    fetch(`${currentURL}/api/rankinganswer/${answer.id}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answer),
    });
  };

  let getQuestionLikert = async () => {
    let response = await fetch(`${currentURL}/api/questionlikert/`);
    let data = await response.json();
    setQuestions(data);
  };

  const getFilteredQuestions = () => {
    return questions.filter((q) => {
      if (q.quiz == quizNumber) {
        return q;
      }
    });
  };

  useEffect(() => {
    setFilteredQuestions(getFilteredQuestions());
  }, [questions]);

  // set JSON for filling the survey
  /*
  let setJson = () => {
    rankingNames?.forEach((rank) =>
      choices.map((obj) =>
        obj.id == rank
          ? setJson((prevState) => ({
              ...prevState,
              pages: [
                ...prevState.pages, 
                {
                  name: `page${rank + 1}`,
                  elements: [
                    {
                      type: "ranking",
                      name: obj.rankingName,
                      title:
                        "Por favor ordena los items desde el mas importante al menos: ",
                      isRequired: true,
                      choices: obj.choice,
                    },
                  ],
                },
              ],
            }))
          : null
      )
    );
  };

  useEffect(() => {
    //  setJson();
  }, [rankingNames]);
 */

  let survey = new Model({
    firstPageIsStarted: "true",
    startSurveyText: "Comenzar",
    pageNextText: "Continuar",
    pagePrevText: "Atras",
    completeText: "Terminar",
    completedHtml: "<h2> Gracias por completar la encuesta! </h2>",
    pages: [
      {
        elements: [
          {
            type: "panel",
            elements: [
              {
                type: "html",
                name: "intro",
                html: "<article class='intro'>    <h1 class='text-bold text-center mt-10'>                     Porfavor, Complete la siguente encuesta.              </h1>    </article>",
              },
            ],
            name: "panel1",
          },
        ],
        name: "page0",
      },
      {
        name: "page1",
        elements: [],
      },
    ],
  });

  // survey.addNewPage();

  rankingNames?.forEach((rank) =>
    choices.map((obj) => {
      let getQuestionName = survey.getQuestionByName(obj?.rankingName);
      if (obj.id == rank && !getQuestionName) {
        const questionJson = {
          name: obj?.rankingName,
          title:
            "Por favor ordena los items desde el mas importante al menos: ",
          choices: obj.choice,
          isRequired: true,
        };
        const question = survey.pages[1].addNewQuestion("ranking");
        question.fromJSON(questionJson);
      }
    })
  );

  const likertJson = {
    name: "ordena",
    title: "TITLE",
    isRequired: true,
    isAllRowsRequiered: true,
    columns: [
      { value: 1, text: "Abysmal" },
      { value: 2, text: "Poor" },
      { value: 3, text: "Average" },
      { value: 4, text: "Good" },
      { value: 5, text: "Excellent" },
    ],
    rows: [],
  };

  const likertQuestionsToJson = () => {
    filteredQuestions?.map((q) => {
      likertJson.rows.push({ value: q.id, text: q.question });
    });
    const question = survey.pages[1].addNewQuestion("matrix");
    question.fromJSON(likertJson);
  };

  filteredQuestions && likertQuestionsToJson();

  survey?.onComplete.add((sender, options) => {
    let result = sender.data;
    console.log(result);
    for (let item in result) {
      let arr = result[item];
      Array.isArray(arr)
        ? arr.forEach((k) => {
            let indexOf = arr.indexOf(k) + 1;
            //found.userChoice = indexOf;
            choices.map((c) => {
              let choicesArr = c.choice;
              choicesArr.map((ele, index) => {
                if (ele == k) {
                  if (rankingAnswer.length > 1) {
                    rankingAnswer.forEach((ra) => {
                      if (
                        ra.userChoice != indexOf &&
                        ra.choice == ele &&
                        ra.person == foundUserId
                      ) {
                        updateRankingAnswer({
                          id: ra.id,
                          userChoice: indexOf,
                          choice: ra.choice,
                          person: ra.person,
                        });
                      }
                    });
                  } else {
                    postRankingAnswer({
                      userChoice: indexOf,
                      choice: ele,
                      person: foundUserId,
                    });
                  }
                }
              });
            });
            // let found = rankingAnswer.find((element) => element.choice == k);
          })
        : Object.keys(arr).forEach((key, index) => {
            let foundAnswer = answer.find((a) => a.question == key);
            console.log(foundAnswer);
            foundAnswer
              ? updateAnswer({
                  id: foundAnswer.id,
                  answer: arr[key],
                  person: foundUserId,
                })
              : createAnswer({
                  answer: arr[key],
                  question: key,
                  person: foundUserId,
                });
          });
    }
  });

  return <Survey model={survey} />;
};

export default Page;

/*
updateAnswer({
                      id: a.id,
                      answer: arr[key],
                      person: foundUserId,
                    })
                  : createAnswer({
                      answer: arr[key],
                      question: key,
                      person: foundUserId,
                    })

*/
