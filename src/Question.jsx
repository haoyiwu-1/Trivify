import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { decode } from "he";

function Question({ data, userAnswers, questionIndex, handleAnswerSelection }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      alignSelf="center"
      textAlign="center"
      gap={1}
      fontWeight="bold"
    >
      <Card sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontSize: { xs: "12px", sm: "20px" } }}>
          {decode(data.question)}
        </Typography>
        <CardContent>
          {data.answers.map((answer, index) => (
            <Button
              sx={{ m: 1, flex: 1, xs: "12px", sm: "20px" }}
              key={index}
              variant={
                userAnswers[questionIndex] === answer ? "contained" : "outlined"
              }
              onClick={() =>
                handleAnswerSelection(
                  answer,
                  data.correct_answer,
                  questionIndex
                )
              }
            >
              {String.fromCharCode(65 + index)}. {decode(answer)}
            </Button>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}

export default Question;
