
# Newsify

[Newsify App](https://newsify-nbu.duckdns.org/)

**Newsify** is a web application designed to simplify access to up-to-date news. It allows users to find and filter news articles based on a specified time range, keywords, or topics. The application provides a quick and user-friendly way to access the most relevant and trending news.

## 📌 Features

- **Search by date and keywords**: Specify a time range and optionally add keywords to find relevant news articles.
- **Two search modes**:
  - **Standard Search**: Search for articles by date range and keywords.
  - **Top Headlines Search**: Browse trending news filtered by keywords, country, or category (e.g., technology, sports, business).
- **Interactive interface**:
  - Convenient date input fields with a calendar widget.
  - Fully responsive design for desktop and mobile devices.
- **Sorting by popularity**: Easily find the most popular articles.
- **Direct access to sources**: Each result includes a link to the full version of the article.
- **Request caching**: Recently retrieved news articles are stored in a Redis cache for improved performance and reduced API requests. Cached data ensures faster loading times for frequently accessed content.

## 🚀 How It Works

1. Users choose between:
   - **Standard Search**: Select a time range and optionally add keywords.
   - **Top Headlines Search**: Specify keywords, country, and category.
2. The application sends a request to the external API to fetch relevant articles.
3. Data is filtered and sorted based on relevance or popularity.
4. Results are displayed with titles, descriptions, and links in a user-friendly format.

## 🛠️ Technologies Used

### Frontend
- **HTML5, CSS3, JavaScript**: To create a responsive, user-friendly interface with interactive elements.

### Backend
- **Django (Python)**: Handles user requests and interacts with the news API.
- **SQLite**: Stores country and category query data.
- **Redis**: Caches API responses for faster performance.

### Integration
- **[News API](https://newsapi.org/)**: Fetches up-to-date articles and headlines.

### Hosting and Deployment
- **AWS (Amazon Web Services)**: Hosts the application for stable and scalable operation.
- **Gunicorn and Nginx**: Manage server requests and ensure smooth application performance.

## 🏆 Advantages

- Intuitive interface for a seamless user experience.
- Two powerful search modes to meet different user needs.
- Quick access to relevant news articles through API integration.
- Reliable architecture built with proven technologies.

## 📄 Installation and Setup

To run the application locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mmishoil/Newsify
   cd newsify
   ```

2. **Set up a virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure the `.env` file**:
   Create a `.env` file in the project root and add your settings:
   ```
   NEWS_API_KEY=api_key
   REDIS_URL=redis://localhost:6379/0
   ```

5. **Run database migrations**:
   ```bash
   python manage.py migrate
   ```

6. **Start the application**:
   ```bash
   python manage.py runserver
   ```

The application will be available at `http://127.0.0.1:8000`.

## 📜 License

This project is licensed under the [MIT License](LICENSE).
