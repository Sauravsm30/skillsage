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
            return res.status(500).send("Database error while fetching project count.");
        }

        // Set the project ID based on the count result
        const pid = "p" + (results[0].total + 1);  // Assuming unique ID with prefix 'p'
        const tid = "t" + (results[0].total + 1);  // Unique ID for the team

        // SQL query to insert a new project idea
        const insertQuery = `INSERT INTO projectidea (projectid, title, project_desc, proposedby, skills_required) VALUES (?, ?, ?, ?, ?)`;
        const values = [pid, title, description, username, JSON.stringify(skills)];

        db.query(insertQuery, values, (err, result) => {
            if (err) {
                console.error("Error inserting project:", err);
                return res.status(500).send("An error occurred while creating the project.");
            }

            // SQL query to insert a new team
            const insertQuery2 = `INSERT INTO teams (teamid, leader,projectid) VALUES (?, ?, ?)`;
            const values2 = [tid, username, pid]; // Initialize members count to 0

            db.query(insertQuery2, values2, (err, result) => {
                if (err) {
                    console.error("Error inserting team:", err);
                    return res.status(500).send("An error occurred while creating the team.");
                }

                // Successfully created project and team
                return res.status(201).json({
                    message: "Project and team created successfully!",
                    projectId: pid,
                    teamId: tid
                });
            });
        });
    });
});



//teamsforyou
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
    const username = req.query.username; // Get the username from query parameters

    // Use parameterized query to prevent SQL injection
    const query = `
        SELECT projectid, title, project_desc, proposedby, skills_required 
        FROM projectidea 
        WHERE projectid NOT IN (
            SELECT projectid FROM collaborationRequest WHERE requestedby = ?
        )
    `;

    db.query(query, [username], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching project ideas' });
        }
        res.json(results);
    });
});



//collab request
app.post('/api/joinProject', (req, res) => {
    const { projectId, username } = req.body; 


    if (!projectId || !username) {
        return res.status(400).json({ error: 'Project ID and User ID are required.' });
    }

    const countQuery = "SELECT COUNT(*) AS total FROM collaborationRequest";
    
    db.query(countQuery, (err, results) => {
        if (err) {
            console.error("Error fetching count:", err);
            res.status(500).send("Database error while fetching collab count.");
            return;
        }

        // Set the project ID based on the count result
        const cid = "collab" + (results[0].total + 1);  // Assuming unique ID with prefix 'p'
    // SQL to insert a new collaboration request
    const sql = 'INSERT INTO collaborationRequest (requestid,projectid, requestedby, requeststatus) VALUES (?, ?, ?, ?)';

    // Status can be 'pending' or whatever logic you define
    const status = 'pending';

    db.query(sql, [cid,projectId, username, status], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }

        // Successful insertion
        return res.json({ message: 'Request to join project submitted successfully.', requestId: results.insertId });
    });});
});

//suggested people after create project
app.get('/api/matchingStudents', (req, res) => {
    const { pid } = req.query;

    // Query to get skills_required for the given project ID
    const projectQuery = `
        SELECT skills_required 
        FROM projectidea 
        WHERE projectid = ?
    `;

    db.query(projectQuery, [pid], (err, projectResults) => {
        if (err) {
            console.error("Error fetching project skills:", err);
            return res.status(500).json({ error: 'Error fetching project skills' });
        }

        if (projectResults.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const skillsRequired = typeof projectResults[0].skills_required === 'string'
            ? projectResults[0].skills_required.split(',').map(skill => skill.trim())
            : [];

        if (skillsRequired.length === 0) {
            return res.status(404).json({ error: 'No skills specified for this project' });
        }

        // Query to find students with matching skills using FIND_IN_SET
        const studentQuery = `
            SELECT studentid, name
            FROM student
            WHERE ${skillsRequired.map(skill => `FIND_IN_SET('${skill}', skills)`).join(' OR ')}
        `;

        db.query(studentQuery, (err, studentResults) => {
            if (err) {
                console.error("Error fetching matching students:", err);
                return res.status(500).json({ error: 'Error fetching matching students' });
            }

            res.json(studentResults); // Send back the matching student IDs
        });
    });
});

//requests
app.post('/api/getRequests', async (req, res) => {
    const { username } = req.body;

    // Validate username presence
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    try {
        // SQL query to fetch requests related to the username
        const query = `
            SELECT 
                projectidea.title,
                collaborationRequest.requestedby,
                collaborationRequest.requestid
            FROM 
                projectidea 
            JOIN 
                collaborationRequest 
            ON 
                projectidea.projectid = collaborationRequest.projectid 
            WHERE 
                projectidea.proposedby = ? and collaborationRequest.requeststatus = "pending"
        `;

        // Execute query
        db.query(query, [username], (err, results) => {
            if (err) {
                console.error("Error fetching requests:", err);
                return res.status(500).json({ error: 'Failed to fetch requests' });
            }

            // Send the results back as a JSON response
            res.json({ requests: results });
        });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
});

//decline request
app.post('/api/declineRequest', async (req, res) => {
    const { requestid } = req.body; // Get request ID from the request body

    // Validate request ID presence
    if (!requestid) {
        return res.status(400).json({ error: 'Request ID is required' });
    }

    try {
        // SQL query to delete the request from collaborationRequest table
        const query = 'UPDATE collaborationRequest set requeststatus="declined" where requestid = ?';
        
        // Execute the delete query
        db.query(query, [requestid], (err, results) => {
            if (err) {
                console.error("Error deleting request:", err);
                return res.status(500).json({ error: 'Failed to decline request' });
            }

            // Check if any rows were affected
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Request not found' });
            }

            res.json({ message: 'Request declined successfully' });
        });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
});





//myteams
app.post('/api/acceptRequest', async (req, res) => {
    const { requestid, username } = req.body;

    if (!requestid || !username) {
        return res.status(400).json({ error: 'Request ID and username are required' });
    }

    try {
        const updateRequestQuery = 'UPDATE collaborationRequest SET requeststatus = "accepted" WHERE requestid = ?';

        db.query(updateRequestQuery, [requestid], (err, results) => {
            if (err) {
                console.error("Error updating request:", err);
                return res.status(500).json({ error: 'Failed to accept request' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Request not found' });
            }

            const selectTeamQuery = 'SELECT members FROM teams WHERE projectid IN (SELECT projectid FROM collaborationRequest WHERE requestid = ?)';
            
            db.query(selectTeamQuery, [requestid], (err, teamResults) => {
                if (err) {
                    console.error("Error fetching team members:", err);
                    return res.status(500).json({ error: 'Failed to retrieve team members' });
                }

                if (teamResults.length === 0) {
                    return res.status(404).json({ error: 'Team not found' });
                }

                console.log("Raw members data:", teamResults[0].members);

                // Initialize currentMembers
                let currentMembers = {};

                try {
                    // Check if members is a string (JSON format) or an object
                    if (typeof teamResults[0].members === 'string') {
                        currentMembers = JSON.parse(teamResults[0].members);
                    } else if (typeof teamResults[0].members === 'object' && teamResults[0].members !== null) {
                        currentMembers = teamResults[0].members;
                    }
                } catch (parseError) {
                    console.error("Error parsing members JSON:", parseError);
                    return res.status(500).json({ error: 'Invalid JSON format for team members' });
                }

                // Add the new member
                currentMembers[username] = true;

                const updateMembersQuery = 'UPDATE teams SET members = ? WHERE projectid IN (SELECT projectid FROM collaborationRequest WHERE requestid = ?)';
                db.query(updateMembersQuery, [JSON.stringify(currentMembers), requestid], (err) => {
                    if (err) {
                        console.error("Error updating team members:", err);
                        return res.status(500).json({ error: 'Failed to update team members' });
                    }

                    res.json({ message: 'Request accepted successfully and user added to team' });
                });
            });
        });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
});



//myteams
app.get('/api/userteams', (req, res) => {
    const username = req.query.username; // Get the username from the query parameter

    // Updated query to check if the username key exists in the members JSON object
    const query = `
        SELECT projectidea.title,teams.leader FROM teams JOIN projectidea on projectidea.projectid=teams.projectid 
        WHERE JSON_UNQUOTE(JSON_EXTRACT(members, '$.${username}')) IS NOT NULL
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});





app.listen(8003, () => {
    console.log("listening at port 8003..");
})