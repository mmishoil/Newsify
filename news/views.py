from traceback import print_tb

from newsapi import NewsApiClient
from django.shortcuts import render
from django.http import JsonResponse
from news.models import Country
from django.views.decorators.csrf import csrf_exempt
import json
import redis
import os

trustedSources = 'bbc-news,cnn,the-new-york-times,the-guardian-uk,reuters,associated-press,bloomberg,cnbc,financial-times,the-wall-street-journal,forbes,techcrunch,the-verge,wired,ars-technica,engadget,national-geographic,scientific-american,new-scientist,espn,bbc-sport,fox-sports,nfl-news,entertainment-weekly,mtv-news,buzzfeed,medical-news-today,healthline'
limit = 9

def connect2API():
    key = os.getenv('API_KEY')
    newsapi = NewsApiClient(api_key=key)
    return newsapi

def getNews(keyword,date_from,date_to,sort,page):
    newsapi = connect2API()
    all_articles = newsapi.get_everything(q=keyword,
                                          from_param=date_from,
                                          sources=trustedSources,
                                          to=date_to,
                                          language='en',
                                          sort_by= sort,
                                          page_size=limit,
                                          page=page)

    return all_articles

def filterNews(news):
    filteredArticles = []
    for article in news['articles']:
        if article['title'] != '[Removed]':
            filteredArticles.append(article)

    news['articles'] = filteredArticles
    return news

def get_latest_news():
    newsapi = connect2API()
    host = os.getenv('REDIS_HOST')
    port = os.getenv('REDIS_PORT')
    connect = redis.Redis(host=host, port=port, db=0)

    if connect.exists('news'):
        print('Getting news from cache')
        news = connect.get('news')
        news = json.loads(news)
    else:
        print('Getting news from API')
        all_articles = newsapi.get_top_headlines(
            category='business',
            language='en',
            page_size=10,
        )
        news = all_articles['articles']
        print(news)
        json_news = json.dumps(news)
        connect.setex('news', 3600, json_news)

    return news[:4]

def my_form_submit(request):
    if request.method == 'POST':
        params = json.loads(request.body)
        keyword = params['q']
        date_from = params['from']
        date_to = params['to']
        sort = params['sortBy']

        all_articles = getNews(keyword,date_from,date_to,sort,1)
        all_articles = filterNews(all_articles)
        all_articles['page'] = 1
        all_articles['limit'] = limit

        return JsonResponse(all_articles, status=200)
    return JsonResponse({'error': 'Не удалось отправить форму.'}, status=400)


def load_news(request):
    if request.method == "POST":
        # Получаем данные из тела запроса
        data = json.loads(request.body)

        keyword = data.get('keyword', '')
        sort = data.get('sort', 'publishedAt')
        date_from = data.get('from', '')
        date_to = data.get('to', '')
        page = data.get('page', 1)

        print(keyword)
        print(sort)
        print(date_from)
        print(date_to)
        print(page)

        news_data = getNews(keyword, date_from, date_to, sort, page)
        # Возвращаем JSON-ответ
        return JsonResponse(news_data, status=200)

def frontTestHeadlines(request):
    countries = Country.objects.all()
    news = get_latest_news()
    return render(request, 'news/top-headlines.html', {'news':news, 'countries':countries})

def say_hello(request):
    news = get_latest_news()
    return render(request, 'news/index.html', {'news':news})