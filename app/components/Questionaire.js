import React from "react";
import Likert from "./Likert.js";

const Questionaire = ({ questions, questionSet }) => {
  let qToRender = [1, 2, 3];
  console.log(questions);

  return (
    <>
      <div className="w-2/4 ml-auto mr-auto">
        {questions &&
          questions.length &&
          qToRender.map((num) => (
            <Likert
              key={num}
              className="bg-slate-600"
              question={questions[num].question}
            />
          ))}
      </div>
    </>
  );
};

export default Questionaire;
