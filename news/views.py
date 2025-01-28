from newsapi import NewsApiClient
from django.shortcuts import render
from django.http import JsonResponse
from news.models import Country
import json
import redis
import os

trustedSources = 'bbc-news,cnn,the-new-york-times,the-guardian-uk,reuters,associated-press,bloomberg,cnbc,financial-times,the-wall-street-journal,forbes,techcrunch,the-verge,wired,ars-technica,engadget,national-geographic,scientific-american,new-scientist,espn,bbc-sport,fox-sports,nfl-news,entertainment-weekly,mtv-news,buzzfeed,medical-news-today,healthline'
limit = 10

def connect2API():
    key = os.getenv('API_KEY')
    newsapi = NewsApiClient(api_key=key)
    return newsapi

def getEverything(keyword,date_from,date_to,sort,page):
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

def getTopHeadlines(keyword,category,country,page):
    newsapi = connect2API()
    all_articles = newsapi.get_top_headlines(q=keyword,
                                            category=category,
                                            language='en',
                                            country=country,
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
        json_news = json.dumps(news)
        connect.setex('news', 3600, json_news)

    return news[:4]

def exists(params, key):
    try:
        params[key]
    except KeyError:
        return None
    return params[key]

def my_form_submit(request):
    if request.method == 'POST':
        params = json.loads(request.body)
        sort = params['sortBy']
        page = params['page']
        date_from = exists(params, 'from')
        date_to = exists(params, 'to')
        keyword = exists(params, 'q')

        if(date_from != '' and date_to == ''):
            date_to = date_from

        all_articles = getEverything(keyword,date_from,date_to,sort,page)

        all_articles = filterNews(all_articles)
        all_articles['terminate'] = False

        if(len(all_articles['articles']) == 0):
            all_articles['terminate'] = True

        all_articles['page'] = page
        all_articles['limit'] = limit

        return JsonResponse(all_articles, status=200)
    return JsonResponse({'error': 'Не удалось отправить форму.'}, status=400)

def my_form_submit_headlines(request):
    if request.method == 'POST':
        params = json.loads(request.body)
        page = params['page']
        category = exists(params, 'category')
        country = exists(params, 'country')
        keyword = exists(params, 'q')

        all_articles = getTopHeadlines(keyword,category,country,page)

        all_articles['terminate'] = False

        if(len(all_articles['articles']) == 0):
            all_articles['terminate'] = True

        all_articles = filterNews(all_articles)
        all_articles['page'] = page
        all_articles['limit'] = limit

        return JsonResponse(all_articles, status=200)
    return JsonResponse({'error': 'Не удалось отправить форму.'}, status=400)

def frontTestHeadlines(request):
    countries = Country.objects.all()
    news = get_latest_news()
    return render(request, 'news/top-headlines.html', {'news':news, 'countries':countries})

def say_hello(request):
    news = get_latest_news()
    return render(request, 'news/index.html', {'news':news})

def renderAbout(request):
    return render(request, 'news/about.html')