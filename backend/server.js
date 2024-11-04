require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express(); 
app.use(cors());
app.use(express.json());

let currentusername = "";
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

app.get('/', (req, res) => {
    return res.json("from backend side");
})
app.post('/loggedin', (req, res) => {
    const { username } = req.body;
    currentusername=username;
    return res.json({ message: "Logged in successfully", username: currentusername });
})
app.get('/currentusername', (req, res) => {
    return res.json(currentusername)
})

app.get('/users', (req, res) => {
    const sql = "SELECT * from accounts";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

//signup box
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    currentusername=username;
    const checkUserQuery = "SELECT * FROM accounts WHERE username = ?";
    db.query(checkUserQuery, [username], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (results.length > 0) {
            return res.status(400).json({ message: "Username already taken" });
        } else {

            const insertUserQuery = "INSERT INTO accounts (username, email, password) VALUES (?, ?, ?)";
            db.query(insertUserQuery, [username, email, password], (err, results) => {
                if (err) return res.status(500).json({ error: "Failed to register user" });

                return res.status(201).json({ message: "User registered successfully" });
            });
        }
    });
});

//signup page
app.post('/signupcompletion', (req, res) => {
    const { username, email, firstName, lastName, dob, department, skills, } = req.body;
        const insertProfileQuery = `INSERT INTO student (studentid, firstname, lastname, dob, department, skills, email)
                                            VALUES (?, ?, ?, ?, ?, ?, ?)`;
        db.query(insertProfileQuery, [username, firstName, lastName, dob, department, JSON.stringify(skills), email], (err, profileResults) => {
            if (err) {
                return res.json(err);
        }

            return res.status(201).json("User registered successfully" );
        });
});

//profile page details 
app.get('/api/profile/:username', (req, res) => {
    const { username } = req.params;
    const query = 'SELECT * FROM student WHERE studentid = ?';
    
    db.query(query, [username], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching data' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(result[0]);
    });
});

//create project
app.post('/api/projects', (req, res) => {
    const { title, description, username, skills } = req.body;
    
    // Query to get the current count to use as project ID
    const countQuery = "SELECT COUNT(*) AS total FROM projectidea";
    
    db.query(countQuery, (err, results) => {
        if (err) {
            console.error("Error fetching count:", err);
            res.status(500).send("Database error while fetching project count.");
            return;
        }

        // Set the project ID based on the count result
        const pid = "p" + (results[0].total + 1);  // Assuming unique ID with prefix 'p'

        // SQL query to insert a new project idea
        const insertQuery = `INSERT INTO projectidea (projectid, title, project_desc, proposedby, skills_required) VALUES (?, ?, ?, ?, ?)`;
        const values = [pid, title, description, username, JSON.stringify(skills)];

        db.query(insertQuery, values, (err, result) => {
            if (err) {
                console.error("Error inserting project:", err);
                res.status(500).send("An error occurred while creating the project.");
            } else {
                res.status(201).send("Project created successfully!");
            }
        });
    });
});

//myteams
app.get('/api/teamsforyou', (req, res) => {
    const username = req.query.username;

    const query = `
        SELECT skills 
        FROM student 
        WHERE studentid = ?
    `;

    db.query(query, [username], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching user skills' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(result[0]);
    });
});
app.get('/api/projectideas', (req, res) => {
    const query = `
        SELECT projectid, title, project_desc, proposedby, skills_required 
        FROM projectidea
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching project ideas' });
        }
        res.json(results);
    });
});

app.listen(8003, () => {
    console.log("listening at port 8003..");
})