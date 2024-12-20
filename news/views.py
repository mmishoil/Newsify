from http.client import responses

from django.shortcuts import render
from  django.http import HttpResponse

# view function takes a request and returns a response
# more accurately would be to call it a request handler

def say_hello(request):
    # here we can pull data from db
    # Or transform the data
    return render(request, 'helloMe.html')
