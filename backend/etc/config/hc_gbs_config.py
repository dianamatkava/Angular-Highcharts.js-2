from .get_data import get_data_chart, get_data_chart3, get_data_chart4
from etc.docx_export import PersonalReport


config = {
    'product': 'GBS',
    'class': PersonalReport,
    'highchart_config_file': 'gbs_config.py',
    
    'docx_template_path': 'media/docx',
    'docx_template_name': 'Personal Report Template - NEW FORMAT - 10M.docx',
    
    'temp_files_location': {
        'settings': 'etc/temp/learner_chart_settings/',
        'images': 'etc/temp/chart_images/'
    },
    
    'output_file_location': 'media/docx'
}

product = {
    
    'image_to_replace': {
        'cert': 'Picture 15',
        'c2_module_scores': 'Picture 3',
        'chart2': 'Picture 2',
        'chart3': 'Picture 1',
        'chart4': 'Picture 6'
    },
    
    'charts': {
        'c2_module_scores': {
            'settings_files': {                                             # 
                'template_path': 'etc/highchart_render_settings',           # 'gbs/etc/highchart_render_settings',
                'template_name': 'chart1SettingsGeneral.json',
                'data': get_data_chart
            },
            'callback_files': None          #hc_callback...
        },
        
        'chart2': {
            'settings_files': {
                'template_path': 'etc/highchart_render_settings',
                'template_name': 'chart2SettingsGeneral.json',
                'data': get_data_chart
            },
            'callback_files': {
                'template_path': 'etc/highchart_callback_settings',
                'template_name': 'grouped-categories.js',
                'data': None
            },
        },
        
        'chart3': {
            'settings_files': {
                'template_path': 'etc/highchart_render_settings',
                'template_name': 'chart3SettingsGeneral.json',
                'data': get_data_chart3
            },
            'callback_files': {
                'template_path': 'etc/highchart_callback_settings',
                'template_name': 'grouped-categories.js',
                'data': None
            },
        },
        
        'chart4': {
            'settings_files': {
                'template_path': 'etc/highchart_render_settings',
                'template_name': 'chart4SettingsGeneral.json',
                'data': get_data_chart4 
            },
            'callback_files': {
                'template_path': 'etc/highchart_callback_settings',
                'template_name': 'chart4RenderSettings.js',
                'data': get_data_chart4
            },
            
        },
        
    },
    
    
    
    
}