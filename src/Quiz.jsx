import { Container, Box, Button, Typography } from "@mui/material";
import {
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
} from "@mui/icons-material";
import { useState } from "react";
import Question from "./Question";

function Quiz({ data, onBackToMenu }) {
  const [questionIndex, setQuestionIndex] = useState(0);

  const handleNextQuestion = () => {
    if (questionIndex < data.results.length - 1) {
      setQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex((currentIndex) => currentIndex - 1);
    }
  };

  if (!data || !data.results) {
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
                data={data.results[questionIndex]}
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
        <Button variant="contained" sx={{ width: 300 }} onClick={onBackToMenu}>
          Back to Menu
        </Button>
      </Box>
    </Container>
  );
}

export default Quiz;
