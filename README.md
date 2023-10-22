# StudyBuzz

1. This program enables the user to input an audio or video file and get an AI generated summary of the content provided. 

2. In order to start the program, download Node.js React.js.
3. Run a python3 virtual enviornment (such as VENV) before running any files. Running the program in a regular/local enviornment might cause program to crash unexpectedly.

4. Make sure both Flask and Whisper are downloaded to the environnment. There are also machine learning libraries necessary to run the AI model.
   Instructions for installing all are down below:
   
   Flask: https://www.geeksforgeeks.org/how-to-install-flask-in-windows/
   
   Whisper: https://github.com/openai/whisper/blob/main/README.md
   
   For the AI Model run the following command in a terminal: pip install transformers datasets evaluate rouge_score

5. WARNING: When running the code, the AI model will download directly to your system. The model is about 1.8 gigabytes, so if you would not like the model to download please     DO NOT run this program on your system.    

6. Run the below commands before running any file:
   
    cd (foldername)  // allows terminal to run prompts to the folder
    npm run dev    // Opens a Vite host which allows you to open the link to the webpage (Keep terminal running or webpage won't work)
    ### If error occurs, make sure npm module is downloaded ###

   This will open a terminal that contains an access link to our webpage. The webpage retroactively updates with the code, so be careful and don't touch any files.

7. Run server.py. This allows the local server to connect with the webpage and now the webpage is fully functional...
If upload is showing previous video summary, please save server.py and reload your local webpage.
