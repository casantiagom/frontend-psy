export const json = {
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
      elements: [],
      name: "page1",
    },
  ],
};


{
   "name": "nps-panel",
   "elements": [
    {
     "type": "matrix",
     "name": "question1",
     "title": "123123",
     "isRequired": true,
     "columns": [
      "Column 1",
      "Column 2",
      "Column 3",
      "Column 4",
      "Column 5"
     ],
     "rows": [
      "Row 1",
      "Row 2"
     ]
    }
   ]
  }
