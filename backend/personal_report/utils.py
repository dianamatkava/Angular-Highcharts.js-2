import os
from django.conf import settings


def generate_path(path=None, filename: list()=None, delimiter='_'):
    if filename:
        return os.path.join(settings.BASE_DIR, *path.split('/'), delimiter.join(filter(None, filename)))