import os
import re
import time
import random
import logging
import pandas as pd
from functools import wraps
from django.shortcuts import render

from .generate_report import ReportData
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
    docx = DocxExport('hc_gbs1_config', 'etc/config')
    
    cohort = 'Future Fibres.Cohort_002'
    
    data = get_learenr_all(cohort)
    
    for i in range(len(data[2])-28):
        parent_data = {
            'id': data[1][i],
            'name': data[1][i]
        }
        child_data = {
            'id': data[2][i],
            'name': data[3][i]
        }
        docx.generate_charts(parent_data, child_data)
        docx.generate_content(parent_data, child_data)
        docx.create_docx()
    
