import whisper

audio_file_path = input("Please enter the path to the audio file (e.g., audio.mp3): ")

model = whisper.load_model("base")

result = model.transcribe(audio_file_path)
print(result["text"])


