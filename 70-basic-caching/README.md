Basic Caching
-------------

There's already a lot of default caching in WordPress - certain queries are automatically cached, and many interfaces have some caching layers.

There's also a page-level cache - for WordPress.com that's batcache. For WordPress.com VIP Platform (VIP Go), that's a Varnish layer that
works on the load-balancers and intercepts requests from browsers before they reach WordPress.

WordPress caching such as `get_transient` and `wp_cache_get` can be used in application code where it makes sense. On WordPress.com VIP platform,
that results in data being stored in an object store called memcache, which is fairly fast but not persistent (i.e., data may not always remain cached).

One application is to save the result of a relatively expensive request, or avoid making a database or external request.

Here's an example of an expensive external request (in this case, to a public API):

