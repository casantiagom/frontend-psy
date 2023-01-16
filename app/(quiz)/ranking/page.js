"use client";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import Loading from "../loading";
import "survey-core/defaultV2.css";
import "../../global.css";

//import { json } from "./json";
StylesManager.applyTheme("defaultV2");
import { useAuth } from "../../contexts/AuthContext";
import { preventOverflow } from "@popperjs/core";

const Page = () => {
  let currentURL = "https://backend-psy.herokuapp.com";
  //let json = { pages: [] };
  let idForUser = [1, 2, 1];
  const [jsonBody, setJsonBody] = useState({
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
    ],
  });
  const [choices, setChoices] = useState([]);
  const [persons, setPersons] = useState([]);
  const [rankingNames, setRankingNames] = useState([]);
  const [localCurrentUser, setLocalCurrentUser] = useState();
  const [foundUserId, setFoundUserId] = useState();
  const [rankingAnswer, setRankingAnswer] = useState([]);
  let { currentUser } = useAuth();
  let foundUser;
  let rankingNamesArr;
  let [flag, setFlag] = useState(false);
  const surveyJson = {
    firstPageIsStarted: true,
  };

  useEffect(() => {
    getChoices();
    getPersons();
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
  }, [persons]);

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

  useEffect(() => {
    getRankingAnswers();
  }, []);

  let updateRankingAnswer = async (answer) => {
    console.log(answer);
    fetch(`${currentURL}/api/rankinganswer/${answer.id}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answer),
    });
  };

  useEffect(() => {
    rankingNames?.length > 0 &&
      rankingNames.forEach((rank) =>
        choices.map((obj) =>
          obj.id == rank
            ? setJsonBody((prevState) => ({
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
  }, [choices]);

  let survey = new Model(jsonBody);

  useEffect(() => {
    setTimeout(() => {
      setFlag(true);
    }, 2200);
  }, []);

  survey?.survey?.onComplete.add((sender, options) => {
    let result = sender.data;
    console.log(result);
    for (let item in result) {
      let arr = result[item];
      arr.forEach((k) => {
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
      });
    }
  });

  if (flag) {
    return <Survey model={survey} />;
  }
  return <Loading />;
};

export default Page;

/*


*/
