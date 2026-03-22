from groq import Groq
from decouple import config

def test_groq():
    api_key = config('GROQ_API_KEY', default='')
    if not api_key:
        print("Error: GROQ_API_KEY not found in .env")
        return
    
    print(f"Key found: {api_key[:10]}...")
    client = Groq(api_key=api_key)

    try:
        print("Testing Groq...")
        chat_completion = client.chat.completions.create(
            messages=[{ "role": "user", "content": "Hello" }],
            model="llama-3.3-70b-versatile",
        )
        print(f"Success! Response: {chat_completion.choices[0].message.content}")
    except Exception as e:
        print(f"Failed: {str(e)}")

if __name__ == "__main__":
    test_groq()
