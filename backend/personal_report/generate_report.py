                
# class ReportConfig
# class ReportData
#     db, exel, output json

# class ReportChart
#     data that required
#     ReportData
#     can come from dif resources
    
# class ReportTemplateClass
 
#     list of all CharsetMatches
#     name template to use
    
# class ReportGenerate    
#     will call every time to create file
        
        
import sys
import importlib


class ReportConfig:
    config_file: str      # null False
    config_path: str      # null False
    
    def __init__(self, config_file, config_path):
        self.config_file = config_file
        self.config_path = config_path
        self.mod = importlib.import_module('.'.join([*config_path.split('/'), config_file]))
        
        
class ReportData:
    module_name: str
    class_name: str
    method: str
    order_by: str
    
    parent_lookup: dict
    child_lookup: dict
    
    def __init__(self, class_name):
        self.class_name = class_name
    
    def make_get_query(self):
        obj = getattr(sys.modules['personal_report.models'], self.class_name).objects
        print(obj.all())