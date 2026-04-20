const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Report = require("./Models/ReportModel");
const EmployeeData = require("./Models/EmployeeModel");
const twilio = require("twilio");
const bodyParser = require("body-parser");
const Post = require("./Models/PostModel");
const requestIp = require("request-ip");
const CollegeSupport = require("./Models/CollegeSupportModel");
const sgMail = require("@sendgrid/mail");
const User = require("./Models/UserModel");
const Goal = require("./Models/GoalModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./authMiddleware");
const AnxietyTestResult = require("./Models/AnxietyTestModel");
dotenv.config();

const app = express();
const URI = process.env.MONGO_URI;

// Twilio setup
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

//sgMail setup
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(express.json());
app.use(cors());
app.use(cors());
app.use(bodyParser.json());
app.set("trust proxy", true);
app.use(requestIp.mw());

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 3001, () => {
      console.log(`Server running on port ${process.env.PORT || 3001}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });

app.post("/report", async (req, res) => {
  try {
    const {
      title,
      placeOfIncident,
      image,
      date,
      time,
      description,
      seriousness,
    } = req.body;

    const newReport = new Report({
      title,
      placeOfIncident,
      image,
      date,
      time,
      description,
      seriousness,
    });

    const savedReport = await newReport.save();

    const messageContent = `
      🚨 *New Incident Report in College* 🚨

      *Incident Details:*
      - *Title:* ${title}
      - *Place:* ${placeOfIncident}
      - *Date:* ${date}
      - *Time:* ${time}

      *Description:*
      ${description}

      *Severity:* ${seriousness}

      🔴 *Urgent Action Required! Respond promptly to address the situation.* 🔴
    `;

    const employees = await EmployeeData.find({ verified: true }, "mobile");
    const phoneNumbers = employees.map((employee) => employee.mobile);

    for (const phoneNumber of phoneNumbers) {
      await client.messages.create({
        body: messageContent,
        from: "whatsapp:+14155238886",
        to: `whatsapp:${phoneNumber}`,
      });
    }

    res.status(201).json(savedReport);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message, error: error });
  }
});

app.post("/employee", async (req, res) => {
  try {
    const { name, employeeId, todayLocation, mobile, email, post } = req.body;

    const newEmployeeData = new EmployeeData({
      name,
      employeeId,
      todayLocation,
      mobile,
      email,
      post,
    });

    const savedEmployeeData = await newEmployeeData.save();
    res.status(201).json(savedEmployeeData);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message, error: error });
  }
});

app.get("/api/reportsPerDay", async (req, res) => {
  try {
    console.log("logged here");
    console.log(req.clientIp);
    const reportsPerDay = await Report.aggregate([
      {
        $group: {
          _id: {
            $toDate: {
              $concat: [
                { $substr: ["$date", 0, 4] },
                "-",
                { $substr: ["$date", 5, 2] },
                "-",
                { $substr: ["$date", 8, 2] },
              ],
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $limit: 10,
      },
    ]);

    const formattedData = reportsPerDay.map((entry) => ({
      date: entry._id.toISOString().split("T")[0],
      count: entry.count,
    }));

    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching reports per day:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// // Fetch all reports
app.get("/api/totalreports", async (req, res) => {
  try {
    const allReports = await Report.find();
    res.json(allReports);
  } catch (error) {
    console.error("Error fetching all reports:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch all registered employees
app.get("/api/registeredemployees", async (req, res) => {
  try {
    const registeredEmployees = await EmployeeData.find({});
    res.json(registeredEmployees);
  } catch (error) {
    console.error("Error fetching registered employees:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update verification status for an employee
app.put("/api/verifyEmployee/:id", async (req, res) => {
  const { id } = req.params;
  const { verified } = req.body;

  try {
    const updatedEmployee = await EmployeeData.findByIdAndUpdate(
      id,
      { verified },
      { new: true }
    );

    res.json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee verification status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = app;

//sg setup here

app.post("/api/send-email", async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;

    const msg = {
      to,
      from: "rizul.thakur1@gmail.com", // Set your SendGrid verified sender email here
      subject,
      text,
      html,
    };

    await sgMail.send(msg);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/api/resolveReport/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedReport = await Report.findByIdAndUpdate(
      id,
      { resolved: true },
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ error: "Report not found" });
    }

    res.json(updatedReport);
  } catch (error) {
    console.error("Error resolving report:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

///number of reports

app.get("/api/totalresolvedreports", async (req, res) => {
  try {
    const resolvedReports = await Report.find({ resolved: true });
    res.json(resolvedReports);
  } catch (error) {
    console.error("Error fetching resolved reports:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/totalpendingreports", async (req, res) => {
  try {
    const pendingReports = await Report.find({ resolved: false });
    res.json(pendingReports);
    // res.json({ totalPendingReports: pendingReports.length, reports: pendingReports });
  } catch (error) {
    console.error("Error fetching pending reports:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// to mark unresolved to resolved reports
app.put("/api/unresolveReport/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedReport = await Report.findByIdAndUpdate(
      id,
      { resolved: false },
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ error: "Report not found" });
    }

    res.json(updatedReport);
  } catch (error) {
    console.error("Error marking report as unresolved:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add these routes to your existing Express app
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("comments");
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/posts", async (req, res) => {
  try {
    const { text } = req.body;
    const newPost = new Post({ text });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(400).json({ error: "Bad Request" });
  }
});

// Add these routes to your existing Express app
app.put("/api/posts/:id/like", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/posts/:id/comment", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.comments.push({ text: req.body.text });
    await post.save();
    res.json(post);
  } catch (error) {
    console.error("Error commenting on post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/college-support", async (req, res) => {
  try {
    const formData = req.body;
    const newSubmission = await CollegeSupport.create(formData);
    res.json(newSubmission);
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to get student support details
app.get("/api/student-support", async (req, res) => {
  try {
    const studentDetails = await CollegeSupport.find();
    res.json(studentDetails);
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// user part

///LOGIN

app.post("/api/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword, name });
    await user.save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Login Route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });
    console.log(user);
    console.log(user._id);
    if (!user) {
      throw new Error("Invalid login credentials");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Invalid login credentials");
    }
    const token = await jwt.sign({ userId: user._id }, "secretKey", {
      expiresIn: "1h",
    });
    console.log("Token" + token);
    res.send({ message: "Login successful", token }); // Send token in response
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});

//GOALS
app.post("/user/goals", authMiddleware, async (req, res) => {
  try {
    const { category, value } = req.body;
    console.log(req.body);
    const userId = req.userId;
    console.log(userId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const goal = new Goal({ userId, category, value });
    await goal.save();
    res.status(201).json({ message: "Goal created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/getUserName", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ name: user.name, userId: user._id, email: user.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/quiz", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);

    // Extract quiz responses from request body
    const { Meditation, Exercise, Sleep, Sober } = req.body;
    console.log(req.body);
    // Create a new goal document for each category with userId
    await Goal.create({ userId, category: "Meditation", value: Meditation });
    await Goal.create({ userId, category: "Exercise", value: Exercise });
    await Goal.create({ userId, category: "Sleep", value: Sleep });
    await Goal.create({
      userId,
      category: "Sober",
      value: Sober === "Yes" ? 1 : 0,
    });

    // Send success response
    res.status(201).json({ message: "Quiz submitted successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error submitting quiz:");
    console.log(error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
});

app.get("/api/goals-summary", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    const userGoals = await Goal.find({ userId: userId });
    console.log("🚀 ~ app.get ~ userGoals:", userGoals);

    const goalsSummary = userGoals.reduce((acc, goal) => {
      acc[goal.category] = (acc[goal.category] || 0) + goal.value;
      return acc;
    }, {});
    console.log(goalsSummary);
    res.json(goalsSummary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/user-reports", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const userGoals = await Goal.find({ userId: userId });
    res.json(userGoals);
  } catch (error) {
    console.error("Error fetching user report data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// anxiety test for users
app.post("/api/anxietyTestResults", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    const { username, email, score, level } = req.body;
    const result = await AnxietyTestResult.create({
      userId,
      username,
      email,
      score,
      level,
    });

    res
      .status(201)
      .json({ message: "Anxiety test result stored successfully", result });
  } catch (error) {
    console.error("Error storing anxiety test result:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/allResults", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    let results;
    if (userId) {
      results = await AnxietyTestResult.find({ userId });
    } else {
      res.json({ message: "User ID not found, Please Login again" });
    }
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/api/book-session', async (req, res) => {
  try {
    const apiKey = process.env.WHEREBY_API_KEY;
    const endDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    const response = await fetch('https://api.whereby.dev/v1/meetings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        endDate,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create meeting');
    }

    const data = await response.json();
    const { meetingId, roomUrl } = data;

    // Send email
    const msg = {
      to: '20bcs099@nith.ac.in',
      from: 'rizul.thakur1@gmail.com', 
      subject: 'New Meeting Booked',
      text: `Meeting ID: ${meetingId}\nRoom URL: ${roomUrl}`,
    };
    await sgMail.send(msg);

    res.status(200).json({ meetingId, roomUrl });
  } catch (error) {
    console.error('Error booking session:', error);
    res.status(500).json({ error: 'Error booking session' });
  }
});