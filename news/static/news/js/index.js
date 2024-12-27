console.log("init index.js")

const myFunction = function() {
    document.getElementById("myForm").addEventListener("submit", function(e) {
        e.preventDefault();

        const formData = new FormData(this);

        fetch('/submit-form/', {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': getCookie('csrftoken'),
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok'){

                const responseContainer = document.getElementById('formResponse');
                responseContainer.innerHTML = '';

                const list = document.createElement('ul');
                list.className = 'list-group'
                data.articles.forEach(article => {

                    const item = document.createElement('li');
                    item.className = 'list-group-item'

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
}


document.addEventListener("DOMContentLoaded", myFunction);
