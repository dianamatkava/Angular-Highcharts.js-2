import os
import psycopg2
import pandas as pd
import re
from django.conf import settings


def generate_path(path=None, filename: list()=None, delimiter='_', extension=None):
    if filename:
        return os.path.join(settings.BASE_DIR, *path.split('/'), delimiter.join(filter(None, filename)))


    
def gbs_sort_method(x, modules:bool=False, subjects:bool=False):
    
    sorted_lists = {
        modules: [
            "Self-Awareness", "Communication", "Time Management", "How to Sell", 
            "How to Say No", "Effective Meetings", "Critical Thinking", 
            "Planning & Agility", "Professionalism", "Collaboration & Teamwork"
        ],
        subjects: [
            "Why is self-awareness critical for every professional", "How to be more self-aware", 
            "Why a global awareness is so important", "What is communication, why it's important", 
            "How to communicate", "Effective written communication", 
            "Awareness of time management, why it's necessary", "Understanding prioritization", 
            "How to manage interruptions", "What is sales and how to sell", 
            "The sales process, and why all team members need to understand it", 
            "How to close sales and deal with objections", "Why it's important to be able to say no", 
            "How to say no", "What saying no means for a professional", "Why meetings go wrong", 
            "Rules of engagement during meetings", "How to prepare for a meeting and follow-up after one",
            "Why critical thinking is important", "How to apply critical thinking", 
            "Situational awareness and applying critical thinking in real time", 
            "Why planning and agility are important for any organization", 
            "Understanding that plans are nothing, planning is everything, and how to apply planning", 
            "How to implement agility in an organization", "What is professionalism and how does it connect to high performance", 
            "Understanding and applying attention to detail and ownership", 
            "Understanding and applying initiative", 
            "What is the difference between collaboration and teamwork and what makes a good team player", 
            "How to be a collaborative team member", 
            "Understanding affinity bias and the importance of inclusion"
        ]
    }
    
    # from db
    # Understanding that plans are nothing, planning is everything, and how to apply planning
    
    # from hs settings
    # Understanding plans are nothing, planning is everything & how to plan
    
    # and more then 
    
    for index, module in enumerate(sorted_lists.get(True)):
        if x[0].startswith(module):
            return (index, x[0][len(module):])
    

    
    
def db_connect(query=str()):
    connection = None
    try:
        connection = psycopg2.connect(
            dbname=os.environ.get('DATABASE'),
            user=os.environ.get('USER'),
            password=os.environ.get('PASSWORD'),
            host=os.environ.get('HOST'),
            port=os.environ.get('PORT')
        )
    
        with connection.cursor() as cursor:
            cursor.execute(query)
            data = cursor.fetchall()
            
            return data
        
    except Exception as _ex:
        print(_ex) 
        
    finally:
        if connection:
            connection.close()
    


