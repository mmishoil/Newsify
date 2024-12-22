console.log("init index.js")

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("myForm").addEventListener("submit", function(e) {
        e.preventDefault(); // Предотвращаем стандартное поведение формы

        const formData = new FormData(this); // Собираем данные формы

        fetch('/submit-form/', { // Путь к вашему представлению Django
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest', // Для Django, чтобы распознать запрос как AJAX
                'X-CSRFToken': getCookie('csrftoken'), // Получаем токен CSRF для защиты от атак
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok'){
                // Очистка контейнера, если в нем уже есть содержимое
                const responseContainer = document.getElementById('formResponse');
                responseContainer.innerHTML = '';

                // Создание списка статей
                const list = document.createElement('ul');
                list.className = 'list-group'
                data.articles.forEach(article => {
                    // Для каждого объекта в массиве создаем элемент списка
                    const item = document.createElement('li');
                    item.className = 'list-group-item'

                    // Наполнение элемента списка. Например, у каждого объекта есть 'title' и 'description'
                    item.innerHTML = `<strong>${article.title}</strong><br>
                          ${article.content}<br>
                          <em>${new Date(article.publishedAt).toLocaleString()}</em>`;

                    // Добавляем элемент списка к списку
                    list.appendChild(item);
                });

                // Добавление всего списка в контейнер для отображения на странице
                responseContainer.appendChild(list);
            }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                document.getElementById('formResponse').innerText = 'Ошибка при отправке формы.';
            });
    });

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});