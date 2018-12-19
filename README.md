# sample-code-vip
Sample code snippets for a secure and performant WordPress.com VIP site

## How to use this repository

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

### Preventing fatal errors and warnings
Common causes of errors are: declaring functions that haven't been loaded, acessing values without checking their type

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

### Jetpack search

### Image resizing

### Filesystem

### Making remote requests

### Using the Debug Bar

## Common tweaks and changes

### Disabling a main query

### Redirecting a domain

## Typical issues and how to prevent them

### Search on 404 page

### REST API performance

### Mobile app endpoints

### Header navigation generation

### Many posts and slower basic queries
