# Ku Jin's personal website/blog repository.
http://kujinshin.github.io/


# To Do:
[ ] Add categories in the side bar
    ```
    {% for category in site.categories %}
      <h3>{{ category[0] }}</h3>
      <ul>
        {% for post in category[1] %}
          <li><a href="{{ post.url }}">{{ post.title }}</a></li>
        {% endfor %}
      </ul>
    {% endfor %}
    ```
[ ] Add Markdown post level navigation
