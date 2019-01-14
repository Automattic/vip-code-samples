Query Optimization
------------------

Some of the biggest challenges in a successful site is the impact of a large posts table on certain normally quick queries.

As your database grows, you'll need to account for that growth, and make adjustments to both PHP built queries and to 
REST API requests that generate queries.

You can do that in a few ways: filtering queries using built-in query filters, or modifying the original query or request.

Here are some examples of rather expensive queries on a large site:

```
$args = [
    'category_name' => 'news',
];
$posts = new WP_Query( $args );
```
This is similar to the query that is run on a Category archive page. For example, if you have a "news" category 
that is loaded at https://mysite.com/news/ then the above is what is used on category.php.

Normally, without any filtering, this is the actual SQL query produced and sent to MySQL:

```
SELECT SQL_CALC_FOUND_ROWS wp_posts.ID
FROM wp_posts 
LEFT JOIN wp_term_relationships ON 
    (wp_posts.ID = wp_term_relationships.object_id)
WHERE 1=1 AND ( 
    wp_term_relationships.term_taxonomy_id IN (6,22,44,88,201,10276) )
    AND wp_posts.post_type = 'post'
    AND (wp_posts.post_status = 'publish' OR wp_posts.post_status = 'private')
GROUP BY wp_posts.ID
ORDER BY wp_posts.post_date DESC
LIMIT 0, 25
```


Now, if your site has a few hundred posts, there should be no concern.
However, let's say you're a large site with several years' worth of content, much of it in the news
category. Let's see where this may be inefficient and how you can speed things up.

