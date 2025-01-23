import { Container, Box, Button, Typography } from "@mui/material";
import {
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import Question from "./Question";

function Quiz({ data, onBackToMenu }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    Array(data.results.length).fill(null)
  );
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);

  useEffect(() => {
    if (
      data?.results &&
      data.results.length > 0 &&
      shuffledQuestions.length === 0
    ) {
      const shuffledData = data.results.map((question) => {
        const answerList = [
          question.correct_answer,
          ...question.incorrect_answers,
        ];
        const shuffledAnswers = shuffleArray(answerList);
        return {
          ...question,
          answers: shuffledAnswers,
        };
      });
      setShuffledQuestions(shuffledData);
    }
  }, [data, shuffledQuestions]);

  const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleNextQuestion = () => {
    if (questionIndex < data.results.length - 1) {
      setQuestionIndex((prevIndex) => prevIndex + 1);
      setIsFormValid(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex((currentIndex) => currentIndex - 1);
      setIsFormValid(true);
    }
  };

  const handleAnswerSelection = (
    selectedAnswer,
    correctAnswer,
    questionIndex
  ) => {
    const wasAnsweredCorrectly = userAnswers[questionIndex] === correctAnswer;
    const isNowCorrect = selectedAnswer === correctAnswer;

    setUserAnswers((prev) =>
      prev.map((answer, idx) =>
        idx === questionIndex ? selectedAnswer : answer
      )
    );

    setCorrectAnswers((prev) => {
      if (wasAnsweredCorrectly && !isNowCorrect) {
        return prev - 1;
      } else if (!wasAnsweredCorrectly && isNowCorrect) {
        return prev + 1;
      }
      return prev;
    });
    setIsFormValid(true);
  };

  const handleQuizSubmit = () => {
    if (userAnswers.every((answer) => answer !== null)) {
      setIsFormValid(true);
      setQuizComplete(true);
    } else {
      setIsFormValid(false);
    }
  };

  if (!data?.results || shuffledQuestions.length === 0) {
    return (
      <Container sx={{ overflowY: "auto", maxHeight: "100vh" }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          alignSelf="center"
          fontSize={30}
          fontWeight="bold"
          textAlign="center"
          color="red"
          gap={2}
        >
          No data available. The API is experiencing issues.
          <Button
            variant="contained"
            sx={{ width: 300 }}
            onClick={onBackToMenu}
          >
            Back to Menu
          </Button>
        </Box>
      </Container>
    );
  }

  if (quizComplete) {
    return (
      <Container sx={{ overflowY: "auto", maxHeight: "100vh" }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          alignSelf="center"
          textAlign="center"
          gap={2}
          sx={{ my: 2 }}
        >
          <Typography variant="h4">Quiz Completed!</Typography>

          <Typography variant="h5">
            You answered {correctAnswers} out of {data.results.length} questions
            correctly!
          </Typography>
          <Box>
            <Typography variant="h4">Answer List</Typography>
            <Box
              sx={{
                border: "2px solid black",
                maxHeight: "50vh",
                overflowY: "auto",
              }}
            >
              {userAnswers.map((answer, index) => {
                const correctAnswer = shuffledQuestions[index].correct_answer;
                const questionText = shuffledQuestions[index].question;
                return (
                  <Box key={index} sx={{ my: 2, mx: 1 }}>
                    <Typography variant="h6">Question {index + 1}</Typography>
                    <Typography variant="h6">
                      {
                        new DOMParser().parseFromString(
                          questionText,
                          "text/html"
                        ).body.innerHTML
                      }
                    </Typography>
                    <Typography
                      color={answer === correctAnswer ? "green" : "red"}
                    >
                      Your Answer:{" "}
                      {
                        new DOMParser().parseFromString(answer, "text/html")
                          .body.innerHTML
                      }
                    </Typography>
                    <Typography color="green">
                      Correct Answer:{" "}
                      {
                        new DOMParser().parseFromString(
                          correctAnswer,
                          "text/html"
                        ).body.innerHTML
                      }
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Button
            variant="contained"
            sx={{ width: 300 }}
            onClick={onBackToMenu}
          >
            Back to Menu
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ overflowY: "auto", maxHeight: "100vh", py: 3 }}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={3}
      >
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="center"
          alignItems="center"
          gap={1}
        >
          {questionIndex > 0 && (
            <Button onClick={handlePreviousQuestion} sx={{ color: "black" }}>
              <KeyboardArrowLeftIcon
                sx={{
                  fontSize: 50,
                  border: "2px solid black",
                  borderRadius: "40%",
                }}
              />
            </Button>
          )}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={3}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h5">Question {questionIndex + 1}</Typography>
              <Question
                key={questionIndex}
                data={shuffledQuestions[questionIndex]}
                userAnswers={userAnswers}
                questionIndex={questionIndex}
                handleAnswerSelection={handleAnswerSelection}
              />
            </Box>
          </Box>
          {questionIndex < data.results.length - 1 && (
            <Button onClick={handleNextQuestion} sx={{ color: "black" }}>
              <KeyboardArrowRightIcon
                sx={{
                  fontSize: 50,
                  border: "2px solid black",
                  borderRadius: "40%",
                }}
              />
            </Button>
          )}
        </Box>
        {questionIndex === data.results.length - 1 && (
          <Button
            variant="contained"
            sx={{ width: 300, bgcolor: "red" }}
            onClick={handleQuizSubmit}
          >
            Submit Quiz
          </Button>
        )}
        {!isFormValid && (
          <Typography color="error" variant="body1" textAlign="center">
            Please answer all questions before submitting.
          </Typography>
        )}
        {questionIndex < data.results.length - 1 && (
          <Button
            variant="contained"
            sx={{ width: 300 }}
            onClick={onBackToMenu}
          >
            Quit Quiz
          </Button>
        )}
      </Box>
    </Container>
  );
}

export default Quiz;
