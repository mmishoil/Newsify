from django.urls import path
from .views import say_hello, frontTestHeadlines
from .views import my_form_submit
from .views import load_news

urlpatterns = [
    path('', say_hello, name='main_page'),
    path('submit-form/', my_form_submit, name='submit_form'),
    path('load-news', load_news, name='load_news'),
    path('top-headlines', frontTestHeadlines, name='headlines_page'),
]
