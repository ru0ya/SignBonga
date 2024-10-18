from django.apps import AppConfig
import tensorflow as tf
from django.conf import settings
from django.core.files.uploadedfile import TemporaryUploadedFile
import os


class PredictConfig(AppConfig):
    # default_auto_field = 'django.db.models.BigAutoField'
    name = 'predict'

    def ready(self):
        MODEL_PATH = os.path.join(
                settings.MODEL_DIR,
                'ksl_litemodel.tflite'
                )
        self.model = None

    def load_model_if_needed(self, uploaded_file):
        if self.model is None:
            tf.io.gfile.copy(uploaded_file.name, MODEL_PATH)
            self.model = tf.lite.Interpreter(MODEL_PATH)
            self.model.allocate_tensors()

    def unload_model(self):
        if self.model is not None:
            del self.model
            self.model = None
