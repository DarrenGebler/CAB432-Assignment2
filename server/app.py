from flask import Flask, request, Response, send_from_directory, abort, send_file
from run_detection import RunDetection
import os
import hashlib
import boto3
import redis
import os

app = Flask(__name__, static_folder='./static/build/', static_url_path='/')

app.config["OUTPUT_VIDEOS"] = "/home/ubuntu/server/temp_files"
directory = "./temp_files/"
s3 = boto3.resource(service_name='s3')

r = redis.Redis(host="localhost", port=6379, db=0)

BUF_SIZE = 65536


def hash_file(file_location):
    sha1 = hashlib.sha1()
    with open(file_location, 'rb') as f:
        while True:
            data = f.read(BUF_SIZE)
            if not data:
                break
            sha1.update(data)

    return sha1.hexdigest()


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/video_data', methods=['POST'])
def get_image_data():
    file = request.files['file']
    file.save(directory + file.filename)
    filestuff = directory + file.filename
    s3.Bucket("n9983601-n9941835-assignment-2").upload_file(Filename=filestuff, Key="Hello.mp4")
    for bucket in s3.Bucket("n9983601-n9941835-assignment-2").objects.all():
        print(bucket)

    # detection_coords = r.get(hash_file(directory + file.filename))
    # if detection_coords is None:
    #     # Check s3
    #     pass
    # else:
    #     # Run detections over video
    #     pass


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
