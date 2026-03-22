import google.generativeai as genai
from decouple import config
import os

def test_gemini():
    api_key = config('GEMINI_API_KEY', default='')
    if not api_key:
        print("Error: GEMINI_API_KEY not found in .env")
        return
    
    print(f"Key found: {api_key[:5]}...{api_key[-5:]}")

    genai.configure(api_key=api_key)
    try:
        models_to_try = [
            'gemini-1.5-flash', 
            'models/gemini-1.5-flash', 
            'gemini-1.5-flash-latest', 
            'models/gemini-1.5-flash-latest'
        ]
        for model_name in models_to_try:
            print(f"Testing model: {model_name}...")
            try:
                model = genai.GenerativeModel(model_name)
                response = model.generate_content("Ping")
                print(f" -> SUCCESS: {response.text}")
                return
            except Exception as e:
                print(f" -> FAILED: {str(e)}")
        
    except Exception as e:
        print(f"General Error: {str(e)}")

if __name__ == "__main__":
    test_gemini()
