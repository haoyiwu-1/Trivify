import {
  Autocomplete,
  Box,
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      questionAmount: 10,
      Category: "Any Category",
      Difficulty: "Easy",
    },
  });

  const handleDropdownOpen = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setIsDropdownOpen(true);
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isDropdownOpen]);

  return (
    <Container sx={{ maxHeight: "100vh" }}>
      <Typography variant="h3" sx={{ textAlign: "center", pt: 2 }}>
        Trivify
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              required: "Choose between 1 and 50 questions.",
            }}
            render={({ field }) => (
              <Autocomplete
                sx={{ width: 300 }}
                {...field}
                options={questionCountArray}
                getOptionLabel={(option) => option.toString()}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Question Amount"
                    error={!!errors.questionAmount}
                    helperText={errors.questionAmount?.message}
                  />
                )}
                onChange={(_, value) => field.onChange(value)}
                onOpen={() => setIsDropdownOpen(true)}
                onClose={() => setIsDropdownOpen(false)}
                slotProps={{
                  listbox: {
                    sx: {
                      maxHeight: "50vh",
                      overflow: "auto",
                      backgroundColor: "lightgrey",
                    },
                    onTouchStart: () => {
                      if (document.activeElement instanceof HTMLElement) {
                        document.activeElement.blur();
                      }
                    },
                  },
                }}
              />
            )}
          />

          <Controller
            name="Category"
            control={control}
            rules={{ required: "You must select a category." }}
            render={({ field }) => (
              <Autocomplete
                disablePortal
                sx={{ width: 300 }}
                {...field}
                options={categories}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Category"
                    error={!!errors.Category}
                    helperText={errors.Category?.message}
                  />
                )}
                onChange={(_, value) => field.onChange(value)}
                onOpen={() => setIsDropdownOpen(true)}
                onClose={() => setIsDropdownOpen(false)}
              />
            )}
          />

          <Controller
            name="Difficulty"
            control={control}
            rules={{ required: "You must select a difficulty." }}
            render={({ field }) => (
              <Autocomplete
                sx={{ width: 300 }}
                {...field}
                options={difficulties}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Difficulty"
                    error={!!errors.Difficulty}
                    helperText={errors.Difficulty?.message}
                  />
                )}
                onChange={(_, value) => field.onChange(value)}
                onOpen={() => setIsDropdownOpen(true)}
                onClose={() => setIsDropdownOpen(false)}
              />
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
