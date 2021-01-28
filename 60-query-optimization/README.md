Query Optimization
------------------

Some of the biggest challenges in a successful site is the impact of a large posts table on certain normally quick queries.

As your database grows, you'll need to account for that growth, and make adjustments to both PHP built queries and to
REST API requests that generate queries.

You can do that in a few ways: filtering queries using built-in query filters, or modifying the original query or request.

Here are some examples of rather expensive queries on a large site:

```php
$args = [
    'category_name' => 'news',
];
$posts = new WP_Query( $args );
```
This is similar to the query that is run on a Category archive page. For example, if you have a "news" category
that is loaded at https://mysite.com/news/ then the above is what is used on category.php.

Normally, without any filtering, this is the actual SQL query produced and sent to MySQL:

```sql
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

First, you'll note the taxonomy ID list also includes several other IDs - those are child categories such as "Political News" that
are likely unnecessary if the posts already are tagged "News".

If you run EXPLAIN on the query above, and you do have a lot of posts in wp_posts, you'll likely see
something like this:

```
+----+-------------+-----------------------+--------+--------------------------+------------------+---------+---------------------------------+--------+----------------------------------------------------+
| id | select_type | table                 | type   | possible_keys            | key              | key_len | ref                             | rows   | Extra                                              |
+----+-------------+-----------------------+--------+--------------------------+------------------+---------+---------------------------------+--------+----------------------------------------------------+
| 1  | SIMPLE      | wp_term_relationships | range  | PRIMARY,term_taxonomy_id | term_taxonomy_id | 8       |                                 | 677527 | Using where; Using index; Using temporary; Using f |
| 1  | SIMPLE      | wp_posts              | eq_ref | PRIMARY,type_status_date | PRIMARY          | 8       | wp_term_relationships.object_id | 1      | Using where                                        |
+----+-------------+-----------------------+--------+--------------------------+------------------+---------+---------------------------------+--------+----------------------------------------------------+
```

The MySQL EXPLAIN reveals that in order to obtain the most recent 25 posts by post_date, a temporary table is used to sort almost 700k posts.

If your site is frequently running these queries to build the list of posts for categories, the database is doing more work
than necessary. It's using up memory and other queries will need to wait for it to complete the expensive sort.

We need to reduce the amount of space and if possible eliminate the sorting.

Here's how to improve the query:

1. Narrow down the date range. Have a look at the results and see how many days back that goes on average. Then just to be safe, double the number of days
back. And add the `date_query` attribute below.

2. Remove the [child categories](https://vip.wordpress.com/documentation/term-queries-should-consider-include_children-false/).
That's accomplished by adding the `include_children` attribute below.

⚠ Note: the 'after' attribute only sets a date, not a time. 
That means the SQL will look like '2019-06-06 00:00:00' rather than '2019-06-06 12:53:16'
The reason for this is to avoid having a bunch of different queries where the only difference is the 
minutes and seconds. That defeats MySQL's [built in query caching](https://mariadb.com/kb/en/library/query-cache/), and can reduce performance.

```php
function my_performance_improvement_query_filter( $query ) {
	if ( is_admin() || ! $query->is_main_query() ) {
		return;
	}
	if ( $query->is_category() ) {
		$query->set( 'include_children', false );
	}
	if ( $query->is_category( 6 ) ) {
	    $recent = strtotime( 'last month' );
		$date_filter = [
			'after' => [
				'year' => date( 'Y', $recent ),
				'month' => date( 'n', $recent ),
				'day' => date( 'j', $recent ),
			]
		];
		$query->set( 'date_query', $date_filter );
	}
}
add_action( 'pre_get_posts', 'my_performance_improvement_query_filter' );
```

Now the query that is built looks like:
```sql
SELECT SQL_CALC_FOUND_ROWS wp_posts.ID
FROM wp_posts
LEFT JOIN wp_term_relationships ON
    (wp_posts.ID = wp_term_relationships.object_id)
WHERE 1=1 AND (
    wp_term_relationships.term_taxonomy_id IN (6) )
    AND wp_posts.post_type = 'post'
    AND (wp_posts.post_status = 'publish' OR wp_posts.post_status = 'private')
    AND wp_posts.post_date > '2019-01-03 00:00:00'
GROUP BY wp_posts.ID
ORDER BY wp_posts.post_date DESC
LIMIT 0, 25
```

And the EXPLAIN:
```
+----+-------------+-----------------------+-------+--------------------------+------------------+---------+-------------+------+----------------------------------------------------+
| id | select_type | table                 | type  | possible_keys            | key              | key_len | ref         | rows | Extra                                              |
+----+-------------+-----------------------+-------+--------------------------+------------------+---------+-------------+------+----------------------------------------------------+
| 1  | SIMPLE      | wp_posts              | range | PRIMARY,type_status_date | type_status_date | 52      |             | 5825 | Using where; Using index; Using temporary; Using f |
| 1  | SIMPLE      | wp_term_relationships | eq_ref| PRIMARY,term_taxonomy_id | PRIMARY          | 16      | wp_posts.ID | 1    | Using where; Using index                           |
+----+-------------+-----------------------+-------+--------------------------+------------------+---------+-------------+------+----------------------------------------------------+
```
So instead of 700k posts, we're only sorting 6k posts now (the number of posts since 1 month ago)
- which is a huge improvement and will speed up the query (and page generation) and
reduce the load on the database.

You can apply the same query filtering on a REST API request.


## Common Mistakes with `WP_Query`

The [`get_posts()`](https://developer.wordpress.org/reference/classes/wp_query/get_posts/) method may be mistaken as a getter for the posts property, however it is not. Calling this outside of the constructor as demonstrated below will an additional query which may be broken and/or an under performant query.

```php
$args = [
  'posts_per_page'      => '10',
  'post_type'           => 'post',
  'post_status'         => 'publish',
  'no_found_rows'       => true,
  'ignore_sticky_posts' => true,
  'cat'                 => 123
];
$my_query = new WP_Query( $args );
```

The above will query for these posts via the class constructor. The query will run as expected:

```sql
SELECT wp_posts.ID
FROM wp_posts
LEFT JOIN wp_term_relationships ON
  (wp_posts.ID = wp_term_relationships.object_id)
WHERE 1=1 AND (
  wp_term_relationships.term_taxonomy_id IN (123) )
  AND wp_posts.post_type = 'post'
  AND ((wp_posts.post_status = 'publish'))
GROUP BY wp_posts.ID
ORDER BY wp_posts.post_date
DESC LIMIT 0, 10
```

And the posts can be retrieved with:

```php
/* ✅ This approach is correct. */
$my_posts = $my_query->posts;
```

However, if the following is used by mistake instead of the `posts` property, a second query will fire. This query in addition to adding an unnecessary query, may break the intended query.

```php
/* ❌ This approach is incorrect. */
$my_posts = $my_query->get_posts();
```

In additional to the query fired from the constructor, the above example would result in a second query with an extra under performant `LEFT JOIN`:

```sql
SELECT wp_posts.ID
FROM wp_posts
LEFT JOIN wp_term_relationships ON
  (wp_posts.ID = wp_term_relationships.object_id)
LEFT JOIN wp_term_relationships AS tt1 ON
  (wp_posts.ID = tt1.object_id)
WHERE 1=1 AND (
  wp_term_relationships.term_taxonomy_id IN (123)
  AND tt1.term_taxonomy_id IN (123) )
  AND wp_posts.post_type = 'post'
  AND ((wp_posts.post_status = 'publish'))
GROUP BY wp_posts.ID
ORDER BY wp_posts.post_date
DESC LIMIT 0, 10
```
