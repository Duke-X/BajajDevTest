import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5000;

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());

// POST
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ error: "Invalid input: data must be an array" });
    }

    const numbers = data.filter((item) => !isNaN(Number(item)));
    const alphabets = data.filter((item) => isNaN(Number(item)) && item.length === 1);
    const highest_alphabet = [
      alphabets.reduce((max, char) => (char.toLowerCase() > max.toLowerCase() ? char : max), "A"),
    ];

    const response = {
      is_success: true,
      user_id: "vadish_chhatwal_22042004", 
      email: "22BCS11280@cuchd.in",
      roll_number: "22BCS11280",
      numbers,
      alphabets,
      highest_alphabet,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//GET
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

//SERVER
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});