from flask import Flask, request, Response, send_from_directory, abort, send_file
from run_detection import RunDetection
import hashlib
import boto3
import redis
import pickle
import os
import time

app = Flask(__name__, static_folder='./static/build/', static_url_path='/')

app.config["OUTPUT_VIDEOS"] = "/home/ubuntu/server/temp_files"
directory = "./temp_files/"

s3 = boto3.resource('s3')

r = redis.Redis(host="localhost", port=6379, db=0, decode_responses=False)

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

    # get hashed filename
    filename = hash_file(directory + file.filename)
    start_time = time.time()
    try:
        print("Checking if file exists in redis", flush=True)
        print(filename, flush=True)
        detection_coords = pickle.loads(r.get(filename))
        print("Video detections found in Redis", flush=True)
        RunDetection(file.filename, "out_" + file.filename.split(".")[0] + ".mp4",
                     directory).prev_detections(detection_coords)
        os.remove(directory + file.filename)
        print("Time taken In Redis {}".format(time.time() - start_time), flush=True)
        return "Success"
    except Exception as e:
        print("Exception Redis: " + str(e), flush=True)
        detection_coords = None

    if detection_coords is None:
        # Check S3
        try:
            s3.meta.client.download_file("n9983601-n9941835-assignment-2", filename + '.pickle',
                                         directory + filename + '.pickle')
            print("FOUND IN S3", flush=True)

            # File in S3
            with open(directory + filename + ".pickle", 'rb') as f:
                detection_coords = pickle.load(f)
            RunDetection(file.filename, "out_" + file.filename.split(".")[0] + ".mp4",
                         directory).prev_detections(detection_coords)
            r.set(filename, pickle.dumps(detection_coords))
            os.remove(directory + filename + '.pickle')
            os.remove(directory + file.filename)
            print("Time taken In S3 {}".format(time.time() - start_time), flush=True)
            return "Success"

        except Exception as e:
            print("Exception Nothing: " + str(e), flush=True)
            # Not in S3
            all_results = RunDetection(file.filename, "out_" + file.filename.split(".")[0] + ".mp4",
                                       directory).new_detections()
            with open(directory + filename + '.pickle', 'wb') as handle:
                pickle.dump(all_results, handle, protocol=pickle.HIGHEST_PROTOCOL)

            # Saves to redis
            r.set(filename, pickle.dumps(all_results))

            # upload to S3
            s3.meta.client.upload_file(Key=filename + '.pickle',
                                       Filename=directory + filename + '.pickle', Bucket="n9983601-n9941835-assignment-2")
            os.remove(directory + filename + '.pickle')
            os.remove(directory + file.filename)
            print("New Video Uploaded. Stored new detections in Redis and S3: " + str(file.filename), flush=True)
            print("Time taken Not S3 {}".format(time.time() - start_time), flush=True)
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
