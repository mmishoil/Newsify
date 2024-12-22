import os
from newsapi import NewsApiClient
from django.shortcuts import render
from django.http import JsonResponse


def say_hello(request):

    return render(request, 'news/helloMe.html')


def my_form_submit(request):
    if request.method == 'POST':
        keyword = request.POST.get('keyword')
        date_from = request.POST.get('date-from')
        date_to = request.POST.get('date-to')
        sort = request.POST.get('sort')
        print(keyword)
        print(date_from)
        print(date_to)
        print(sort)
        # Обработка данных формы

        key = os.getenv('API_KEY')

        newsapi = NewsApiClient(api_key=key)

        all_articles = newsapi.get_everything(q='bitcoin',
                                          sources='bbc-news,the-verge',
                                          domains='bbc.co.uk,techcrunch.com',
                                          from_param='2024-12-01',
                                          to='2024-12-12',
                                          language='en',
                                          sort_by='relevancy',
                                          page_size=5)


        return JsonResponse(all_articles, status=200)
    return JsonResponse({'error': 'Не удалось отправить форму.'}, status=400)