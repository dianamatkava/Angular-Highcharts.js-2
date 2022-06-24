import os
import random
import pandas as pd
from django.conf import settings


# def generate_path(path=None, filename: list()=None, delimiter='_', extension=str()):
#     if filename:
#         return f"{os.path.join(settings.BASE_DIR, *path.split('/'), delimiter.join(filter(None, filename)))}.{extension}"


def generate_path(path=None, filename: list()=None, delimiter='_', extension=None):
    if filename:
        return os.path.join(settings.BASE_DIR, *path.split('/'), delimiter.join(filter(None, filename)))
    

def get_learner_certificate(learner_performance:list()):
    
    # None
    # 1 or more modules < 40%	
    
    # Completion
    # All modules >= 40%	
    
    
    # Merit
    # All modules >= 40%
    # At least 5 >= 75%	
    
    # Destinction
    # All modules >= 75%
        
    # test_data = {
    #     'None': [random.randint(0, 39) for i in range(10)],
    #     'Completion': [random.randint(75, 100) for i in range(4)] + [random.randint(40, 74) for i in range(6)],
    #     'Merit': [random.randint(40, 74) for i in range(5)] + [random.randint(75, 100) for i in range(5)],
    #     'Destinction': [random.randint(75, 100) for i in range(10)]
    # }
    
    cert_name = ['None', 'Completion', 'Merit', 'Destinction']
    cert_rule = [[0, 0], [1, 4], [5, 9], [10, 10]]
    

    score_length = len(list(filter(lambda x: x >= 74, learner_performance))) # 6 Merit #5 Completion 10 Destinction 0 None
    x = [pd.Series(score_length).between(*i) for i in cert_rule]
    cert_index = [i[0] for i in x].index(True)
    
    return cert_name[cert_index]
    