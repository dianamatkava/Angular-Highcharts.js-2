import os
import re
import time
import random
import logging
import pandas as pd
from functools import wraps
from django.shortcuts import render
from .docx_export import DocxExport
from etc.config.hc_gbs_config import hc_config

# https://highchart.azurewebsites.net/docx

logger = logging.getLogger(__name__)

    
def execution_speed(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        start = time.time()
        func(request)
        end = time.time()
        print(f'execution_speed is {end-start}')
        return render(request, 'demo.html', context={'time': end-start})
    return wrapper


@execution_speed
def python_docs(request): 
    docx = DocxExport('hc_gbs_config', 'etc/config')
    docx.generate_charts()
    docx.create_docx()
