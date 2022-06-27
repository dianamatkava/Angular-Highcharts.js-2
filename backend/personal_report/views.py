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
from etc.config.get_data import *

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
    # docx = DocxExport('hc_gbs_config', 'etc/config')
    # docx.generate_charts()
    # docx.create_docx()
    
    cohort = 'Future Fibres.Cohort_002'
    learner = '9e6f6e50-5316-484e-96ea-9961e5763b2a'
    get_subject_scores_data(cohort, learner)
