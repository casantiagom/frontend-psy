"use client";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
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
  const [jsonBody, setJsonBody] = useState({ pages: [] });
  const [choices, setChoices] = useState([]);
  const [persons, setPersons] = useState([]);
  const [rankingNames, setRankingNames] = useState([]);
  const [localCurrentUser, setLocalCurrentUser] = useState();
  const [foundUserId, setFoundUserId] = useState();
  const [rankingAnswer, setRankingAnswer] = useState([]);
  const [answerToSend, setAnswerToSend] = useState([]);
  const getAnswerRef = useRef(false);
  let { currentUser } = useAuth();
  let foundUser;
  let rankingNamesArr;
  let arrTest = [1, 2];

  useEffect(() => {
    getChoices();
    getPersons();
  }, []);

  useEffect(() => {
    setLocalCurrentUser(currentUser);
  }, [currentUser]);

  useEffect(() => {
    foundUser = persons.find(
      (user) => user.user_email == "ca.santiagom@gmail.com" //localCurrentUser?.email
    );
    setFoundUserId(foundUser?.id);
    rankingNamesArr = foundUser?.rankingName;
    setRankingNames(rankingNamesArr);
    console.log(rankingNamesArr);
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
    rankingNamesArr.length > 0 &&
      rankingNamesArr.forEach((rank) =>
        choices.map((obj) =>
          obj.id == rank
            ? setJsonBody((prevState) => ({
                pages: [
                  ...prevState.pages,
                  {
                    name: `page${rank}`,
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
    console.log(rankingNames);
  }, [choices]);

  const survey = new Model(jsonBody);

  survey.onComplete.add((sender, options) => {
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

  survey.onValueChanging.add((sender) => {
    console.log(rankingAnswer);
  });

  //survey.onValueChanged.add((survey) => console.log(survey.data));

  return choices && jsonBody && <Survey model={survey} />;
};

export default Page;

/*


*/
