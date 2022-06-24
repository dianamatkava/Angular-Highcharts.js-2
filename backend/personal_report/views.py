import os
import re
import time
import random
import logging
import pandas as pd
from functools import wraps
from django.shortcuts import render

from .docx_export import DocxExport

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
    # charts = DocxExport('hc_gbs_config', 'etc/config')
    # charts.create_docx()
    
    

