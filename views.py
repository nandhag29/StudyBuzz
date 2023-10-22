from django.http import JsonResponse
import whisper

def transcribe_audio(request):
    if request.method == 'POST' and 'audio' in request.FILES:
        audio_file = request.FILES['audio']
        audio_file_path = f'media/{audio_file.name}'  # Save the uploaded file in the 'media' directory

        # Save the audio file
        with open(audio_file_path, 'wb') as destination:
            for chunk in audio_file.chunks():
                destination.write(chunk)

        # Load the model and transcribe the audio
        model = whisper.load_model("base")
        result = model.transcribe(audio_file_path)

        return JsonResponse({'text': result['text']})
    else:
        return JsonResponse({'error': 'Invalid request'})
