# server.py
from flask import request, make_response, Flask
from flask import copy_current_request_context
import datetime
import threading
#from flask_cors import CORS
from werkzeug.utils import secure_filename
import logging

import os
import whisper

app = Flask(__name__)
#CORS(app)

log = logging.getLogger('pydrop')

@app.errorhandler(413)
def payload_too_large(error):
    print(f"FILE YOU'RE SENDING IS TOO LARGE: {error}")
    return error

@app.route('/test', methods=['GET'])
def default():
    return "this is working yayyyy!"

# @app.route('/upload', methods=['POST'])
# def upload():
#     file = request.files['file']

#     save_path = os.path.join('./data', secure_filename(file.filename))
#     current_chunk = int(request.form['dzchunkindex'])

#     # If the file already exists it's ok if we are appending to it,
#     # but not if it's new file that would overwrite the existing one
#     if os.path.exists(save_path) and current_chunk == 0:
#         # 400 and 500s will tell dropzone that an error occurred and show an error
#         return make_response(('File already exists', 400))

#     try:
#         with open(save_path, 'ab') as f:
#             f.seek(int(request.form['dzchunkbyteoffset']))
#             f.write(file.stream.read())
#     except OSError:
#         # log.exception will include the traceback so we can see what's wrong 
#         log.exception('Could not write to file')
#         return make_response(("Not sure why,"
#                               " but we couldn't write the file to disk", 500))

#     total_chunks = int(request.form['dztotalchunkcount'])

#     if current_chunk + 1 == total_chunks:
#         # This was the last chunk, the file should be complete and the size we expect
#         if os.path.getsize(save_path) != int(request.form['dztotalfilesize']):
#             log.error(f"File {file.filename} was completed, "
#                       f"but has a size mismatch."
#                       f"Was {os.path.getsize(save_path)} but we"
#                       f" expected {request.form['dztotalfilesize']} ")
#             return make_response(('Size mismatch', 500))
#         else:
#             log.info(f'File {file.filename} has been uploaded successfully')
#     else:
#         log.debug(f'Chunk {current_chunk + 1} of {total_chunks} '
#                   f'for file {file.filename} complete')

#     return make_response("Chunk upload successful", 200)

@app.route('/upload', methods=['POST','GET'])
def upload():
    @copy_current_request_context
    def save_file(closeAfterWrite):
        print(datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S') + " i am doing")
        f = request.files['file']
        basepath = os.path.dirname(__file__) 
        upload_path = os.path.join(basepath, 'data',secure_filename(f.filename)) 
        f.save(upload_path)
        closeAfterWrite()
        print(datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S') + " write done")
    def passExit():
        pass
    if request.method == 'POST':
        f= request.files['file']
        normalExit = f.stream.close
        f.stream.close = passExit
        t = threading.Thread(target=save_file,args=(normalExit,))
        t.start()
        return 'SUCCESS 1'
    return 'SUCCESS 2'

if __name__ == '__main__':

    app.run(host="0.0.0.0", debug=True, port=5100)