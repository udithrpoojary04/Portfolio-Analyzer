# DevInsight AI — Portfolio Analyzer

DevInsight AI is a production-ready full-stack web application that analyzes a developer's GitHub profile using GPT-4 to generate deep career insights, skill gap detection, and project recommendations.

## Tech Stack

- **Backend**: Django 5.1, Django REST Framework, PostgreSQL, JWT Authentication
- **Frontend**: React (Vite), Tailwind CSS, Chart.js, Lucide Icons, Axios
- **AI/Async**: OpenAI API (GPT-4o), Celery, Redis

## Prerequisites

- Python 3.10+
- Node.js 18+
- Redis (optional but recommended for background tasks)
- OpenAI API Key
- GitHub Personal Access Token

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
# Edit .env and add your API keys (GITHUB_TOKEN, OPENAI_API_KEY)

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

- **GitHub Synchronization**: Automatically fetch and store profile and repository metadata.
- **AI-Powered Analysis**: Deep technical evaluation based on your actual code and impact.
- **Skill Matrix**: Visual radar chart showing your proficiency across different domains.
- **Project Recommendations**: Actionable project ideas to fill identified skill gaps.
- **Resume Feedback**: Strategic tips for improving your professional presence.

## Deployment

The application is prepared with production settings including `WhiteNoise` for static files and `Gunicorn` for serving the Django app. For deployment, ensure `DEBUG=False` and set `ALLOWED_HOSTS` in your environment.
