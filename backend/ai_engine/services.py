import json
from groq import Groq
from django.conf import settings

class GroqService:
    def __init__(self, api_key=None):
        api_key = api_key or settings.GROQ_API_KEY
        if not api_key:
            raise ValueError("GROQ_API_KEY is not set in settings.py")
        self.client = Groq(api_key=api_key)
        self.model = "llama-3.3-70b-versatile" # Stable, fast, and high-quality

    def analyze_portfolio(self, github_profile, repositories):
        if not repositories:
            return {
                "overall_score": 10,
                "technical_skills": {},
                "skill_gaps": ["No repositories found. Start coding and push to GitHub!"],
                "project_recommendations": ["Create your first public repository to get a full analysis."],
                "resume_feedback": ["Link your GitHub on your resume properly."],
                "summary": "This developer has no public repositories yet."
            }, None

        # Format repositories for the prompt
        repo_summary = [
            {
                "name": r.name,
                "language": r.language,
                "description": r.description,
                "stars": r.stargazers_count,
                "topics": r.topics
            }
            for r in repositories
        ]

        prompt = f"""
        You are an expert technical career coach and developer advocate.
        Analyze the following developer's GitHub portfolio and provide a structured report.
        Profile Name: {github_profile.username}
        Bio: {github_profile.bio}
        Followers: {github_profile.followers}
        Repositories: {json.dumps(repo_summary)}

        IMPORTANT: Your response MUST be a valid JSON object. DO NOT include any markdown formatting (like ```json) in your response.
        JSON keys required:
        - overall_score: (0-100)
        - technical_skills: dict {{"SkillName": level(0-100)}}
        - skill_gaps: list
        - project_recommendations: list
        - resume_feedback: list
        - summary: text
        """

        try:
            chat_completion = self.client.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": prompt,
                    }
                ],
                model=self.model,
                response_format={"type": "json_object"}
            )
            return json.loads(chat_completion.choices[0].message.content), None
        except Exception as e:
            return None, str(e)
