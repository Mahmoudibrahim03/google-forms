/*
##JSON-SERVER API
  ##Forms :
    GET_ALL_FORMS : http://localhost:2222/forms
    DELETE_FORM   : http://localhost:2222/forms/1
      -> DELETE FORM QUESTIONS : http://localhost:2222/questions?formId=1
      -> DELETE FORM ANSWERS : http://localhost:2222/answers?formId=1

    GET_ONE_FORM  : http://localhost:2222/forms/1
    UPDATE_FORM   : http://localhost:2222/forms/1
    CREATE_FORM   : http://localhost:2222/forms

    ## Questions :
      GET_ALL_QUESTIONS : http://localhost:2222/questions
      DELETE_QUESTION   : http://localhost:2222/questions/1
        -> DELETE_QUESTION_BY_FORM_ID : http://localhost:2222/questions?formId=1
        -> DELETE_ANSWERS_REALTED_TO_QUESTION : http://localhost:2222/answers?questionId=1

      # GET_ONE_QUESTION  : http://localhost:2222/questions/1

      # UPDATE_QUESTION   : http://localhost:2222/questions/1
        -> UPDATE_ANSWERS_REALTED_TO_QUESTION : http://localhost:2222/answers?questionId=1
        -> DELETE_ANSWERS_REALTED_TO_QUESTION: http: //localhost:2222/answers?questionId=1

      CREATE_QUESTION   : http://localhost:2222/questions

    ## Answers :
      GET_ALL_ANSWERS : http://localhost:2222/answers
      DELETE_ANSWER   : http://localhost:2222/answers/1
      GET_ONE_ANSWER  : http://localhost:2222/answers/1
      CREATE_ANSWER   : http://localhost:2222/answers
*/
