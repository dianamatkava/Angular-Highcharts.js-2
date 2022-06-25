# from personal_report.models import UserData
import os
import random
import psycopg2
import pandas as pd

def connect_db():
    connection = psycopg2.connect(
        dbname=os.environ.get('DATABASE'),
        user=os.environ.get('USER'),
        password=os.environ.get('PASSWORD'),
        host=os.environ.get('HOST'),
        port=os.environ.get('PORT')
    )
    return connection
        

# None
# 1 or more modules < 40%	

# Completion
# All modules >= 40%	


# Merit
# All modules >= 40%
# At least 5 >= 75%	

# Destinction
# All modules >= 75%
         
test_data = {
    'None': [random.randint(0, 39) for i in range(10)],
    'None1': [random.randint(0, 39) for i in range(4)] + [random.randint(75, 100) for i in range(6)],
    'Completion': [random.randint(75, 100) for i in range(4)] + [random.randint(40, 74) for i in range(6)],
    'Merit': [random.randint(40, 74) for i in range(5)] + [random.randint(75, 100) for i in range(5)],
    'Destinction': [random.randint(75, 100) for i in range(10)]
}

def get_learner_certificate(learner_performance:list()=test_data['Merit']):
    
    # Define rule
    cert_name = ['None', 'Completion', 'Merit', 'Destinction']
    cert_rule = [[0, 39], [40, 74], [75, 100], [75, 100]]
    boolean_range = [[1, 10], [1, 4], [5, 10], [10, 10]]
    
    frame = list()
    for score in learner_performance:
        series = [pd.Series(score).between(*rule_range) for rule_range in cert_rule]
        frame.append([series[index][0] for index in range(len(series))])

    frame = pd.DataFrame(frame)
    count_true = [sum(frame[df]) for df in frame] 
    
    bool_values = list()
    for index in range(len(count_true)):
        bool_values.append(pd.Series(count_true[index]).between(*boolean_range[index])[0])
        
    return cert_name[bool_values.index(True)]
    
    # high_score_length = len(list(filter(lambda x: x >= 75, learner_performance))) # 6 Merit #5 Completion 10 Destinction 0 None
    # low_score_length = len(list(filter(lambda x: x < 75 and x > 40, learner_performance)))
    # score_length = high_score_length + low_score_length
    # print(score_length)
    
    # x = [pd.Series(score_length).between(*i) for i in cert_rule]
    # cert_index = [i[0] for i in x].index(True)
    
    
    # x = [ (df[j],) for j in boolean_range for i in df]
    # print(x)
    # cert_index = [i[0] for i in x].index(True, 0)
    
    # print(cert_name[cert_index])
    
    
def get_data_chart(value, connection=None):
    # connection = connect_db()
    
    # with connection.cursor() as cursor:
    #     pass
    
    
    data = {
        'DATA_TRAINEE': [random.randint(60, 100) for i in range(value)],
        'DATA_COHORT': [random.randint(70, 100) for j in range(value)]
    }
    return data


def get_data_chart3(value):
    # return UserData.objects.get(id=id)
    import itertools
    # data = {
    #     'GAP_TO_GOAL_DATA': [random.randint(0, 1) for i in range(20)],
    #     'INCREASE_IN_SELF_RATING_DATA':  [x for y in zip([0 for i in range(10)], [random.randint(60, 100) for i in range(10)]) for x in y],
    #     'DROP_IN_SELF_RATING_DATA': [random.randint(0, 0) for i in range(20)],
    #     'CURRENT_RATING_DATA': [x for y in zip([random.randint(60, 100) for i in range(10)], [0 for i in range(10)]) for x in y]
    # }   
    
    data = {
        'GAP_TO_GOAL_DATA': [1, 0, 2, 1, 1, 0, 1, 0, 1, 0, 2, 1, 1, 0, 1, 0, 1, 0, 0, 0],
        'INCREASE_IN_SELF_RATING_DATA':  [0, 5, 0, 4, 0, 5, 0, 5, 0, 5, 0, 4, 0, 5, 0, 5, 0, 5, 0, 0],
        'DROP_IN_SELF_RATING_DATA': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        'CURRENT_RATING_DATA': [4, 0, 3, 0, 4, 0, 4, 0, 3, 0, 3, 0, 4, 0, 4, 0, 4, 0, 5, 5]
    }  
    return data


def get_data_chart4(value):
    
    data = {
        'COHORT_AVERAGE_DATA': 76,
        'YOUR_SCORE_DATA': 88,
    }
    return data

