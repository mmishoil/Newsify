from django.urls import path
from .views import say_hello
from .views import my_form_submit

urlpatterns = [
    path('', say_hello),
    path('submit-form/', my_form_submit, name='submit_form'),
]
