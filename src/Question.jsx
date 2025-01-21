import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";

function Question({ data }) {
  const randomizeChoices = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const answerList = [data.correct_answer, ...data.incorrect_answers];
  randomizeChoices(answerList);

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
          {
            new DOMParser().parseFromString(data.question, "text/html").body
              .innerHTML
          }
        </Typography>
        <CardContent>
          {answerList.map((answer, index) => (
            <Button
              sx={{ m: 1, flex: 1, xs: "12px", sm: "20px" }}
              key={index}
              variant="outlined"
            >
              {String.fromCharCode(65 + index)}.{" "}
              {
                new DOMParser().parseFromString(answer, "text/html").body
                  .innerHTML
              }
            </Button>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}

export default Question;
