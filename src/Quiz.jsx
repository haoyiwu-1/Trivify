import { Container, Box, Button } from "@mui/material";

function Quiz({ data, onBackToMenu }) {
  const randomizeChoices = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

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
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        alignSelf="center"
        textAlign="center"
      >
        <Button variant="contained" sx={{ width: 300 }} onClick={onBackToMenu}>
          Back to Menu
        </Button>
      </Box>
    </Container>
  );
}

export default Quiz;
