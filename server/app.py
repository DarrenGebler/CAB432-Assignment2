from flask import Flask, request, Response, send_from_directory, abort, send_file
from run_detection import RunDetection
import os
import base64

app = Flask(__name__, static_folder='./static/build/', static_url_path='/')

app.config["OUTPUT_VIDEOS"] = "/home/ubuntu/server/temp_files"

directory = "./temp_files/"


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/video_data', methods=['POST'])
def get_image_data():
    file = request.files['file']
    file.save(directory + file.filename)
    all_results = RunDetection(file.filename, "out_" + file.filename.split(".")[0] + ".mp4", directory).detect_distance()
    os.remove(directory + file.filename)
    return "Success"


@app.route('/video/<filename>')
def get_video_data(filename):
    try:
        return send_from_directory(app.config["OUTPUT_VIDEOS"], path="./", filename="out_{}".format(filename),
                                   as_attachment=True)
    except FileNotFoundError:
        abort(404)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
