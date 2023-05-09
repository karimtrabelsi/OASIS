import os
import cv2
import face_recognition

# Set the directory where the faces are stored
faces_directory = 'C:\\Users\\karim\\Documents\\OASIS\\OASIS-front\\src\\images\\users'

# Load the known faces and their names
known_face_encodings = []
known_face_names = []
for file_name in os.listdir(faces_directory):
    image = face_recognition.load_image_file(os.path.join(faces_directory, file_name))
    face_encoding = face_recognition.face_encodings(image)[0]
    name = os.path.splitext(file_name)[0]
    known_face_encodings.append(face_encoding)
    known_face_names.append(name)

# Initialize the webcam
cap = cv2.VideoCapture(0)

# Set the threshold for face recognition
threshold = 0.6

while True:
    # Capture frame-by-frame
    ret, frame = cap.read()

    # Check if the frame was successfully captured
    if not ret:
        print("Error: failed to capture frame from camera.")
        break

    # Convert the frame to RGB for face recognition
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Find all the faces in the frame
    face_locations = face_recognition.face_locations(rgb_frame)
    face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

    # Loop through each face in this frame
    for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
        # Try to match this face with a known face
        matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
        name = "Unknown"

        # Find the best match
        face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
        best_match_index = face_distances.argmin()
        if matches[best_match_index] and face_distances[best_match_index] < threshold:
            name = known_face_names[best_match_index]

        # Draw a box around the face and label it
        cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
        cv2.putText(frame, name, (left + 6, bottom - 6), cv2.FONT_HERSHEY_SIMPLEX, 1.0, (0, 0, 255), 1)

        # Check if the recognized face is authenticated
        if name != "Unknown":
            try:
                user_id = name.split('-')[1]
                print(f"{user_id}")

                cap.release()
                cv2.destroyAllWindows()
                exit(0)
            except IndexError:
                print("Error: invalid user ID format.")
                cap.release()
                cv2.destroyAllWindows()
                exit(1)

    # Display the resulting image
    cv2.imshow('Video', frame)

    # Press 'q' to quit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the webcam and close the window
cap.release()
cv2.destroyAllWindows()

print("Unauthorized. Face does not match user.")
exit(1)