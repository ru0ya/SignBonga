from django.shortcuts import render
import numpy as np
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from PIL import image
import tflite_runtime.interpreter as tflite


class PredictionView(APIView):
    parser_classes = (MultiParser,)

    def post(self, request):
        if 'image' not in request.FILES:
            return Response(
                    {'error': 'No image provided'},
                    status=400
                    )

        image_file = request.FILES['image']
        image = Image.open(image_file)
        image = image.resize((224, 224))
        image_array = np.array(image, dtype=np.float32) / 255.0
        image_array = np.expand_dims(image_array, axis=0)

        interpreter = settings.TFLITE_INTERPRETER
        input_details = interpreter.get_input_details()
        output_details = interpreter.get_output_details()

        interpreter.set_tensor(input_details[0]['index'], image_array)
        interpreter.invoke()
        prediction = interpretor.get_tensor(output_details[0]['index'])
        result = process_prediction(prediction)

        return Response({'result': result})


def process_prediction(prediction):
    # process prediction based on models output
    class_index = np.argmax(prediction[0])
    confidence = float(prediction[0][class_index])
    return {
            'class': class_index,
            'confidence': confidence
            }
