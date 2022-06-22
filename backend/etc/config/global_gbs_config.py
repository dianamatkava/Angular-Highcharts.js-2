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
