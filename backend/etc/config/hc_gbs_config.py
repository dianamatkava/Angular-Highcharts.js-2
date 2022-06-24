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
    'extra_images_to_replace': {
        'cert': 'Picture 15'
    },
    
    'charts': {
        'c2_module_scores': {
            'settings_files': {
                'hc_render_file': {                                             
                    'template_path': 'etc/highchart_render_settings',           # 'gbs/etc/highchart_render_settings',
                    'template_name': 'chart1SettingsGeneral.json',
                    'data': get_data_chart
                },
                'hc_callback_file': None 
            },
            'image_to_replace': 'Picture 3'
        },
        
        'chart2': {
            'settings_files': {
                'hc_render_file': {
                    'template_path': 'etc/highchart_render_settings',
                    'template_name': 'chart2SettingsGeneral.json',
                    'data': get_data_chart
                },
                'hc_callback_file': {
                    'template_path': 'etc/highchart_callback_settings',
                    'template_name': 'grouped-categories.js',
                    'data': None
                },
            },
            'image_to_replace': 'Picture 1'
        },
        
        'chart3': {
            'settings_files': {
                'hc_render_file': {
                    'template_path': 'etc/highchart_render_settings',
                    'template_name': 'chart3SettingsGeneral.json',
                    'data': get_data_chart3
                },
                'hc_callback_file': {
                    'template_path': 'etc/highchart_callback_settings',
                    'template_name': 'grouped-categories.js',
                    'data': None
                },
            },
            'image_to_replace': 'Picture 2'
        },
        
        'chart4': {
            'settings_files': {
                'hc_render_file': {
                    'template_path': 'etc/highchart_render_settings',
                    'template_name': 'chart4SettingsGeneral.json',
                    'data': get_data_chart4 
                },
                'hc_callback_file': {
                    'template_path': 'etc/highchart_callback_settings',
                    'template_name': 'chart4RenderSettings.js',
                    'data': get_data_chart4
                },
            },
            'image_to_replace': 'Picture 6'
        },
        
    },
    
    
    
    
}