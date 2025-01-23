import {
  Box,
  Container,
  Typography,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

function Menu({ onSubmit }) {
  const questionCountArray = [...Array(50).keys()].map((i) =>
    (i + 1).toString()
  );
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

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      questionAmount: "",
      category: "",
      difficulty: "",
    },
  });

  return (
    <Container sx={{ maxHeight: "100vh" }}>
      <Typography variant="h3" sx={{ textAlign: "center", pt: 2 }}>
        Trivify
      </Typography>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          alignSelf="center"
          sx={{ py: 3, gap: 3 }}
        >
          <Controller
            name="questionAmount"
            control={control}
            rules={{
              required: "Please select between 1 and 50 questions.",
            }}
            render={({ field }) => (
              <FormControl sx={{ width: 300 }} error={!!errors.questionAmount}>
                <InputLabel>Question Amount</InputLabel>
                <Select
                  value={field.value || ""}
                  label="Question Amount"
                  onChange={(e) => field.onChange(e.target.value)}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: "25vh",
                        overflowY: "auto",
                        width: 300,
                      },
                    },
                  }}
                >
                  {questionCountArray.map((amount) => (
                    <MenuItem key={amount} value={amount}>
                      {amount}
                    </MenuItem>
                  ))}
                </Select>
                {errors.questionAmount && (
                  <FormHelperText>
                    {errors.questionAmount.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Controller
            name="category"
            control={control}
            rules={{
              required: "Category selection is required.",
            }}
            render={({ field }) => (
              <FormControl sx={{ width: 300 }} error={!!errors.category}>
                <InputLabel>Select Category</InputLabel>
                <Select
                  value={field.value || ""}
                  label="Select Category"
                  onChange={(e) => field.onChange(e.target.value)}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: "25vh",
                        overflowY: "auto",
                        width: 300,
                      },
                    },
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem
                      key={category}
                      value={category}
                      sx={{ wordWrap: "break-word", whiteSpace: "normal" }}
                    >
                      {category}
                    </MenuItem>
                  ))}
                </Select>
                {errors.category && (
                  <FormHelperText>{errors.category.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Controller
            name="difficulty"
            control={control}
            rules={{
              required: "Difficulty selection is required.",
            }}
            render={({ field }) => (
              <FormControl sx={{ width: 300 }} error={!!errors.difficulty}>
                <InputLabel>Select Difficulty</InputLabel>
                <Select
                  value={field.value || ""}
                  label="Select Difficulty"
                  onChange={(e) => field.onChange(e.target.value)}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: "25vh",
                        overflowY: "auto",
                        width: 300,
                      },
                    },
                  }}
                >
                  {difficulties.map((difficulty) => (
                    <MenuItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </MenuItem>
                  ))}
                </Select>
                {errors.difficulty && (
                  <FormHelperText>{errors.difficulty.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Button variant="contained" sx={{ width: 300 }} type="submit">
            Start Quiz
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default Menu;
