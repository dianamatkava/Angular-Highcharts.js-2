# from personal_report.models import UserData
import itertools
import os
import random
from sqlite3 import dbapi2
import pandas as pd
from functools import partial
from personal_report.utils import *

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
    
    
def get_learenr_all(cohort:str()):
    data = db_connect(
        f""" 
            select C.uuid, C.name, L.uuid, P.email from hs_cohort as C
            inner join hs_learner as L
            on L.hs_cohort_uuid=C.uuid
            inner join hs_person as P
            on P.uuid=L.hs_person_uuid

            where C.name='{cohort}';
        """
    )
    
    return pd.DataFrame(data)

    
def get_module_scores_data(cohort, learner):
    
    data_trinee = db_connect(
        f"""
            select LTP.rpt_topic_name, LTP.rpt_topic_score*100
            from hs_summary_learner_topic_scores as LTP

            inner join hs_cohort as C
            on C.uuid=LTP.hs_cohort_uuid

            inner join hs_learner as L
            on L.uuid=LTP.hs_learner_uuid

            where C.name='{cohort}' and L.uuid='{learner}';
        """
    )
    
    data_cohort = db_connect(
        f"""
            select CTP.rpt_topic_name, CTP.rpt_topic_score*100
            from hs_summary_cohort_topic_scores as CTP

            inner join hs_cohort as C
            on C.uuid=CTP.hs_cohort_uuid

            inner join hs_learner as L
            on L.hs_cohort_uuid=C.uuid

            where C.name='{cohort}' and L.uuid='{learner}';
        """
    )
    
    df_learner = pd.DataFrame(sorted(data_trinee, key=partial(gbs_sort_method, modules=True)))
    df_cohort = pd.DataFrame(sorted(data_cohort, key=partial(gbs_sort_method, modules=True)))
    print(df_learner[0])
    data = {
        'DATA_TRAINEE': [round(int(i)) for i in df_learner[1].to_numpy()][0:6],
        'DATA_COHORT': [round(int(i)) for i in df_cohort[1].to_numpy()][0:6]
    }
    
    return data
 

def get_subject_scores_data(cohort, learner):
    
    data_trinee = db_connect(
        f"""
            select rpt_concept_name, rpt_concept_score*100
            from hs_summary_learner_concept_scores

                inner join hs_cohort as C
                    on C.uuid=hs_cohort_uuid

                inner join hs_learner as L
                    on L.uuid=hs_learner_uuid
                    
            where C.name='{cohort}' and L.uuid='{learner}';
        """
    )
    
    data_cohort = db_connect(
        f"""
            select rpt_concept_name, rpt_concept_score*100
            from hs_summary_cohort_concept_scores
            
                inner join hs_cohort as C
                    on C.uuid=hs_cohort_uuid
                    
                inner join hs_learner as L
                    on L.hs_cohort_uuid=C.uuid
                    
            where C.name='{cohort}' and L.uuid='{learner}';
        """
    )
    
    df_learner = pd.DataFrame(sorted(data_trinee, key=partial(gbs_sort_method, subjects=True)))
    df_cohort = pd.DataFrame(sorted(data_cohort, key=partial(gbs_sort_method, subjects=True)))
    
    data = {
        'DATA_TRAINEE': [round(int(i)) for i in df_learner[1].to_numpy()][0:18],
        'DATA_COHORT': [round(int(i)) for i in df_cohort[1].to_numpy()][0:18]
    }
    
    return data


def get_gap_data(cohort, learner):
    gap_data = db_connect(
        f"""
            select rpt_subject_name, rpt_benchmarking_name, rpt_current_score, rpt_goal, rpt_gap2goal
            from hs_summary_learner_gap_data
            
                inner join hs_cohort as C
                    on C.uuid=hs_cohort_uuid
                    
                inner join hs_learner as L
                    on L.uuid=hs_learner_uuid
                    
            where C.name='{cohort}' and L.uuid='{learner}'
            and (rpt_benchmarking_name='Pre' or rpt_benchmarking_name='Post')
            order by rpt_benchmarking_name;
        """
    )
    pre_gap_data = list()
    post_gap_data = list()
    
    [pre_gap_data.append(x) if x[1] == "Pre" else post_gap_data.append(x) for x in gap_data]
    
    pre_gap_df = pd.DataFrame(sorted(pre_gap_data, key=partial(gbs_sort_method, modules=True)))
    post_gap_df = pd.DataFrame(sorted(post_gap_data, key=partial(gbs_sort_method, modules=True)))
    
    data = {
        'GAP_TO_GOAL_DATA': merge_with_zero(odd=True, list1=[i for i in pre_gap_df[4].to_numpy()][0:6]), 
        'INCREASE_IN_SELF_RATING_DATA':  merge_with_zero(odd=False, list1=[i for i in pre_gap_df[3].to_numpy()][0:6]),
        'DROP_IN_SELF_RATING_DATA': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0][0:6],
        'CURRENT_RATING_DATA': merge_with_zero(odd=True, list1=[i for i in post_gap_df[2].to_numpy()][0:6])
    }  
    
    return data

def get_perf_data(cohort=None, learner=None):
    trainee_average_score = db_connect(
        f"""
            select rpt_average_score*100 from hs_summary_learner_perf_data 
            where hs_learner_uuid='{learner}';
        """
    )
    cohort_average_score = db_connect(
        f"""
            select rpt_average_score*100 from hs_summary_cohort_details 
            inner join hs_cohort as C
            on C.uuid=hs_cohort_uuid
            where C.name='{cohort}';
        """
    )
    
    data = {
        'COHORT_AVERAGE_DATA': cohort_average_score[0][0],
        'YOUR_SCORE_DATA': trainee_average_score[0][0],
    }
    return data