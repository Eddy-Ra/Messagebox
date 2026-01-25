const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "erkt39966@gmail.com",
    pass: "Randriamanantany1"
  }
});

app.post("/send-code", async (req, res) => {
  const { mail } = req.body;
  const code = generateCode();

  try {
    await transporter.sendMail({
      from: "Verification App",
      to: mail,
      subject: "Code de confirmation",
      text: `Votre code est : ${code}`
    });

    res.json({ success: true, code });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false });
  }
});

app.listen(3000, () => console.log("Serveur OK"));
