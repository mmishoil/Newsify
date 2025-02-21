from django.urls import path
from .views import *

urlpatterns = [
    path('', say_hello, name='main_page'),
    path('submit-form/', my_form_submit, name='submit_form'),
    path('submit-form-headlines/', my_form_submit_headlines, name='submit_form_headlines'),
    path('top-headlines', frontTestHeadlines, name='headlines_page'),
    path('about', renderAbout, name='about_page'),
    path('get-csrf-token/', get_csrf_token, name='get-csrf-token'),
]
