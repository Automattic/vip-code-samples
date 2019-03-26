# sample-code-vip
Sample code snippets for a secure and performant WordPress.com VIP site

## About this repository
The code and narrative here is meant to augment the [VIP Documentation](https://vip.wordpress.com/documentation/vip-go/).

While our documentation provides a reference for
the features of the VIP Platform and how to develop on it, we've gathered here some sample code that directly
illustrates the main points.

You're welcome to copy, use, and amend the  examples here for use on your site.

## How to use this repository
This repository contains snippets of example code.

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

### [General setup & getting started](00-getting-started)
Install PHPCS and use it to help identify possible issues.

A sample PHPCS configuration is included, but you can run PHPCS without it by setting up a general configuration.

## Security
Security practices prevent third parties from impacting your site and users in various ways, or even using your
site to cause malicious attacks against other sites.

### [Sanitizing and escaping inputs and outputs](10-security)
Sanitization of user and third party inputs helps to prevent web-based attacks that can cause loss of data, user manipulation,
or unauthorized changes or access.

## General practices with WordPress

### [Preventing fatal errors and warnings](20-preventing-bad-things)
Common causes of errors are: declaring functions that haven't been loaded, acessing values without checking their type

### [WordPress Basics: hooks and filters](30-basics)

### Debugging in development
Use WP_DEBUG, utilize the debug bar,

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

### [Image resizing](120-images)

### Filesystem

### Making remote requests

### Using the Debug Bar

## Common tweaks and changes

### Disabling a main query

### Redirecting a domain

## Typical issues and how to prevent them

### Search on 404 page

### REST API performance

### The block editor

### Mobile app endpoints

### Header navigation generation

### Many posts and slower basic queries

## [Miscellaneous things](999-misc)