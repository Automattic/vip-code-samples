Jetpack Search
--------------

Jetpack's Search feature allows you to offload some queries to Jetpack's Elasticsearch.

Complex queries or wildcard search can benefit the most from this.

Before enabling Jetpack search, please ensure that your site has been indexed.

// How to check?

## [Enable Jetpack Search](jetpack-search.php)

You just need to enable the Search module in Jetpack to have Jetpack Search handle standard built-in WordPress search queries.

We've provided a code snippet that permits enabling it via code, avoiding having it inadvertently disabled in the admin.

### Enabling for WP_Query

A filter to add 'es' => 'true' to the WP_Query parameters allows you to enable existing queries, such as those for 
a category page or a custom widget, to use Jetpack's index.

This results in supported queries being sent to Jetpack Search to obtain a list of matching post IDs, and then a MySQL query will fetch the post data.
