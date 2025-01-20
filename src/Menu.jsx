import {
  Autocomplete,
  Box,
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";

function Menu() {
  const questionCountArray = [...Array(50).keys()].map((i) => i + 1);
  const categories = [
    "Any Category",
    "General Knowledge",
    "Entertainment: Books",
    "Entertainment: Film",
    "Entertainment: Music",
    "Entertainment: Musicals and Theatres",
    "Entertainment: Television",
    "Entertainment: Video Games",
    "Entertainment: Board Games",
    "Science & Nature",
    "Science: Computers",
    "Science: Mathematics",
    "Mythology",
    "Sports",
    "Geography",
    "History",
    "Politics",
    "Art",
    "Celebrities",
    "Animals",
    "Vehicles",
    "Entertainment: Comics",
    "Science: Gadgets",
    "Entertainment: Japanese Anime & Manga",
    "Entertainment: Cartoon & Animations",
  ];
  const difficulties = ["Easy", "Medium", "Hard"];

  return (
    <Container>
      <Typography variant="h3" sx={{ textAlign: "center", pt: 2 }}>
        Trivify
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        alignSelf="center"
        sx={{ py: 3, gap: 3 }}
      >
        <Autocomplete
          sx={{ width: 300 }}
          options={questionCountArray}
          renderInput={(params) => (
            <TextField {...params} label="Question Amount" />
          )}
        />
        <Autocomplete
          sx={{ width: 300 }}
          options={categories}
          renderInput={(params) => (
            <TextField {...params} label="Select Category" />
          )}
        />
        <Autocomplete
          sx={{ width: 300 }}
          options={difficulties}
          renderInput={(params) => <TextField {...params} label="Difficulty" />}
        />
        <Button variant="contained" sx={{ width: 300 }}>
          Start Quiz
        </Button>
      </Box>
    </Container>
  );
}

export default Menu;
