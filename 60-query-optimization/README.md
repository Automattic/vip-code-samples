Query Optimization
------------------

Some of the biggest challenges in a successful site is the impact of a large posts table on certain normally quick queries.

As your database grows, you'll need to account for that growth, and make adjustments to both PHP built queries and to 
REST API requests that generate queries.

You can do that in a few ways: filtering queries using built-in query filters, or modifying the original query or request.

Here are some examples of rather expensive queries on a large site:

```
$args = [
    '' => '',
];
$posts = new WP_Query( $args );
```

Category pages tend to run (under the hood) the following WP_Query:


This produces the following SQL:
```
SELECT wp_posts.ID FROM wp_posts
LEFT JOIN wp_term_relationships ON (wp_posts.ID = wp_term_relationships.object_id) WHERE 1=1 AND (
wp_term_relationships.term_taxonomy_id IN (88)
)
AND wp_posts.post_type = 'post'
AND ((wp_posts.post_status = 'publish'))
GROUP BY wp_posts.ID
ORDER BY wp_posts.post_date DESC
LIMIT 0, 10
```