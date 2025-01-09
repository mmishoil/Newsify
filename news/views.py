from newsapi import NewsApiClient
from django.shortcuts import render
from django.http import JsonResponse
from news.models import Country
from django.views.decorators.csrf import csrf_exempt
import json
import redis
import os


def say_hello(request):
    host = os.getenv('REDIS_HOST')
    port = os.getenv('REDIS_PORT')
    connect = redis.Redis(host=host, port=port, db=0)
    countries = Country.objects.all()

    if connect.exists('news'):
        print('Getting news from cache')
        news = connect.get('news')
        news = json.loads(news)
    else:
        print('Getting news from API')
        news = get_main_news()

        json_news = json.dumps(news)
        connect.setex('news',3600,json_news)
    return render(request, 'news/helloMe.html', {'news':news, 'countries':countries})

def get_main_news():
    key = os.getenv('API_KEY')
    newsapi = NewsApiClient(api_key=key)
    all_articles = newsapi.get_top_headlines(
        category='business',
        language='en',
        page_size=4,
    )
    return all_articles['articles']

@csrf_exempt
def my_form_submit(request):
    if request.method == 'POST':
        keyword = request.POST.get('keyword')
        date_from = request.POST.get('date-from')
        date_to = request.POST.get('date-to')
        sort = request.POST.get('sort')

        key = os.getenv('API_KEY')

        newsapi = NewsApiClient(api_key=key)

        all_articles = newsapi.get_everything(q = keyword,
                                          from_param = date_from,
                                          to = date_to,
                                          language = 'en',
                                          sort_by = sort,
                                          page_size = 5)

        print(all_articles)
        return JsonResponse(all_articles, status=200)
    return JsonResponse({'error': 'Не удалось отправить форму.'}, status=400)