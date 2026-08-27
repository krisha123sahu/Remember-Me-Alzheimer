import sys
import face_recognition
import os
import numpy as np

def process_image(test_image_path):
    dataset_path = "dataset"

    # Load test image
    test_image = face_recognition.load_image_file(test_image_path)
    test_encodings = face_recognition.face_encodings(test_image)

    if len(test_encodings) == 0:
        return "No face detected"

    test_encoding = test_encodings[0]

    known_encodings = []
    known_names = []

    # Load dataset
    for person_name in os.listdir(dataset_path):
        person_folder = os.path.join(dataset_path, person_name)

        if not os.path.isdir(person_folder):
            continue

        for file in os.listdir(person_folder):
            img_path = os.path.join(person_folder, file)

            try:
                image = face_recognition.load_image_file(img_path)
                encodings = face_recognition.face_encodings(image)

                if len(encodings) == 0:
                    continue

                known_encodings.append(encodings[0])
                known_names.append(person_name.lower())

            except:
                continue

    if len(known_encodings) == 0:
        return "No data in dataset"

    # 🔥 Distance-based matching (better accuracy)
    distances = face_recognition.face_distance(known_encodings, test_encoding)

    best_match_index = np.argmin(distances)

    # Threshold (IMPORTANT)
    if distances[best_match_index] < 0.5:
        return known_names[best_match_index]
    else:
        return "unknown"


if __name__ == "__main__":
    image_path = sys.argv[1]
    result = process_image(image_path)
    print(result)