#  SmartSched– AI Based Timetable Management System

SmartSched is a full-stack academic scheduling platform built for universities. It uses Python-based ML models to automate conflict-free course timetabling and provides role-based access to students, instructors, and admins.

---

##  Features

- **AI-Based Timetable Generation**
  - Automatically resolves scheduling conflicts using ML
  - Optimizes classroom and instructor allocation

- **Role-Based Access Control**
  - **Admin**: Create and manage courses, faculty, and classrooms
  - **Faculty**: View personal schedules and assigned classes
  - **Student**: Access semester-wise class timetables

- **Smart Resource Allocation**
  - Dynamic classroom & lab assignment based on availability
  - Generates detailed scheduling reports

- **Web Portal**
  - Intuitive frontend built in React.js
  - Backend services via Spring Boot REST API
  - ML scheduling engine in Python

---

##  Tech Stack

| Layer      | Technology          |
|------------|---------------------|
| Frontend   | React.js            |
| Backend    | Spring Boot (Java)  |
| Scheduler  | Python (ML models)  |
| Database   | MySQL / PostgreSQL  |
| Auth       | Spring Security (RBAC) |

---

##  Installation

### Prerequisites:
- Node.js, Java 17+, Python 3.8+, MySQL

### 1. Clone the repo:
```bash
git clone https://github.com/yourusername/smartsched.git
cd smartsched
````

### 2. Start Backend:

```bash
cd backend
./mvnw spring-boot:run
```

### 3. Start Frontend:

```bash
cd frontend
npm install
npm start
```

### 4. ML Scheduler (Python):

```bash
cd scheduler
pip install -r requirements.txt
python scheduler.py
```

---

##  Project Highlights

* Led development of the web interface and backend logic
* Integrated ML-based scheduler with course data and constraints
* Deployed on Netlify (frontend) and Render/AWS (backend)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
