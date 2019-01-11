Jetpack Search
--------------

Jetpack's Search feature allows you to offload some queries to Jetpack's Elasticsearch.

Complex queries or wildcard search can benefit the most from this.

Before enabling Jetpack search, please ensure that your site has been indexed.

// How to check?

## [Enable Jetpack Search via filters](jetpack-search.php)

A filter to add 'es' => 'true' to the WP_Query parameters allows you to enable existing queries, such as those for 
a category page, or site search.

== Manually using WP_Query

