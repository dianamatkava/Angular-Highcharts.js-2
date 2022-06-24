import os
import re
import time
import logging

from functools import wraps
from django.shortcuts import render
from docxtpl import DocxTemplate

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
    charts = DocxExport('hc_gbs_config', 'etc/config')
    charts.generate_charts()
    
    

             
             
    # if run_cmd:
    #     doc = DocxTemplate('media\\docx\\Personal Report Template - NEW FORMAT - 10M.docx')
        
    #     context = { 
    #         'TRAINEE': "Diana",
    #         'CLIENT_COHORT': 'ZZL Cohort 1', 
    #         'Product': 'Global Business Skills',
    #         'DATE': 'today',
    #         'SCORE': "100%",
    #         'CERT': "Excellent",
    #         'DESCRIPTION1': "Some custom description 1",
    #         'DESCRIPTION2': "Some custom description 2"
    #     }
        
    #     doc.render(context)
    #     for image in product['image_to_replace']:
    #         doc.replace_pic(product['image_to_replace'][image], f'.\etc\\temp\chart_images\{LEARNER}-{image}.png')
    #     doc.save('media\\docx\\example.docx')

    # return HttpResponse()



    # # Find images name
    # for s in document.inline_shapes:
    #    print (s.height.cm,s.width.cm,s._inline.graphic.graphicData.pic.nvPicPr.cNvPr.name)
    

    # 1.7768944444444446 5.96
    # 1.016661111111111 3.05 Picture 15
    # 10.16 16.4846 Picture 3
    # 20.32 16.483541666666667 Picture 2
    # 11.43 16.4846 Picture 1
    # 1.016 3.048 Cert - None.png
    # 1.016 3.048 Cert - Completion.png
    # 1.016 3.048 Cert - Merit.png
    # 1.016 3.048 Cert - Distinction.png

    # # print(chart, type(chart))       # -4058 file not found         # type <int>
    #                                   # 0 OK
    #                                   # 1 System cant find the path
    #                                   # if file is invalid the server will never stop, no error
    
