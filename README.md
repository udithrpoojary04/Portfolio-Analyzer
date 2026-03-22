# DevInsight AI — Portfolio Analyzer

DevInsight AI is a production-ready full-stack web application that analyzes a developer's GitHub profile using GPT-4 to generate deep career insights, skill gap detection, and project recommendations.

## Tech Stack

- **Backend**: Django 6.0, Django REST Framework 3.17, PostgreSQL, JWT Authentication, Google OAuth (Allauth)
- **Frontend**: React 19 (Vite 8), Tailwind CSS 4, Chart.js 4, Lucide Icons, Axios, React Router 7
- **AI/Async**: Groq API (LLaMA-3.3-70b-versatile), Celery 5.5, Redis

## Prerequisites

- Python 3.12+ (Recommended 3.14+)
- Node.js 18+
- Redis (For Celery background tasks)
- Groq API Key
- GitHub Personal Access Token
- Google OAuth Credentials (for social login)

## Setup Instructions

### 1. Clone & Core Setup
```bash
git clone <your-repo-url>
cd devinsight-ai
```

### 2. Backend Setup
```bash
# Navigate to backend and create virtual environment
cd backend
python -m venv venv
source venv/bin/activate  # Windows: .\venv\Scripts\activate

# Install dependencies
pip install -r ../requirements.txt

# Create .env file from template (at project root)
cd ..
cp .env.example .env
# Edit .env and add your API keys (GITHUB_TOKEN, GROQ_API_KEY)

# Run migrations
cd backend
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start server
python manage.py runserver
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Celery (Optional - For background analysis)
```bash
# In a new terminal (with venv active)
cd backend
celery -A config worker --loglevel=info
```

## Features

- **Google OAuth Login**: Secure social authentication for developers.
- **GitHub Synchronization**: Automatically fetch and store profile and repository metadata using GitHub REST API.
- **AI-Powered Analysis**: Deep technical evaluation powered by LLaMA-3.3 via Groq.
- **Skill Matrix**: Visual radar chart (Chart.js) showing your proficiency across different domains.
- **Project Recommendations**: Actionable project ideas to fill identified skill gaps.
- **Resume Feedback**: Strategic tips for improving your professional presence.

## Deployment

The application is prepared with production settings including `WhiteNoise` for static files and `Gunicorn` for serving the Django app. For deployment, ensure `DEBUG=False` and set `ALLOWED_HOSTS` in your environment.
