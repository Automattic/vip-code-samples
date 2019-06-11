# VIP Code Samples
Sample code snippets for a secure and performant WordPress.com VIP site

## About this repository
The code and narrative here is meant to augment the [VIP Documentation](https://wpvip.com/documentation/).

While our documentation provides a reference for
the features of the VIP Platform and how to develop on it, we've gathered here some sample code that directly
illustrates the main points.

You're welcome to copy, use, and amend the  examples here for use on your site.

## How to use this repository
This repository contains snippets of example code.

It's organized into topics, with separate README files that drill down into code samples. All code samples are designed to work and comply with VIP coding standards and guidelines. Examples of what does not work will be in the README document, never in a php file.

### Using code in your theme or plugin
Unlike plugins, which usually are more involved and provide configuration options accessible through wp-admin,
most bits of code here will be all you need to perform a particular task. Where you actually put the snippets
is up to you and may depend on how your code is structured.

Please do change the function and hook prefixes to suit your theme or plugin and avoid a naming collision. And customize the code
to your needs.

### Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md).

### Getting assistance from the VIP team
If you have questions about a
particular example and need assistance implementing it for your site, and are a VIP client or partner,
then please open a support ticket with us and we'll help clarify or assist you in solving your particular
problem.

## [General setup & getting started](00-getting-started)
Install [PHPCS](https://wpvip.com/documentation/how-to-install-php-code-sniffer-for-wordpress-com-vip/) and use it to help identify possible issues. Most of the examples here will use WordPress-VIP-Go standards.

A [sample PHPCS configuration is included](phpcs.xml), but you can run PHPCS without it by setting up a general configuration.

### [Working with Git](001-working-with-git)
You'll be using Git and GitHub to manage your code and deploy it to your WordPress environments.

## [Security](10-security)
Security practices prevent third parties from impacting your site and users in various ways, or even using your
site to cause malicious attacks against other sites.

### [Sanitizing and escaping inputs and outputs](10-security)
Sanitization of user and third party inputs helps to prevent web-based attacks that can cause loss of data, user manipulation,
or unauthorized changes or access.

## General practices with WordPress

### [Preventing fatal errors and warnings](20-preventing-bad-things)
Common causes of errors are: declaring functions that haven't been loaded, acessing values without checking their type

### [WordPress Basics: hooks and filters](30-basics)

### [Customizing WordPress](40-customizing)
Learn how to add user roles, etc.

### Debugging in development
Use WP_DEBUG, utilize the debug bar, and monitor error logs with a view to keeping logs as empty as possible.

For example, if deprecation warnings are thrown frequently, they should be resolved.

If code occasionally throws warnings because of unexpected data, adding a bit of extra result checking helps keep the error logs relatively clean.

### Production issues and warnings
In production, errors are surfaced for VIP sites in New Relic. Errors should be addressed promptly.

With a clean error log (i.e. no errors or warnings or notices at all) it's easy to configure New Relic alerts to flag new issues.

Avoid throwing uncaught errors. Instead, use [New Relic noticeError](https://docs.newrelic.com/docs/browser/new-relic-browser/browser-agent-spa-api/notice-error) to send messages directly to New Relic.

## Performance and optimization
Performance tuning, and optimization strategies, help your site scale, perform better with fewer resources, and be more
reliable.

### [Query optimization](60-query-optimization)
Query optimization helps your WordPress queries run faster as your tables grow.

### [Basic caching](70-basic-caching)
Basic caching techniques avoid repetitive requests for the same thing.

### [Advanced caching](80-advanced-caching)
Advanced caching techniques expand on caching to avoid some issues that caching can introduce, or protect your site from
certain spiky usage patterns.

## Advanced features of the VIP Platform

### [Jetpack search](110-jetpack-search)
You can enable Jetpack search on your site and offload common WordPress search functionality to an Elasticsearch cluster. This provides a more robust index of content than using MySQL LIKE queries.

### [Image resizing](120-images)

### [Filesystem](130-filesystem)

## Typical issues and how to prevent them

### Search on 404 page
Avoid running any queries, remote requests, or code that may result in an expensive request on a 404 page. It may be tempting to supply a list of possibly related articles but a sudden search engine sweep of old URLs may cause site instability with a lot of queries. If using a cache, do not replenish the cache when empty.

### REST API performance
The REST API was designed for flexibility, but on a site with a lot of articles, it may need some query filtering to optimize.

There are also potential issues with frequent REST requests from browsers with GET parameters.

## [Miscellaneous things](999-misc)
These items did not fit anywhere else, but may be helpful in certain cases.