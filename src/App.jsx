import Menu from "./Menu.jsx";
import { useState, useEffect } from "react";
import Quiz from "./Quiz.jsx";

function App() {
  const [apiResponse, setApiResponse] = useState(null);
  const [showMenu, setShowMenu] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (data) => {
    setShowMenu(false);
    setLoading(true);

    const questionAmount = data.questionAmount;
    const category = data.Category;
    const difficulty = data.Difficulty.toLowerCase();

    const categoryToNumber = {
      "General Knowledge": "9",
      "Entertainment: Books": "10",
      "Entertainment: Film": "11",
      "Entertainment: Music": "12",
      "Entertainment: Musicals and Theatres": "13",
      "Entertainment: Television": "14",
      "Entertainment: Video Games": "15",
      "Entertainment: Board Games": "16",
      "Science & Nature": "17",
      "Science: Computers": "18",
      "Science: Mathematics": "19",
      Mythology: "20",
      Sports: "21",
      Geography: "22",
      History: "23",
      Politics: "24",
      Art: "25",
      Celebrities: "26",
      Animals: "27",
      Vehicles: "28",
      "Entertainment: Comics": "29",
      "Science: Gadgets": "30",
      "Entertainment: Japanese Anime & Manga": "31",
      "Entertainment: Cartoon & Animations": "32",
    };

    var url = "";

    if (category != "Any Category") {
      url = `https://opentdb.com/api.php?amount=${questionAmount}&category=${categoryToNumber[category]}&difficulty=${difficulty}`;
    } else {
      url = `https://opentdb.com/api.php?amount=${questionAmount}&difficulty=${difficulty}`;
    }

    const getQuestions = async () => {
      try {
        const result = await fetch(url);
        const data = await result.json();
        setApiResponse(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    getQuestions();
  };

  const handleBackToMenu = () => {
    setShowMenu(true);
    setApiResponse(null);
  };

  useEffect(() => {
    if (apiResponse !== null) {
      console.log(apiResponse);
    }
  }, [apiResponse]);

  return (
    <div className="flex items-center justify-center h-screen">
      {showMenu ? (
        <Menu onSubmit={handleFormSubmit} />
      ) : loading ? (
        <div></div>
      ) : (
        <Quiz data={apiResponse} onBackToMenu={handleBackToMenu} />
      )}
    </div>
  );
}

export default App;
