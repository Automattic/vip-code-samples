# Customizing WordPress

## User Roles and Capabilities

To add (or delete, or modify) a user role, or add a capability to a role, you can use the [WordPress core functions](https://codex.wordpress.org/Roles_and_Capabilities).

There are also several [VIP versions](https://wpvip.com/file/vip-roles-php/) of these functions that provide additional stability for a busy site, for example [wpcom_vip_add_role](https://wpvip.com/functions/wpcom_vip_add_role/).

### Creating and managing roles

Typically, a new role is created in a [plugin activation hook](https://developer.wordpress.org/reference/functions/add_role/#comment-942). Since "activation" doesn't really happen when plugins are enabled via code on the VIP platform, we recommend using an option to keep track of the version of your set of roles, and bump the version when amending these.

See our [example code that conditionally adds a role and capability](creating-roles.php)

Why do we need to do this? Because the `add_role` function actually changes a `wp_option` entry
that contains the roles for the site. If the `add_role` function is called on every page load,
the option will be continually updated, unnecessarily. This will cause database issues
if your site traffic is high.

### Checking roles and capabilities

Despite the prevalence of examples, we strongly discourage comparing a user's role - instead, use the 
[current_user_can](https://developer.wordpress.org/reference/functions/current_user_can/) core function to determine the user's role (or `user_can` for checking users who are
not the current logged-in user).

By using a specific capability, it's possible to remove the capability from a role later without 
having to make changes to the code that is doing the checking. Or to add a new role, for example.

### Testing Precautions

These common issues can happen when testing code such as `current_user_can` in a development environment:
- failing to test as an unprivileged user / failing to test the failure modes
- testing only as a super-admin - `current_user_can( 'foo' )` will always return true, but if `foo` is not really a capability, no non-admin users will successfully pass the test in production.

Always test every possible scenario - with a user that does not have the capabilities, with a user with the capabilities, as a super user, and if necessary, with no user logged in.