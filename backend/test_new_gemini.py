from google import genai
from decouple import config

def test_new_gemini():
    api_key = config('GEMINI_API_KEY', default='')
    if not api_key:
        print("Error: GEMINI_API_KEY not found in .env")
        return
    
    print(f"Key found: {api_key[:5]}...{api_key[-5:]}")
    client = genai.Client(api_key=api_key)

    try:
        print("Testing with new google-genai SDK...")
        response = client.models.generate_content(
            model='gemini-1.5-flash',
            contents="Ping"
        )
        print(f" -> SUCCESS: {response.text}")
    except Exception as e:
        print(f" -> FAILED: {str(e)}")

if __name__ == "__main__":
    test_new_gemini()
