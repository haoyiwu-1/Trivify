import { Container, Box, Button } from "@mui/material";

import Question from "./Question";

function Quiz({ data, onBackToMenu }) {
  if (!data || !data.results) {
    return (
      <Container>
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
    <Container
      maxWidth="false"
      sx={{
        maxHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        alignSelf="center"
        textAlign="center"
        gap={2}
      >
        {data.results.map((questionData, index) => (
          <Question key={index} data={questionData} />
        ))}
        <Button variant="contained" sx={{ width: 300 }} onClick={onBackToMenu}>
          Back to Menu
        </Button>
      </Box>
    </Container>
  );
}

export default Quiz;
